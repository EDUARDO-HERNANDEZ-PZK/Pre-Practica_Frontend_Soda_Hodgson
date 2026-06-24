import { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import { useReactToPrint } from "react-to-print";
import Ticket from "../components/layout/Ticket";
import { InvoiceDetail } from "../models/Cart";
import { Product } from "../models/Product";
import { orders } from "../data/orders";
import { productsService } from "../api/products";
import { useTables, useUpdateTable } from "../hooks/useTables";
import { useCreateSalesDetail } from "../hooks/useSalesDetail";
import { useCreateSale } from "../hooks/useSales";
import { Table } from "../models/Table";
import { useSearchParams } from "react-router-dom";

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

  // FILTRAR PRODUCTOS
  const filteredProducts = productList.filter((product) =>
    (product.name ?? "").toLowerCase().includes(search.toLowerCase()),
  );

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
      <Header title="Caja Registradora" />

      {/* TIPO DE VENTA */}
      <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">Tipo de Venta</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <button
            onClick={() => {
              setSaleType("RAPIDA");
              setSelectedTable(null);
            }}
            className={`p-6 rounded-3xl border-2 transition text-left ${saleType === "RAPIDA"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white border-slate-200 hover:border-blue-500"
              }`}
          >
            <h3 className="text-2xl font-bold">🛍 Venta Rápida</h3>
            <p className="mt-2">Cliente para llevar</p>
          </button>

          <button
            onClick={() => setSaleType("MESA")}
            className={`p-6 rounded-3xl border-2 transition text-left ${saleType === "MESA"
              ? "bg-green-600 text-white border-green-600"
              : "bg-white border-slate-200 hover:border-green-500"
              }`}
          >
            <h3 className="text-2xl font-bold">🍽 Consumo en Mesa</h3>
            <p className="mt-2">Cliente comerá en el restaurante</p>
          </button>
        </div>

        {saleType === "MESA" && (
          <div className="mt-6">
            <label className="font-semibold text-slate-700">
              Seleccionar Mesa
            </label>

            <select
              value={selectedTable?.table_number ?? ""}
              onChange={(e) => {
                const table = tables.find(
                  (t) => t.table_number === Number(e.target.value)
                );

                setSelectedTable(table || null);
              }}
              className="w-full mt-3 p-4 border rounded-2xl"
            >

              <option value="">
                Seleccionar Mesa
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

      {/* PRODUCTOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
            <img
              src={product.imageUrl || "https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png"}
              alt={product.name}
              className="w-full h-52 object-cover"
            />
            <div className="p-5">
              <h2 className="text-2xl font-bold">{product.name}</h2>
              <p className="text-slate-500 mt-2">Stock: {product.stock_current}</p>
              <h3 className="text-3xl font-bold mt-4">C$ {product.price_sell}</h3>
              <button
                onClick={() => addProduct(product)}
                className={`w-full mt-5 p-3 rounded-2xl font-semibold transition ${product.stock_current <= 0 ? "bg-gray-400 cursor-not-allowed" : "bg-cyan-500 hover:bg-cyan-600 text-white"
                  }`}
                disabled={product.stock_current <= 0}
              >
                {product.stock_current <= 0 ? "Sin Stock" : "Agregar"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CARRITO */}
      <div className="bg-white rounded-3xl shadow-xl p-6 mt-8 border border-slate-100">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">Pedido Actual</h2>
            <p className="text-slate-500 mt-1">
              {saleType === "RAPIDA" ? "🛍 Venta para llevar" : `🍽 Consumo en Mesa ${selectedTable?.table_number ?? ""}`}
            </p>
          </div>
          {saleType === "MESA" && selectedTable && (
            <span className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-semibold">
              Mesa {selectedTable.table_number}
            </span>
          )}
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-4 text-left">Producto</th>
                <th className="p-4 text-center">Cantidad</th>
                <th className="p-4 text-center">Subtotal</th>
                <th className="p-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cart.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-10 text-center text-slate-400">
                    <div className="text-5xl mb-3">🛒</div>
                    No hay productos agregados
                  </td>
                </tr>
              ) : (
                cart.map((item) => (
                  <tr key={item.id} className="border-t hover:bg-slate-50 transition">
                    <td className="p-4 font-semibold">{item.product.name}</td>
                    <td className="p-4 text-center">
                      <span className="bg-slate-100 px-3 py-1 rounded-full font-bold">{item.quantity}</span>
                    </td>
                    <td className="p-4 text-center font-bold text-green-700">C$ {item.subtotal}</td>
                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => addProduct(item.product)} className="w-10 h-10 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold transition">+</button>
                        <button onClick={() => removeProduct(item.id)} className="w-10 h-10 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold transition">−</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* RESUMEN DEL PEDIDO */}
      <div className="mt-8 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <p className="text-slate-300 uppercase tracking-widest text-sm">Resumen del Pedido</p>
            <h2 className="text-5xl font-extrabold text-white mt-2">C$ {total}</h2>
            <div className="flex flex-wrap gap-3 mt-4">
              <span className="bg-white/10 text-white px-4 py-2 rounded-full text-sm">{cart.length} Productos</span>
              <span className="bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-full text-sm">
                {saleType === "RAPIDA" ? "🛍 Para Llevar" : `🍽 Mesa ${selectedTable?.table_number ?? ""}`}
              </span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => setCart([])} className="px-6 py-4 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-bold transition">🗑 Vaciar Pedido</button>
            <button
              onClick={() => setShowModal(true)}
              disabled={cart.length === 0}
              className={`px-10 py-4 rounded-2xl font-bold text-lg transition ${cart.length === 0 ? "bg-slate-500 cursor-not-allowed text-white" : "bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:scale-105"
                }`}
            >
              💳 Cobrar
            </button>
          </div>
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