import { useState, useEffect } from "react";
import { CreateProductDto, Product, UpdateProductDto } from "../../../models/Product";
import Categories from "../../../models/Categories";

const mockupCategory: Categories[] = [
  {
    id: "b1cc31976cc6c93d",
    name: "frutas"
  }
];
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

  const initialForm: CreateProductDto = {
    name: "",
    description: "",
    category_id: "",
    unit_id: "",
    price_sell: 0,
    stock_current: 0,
    stock_min: 0,
  };

  const [form, setForm] = useState<CreateProductDto>(initialForm);

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
            value={form.name}
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
            value={form.category_id}
            onChange={(e) =>
              setForm({
                ...form,
                category_id: e.target.value,
              })
            }
            className="w-full border rounded-xl p-3"
          >
            <option value="">Seleccione una categoría</option>

            {mockupCategory.map((category) => (
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
            value={form.price_sell}
            onChange={(e) =>
              setForm({
                ...form,
                price_sell: e.target.valueAsNumber,
              })
            }
            className="w-full border rounded-xl p-3"
          />
          <label className="block mb-2 font-medium">
            Stock actual
          </label>
          <input
            type="number"
            placeholder="Stock actual"
            value={form.stock_current}
            onChange={(e) =>
              setForm({
                ...form,
                stock_current: e.target.valueAsNumber,
              })
            }
            className="w-full border rounded-xl p-3"
          />

          <label className="block mb-2 font-medium">
            Stock minimo
          </label>
          <input
            type="number"
            placeholder="Stock minimo"
            value={form.stock_min}
            onChange={(e) =>
              setForm({
                ...form,
                stock_min: e.target.valueAsNumber,
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
              if (product) {
                onEditProduct(product.id, form);
              } else {
                onSave(form);
              }

              resetForm();
              onClose();
            }}
            className="bg-cyan-600 text-white px-5 py-3 rounded-xl"
          >
            Guardar
          </button>

        </div>

      </div>

    </div>

  );

}