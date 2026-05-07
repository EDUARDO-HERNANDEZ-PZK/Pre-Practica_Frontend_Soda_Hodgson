import Header from "../components/layout/Header";

export default function Inventory() {
  return (
    <div className="p-8 w-full">

      <Header title="Inventario" />

      <div className="bg-white rounded-3xl shadow mt-6 p-6">

        <table className="w-full">

          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">Producto</th>
              <th className="p-4 text-left">Stock</th>
            </tr>
          </thead>

          <tbody>

            <tr className="border-t">
              <td className="p-4">Gaseosa Cola</td>
              <td className="p-4">45</td>
            </tr>

            <tr className="border-t">
              <td className="p-4">Papas Fritas</td>
              <td className="p-4">20</td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  )
}