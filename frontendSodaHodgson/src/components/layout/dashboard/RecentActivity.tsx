import {
  Receipt,
  CreditCard,
  UtensilsCrossed,
} from "lucide-react";

const activities = [
  {
    icon: <Receipt size={20} />,
    title: "Factura #105",
    subtitle: "Venta registrada correctamente",
  },
  {
    icon: <UtensilsCrossed size={20} />,
    title: "Mesa 4",
    subtitle: "Pedido actualizado",
  },
  {
    icon: <CreditCard size={20} />,
    title: "Caja",
    subtitle: "Caja abierta correctamente",
  },
];

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-7">

      <h2 className="text-2xl font-bold mb-6">
        📝 Actividad Reciente
      </h2>

      <div className="space-y-5">

        {activities.map((item, index) => (

          <div
            key={index}
            className="flex items-center gap-4"
          >

            <div className="w-12 h-12 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center">
              {item.icon}
            </div>

            <div>

              <h3 className="font-semibold">
                {item.title}
              </h3>

              <p className="text-slate-500 text-sm">
                {item.subtitle}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}