import React from "react";
import {
  CheckCircle2,
  Database,
  User,
  Server,
} from "lucide-react";

interface UserInfo {
  username?: string;
}

interface Props {
  user: UserInfo;
}

export default function SystemStatus({ user }: Props) {
  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-7">

      <h2 className="text-2xl font-bold mb-6">
        🟢 Estado del Sistema
      </h2>

      <div className="space-y-5">

        <StatusItem
          icon={<Server size={20} />}
          label="Servidor"
          value="En línea"
        />

        <StatusItem
          icon={<Database size={20} />}
          label="Base de datos"
          value="Conectada"
        />

        <StatusItem
          icon={<User size={20} />}
          label="Usuario"
          value={user?.username || "Invitado"}
        />

        <StatusItem
          icon={<CheckCircle2 size={20} />}
          label="Versión"
          value="1.0.0"
        />

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
    <div className="flex justify-between items-center">

      <div className="flex items-center gap-3">

        <div className="text-cyan-600">
          {icon}
        </div>

        <span>{label}</span>

      </div>

      <span className="font-semibold text-emerald-600">
        {value}
      </span>

    </div>
  );
}