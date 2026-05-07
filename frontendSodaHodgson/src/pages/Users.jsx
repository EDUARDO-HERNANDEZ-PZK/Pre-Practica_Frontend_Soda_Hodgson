import Header from "../components/layout/Header";

export default function Users() {
  return (
    <div className="p-8 w-full">

      <Header title="Usuarios y Roles" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

        <div className="bg-white rounded-3xl shadow p-6">
          <h2 className="text-2xl font-bold">
            Eduardo
          </h2>

          <p className="text-slate-500 mt-2">
            Administrador
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow p-6">
          <h2 className="text-2xl font-bold">
            Fernando
          </h2>

          <p className="text-slate-500 mt-2">
            Cajero
          </p>
        </div>

      </div>

    </div>
  )
}