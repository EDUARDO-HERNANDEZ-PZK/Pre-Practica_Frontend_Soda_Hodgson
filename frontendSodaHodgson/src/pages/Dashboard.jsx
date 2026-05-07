export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-100 p-8">

      {/* HEADER */}
      <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl">
        <h1 className="text-4xl font-bold">
          Sistema Soda Hodgson
        </h1>

        <p className="text-slate-300 mt-2">
          Dashboard administrativo
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">

        <div className="bg-white p-5 rounded-3xl shadow">
          <p className="text-slate-500">Ventas Hoy</p>
          <h2 className="text-3xl font-bold mt-2">
            C$ 5,200
          </h2>
        </div>

        <div className="bg-white p-5 rounded-3xl shadow">
          <p className="text-slate-500">Facturas</p>
          <h2 className="text-3xl font-bold mt-2">
            25
          </h2>
        </div>

        <div className="bg-white p-5 rounded-3xl shadow">
          <p className="text-slate-500">Productos</p>
          <h2 className="text-3xl font-bold mt-2">
            140
          </h2>
        </div>

        <div className="bg-white p-5 rounded-3xl shadow">
          <p className="text-slate-500">Usuarios</p>
          <h2 className="text-3xl font-bold mt-2">
            5
          </h2>
        </div>

      </div>

      {/* POS CARD */}
      <div className="bg-white rounded-3xl shadow mt-8 p-6">

        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold">
              Caja Registradora
            </h2>

            <p className="text-slate-500">
              Punto de venta
            </p>
          </div>

          <button className="bg-blue-600 text-white px-5 py-3 rounded-2xl font-semibold hover:bg-blue-700 transition">
            Nueva Venta
          </button>
        </div>

        {/* SEARCH */}
        <input
          placeholder="Buscar producto o escanear código..."
          className="w-full border border-slate-300 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* TABLE */}
        <div className="overflow-auto mt-6 rounded-2xl border border-slate-200">

          <table className="w-full">

            <thead className="bg-slate-100">
              <tr>
                <th className="text-left p-4">Producto</th>
                <th className="text-left p-4">Cantidad</th>
                <th className="text-left p-4">Precio</th>
                <th className="text-left p-4">Subtotal</th>
              </tr>
            </thead>

            <tbody>

              <tr className="border-t border-slate-100">
                <td className="p-4 font-medium">
                  Gaseosa Cola
                </td>

                <td className="p-4">
                  2
                </td>

                <td className="p-4">
                  C$ 25
                </td>

                <td className="p-4 font-semibold">
                  C$ 50
                </td>
              </tr>

              <tr className="border-t border-slate-100">
                <td className="p-4 font-medium">
                  Papas Fritas
                </td>

                <td className="p-4">
                  3
                </td>

                <td className="p-4">
                  C$ 20
                </td>

                <td className="p-4 font-semibold">
                  C$ 60
                </td>
              </tr>

            </tbody>

          </table>

        </div>

        {/* TOTAL */}
        <div className="bg-slate-100 rounded-3xl p-6 mt-6 flex items-center justify-between">

          <div>
            <p className="text-slate-500">
              TOTAL
            </p>

            <h2 className="text-4xl font-bold">
              C$ 110
            </h2>
          </div>

          <button className="bg-green-600 text-white px-6 py-4 rounded-2xl font-bold hover:bg-green-700 transition">
            Cobrar
          </button>

        </div>

      </div>

    </div>
  )
}