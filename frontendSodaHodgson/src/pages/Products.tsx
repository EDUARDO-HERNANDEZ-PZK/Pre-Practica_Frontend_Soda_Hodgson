import { useEffect, useState } from "react";
import ProductCard from "../components/layout/products/ProductCard";
import ProductModal from "../components/layout/products/ProductModal";
import { Product } from "../models/Product";
import { productsService } from "../api/products";

export default function Products() {

  const [products, setProducts] = useState<Product[]>([]);
  const [view, setView] = useState<"grid" | "table">("grid");

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const [search, setSearch] = useState("");

  const loadProducts = async () => {
    try {
      const data = await productsService.getAll();

      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const saveProduct = (product: any) => {

    if (editingProduct) {

      setProducts(
        products.map((item) =>
          item.id === product.id ? product : item
        )
      );

    } else {

      setProducts([
        ...products,
        {
          ...product,
          id: Date.now(),
        },
      ]);

    }

    setShowModal(false);
    setEditingProduct(null);

  };

  const deleteProduct = (id: string) => {

    if (!window.confirm("¿Eliminar este producto?")) return;

    setProducts(products.filter((item) => item.id !== id));

  };

  const editProduct = (product: any) => {

    setEditingProduct(product);
    setShowModal(true);

  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (

    <div className="flex-1 bg-slate-50 min-h-screen p-8">

      {/* HEADER */}

      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-8">

        <div>

          <h1 className="text-4xl font-bold text-slate-800">
            Productos
          </h1>

          <p className="text-slate-500">
            Administración del menú
          </p>

        </div>

        <div className="flex flex-wrap gap-3">

          <button
            onClick={() => setView("grid")}
            className={`px-5 py-3 rounded-2xl font-semibold transition ${view === "grid"
              ? "bg-cyan-600 text-white"
              : "bg-slate-200 text-slate-700"
              }`}
          >
            Tarjetas
          </button>

          <button
            onClick={() => setView("table")}
            className={`px-5 py-3 rounded-2xl font-semibold transition ${view === "table"
              ? "bg-cyan-600 text-white"
              : "bg-slate-200 text-slate-700"
              }`}
          >
            Tabla
          </button>

          <button
            onClick={() => {

              setEditingProduct(null);
              setShowModal(true);

            }}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg transition"
          >
            Nuevo Producto
          </button>

        </div>

      </div>

      {/* CONTENEDOR */}

      <div className="bg-white rounded-3xl shadow-lg p-6">

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar producto..."
          className="
            w-full
            border
            border-slate-200
            rounded-2xl
            p-4
            mb-8
            outline-none
            focus:ring-2
            focus:ring-cyan-500
          "
        />

        {

          view === "grid" ? (

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              {

                filteredProducts.map((product) => (

                  <ProductCard

                    key={product.id}

                    product={product}

                    onEdit={() => editProduct(product)}

                    onDelete={() => deleteProduct(product.id)}

                  />

                ))

              }

            </div>

          ) : (

            <div className="overflow-auto">

              <table className="w-full">

                <thead className="bg-slate-100">

                  <tr>

                    <th className="p-4 text-left">Imagen</th>
                    <th className="p-4 text-left">Producto</th>
                    <th className="p-4 text-left">Categoría</th>
                    <th className="p-4 text-left">Precio</th>
                    <th className="p-4 text-left">Stock</th>
                    <th className="p-4 text-left">Acciones</th>

                  </tr>

                </thead>

                <tbody>

                  {

                    filteredProducts.map((product) => (

                      <tr
                        key={product.id}
                        className="border-t hover:bg-slate-50"
                      >

                        <td className="p-4">

                          <img
                            src={product.imageUrl}
                            className="w-16 h-16 rounded-xl object-cover"
                          />

                        </td>

                        <td className="p-4 font-semibold">
                          {product.name}
                        </td>

                        <td className="p-4">
                          {product.category_id}
                        </td>

                        <td className="p-4 text-cyan-700 font-bold">
                          C$ {product.price_sell}
                        </td>

                        <td className="p-4">
                          {product.stock_current}
                        </td>

                        <td className="p-4 flex gap-2">

                          <button
                            onClick={() => editProduct(product)}
                            className="bg-cyan-600 text-white px-4 py-2 rounded-xl"
                          >
                            Editar
                          </button>

                          <button
                            onClick={() => deleteProduct(product.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded-xl"
                          >
                            Eliminar
                          </button>

                        </td>

                      </tr>

                    ))

                  }

                </tbody>

              </table>

            </div>

          )

        }

      </div>
      <ProductModal
        open={showModal}
        product={editingProduct}
        onClose={() => {
          setShowModal(false);
          setEditingProduct(null);
        }}
        onSave={saveProduct}
      />

    </div>

  );

}