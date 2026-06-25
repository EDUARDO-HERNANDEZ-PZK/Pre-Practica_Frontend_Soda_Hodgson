import { Link } from "react-router-dom";
import React from "react";

const Sidebar: React.FC = () => {

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const ADMIN = "575201e5b377c1d2";
  const MESERO = "0c428135d40c483f";
  const CAJERO = "11668d17834b3deb";

  const isAdmin = user.role_id === ADMIN;
  const isMesero = user.role_id === MESERO;
  const isCajero = user.role_id === CAJERO;

  return (
    <aside
      className="
      w-full
      md:min-w-[15rem]
      md:max-w-[15rem]
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
        {/* dashboard solo el admin */}
        {(isAdmin || isCajero) && (
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
        )}

        {/* POS: Admin y Mesero */}
        {(isAdmin || isMesero) && (
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
        )}

        {/* Mesas: Admin, Mesero y Cajero */}
        {(isAdmin || isMesero || isCajero) && (
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
        )}

        {/* Productos: Admin y Cajero */}
        {(isAdmin || isCajero) && (
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
        )}
        {/* Inventario: Admin y Cajero */}
        {(isAdmin || isCajero) && (
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
        )}

        {/* Caja: solo Admin */}
        {(isAdmin || isMesero || isCajero) && (
          <Link
            to="/cash"
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
            💵 Caja
          </Link>
        )}
          {/* Historial de Ventas: Admin y Cajero */}
{(isAdmin || isCajero) && (
  <Link
    to="/sales-history"
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
    🧾 Historial de Ventas
  </Link>
)}

{/* Usuarios: solo Admin */}
{isAdmin && (
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
)}  
{/* Mi Perfil */}
<Link
  to="/profile"
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
  🙍 Mi Perfil
</Link>

      </nav>
      <button

        onClick={() => {

          localStorage.removeItem("user");

          window.location.href = "/login";

        }}

        className="
  mt-6
  bg-red-600
  hover:bg-red-700
  p-4
  rounded-2xl
  transition-all
  font-semibold
  shadow-lg
  w-full
  "

      >

        🚪 Cerrar Sesión

      </button>
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