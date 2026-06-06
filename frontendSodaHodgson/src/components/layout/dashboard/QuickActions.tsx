import { Link } from "react-router-dom";

export default function QuickActions() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        Acciones rápidas
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        <Link
          to="/pos"
          className="bg-cyan-600 hover:bg-cyan-700 text-white p-5 rounded-2xl text-center font-bold transition"
        >
          💳 Nueva Venta
        </Link>

        <Link
          to="/pos"
          className="bg-emerald-600 hover:bg-emerald-700 text-white p-5 rounded-2xl text-center font-bold transition"
        >
          🛍 Para Llevar
        </Link>

        <Link
          to="/tables"
          className="bg-orange-500 hover:bg-orange-600 text-white p-5 rounded-2xl text-center font-bold transition"
        >
          🍽 Mesas
        </Link>

        <Link
          to="/products"
          className="bg-violet-600 hover:bg-violet-700 text-white p-5 rounded-2xl text-center font-bold transition"
        >
          🍔 Productos
        </Link>

      </div>

    </div>
  );
}