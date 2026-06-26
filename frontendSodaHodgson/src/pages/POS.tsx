import { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import { useReactToPrint } from "react-to-print";
import Ticket from "../components/layout/Ticket";
import POSHeader from "../components/layout/pos/POSHeader";
import ProductGrid from "../components/layout/pos/ProductGrid";
import Cart from "../components/layout/pos/Cart";
import OrderSummary from "../components/layout/pos/OrderSummary";
import { InvoiceDetail } from "../models/Cart";
import { Product } from "../models/Product";
import { orders } from "../data/orders";
import { productsService } from "../api/products";
import { useTables, useUpdateTable } from "../hooks/useTables";
import { useCreateSalesDetail } from "../hooks/useSalesDetail";
import { useCreateSale } from "../hooks/useSales";
import { Table } from "../models/Table";
import { useSearchParams } from "react-router-dom";

import {
  ShoppingBag,
  UtensilsCrossed,
  CheckCircle2,
} from "lucide-react";


const POS: React.FC = () => {
  const createSale = useCreateSale();
  const createSalesDetail = useCreateSalesDetail();
  const { data: tables = [] } = useTables();
  const updateTable = useUpdateTable();

  const [searchParams] = useSearchParams();
  const tableParamId = searchParams.get("table");

  const [cart, setCart] = useState<InvoiceDetail[]>([]);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [saleType, setSaleType] = useState<"RAPIDA" | "MESA">("RAPIDA");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  // 🚀 MEJORA: El estado nace como un string vacío para permitir el placeholder transparente
  const [cash, setCash] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState("Efectivo");
  const [showTicket, setShowTicket] = useState(false);
  const [productList, setProductList] = useState<Product[]>([]);

  // Auto-seleccionar la mesa si viene de la URL
  useEffect(() => {
    if (tableParamId && tables.length > 0) {
      const table = tables.find((t) => String(t.id) === String(tableParamId));
      if (table) {
        setSelectedTable(table);
        setSaleType("MESA");
      }
    }
  }, [tableParamId, tables]);

  const loadProducts = async () => {
    try {
      const data = await productsService.getAll();
      setProductList(data);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  const [ticketData, setTicketData] = useState<{
    cart: InvoiceDetail[];
    total: number;
    paymentMethod: string;
    cash: number;
    change: number;
  } | null>(null);

  // AGREGAR PRODUCTO
  const addProduct = (product: Product) => {
    if (saleType === "MESA" && !selectedTable) {
      alert("Seleccione una mesa primero");
      return;
    }
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      const updated = cart.map((item) =>
        item.id === product.id
          ? {
            ...item,
            quantity: item.quantity + 1,
            subtotal: (item.quantity + 1) * item.product.price_sell,
          }
          : item,
      );

      setCart(updated);
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
          subtotal: product.price_sell,
          product: product,
        },
      ]);
    }

    setProductList((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, stock: p.stock_current - 1 } : p)),
    );
  };

  // ELIMINAR PRODUCTO
  const removeProduct = (id: string) => {
    const existing = cart.find((item) => item.id === id);

    if (existing?.quantity === 1) {
      setCart(cart.filter((item) => item.id !== id));
    } else {
      const updated = cart.map((item) =>
        item.id === id
          ? {
            ...item,
            quantity: item.quantity - 1,
            subtotal: (item.quantity - 1) * item.product.price_sell,
          }
          : item,
      );

      setCart(updated);
    }

    setProductList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: p.stock_current + 1 } : p)),
    );
  };

  // TOTAL
  const total = cart.reduce((acc, item) => acc + item.subtotal, 0);

  // 🚀 MEJORA: Cálculo seguro del cambio convirtiendo el string 'cash' a número real
  const change = cash ? Number(cash) - total : 0 - total;

  const handlePrint = () => {
    setShowTicket(true);
  };

  // FINALIZAR VENTA
  const finishSale = async () => {
    if (!cash || Number(cash) <= 0) {
      alert("Debe ingresar un monto mayor que C$ 0");
      return;
    }

    if (cart.length === 0) {
      alert("No puede realizar una venta sin productos");
      return;
    }

    if (total <= 0) {
      alert("No se puede realizar una venta en C$ 0");
      return;
    }

    try {

      const sale = await createSale.mutateAsync({
        session_id: "SESSION_ID",
        table_id: selectedTable?.id ?? "venta rapida",
        user_creator_id: "USER_ID",
        ruc_number: "no-tener",
        sale_time: new Date(),
        status: "COMPLETED",
      });

      await Promise.all(
        cart.map((item) =>
          createSalesDetail.mutateAsync({
            sale_id: sale.id,
            product_id: item.product.id,
            quantity: item.quantity,
            unit_price: item.product.price_sell,
            subtotal: item.subtotal,
          })
        )
      );

      // 2. Crear detalles
      await Promise.all(
        cart.map((item) =>
          createSalesDetail.mutateAsync({
            sale_id: sale.id,
            product_id: item.product.id,
            quantity: item.quantity,
            unit_price: item.product.price_sell,
            subtotal: item.subtotal,
          })
        )
      );

      // Si la venta fue en mesa, actualizamos su estado
      if (saleType === "MESA" && selectedTable) {
        await updateTable.mutateAsync({
          id: String(selectedTable.id),
          data: {
            ...selectedTable,
            status: "Ocupada",
          },
        });
      }

      // 🚀 MEJORA: Enviamos el valor numérico procesado al ticket
      setTicketData({
        cart,
        total,
        paymentMethod,
        cash: Number(cash) || 0,
        change: cash ? Number(cash) - total : 0,
      });

      setShowTicket(true);

      // Limpieza de Estados del POS
      setCart([]);
      setSelectedTable(null);
      setCash(""); // 🚀 MEJORA: Dejar limpio el input para la siguiente venta
      setShowModal(false);

    } catch (error) {
      console.error("Error creando venta:", error);
      alert("No se pudo registrar la venta");
    }
  };

  const availableTables = tables.filter(
    (table) =>
      table.status === "Disponible" ||
      table.status === "Reservada"
  );

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="p-4 md:p-8 w-full">
      
      <POSHeader />

