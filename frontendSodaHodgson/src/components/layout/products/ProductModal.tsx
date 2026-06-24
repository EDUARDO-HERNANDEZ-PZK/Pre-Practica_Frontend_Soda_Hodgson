import { useState, useEffect } from "react";
import { CreateProductDto, Product, UpdateProductDto } from "../../../models/Product";
import { useCategories } from "../../../hooks/useCategories";
interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (product: CreateProductDto) => void;
  onEditProduct: (id: string, product: UpdateProductDto) => void;
  product?: Product;
}

export default function ProductModal({
  open,
  onClose,
  onSave,
  onEditProduct,
  product,
}: Props) {

  const { data: categories = [] } = useCategories();

  const initialForm: CreateProductDto = {
    name: "",
    description: "Disponible",
    category_id: "",
    unit_id: "",
    price_sell: 0,
    stock_current: 0,
    stock_expired: 0,
    stock_damaged: 0,
    stock_min: 0,
  };

  const [form, setForm] = useState<CreateProductDto>(initialForm);

  const stockAvailable = Math.max(
    0,
    form.stock_current -
    form.stock_expired -
    form.stock_damaged
  );

  const isFormValid =
    form.name.trim() !== "" &&
    form.category_id !== "" &&
    form.price_sell > 0 &&
    form.stock_current > 0 &&
    form.stock_min > 0 &&
    (form.stock_expired + form.stock_damaged <= form.stock_current);
  const resetForm = () => {
    setForm(initialForm);
  };

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        description: product.description,
        category_id: product.category_id,
        unit_id: product.unit_id,
        price_sell: product.price_sell,
        stock_current: product.stock_current,
        stock_expired: product.stock_expired,
        stock_damaged: product.stock_damaged,
        stock_min: product.stock_min,
      });
    } else {
      resetForm();
    }
  }, [product]);


  if (!open) return null;

  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div
        className="bg-white
    rounded-3xl
    w-full
    max-w-xl
    mx-4
    p-8
    shadow-2xl
    max-h-[85vh]
    overflow-y-auto"
      >

        <h2 className="text-3xl font-bold mb-6">

          {product ? "Editar Producto" : "Nuevo Producto"}

        </h2>

        <div className="space-y-4">
          <label className="block mb-2 font-medium">
            Nombre
          </label>
          <input
            placeholder="Nombre"
            value={form.name || ""}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="w-full border rounded-xl p-3"
          />

          {/* <input
            placeholder="URL Imagen"
            value={form.image}
            onChange={(e) =>
              setForm({
                ...form,
                image: e.target.value,
              })
            }
            className="w-full border rounded-xl p-3"
          /> */}

          <label className="block mb-2 font-medium">
            Categoria
          </label>

          <select
            value={form.category_id || ""}
            onChange={(e) =>
              setForm({
                ...form,
                category_id: e.target.value,
              })
            }
            className="w-full border rounded-xl p-3"
          >
            <option value="">Seleccione una categoría</option>

            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>

          <label className="block mb-2 font-medium">
            Precio de venta
          </label>
          <input
            type="number"
            placeholder="Precio"
            value={form.price_sell || ""}
            onChange={(e) =>
              setForm({
                ...form,
                price_sell: e.target.valueAsNumber || 0,
              })
            }
            className="w-full border rounded-xl p-3"
          />
          <label className="block mb-2 font-medium">
            Stock total
          </label>
          <input
            type="number"
            placeholder="Stock total"
            value={form.stock_current || ""}
            onChange={(e) =>
              setForm({
                ...form,
                stock_current: e.target.valueAsNumber || 0,
              })
            }
            className="w-full border rounded-xl p-3"
          />

          <label className="block mb-2 font-medium">
            Productos vencidos
          </label>

          <input
            type="number"
            placeholder="Productos vencidos"
            value={form.stock_expired || ""}
            onChange={(e) =>
              setForm({
                ...form,
                stock_expired: e.target.valueAsNumber || 0,
              })
            }
            className="w-full border rounded-xl p-3"
          />

          <label className="block mb-2 font-medium">
            Productos dañados
          </label>

          <input
            type="number"
            placeholder="Productos dañados"
            value={form.stock_damaged || ""}
            onChange={(e) =>
              setForm({
                ...form,
                stock_damaged: e.target.valueAsNumber || 0,
              })
            }
            className="w-full border rounded-xl p-3"
          />
          <div className="bg-cyan-50 border border-cyan-200 rounded-2xl p-5">

            <p className="text-slate-500 text-sm">
              Stock disponible
            </p>

            <h2 className="text-4xl font-bold text-cyan-700 mt-2">
              {stockAvailable}
            </h2>

          </div>
          <label className="block mb-2 font-medium">
            Stock minimo
          </label>
          <input
            type="number"
            placeholder="Stock minimo"
            value={form.stock_min || ""}
            onFocus={(e) => {
              if (e.target.value === "0") {
                e.target.select();
              }
            }}
            onChange={(e) =>
              setForm({
                ...form,
                stock_min: e.target.valueAsNumber || 0,
              })
            }
            className="w-full border rounded-xl p-3"
          />

        </div>

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="bg-slate-300 px-5 py-3 rounded-xl"
          >
            Cancelar
          </button>

          <button
            onClick={() => {

              if (!form.name.trim()) {
                alert("Debe ingresar el nombre del producto");
                return;
              }

              if (!form.category_id) {
                alert("Debe seleccionar una categoría");
                return;
              }

              if (form.price_sell <= 0) {
                alert("Debe ingresar un precio válido");
                return;
              }

              if (form.stock_current <= 0) {
                alert("Debe ingresar el stock total");
                return;
              }

              if (form.stock_min <= 0) {
                alert("Debe ingresar el stock mínimo");
                return;
              }

              if (
                form.stock_expired +
                form.stock_damaged >
                form.stock_current
              ) {
                alert(
                  "Los productos vencidos y dañados no pueden ser mayores al stock total"
                );
                return;
              }

              if (product) {
                onEditProduct(product.id, form);
              } else {
                onSave(form);
              }

              resetForm();
              onClose();
            }}
            className={`px-5 py-3 rounded-xl text-white font-semibold transition ${isFormValid
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-400 cursor-not-allowed"
              }`}
            disabled={!isFormValid}
          >
            Guardar
          </button>

        </div>

      </div>

    </div>

  );

}