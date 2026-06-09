import Header from "../components/layout/Header";
import { useProducts} from "../hooks/useProducts";
import { useCategories} from "../hooks/useCategories";
import { getCategoryName } from "../utils/getCategoryName";

export default function Inventory() {
  const { data: productsData = [] } = useProducts();
  const { data: categories = [] } = useCategories();

  const totalStock = productsData.reduce(
    (total, product) => total + product.stock_current,
    0
  );

  const totalProducts = productsData.length;

  const lowStock = productsData.filter(
    (product) => product.stock_current <= 20
  ).length;

  return (

    <div className="flex-1 bg-slate-50 min-h-screen p-8">

      <Header title="Inventario" />

      {/* ESTADÍSTICAS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <p className="text-slate-500">
            Productos
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {totalProducts}
          </h2>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <p className="text-slate-500">
            Stock Total
          </p>

          <h2 className="text-4xl font-bold mt-2 text-cyan-700">
            {totalStock}
          </h2>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <p className="text-slate-500">
            Stock Bajo
          </p>

          <h2 className="text-4xl font-bold mt-2 text-red-500">
            {lowStock}
          </h2>

        </div>

      </div>

      {/* TABLA */}

      <div className="bg-white rounded-3xl shadow-lg mt-8 p-6 overflow-auto">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4 text-left">
                Imagen
              </th>

              <th className="p-4 text-left">
                Producto
              </th>

              <th className="p-4 text-left">
                Categoría
              </th>

              <th className="p-4 text-left">
                Precio
              </th>

              <th className="p-4 text-left">
                Stock
              </th>

              <th className="p-4 text-left">
                Estado
              </th>

            </tr>

          </thead>

          <tbody>

            {productsData.map((product) => (

              <tr
                key={product.id}
                className="border-t hover:bg-slate-50 transition"
              >

                <td className="p-4">

                  <img
                    src={product.imageUrl || "https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png"}
                    alt={product.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />

                </td>

                <td className="p-4 font-semibold">

                  {product.name}

                </td>

                <td className="p-4">

                  {getCategoryName(product.category_id, categories)}

                </td>

                <td className="p-4 font-bold text-cyan-700">

                  C$ {product.price_sell}

                </td>

                <td className="p-4 font-semibold">

                  {product.stock_current}

                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      product.stock_current <= 20
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {product.stock_current <= 20
                      ? "Stock Bajo"
                      : "Disponible"}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}