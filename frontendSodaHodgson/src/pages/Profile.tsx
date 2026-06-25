import React from "react";

const Profile: React.FC = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const roleName =
  user.role_id === "575201e5b377c1d2"
    ? "Administrador"
    : user.role_id === "11668d17834b3deb"
    ? "Cajero"
    : user.role_id === "0c428135d40c483f"
    ? "Mesero"
    : "Desconocido";

const initial =
  (user.name || user.username || "U")
    .charAt(0)
    .toUpperCase();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-2xl shadow-lg p-8">

        <div className="flex items-center gap-6">

          <div className="w-24 h-24 rounded-full bg-cyan-600 flex items-center justify-center text-white text-4xl font-bold">
            {initial}
          </div>

          <div>

  <h1 className="text-3xl font-bold text-slate-800">
    {user.name || user.username}
  </h1>

  <p className="text-gray-500">
    {roleName}
  </p>

  <span
    className="
      inline-block
      mt-2
      bg-green-100
      text-green-700
      px-3
      py-1
      rounded-full
      text-sm
      font-semibold
    "
  >
    ● Sesión Activa
  </span>

</div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

          <div>
            <label className="text-sm text-gray-500">
              Nombre
            </label>

            <div className="mt-2 p-4 rounded-xl bg-gray-100">
              {user.name || "No disponible"}
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-500">
              Usuario
            </label>

            <div className="mt-2 p-4 rounded-xl bg-gray-100">
              {user.username || "No disponible"}
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-500">
              Correo
            </label>

            <div className="mt-2 p-4 rounded-xl bg-gray-100">
              {user.email || "No disponible"}
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-500">
              Rol
            </label>

            <div className="mt-2 p-4 rounded-xl bg-gray-100">
              {roleName}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;