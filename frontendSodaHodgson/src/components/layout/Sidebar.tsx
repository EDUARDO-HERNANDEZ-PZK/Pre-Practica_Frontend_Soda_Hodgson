import { Link } from "react-router-dom";
import React from "react";

const Sidebar: React.FC = () => {
  return (
    <aside
      className="
      w-full
      md:w-72
      md:min-h-screen
      bg-gradient-to-b
      from-slate-900
      to-slate-800
      text-white
      p-6
      shadow-2xl
      "
    >
      {/* LOGO */}

      <div className="mb-10">

        <h1 className="text-3xl font-extrabold tracking-wide">
          Soda
        </h1>

        <p className="text-cyan-400 text-lg font-semibold">
          Hodgson POS
        </p>

      </div>

      {/* MENU */}

      <nav className="flex flex-col gap-4">

        <Link
          to="/"
          className="
          bg-slate-800
          hover:bg-cyan-600
          p-4
          rounded-2xl
          transition-all
          duration-300
          font-semibold
          shadow-lg
          hover:translate-x-1
          "
        >
          📊 Dashboard
        </Link>

        <Link
          to="/pos"
          className="
          bg-slate-800
          hover:bg-cyan-600
          p-4
          rounded-2xl
          transition-all
          duration-300
          font-semibold
          shadow-lg
          hover:translate-x-1
          "
        >
          💳 Caja POS
        </Link>

        <Link
          to="/tables"
          className="
          bg-slate-800
          hover:bg-cyan-600
          p-4
          rounded-2xl
          transition-all
          duration-300
          font-semibold
          shadow-lg
          hover:translate-x-1
          "
        >
          🍽 Mesas
        </Link>

        <Link
          to="/products"
          className="
          bg-slate-800
          hover:bg-cyan-600
          p-4
          rounded-2xl
          transition-all
          duration-300
          font-semibold
          shadow-lg
          hover:translate-x-1
          "
        >
          🍔 Productos
        </Link>

        <Link
          to="/inventory"
          className="
          bg-slate-800
          hover:bg-cyan-600
          p-4
          rounded-2xl
          transition-all
          duration-300
          font-semibold
          shadow-lg
          hover:translate-x-1
          "
        >
          📦 Inventario
        </Link>

        <Link
          to="/users"
          className="
          bg-slate-800
          hover:bg-cyan-600
          p-4
          rounded-2xl
          transition-all
          duration-300
          font-semibold
          shadow-lg
          hover:translate-x-1
          "
        >
          👤 Usuarios
        </Link>

      </nav>

      {/* FOOTER */}

      <div className="mt-12 border-t border-slate-700 pt-6">

        <p className="text-sm text-slate-400">
          Sistema de Gestión
        </p>

        <p className="font-bold text-cyan-400">
          Versión 1.0
        </p>

      </div>

    </aside>
  );
};

export default Sidebar;