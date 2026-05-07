import { useState, useRef } from "react";
import Header from "../components/layout/Header";
import { products } from "../data/mockData";
import { useReactToPrint } from "react-to-print";
import Ticket from "../components/Ticket";

export default function POS() {

  const [cart, setCart] = useState([]);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [cash, setCash] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("Efectivo");
  
  const ticketRef = useRef();

  // FILTRAR PRODUCTOS
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // AGREGAR PRODUCTO
  const addProduct = (product) => {

    const existing = cart.find(item => item.id === product.id);

    if (existing) {

      const updated = cart.map(item =>
        item.id === product.id
          ? {
              ...item,
              qty: item.qty + 1,
              subtotal: (item.qty + 1) * item.price
            }
          : item
      );

      setCart(updated);

    } else {

      setCart([
        ...cart,
        {
          ...product,
          qty: 1,
          subtotal: product.price
        }
      ]);

    }

  };

  // ELIMINAR PRODUCTO
  const removeProduct = (id) => {

    const existing = cart.find(item => item.id === id);

    if (existing.qty === 1) {

      setCart(cart.filter(item => item.id !== id));

    } else {

      const updated = cart.map(item =>
        item.id === id
          ? {
              ...item,
              qty: item.qty - 1,
              subtotal: (item.qty - 1) * item.price
            }
          : item
      );

      setCart(updated);

    }

  };

  // TOTAL
  const total = cart.reduce(
    (acc, item) => acc + item.subtotal,
    0
  );

  // CAMBIO
  const change = cash ? cash - total : 0;

  const handlePrint = useReactToPrint({
  contentRef: () => ticketRef,
});

  // FINALIZAR VENTA
  const finishSale = () => {

    handlePrint();

    setCart([]);
    setCash("");
    setShowModal(false);

  };

  return (
    <div className="p-8 w-full">

      <Header title="Caja Registradora" />

      {/* SEARCH */}
      <div className="mt-6">

        <input
          type="text"
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white rounded-3xl shadow p-5 outline-none"
        />

      </div>

      {/* PRODUCTOS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

        {filteredProducts.map(product => (

          <div
            key={product.id}
            className="bg-white rounded-3xl shadow hover:shadow-xl transition overflow-hidden"
          >

            <img
              src={product.image}
              alt={product.name}
              className="w-full h-52 object-cover"
            />

            <div className="p-5">

              <h2 className="text-2xl font-bold">
                {product.name}
              </h2>

              <p className="text-slate-500 mt-2">
                Stock: {product.stock}
              </p>

              <h3 className="text-3xl font-bold mt-4">
                C$ {product.price}
              </h3>

              <button
                onClick={() => addProduct(product)}
                className="bg-blue-600 text-white w-full mt-5 p-3 rounded-2xl font-semibold hover:bg-blue-700 transition"
              >
                Agregar
              </button>

            </div>

          </div>

        ))}

      </div>

      {/* CARRITO */}
      <div className="bg-white rounded-3xl shadow p-6 mt-8">

        <h2 className="text-3xl font-bold mb-6">
          Carrito
        </h2>

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

            {cart.map(item => (

              <tr key={item.id} className="border-t">

                <td className="p-4">
                  {item.name}
                </td>

                <td className="p-4">
                  {item.qty}
                </td>

                <td className="p-4">
                  C$ {item.subtotal}
                </td>

                <td className="p-4">

                  <div className="flex gap-2">

                    <button
                      onClick={() => addProduct(item)}
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
        <div className="bg-slate-100 rounded-3xl p-6 mt-6 flex items-center justify-between">

          <div>

            <p className="text-slate-500">
              Total
            </p>

            <h2 className="text-5xl font-bold">
              C$ {total}
            </h2>

          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-green-700 transition"
          >
            Cobrar
          </button>

        </div>

      </div>

      {/* MODAL */}
      {showModal && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

          <div className="bg-white rounded-3xl p-8 w-[450px]">

            <h2 className="text-3xl font-bold">
              Finalizar Venta
            </h2>

            <div className="mt-6">

              <label className="font-semibold">
                Método de Pago
              </label>

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

              <label className="font-semibold">
                Dinero Recibido
              </label>

              <input
                type="number"
                value={cash}
                onChange={(e) => setCash(e.target.value)}
                className="w-full border rounded-2xl p-4 mt-2"
              />

            </div>

            <div className="bg-slate-100 rounded-3xl p-5 mt-6">

              <div className="flex justify-between">
                <span>Total:</span>
                <span className="font-bold">
                  C$ {total}
                </span>
              </div>

              <div className="flex justify-between mt-3">
                <span>Cambio:</span>
                <span className="font-bold text-green-600">
                  C$ {change}
                </span>
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
      <div className="hidden">
  <Ticket
    ref={ticketRef}
    cart={cart}
    total={total}
    paymentMethod={paymentMethod}
    cash={cash}
    change={change}
  />
</div>

    </div>
  )
}