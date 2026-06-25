import React from "react";
import {
  CalendarDays,
  Clock3,
  Sun,
} from "lucide-react";

interface Props {
  user: any;
}

const DashboardHeader: React.FC<Props> = ({ user }) => {
  const now = new Date();

  const hour = now.getHours();

  const greeting =
    hour < 12
      ? "Buenos días"
      : hour < 18
      ? "Buenas tardes"
      : "Buenas noches";

  return (
    <div
      className="
      rounded-[30px]
      bg-gradient-to-r
      from-slate-900
      via-slate-800
      to-cyan-800
      text-white
      p-8
      shadow-2xl
      relative
      overflow-hidden
      "
    >
      {/* Brillos */}

      <div className="absolute w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full -top-20 -left-20"/>

      <div className="absolute w-72 h-72 bg-blue-500/20 blur-3xl rounded-full -bottom-20 -right-20"/>

      <div
        className="
        relative
        z-10
        flex
        justify-between
        items-center
        flex-wrap
        gap-8
        "
      >

        <div>

          <div className="flex items-center gap-3">

  <Sun
    size={34}
    className="text-yellow-400"
  />

  <h1 className="text-5xl font-black">
    {greeting}, {user.username}
  </h1>

</div>

          <p className="mt-4 text-cyan-300 text-xl">

            Bienvenido nuevamente al sistema POS.

          </p>

        </div>

        <div
          className="
          bg-white/10
          backdrop-blur-xl
          rounded-3xl
          border
          border-white/20
          p-6
          min-w-[260px]
          "
        >

          <div className="flex items-center gap-3">

            <CalendarDays
              size={22}
              className="text-cyan-300"
            />

            <span>

              {now.toLocaleDateString("es-NI", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}

            </span>

          </div>

          <div className="flex items-center gap-3 mt-4">

            <Clock3
              size={22}
              className="text-cyan-300"
            />

            <span className="text-2xl font-bold">

              {now.toLocaleTimeString("es-NI", {
                hour12: false,
              })}

            </span>

          </div>

        </div>

      </div>

    </div>
  );
};

export default DashboardHeader;