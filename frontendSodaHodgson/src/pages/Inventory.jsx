import { useState } from "react";

import Header from "../components/layout/Header";
import InventoryModal from "../components/layout/inventory/InventoryModal";

import {
  useProducts,
  useUpdateProduct,
} from "../hooks/useProducts";

import { useCategories } from "../hooks/useCategories";

import { getCategoryName } from "../utils/getCategoryName";

export default function Inventory() {

  const { data: productsData = [] } = useProducts();
  const { data: categories = [] } = useCategories();

  const updateProduct = useUpdateProduct();

  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const totalProducts = productsData.length;

  const totalStock = productsData.reduce(
(total, product) =>
total + Number(product.stock_current ?? 0),
0
);


const totalExpired = productsData.reduce(
(total, product) =>
total + Number(product.stock_expired ?? 0),
0
);


const totalDamaged = productsData.reduce(
(total, product) =>
total + Number(product.stock_damaged ?? 0),
0
);


const totalAvailable = productsData.reduce(
(total, product) => {


const current =
Number(product.stock_current ?? 0);


const expired =
Number(product.stock_expired ?? 0);


    const damaged =
    Number(product.stock_damaged ?? 0);

      return total + (
      current -
      expired -
      damaged
      );

      },
      0
  );

  const lowStock = productsData.filter((product) => {

    const available =
      product.stock_current -
      product.stock_expired -
      product.stock_damaged;

    return available <= product.stock_min;

  }).length;

  return (

    <div className="flex-1 bg-slate-50 min-h-screen p-8">

      <Header title="Inventario" />

      {/* ESTADÍSTICAS */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mt-8">

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
            Disponible
          </p>

          <h2 className="text-4xl font-bold mt-2 text-green-600">
            {totalAvailable}
          </h2>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <p className="text-slate-500">
            Vencidos
          </p>

          <h2 className="text-4xl font-bold mt-2 text-yellow-600">
            {totalExpired}
          </h2>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <p className="text-slate-500">
            Dañados
          </p>

          <h2 className="text-4xl font-bold mt-2 text-red-600">
            {totalDamaged}
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

        <table className="w-full min-w-[1200px]">

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

              <th className="p-4 text-center">
                Total
              </th>

              <th className="p-4 text-center">
                Disponible
              </th>

              <th className="p-4 text-center">
                Vencidos
              </th>

              <th className="p-4 text-center">
                Dañados
              </th>

              <th className="p-4 text-center">
                Estado
              </th>

              <th className="p-4 text-center">
                Acción
              </th>

            </tr>

          </thead>

          <tbody>

            {productsData.map((product) => {

              const available =
Number(product.stock_current ?? 0) -
Number(product.stock_expired ?? 0) -
Number(product.stock_damaged ?? 0);

              return (

                <tr
                  key={product.id}
                  className="border-t hover:bg-slate-50 transition"
                >

                  <td className="p-4">

                    <img
                      src={
                        product.imageUrl ||
                        "https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png"
                      }
                      alt={product.name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />

                  </td>

                  <td className="p-4 font-semibold">

                    {product.name}

                  </td>

                  <td className="p-4">

                    {getCategoryName(
                      product.category_id,
                      categories
                    )}

                  </td>

                  <td className="p-4 font-bold text-cyan-700">

                    C$ {product.price_sell}

                  </td>

                  <td className="p-4 text-center font-semibold">

                    {product.stock_current}

                  </td>

                  <td className="p-4 text-center font-bold text-green-600">

                    {available}

                  </td>

                  <td className="p-4 text-center font-bold text-yellow-600">

                    {product.stock_expired}

                  </td>

                  <td className="p-4 text-center font-bold text-red-600">

                    {product.stock_damaged}

                  </td>

                  <td className="p-4 text-center">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        available <= product.stock_min
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >

                      {available <= product.stock_min
                        ? "Stock Bajo"
                        : "Disponible"}

                    </span>

                  </td>

                  <td className="p-4 text-center">

                    <button
                      onClick={() => {

                        setSelectedProduct(product);
                        setOpenModal(true);

                      }}
                      className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-xl transition"
                    >

                      Editar

                    </button>

                  </td>

                </tr>

              );

            })}

          </tbody>

        </table>

      </div>
            <InventoryModal
        open={openModal}
        product={selectedProduct || undefined}
        onClose={() => {
          setOpenModal(false);
          setSelectedProduct(null);
        }}
        onSave={(id, data) => {

          updateProduct.mutate(
            {
              id,
              data,
            },
            {
              onSuccess: () => {

                setOpenModal(false);
                setSelectedProduct(null);

              },
            }
          );

        }}
      />

    </div>

  );

}