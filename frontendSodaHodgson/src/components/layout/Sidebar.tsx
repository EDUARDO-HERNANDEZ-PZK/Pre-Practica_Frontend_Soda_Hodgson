import React from "react";
import { Link, useLocation } from "react-router-dom";

import {
  LayoutDashboard,
  ShoppingCart,
  UtensilsCrossed,
  Package,
  Boxes,
  Wallet,
  Receipt,
  Users,
  UserCircle,
  LogOut,
  Store,
} from "lucide-react";

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

  const location = useLocation();

const roleName =
  isAdmin
    ? "Administrador"
    : isMesero
    ? "Mesero"
    : "Cajero";

const initial =
  user.username?.charAt(0).toUpperCase() || "U";

  const MenuItem = ({
  to,
  icon,
  text,
}: {
  to: string;
  icon: React.ReactNode;
  text: string;
}) => (
  <Link
    to={to}
    className={`
      flex
      items-center
      gap-4
      p-4
      rounded-2xl
      transition-all
      duration-300
      font-medium

      ${
        location.pathname === to
          ? "bg-gradient-to-r from-cyan-600 to-blue-700 shadow-lg text-white"
          : "hover:bg-white/10 text-slate-200"
      }
    `}
  >
    {icon}
    <span>{text}</span>
  </Link>
);

  return (
    <aside
  className="
    w-full
    md:w-[300px]
    md:min-h-screen
    bg-gradient-to-b
    from-slate-950
    via-slate-900
    to-cyan-950
    text-white
    p-6
    flex
    flex-col
    border-r
    border-cyan-500/20
    shadow-2xl
    relative
    overflow-hidden
  "
>
      {/* LOGO */}

      <div className="mb-10">

  <div className="flex items-center gap-4">

    <div
      className="
      w-16
      h-16
      rounded-2xl
      bg-gradient-to-br
      from-cyan-500
      to-blue-700
      flex
      items-center
      justify-center
      shadow-xl
      "
    >
      <Store size={34} />
    </div>

    <div>

      <h1 className="text-3xl font-black">
        Soda
      </h1>

      <p className="text-cyan-400 font-semibold">
        Hodgson POS
      </p>

    </div>

  </div>

</div>

      {/* MENU */}

      <nav className="flex flex-col gap-4">
        {/* dashboard solo el admin */}
        {(isAdmin || isCajero) && (
  <MenuItem
    to="/"
    icon={<LayoutDashboard size={22} />}
    text="Dashboard"
  />
)}

        {/* POS: Admin y Mesero */}
        {(isAdmin || isMesero) && (
  <MenuItem
    to="/pos"
    icon={<ShoppingCart size={22} />}
    text="Punto de Venta"
  />
)}

        {/* Mesas: Admin, Mesero y Cajero */}
        {(isAdmin || isMesero || isCajero) && (
  <MenuItem
    to="/tables"
    icon={<UtensilsCrossed size={22} />}
    text="Mesas"
  />
)}

        {/* Productos: Admin y Cajero */}
        {(isAdmin || isCajero) && (
  <MenuItem
    to="/products"
    icon={<Package size={22} />}
    text="Productos"
  />
)}

        {/* Inventario: Admin y Cajero */}
        {(isAdmin || isCajero) && (
  <MenuItem
    to="/inventory"
    icon={<Boxes size={22} />}
    text="Inventario"
  />
)}

        {/* Caja: solo Admin */}
        {(isAdmin || isMesero || isCajero) && (
  <MenuItem
    to="/cash"
    icon={<Wallet size={22} />}
    text="Caja"
  />
)}

        {/* Historial de Ventas: Admin y Cajero */}
        {(isAdmin || isCajero) && (
  <MenuItem
    to="/sales-history"
    icon={<Receipt size={22} />}
    text="Historial"
  />
)}

        {/* Usuarios: solo Admin */}
       {isAdmin && (
  <MenuItem
    to="/users"
    icon={<Users size={22} />}
    text="Usuarios"
  />
)}

{/* Mi Perfil */}
<MenuItem
  to="/profile"
  icon={<UserCircle size={22} />}
  text="Mi Perfil"
/>
<div
  className="
    mt-auto
    mb-6
    rounded-3xl
    bg-white/5
    border
    border-cyan-500/20
    backdrop-blur-xl
    p-5
    shadow-xl
  "
>

  <div className="flex items-center gap-4">

    <div
      className="
        w-16
        h-16
        rounded-full
        bg-gradient-to-br
        from-cyan-500
        to-blue-700
        flex
        items-center
        justify-center
        text-2xl
        font-bold
      "
    >
      {initial}
    </div>

    <div>

      <h3 className="font-bold text-lg">
        {user.username}
      </h3>

      <p className="text-slate-400 text-sm">
        {roleName}
      </p>

      <div className="flex items-center gap-2 mt-2">

        <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"/>

        <span className="text-green-400 text-sm font-medium">
          Sistema en línea
        </span>

      </div>

    </div>

  </div>

</div>
      </nav>
      <button
  onClick={() => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  }}
  className="
    flex
    items-center
    justify-center
    gap-3
    w-full
    py-4
    rounded-2xl
    bg-gradient-to-r
    from-red-600
    to-red-700
    hover:from-red-700
    hover:to-red-800
    transition-all
    duration-300
    shadow-xl
    font-semibold
  "
>

  <LogOut size={20} />

  Cerrar sesión

</button>
      {/* FOOTER */} 

      <div className="mt-8 text-center">

  <div className="w-full h-px bg-slate-700 mb-4"/>

  <p className="text-slate-400 text-sm">
    Versión 1.0.0
  </p>

  <p className="text-cyan-400 font-semibold mt-1">
    © Soda Hodgson POS
  </p>

</div>
    </aside>
  );
};

export default Sidebar;