<div className="mt-8"></div>

      {/* TIPO DE VENTA */}

<div
  className="
    bg-white
    rounded-[30px]
    shadow-xl
    border
    border-slate-200
    p-8
    mb-8
  "
>

  <div className="mb-8">

    <h2 className="text-3xl font-black text-slate-800">
      Tipo de Venta
    </h2>

    <p className="text-slate-500 mt-2">
      Seleccione cómo desea registrar esta venta.
    </p>

  </div>

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

    {/* Venta rápida */}

    <button
      onClick={() => {
        setSaleType("RAPIDA");
        setSelectedTable(null);
      }}
      className={`
        relative
        rounded-3xl
        p-7
        border-2
        transition-all
        duration-300
        text-left
        hover:-translate-y-1
        hover:shadow-xl

        ${
          saleType === "RAPIDA"
            ? "border-cyan-600 bg-gradient-to-br from-cyan-600 to-blue-700 text-white"
            : "border-slate-200 bg-white"
        }
      `}
    >

      <div className="flex justify-between">

        <ShoppingBag size={42} />

        {saleType === "RAPIDA" && (
          <CheckCircle2 size={30} />
        )}

      </div>

      <h3 className="text-2xl font-bold mt-8">
        Venta Rápida
      </h3>

      <p className="mt-3 opacity-80">
        Cliente para llevar.
      </p>

    </button>

    {/* Mesa */}

    <button
      onClick={() => setSaleType("MESA")}
      className={`
        relative
        rounded-3xl
        p-7
        border-2
        transition-all
        duration-300
        text-left
        hover:-translate-y-1
        hover:shadow-xl

        ${
          saleType === "MESA"
            ? "border-emerald-600 bg-gradient-to-br from-emerald-500 to-green-700 text-white"
            : "border-slate-200 bg-white"
        }
      `}
    >

      <div className="flex justify-between">

        <UtensilsCrossed size={42} />

        {saleType === "MESA" && (
          <CheckCircle2 size={30} />
        )}

      </div>

      <h3 className="text-2xl font-bold mt-8">
        Consumo en Mesa
      </h3>

      <p className="mt-3 opacity-80">
        Cliente comerá en el restaurante.
      </p>

    </button>

  </div>

  {saleType === "MESA" && (

    <div className="mt-8">

      <label className="font-semibold text-slate-700">
        Seleccionar Mesa
      </label>

      <select
        value={selectedTable?.table_number ?? ""}
        onChange={(e) => {
          const table = tables.find(
            (t) =>
              t.table_number === Number(e.target.value)
          );

          setSelectedTable(table || null);
        }}
        className="
          w-full
          mt-3
          rounded-2xl
          border
          border-slate-300
          p-4
          text-lg
          focus:ring-4
          focus:ring-cyan-200
          outline-none
        "
      >

        <option value="">
          Seleccione una mesa
        </option>

        {availableTables.map((table) => (

          <option
            key={table.id}
            value={table.table_number}
          >
            Mesa {table.table_number} ({table.status})
          </option>

        ))}

      </select>

    </div>

  )}

