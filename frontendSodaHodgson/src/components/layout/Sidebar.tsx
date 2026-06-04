import { Link } from "react-router-dom";
import React from "react";

const Sidebar: React.FC = () => {
  return (
    <div className="
w-full
md:w-72
min-h-auto
md:min-h-screen
bg-slate-900
text-white
p-6
">
      <h1 className="text-3xl font-bold mb-10">
        Soda Hodgson
      </h1>

      <nav className="space-y-4">

        <Link
          to="/"
          className="
block
bg-slate-800
hover:bg-cyan-500
transition-all
duration-300
p-4
rounded-2xl
font-semibold
shadow-lg
hover:scale-105
"
        >
          Dashboard
        </Link>

        <Link
          to="/tables"
        className="
block
bg-slate-800
hover:bg-cyan-500
transition-all
duration-300
p-4
rounded-2xl
font-semibold
shadow-lg
hover:scale-105
"
        >
          Mesas
        </Link>

        <Link
          to="/pos"
          className="
block
bg-slate-800
hover:bg-cyan-500
transition-all
duration-300
p-4
rounded-2xl
font-semibold
shadow-lg
hover:scale-105
"
        >
          Caja POS
        </Link>

        <Link
          to="/inventory"
         className="
block
bg-slate-800
hover:bg-cyan-500
transition-all
duration-300
p-4
rounded-2xl
font-semibold
shadow-lg
hover:scale-105
"
        >
          Inventario
        </Link>

        <Link
          to="/users"
          className="
block
bg-slate-800
hover:bg-cyan-500
transition-all
duration-300
p-4
rounded-2xl
font-semibold
shadow-lg
hover:scale-105
"
        >
          Usuarios
        </Link>

      </nav>
    </div>
  );
};

export default Sidebar;