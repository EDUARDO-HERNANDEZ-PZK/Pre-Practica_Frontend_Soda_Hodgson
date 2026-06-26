import React from "react";
import {
  Database,
  Package,
  Receipt,
  User,
  UtensilsCrossed,
  CheckCircle2,
} from "lucide-react";

interface UserInfo {
  username?: string;
}

interface Props {
  user: UserInfo;
  tables: number;
  products: number;
  sales: number;
}

export default function SystemStatus({
  user,
  tables,
  products,
  sales,
}: Props) {
  return (
    <div
      className="
      bg-white
      rounded-3xl
      shadow-xl
      border
      border-slate-200
      p-7
      relative
      overflow-hidden
      "
    >
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative z-10">

        <h2 className="text-2xl font-bold mb-6">
          🟢 Estado del Sistema
        </h2>

        <div className="space-y-5">

          <StatusItem
            icon={<User size={20} />}
            label="Usuario"
            value={user?.username || "Invitado"}
          />

          <StatusItem
            icon={<Receipt size={20} />}
            label="Facturas"
            value={sales.toString()}
          />

          <StatusItem
            icon={<UtensilsCrossed size={20} />}
            label="Mesas"
            value={tables.toString()}
          />

          <StatusItem
            icon={<Package size={20} />}
            label="Productos"
            value={products.toString()}
          />

          <StatusItem
            icon={<Database size={20} />}
            label="Base de datos"
            value="Conectada"
          />

          <StatusItem
            icon={<CheckCircle2 size={20} />}
            label="Sistema"
            value="Operativo"
          />

        </div>

      </div>
    </div>
  );
}

interface StatusItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function StatusItem({
  icon,
  label,
  value,
}: StatusItemProps) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 pb-3">

      <div className="flex items-center gap-3">

        <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center">
          {icon}
        </div>

        <span className="font-medium text-slate-700">
          {label}
        </span>

      </div>

      <span className="font-bold text-emerald-600">
        {value}
      </span>

    </div>
  );
}