import React from "react";
import { TrendingUp } from "lucide-react";

interface Props {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  color: string;
}

export default function StatCard({
  icon,
  title,
  value,
  color,
}: Props) {
  return (
    <div
      className="
      relative
      overflow-hidden
      rounded-3xl
      bg-white
      p-6
      shadow-xl
      border
      border-slate-200
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
        w-40
        h-40
        rounded-full
        bg-cyan-400/10
        blur-3xl
        "
      />

      <div className="relative z-10">

        {/* Icono */}

        <div
          className={`
          w-16
          h-16
          rounded-2xl
          bg-gradient-to-br
          ${color}
          text-white
          flex
          items-center
          justify-center
          shadow-lg
          `}
        >
          {icon}
        </div>

        {/* Título */}

        <p className="mt-6 text-slate-500 font-semibold">
          {title}
        </p>

        {/* Valor */}

        <h2 className="text-4xl font-black text-slate-800 mt-2">
          {value}
        </h2>

        {/* Indicador */}

        <div className="flex items-center gap-2 mt-5">

          <TrendingUp
            size={18}
            className="text-green-500"
          />

          <span className="text-green-600 font-semibold text-sm">
            Actualizado
          </span>

        </div>

      </div>

    </div>
  );
}