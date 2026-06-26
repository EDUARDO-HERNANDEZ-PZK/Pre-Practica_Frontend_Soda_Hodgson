import { Link } from "react-router-dom";
import {
  CreditCard,
  ShoppingBag,
  UtensilsCrossed,
  Package,
  ArrowRight,
} from "lucide-react";

const actions = [
  {
    title: "Nueva Venta",
    subtitle: "Crear una nueva factura",
    icon: <CreditCard size={34} />,
    to: "/pos",
    color: "from-cyan-500 to-blue-700",
  },
  {
    title: "Para Llevar",
    subtitle: "Pedidos rápidos",
    icon: <ShoppingBag size={34} />,
    to: "/pos",
    color: "from-emerald-500 to-green-700",
  },
  {
    title: "Mesas",
    subtitle: "Administrar mesas",
    icon: <UtensilsCrossed size={34} />,
    to: "/tables",
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Productos",
    subtitle: "Gestionar inventario",
    icon: <Package size={34} />,
    to: "/products",
    color: "from-violet-500 to-purple-700",
  },
];

export default function QuickActions() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-3xl font-black text-slate-800">
            ⚡ Acciones Rápidas
          </h2>

          <p className="text-slate-500 mt-2">
            Accede rápidamente a las funciones principales.
          </p>

        </div>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        {actions.map((action) => (

          <Link
            key={action.title}
            to={action.to}
            className="
            group
            relative
            overflow-hidden
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-6
            shadow-lg
            hover:-translate-y-2
            hover:shadow-2xl
            transition-all
            duration-500
            "
          >

            {/* Brillo */}

            <div
              className="
              absolute
              -top-10
              -right-10
              w-32
              h-32
              rounded-full
              bg-cyan-500/10
              blur-3xl
              "
            />

            <div className="relative z-10">

              <div
                className={`
                w-16
                h-16
                rounded-2xl
                bg-gradient-to-br
                ${action.color}
                text-white
                flex
                items-center
                justify-center
                shadow-lg
                `}
              >
                {action.icon}
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-800">
                {action.title}
              </h3>

              <p className="text-slate-500 mt-2 text-sm">
                {action.subtitle}
              </p>

              <div className="flex items-center gap-2 mt-6 text-cyan-600 font-semibold">

                <span>Abrir</span>

                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition"
                />

              </div>

            </div>

          </Link>

        ))}

      </div>

    </div>
  );
}