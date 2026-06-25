import React from "react";
import { ShieldCheck, Wifi } from "lucide-react";

const LoginBg = new URL(
  "../../../assets/login/login-bg.png",
  import.meta.url
).href;

interface Props {
  currentTime: Date;
}

const LoginLeftPanel: React.FC<Props> = ({ currentTime }) => {
  return (
    <div
      className="
      hidden
      lg:flex
      relative
      overflow-hidden
      text-white
      "
    >
      {/* Imagen */}
      <img
        src={LoginBg}
        alt="Soda Hodgson"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Oscurecedor */}
      <div className="absolute inset-0 bg-slate-950/70" />

      {/* Brillos */}
      <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl -top-20 -left-20" />

      <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -bottom-20 -right-20" />

      <div
        className="
        relative
        z-10
        flex
        flex-col
        justify-between
        h-full
        w-full
        p-12
        "
      >
        {/* Parte superior */}

        <div>

          <h1 className="text-6xl font-black tracking-wide drop-shadow-lg">
            Soda Hodgson
          </h1>

          <p className="text-cyan-300 text-2xl mt-4 font-semibold">
            Sistema de Gestión POS
          </p>

          <p className="mt-10 text-xl leading-9 text-slate-200 max-w-md">
            Administra ventas, inventario,
            usuarios y mesas desde un solo lugar.
          </p>

        </div>

        {/* Tarjeta */}

        <div
          className="
          backdrop-blur-xl
          bg-white/10
          border
          border-white/20
          rounded-3xl
          p-7
          shadow-2xl
          hover:scale-[1.02]
          transition-all
          duration-500
          "
        >

          <div className="flex items-start gap-5">

            <div
              className="
              w-14
              h-14
              rounded-2xl
              bg-green-500/20
              flex
              items-center
              justify-center
              "
            >

              <ShieldCheck
                size={28}
                className="text-green-400"
              />

            </div>

            <div className="flex-1">

              <h3 className="text-2xl font-bold">
                Sistema Seguro
              </h3>

              <div className="flex items-center gap-3 mt-4">

                <Wifi
                  size={18}
                  className="text-green-400"
                />

                <span className="text-green-300 font-semibold">
                  Sistema en línea
                </span>

              </div>

              <p className="text-slate-300 mt-3">
                Conexión protegida y acceso seguro.
              </p>

            </div>

          </div>

        </div>

        {/* Fecha */}

        <div>

          <div className="w-24 h-[2px] bg-cyan-400 mb-6" />

          <p className="text-slate-300 text-lg">

            {currentTime.toLocaleDateString("es-NI", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}

          </p>

          <p className="text-5xl font-black mt-3">

            {currentTime.toLocaleTimeString("es-NI", {
              hour12: false,
            })}

          </p>

          <p className="text-slate-400 mt-4">
            Versión 1.0 • Soda Hodgson POS
          </p>

        </div>

      </div>

    </div>
  );
};

export default LoginLeftPanel;