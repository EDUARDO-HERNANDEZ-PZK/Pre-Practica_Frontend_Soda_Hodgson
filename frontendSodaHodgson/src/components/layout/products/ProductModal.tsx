import { useState, useEffect } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (product: any) => void;
  product?: any;
}

export default function ProductModal({
  open,
  onClose,
  onSave,
  product,
}: Props) {

  const [form, setForm] = useState({
    name: "",
    category: "Comidas",
    price: "",
    stock: "",
    image: "",
    status: "Activo",
  });

  useEffect(() => {

    if (product) {

      setForm(product);

    } else {

      setForm({
        name: "",
        category: "Comidas",
        price: "",
        stock: "",
        image: "",
        status: "Activo",
      });

    }

  }, [product]);

  if (!open) return null;

  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div
  className="
    bg-white
    rounded-3xl
    w-full
    max-w-xl
    mx-4
    p-8
    shadow-2xl
  "
>

        <h2 className="text-3xl font-bold mb-6">

          {product ? "Editar Producto" : "Nuevo Producto"}

        </h2>

        <div className="space-y-4">

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

          <input
            placeholder="URL Imagen"
            value={form.image}
            onChange={(e) =>
              setForm({
                ...form,
                image: e.target.value,
              })
            }
            className="w-full border rounded-xl p-3"
          />

          <select
            value={form.category}
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value,
              })
            }
            className="w-full border rounded-xl p-3"
          >
            <option>Comidas</option>
            <option>Bebidas</option>
            <option>Extras</option>
            <option>Postres</option>
          </select>

          <input
            type="number"
            placeholder="Precio"
            value={form.price}
            onChange={(e) =>
              setForm({
                ...form,
                price: e.target.value,
              })
            }
            className="w-full border rounded-xl p-3"
          />

          <input
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={(e) =>
              setForm({
                ...form,
                stock: e.target.value,
              })
            }
            className="w-full border rounded-xl p-3"
          />

        </div>

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="bg-slate-300 px-5 py-3 rounded-xl"
          >
            Cancelar
          </button>

         <button
  onClick={() =>
    onSave({
      ...form,
      id: product?.id,
      price: Number(form.price),
      stock: Number(form.stock),
    })
  }
  className="bg-cyan-600 text-white px-5 py-3 rounded-xl"
>
  Guardar
</button>

        </div>

      </div>

    </div>

  );

}