import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-72 min-h-screen bg-slate-900 text-white p-6">

      <h1 className="text-3xl font-bold mb-10">
        Soda Hodgson
      </h1>

      <nav className="space-y-4">

        <Link
          to="/"
          className="block bg-slate-800 hover:bg-blue-600 transition p-4 rounded-2xl"
        >
          Dashboard
        </Link>

        <Link
          to="/pos"
          className="block bg-slate-800 hover:bg-blue-600 transition p-4 rounded-2xl"
        >
          Caja POS
        </Link>

        <Link
          to="/inventory"
          className="block bg-slate-800 hover:bg-blue-600 transition p-4 rounded-2xl"
        >
          Inventario
        </Link>

        <Link
          to="/users"
          className="block bg-slate-800 hover:bg-blue-600 transition p-4 rounded-2xl"
        >
          Usuarios
        </Link>

      </nav>

    </div>
  )
}