</div>
<div className="grid grid-cols-1 xl:grid-cols-5 gap-8">

  {/* PRODUCTOS */}
  <div className="xl:col-span-3">

    <ProductGrid
      products={productList}
      search={search}
      onSearch={setSearch}
      onAdd={addProduct}
    />

  </div>

  {/* PEDIDO */}
  <div className="xl:col-span-2 space-y-6">

    <Cart
      cart={cart}
      saleType={saleType}
      selectedTable={selectedTable}
      addProduct={addProduct}
      removeProduct={removeProduct}
    />

    <OrderSummary
      total={total}
      cartLength={cart.length}
      saleType={saleType}
      selectedTable={selectedTable}
      onCheckout={() => setShowModal(true)}
      onClear={() => setCart([])}
    />

  </div>

</div>

      {/* MODAL DE COBRO */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-[30px] p-8 w-full max-w-md shadow-2xl">
            <h2 className="text-3xl font-bold text-slate-800">Finalizar Venta</h2>
            <p className="text-slate-500 mt-2">Verifica el método de pago y confirma la transacción.</p>

            <div className="mt-6">
              <label className="font-semibold text-slate-700">Método de Pago</label>
              <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="w-full border rounded-2xl p-4 mt-2 outline-none focus:border-slate-400">
                <option>Efectivo</option>
                <option>Transferencia</option>
                <option>Tarjeta</option>
              </select>
            </div>

            {/* 🚀 COMPORTAMIENTO INTELIGENTE DEL INPUT DEL DINERO RECIBIDO */}
            <div className="mt-4">
              <label className="font-semibold text-slate-700">Dinero Recibido</label>
              <input
                type="number"
                placeholder="0" // El cero ahora es un placeholder gris y transparente
                value={cash}
                onChange={(e) => {
                  const value = Number(e.target.value);

                  if (value < 0) {
                    return;
                  }

                  setCash(e.target.value);
                }}
                onFocus={(e) => e.target.select()} // Al dar clic, autoselecciona todo para escribir rápido
                className="w-full border-2 border-slate-200 focus:border-green-500 rounded-2xl p-4 mt-2 outline-none text-xl font-semibold transition-all"
              />
            </div>

            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-3xl p-6 mt-6 border border-cyan-100">
              <div className="flex justify-between">
                <span className="text-slate-600">Total:</span>
                <span className="font-bold text-slate-800">C$ {total}</span>
              </div>
              <div className="flex justify-between mt-3">
                <span className="text-slate-600">Cambio:</span>
                <span className={`font-bold ${change >= 0 ? "text-green-600" : "text-red-500"}`}>
                  C$ {change >= 0 ? change : 0}
                </span>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="bg-slate-200 hover:bg-slate-300 w-full p-4 rounded-2xl font-bold text-slate-700 transition">Cancelar</button>
              <button
                onClick={finishSale}
                disabled={
                  total <= 0 ||
                  cart.length === 0 ||
                  (cash !== "" && Number(cash) < total)
                }
                className={`w-full p-4 rounded-2xl font-bold text-white transition ${total <= 0 ||
                  cart.length === 0 ||
                  (cash !== "" && Number(cash) < total)
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
                  }`}
              >
                Finalizar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VISUALIZACIÓN DEL TICKET */}
      {showTicket && ticketData && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto relative">
            <button onClick={() => setShowTicket(false)} className="absolute top-4 right-4 bg-red-500 text-white w-10 h-10 rounded-full font-bold hover:bg-red-600">X</button>
            <Ticket cart={ticketData.cart} total={ticketData.total} paymentMethod={ticketData.paymentMethod} cash={ticketData.cash} change={ticketData.change} />
            <div className="flex gap-4 mt-6">
              <button onClick={() => window.print()} className="bg-blue-600 text-white w-full p-4 rounded-2xl font-bold hover:bg-blue-700">Imprimir</button>
              <button onClick={() => setShowTicket(false)} className="bg-slate-300 w-full p-4 rounded-2xl font-bold">Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default POS;