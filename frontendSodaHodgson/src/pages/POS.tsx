import { useState } from "react";
import Header from "../components/layout/Header";
import { products } from "../data/mockData";
import { useReactToPrint } from "react-to-print";
import Ticket from "../components/layout/Ticket";
import { InvoiceDetail } from "../models/Cart";
import { Product } from "../models/Product";
import { tables } from "../data/tables";
import { orders } from "../data/orders";

const POS: React.FC = () => {
  const [cart, setCart] = useState<InvoiceDetail[]>([]);

  const [selectedTable, setSelectedTable] = useState<number | null>(null);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [cash, setCash] = useState<number>(0);

  const [paymentMethod, setPaymentMethod] = useState("Efectivo");

  const [showTicket, setShowTicket] = useState(false);

  const [productList, setProductList] = useState(products);

  const [ticketData, setTicketData] = useState<{
    cart: InvoiceDetail[];
    total: number;
    paymentMethod: string;
    cash: number;
    change: number;
  } | null>(null);

  // FILTRAR PRODUCTOS
  const filteredProducts = productList.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  // AGREGAR PRODUCTO
  const addProduct = (product: Product) => {
    if (!selectedTable) {
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
              subtotal: (item.quantity + 1) * item.product.price,
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
          subtotal: product.price,
          product: product,
        },
      ]);
    }

    setProductList((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, stock: p.stock - 1 } : p)),
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
              subtotal: (item.quantity - 1) * item.product.price,
            }
          : item,
      );

      setCart(updated);
    }

    setProductList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: p.stock + 1 } : p)),
    );
  };

  // TOTAL
  const total = cart.reduce((acc, item) => acc + item.subtotal, 0);

  // CAMBIO
  const change = cash ? cash - total : 0;

  const handlePrint = () => {
    setShowTicket(true);
  };

  // FINALIZAR VENTA
const finishSale = () => {

  orders.push({
    tableId: selectedTable,
    items: cart,
    total,
    date: new Date(),
  });

  setTicketData({
    cart,
    total,
    paymentMethod,
    cash,
    change,
  });

  setShowTicket(true);

  setCart([]);
  setSelectedTable(null);
  setCash(0);
  setShowModal(false);
};

  return (
    <div className="p-4 md:p-8 w-full">
      <Header title="Caja Registradora" />

      {/* SELECCIONAR MESA */}

<div className="bg-white rounded-3xl shadow p-6 mb-6">

  <h2 className="text-2xl font-bold mb-4">
    Mesa Seleccionada
  </h2>

  <select
    value={selectedTable || ""}
    onChange={(e) => setSelectedTable(Number(e.target.value))}
    className="w-full p-4 border rounded-2xl"
  >
    <option value="">
      Seleccionar Mesa
    </option>

    {tables.map((table) => (
      <option
        key={table.id}
        value={table.id}
      >
        Mesa {table.number}
      </option>
    ))}
  </select>

</div>
      {/* PRODUCTOS */}
      <div className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
xl:grid-cols-4
gap-6
mt-6
">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="
bg-white
rounded-3xl
shadow-lg
hover:shadow-2xl
hover:-translate-y-1
transition-all
duration-300
overflow-hidden
"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-52 object-cover"
            />

            <div className="p-5">
              <h2 className="text-2xl font-bold">{product.name}</h2>

              <p className="text-slate-500 mt-2">Stock: {product.stock}</p>

              <h3 className="text-3xl font-bold mt-4">C$ {product.price}</h3>

              <button
                onClick={() => addProduct(product)}
                className={`w-full mt-5 p-3 rounded-2xl font-semibold transition ${
                  product.stock <= 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-cyan-500 hover:bg-cyan-600 text-white"
                }`}
                disabled={product.stock <= 0}
              >
                {product.stock <= 0 ? "Sin Stock" : "Agregar"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CARRITO */}
{/* CARRITO */}
<div className="
bg-white
rounded-3xl
shadow-xl
p-6
mt-8
border
border-slate-100
">

  <div className="flex justify-between items-center mb-6">

    <h2 className="text-3xl font-bold">
      Pedido
    </h2>

    {selectedTable && (
      <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
        Mesa {selectedTable}
      </span>
    )}

  </div>

  <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">Producto</th>
              <th className="p-4 text-left">Cantidad</th>
              <th className="p-4 text-left">Subtotal</th>
              <th className="p-4 text-left">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {cart.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-4">{item.product.name}</td>

                <td className="p-4">{item.quantity}</td>

                <td className="p-4">C$ {item.subtotal}</td>

                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => addProduct(item.product)}
                      className="bg-green-600 text-white px-4 py-2 rounded-xl"
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeProduct(item.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-xl"
                    >
                      -
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* TOTAL */}
        <div className="bg-gradient-to-r
from-cyan-50
to-blue-50 rounded-3xl p-6 mt-6 flex items-center justify-between">
          <div>
            <p className="text-slate-500">Total</p>

            <h2 className="text-5xl font-bold">C$ {total}</h2>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r
from-emerald-500
to-green-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-green-700 transition"
          >
            Cobrar
          </button>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-3xl p-8 w-[450px]">
            <h2 className="text-3xl font-bold">Finalizar Venta</h2>

            <div className="mt-6">
              <label className="font-semibold">Método de Pago</label>

              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full border rounded-2xl p-4 mt-2"
              >
                <option>Efectivo</option>
                <option>Transferencia</option>
                <option>Tarjeta</option>
              </select>
            </div>

            <div className="mt-4">
              <label className="font-semibold">Dinero Recibido</label>

              <input
                type="number"
                value={cash}
                onChange={(e) => setCash(Number(e.target.value))}
                className="w-full border rounded-2xl p-4 mt-2"
              />
            </div>

            <div className="bg-slate-100 rounded-3xl p-5 mt-6">
              <div className="flex justify-between">
                <span>Total:</span>
                <span className="font-bold">C$ {total}</span>
              </div>

              <div className="flex justify-between mt-3">
                <span>Cambio:</span>
                <span className="font-bold text-green-600">C$ {change}</span>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="bg-slate-300 w-full p-4 rounded-2xl font-bold"
              >
                Cancelar
              </button>

              <button
                onClick={finishSale}
                className="bg-green-600 text-white w-full p-4 rounded-2xl font-bold"
              >
                Finalizar
              </button>
            </div>
          </div>
        </div>
      )}
      {showTicket && ticketData && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto relative">
            {/* BOTÓN CERRAR */}
            <button
              onClick={() => setShowTicket(false)}
              className="absolute top-4 right-4 bg-red-500 text-white w-10 h-10 rounded-full font-bold hover:bg-red-600"
            >
              X
            </button>

            {/* TICKET */}
            <Ticket
              cart={ticketData.cart}
              total={ticketData.total}
              paymentMethod={ticketData.paymentMethod}
              cash={ticketData.cash}
              change={ticketData.change}
            />

            {/* BOTONES */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => window.print()}
                className="bg-blue-600 text-white w-full p-4 rounded-2xl font-bold hover:bg-blue-700"
              >
                Imprimir
              </button>

              <button
                onClick={() => setShowTicket(false)}
                className="bg-slate-300 w-full p-4 rounded-2xl font-bold"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default POS;
