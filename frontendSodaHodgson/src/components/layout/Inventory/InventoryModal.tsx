import { useEffect, useState } from "react";
import { Product, UpdateProductDto } from "../../../models/Product";

interface Props {
  open: boolean;
  onClose: () => void;
  product?: Product;
  onSave: (id: string, data: UpdateProductDto) => void;
}

export default function InventoryModal({
  open,
  onClose,
  product,
  onSave,
}: Props) {

  const [form, setForm] = useState<UpdateProductDto>({
    stock_current: 0,
    stock_expired: 0,
    stock_damaged: 0,
    name: "",
    category_id: ""
  });

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        category_id: product.category_id,
        stock_current: product.stock_current,
        stock_expired: product.stock_expired,
        stock_damaged: product.stock_damaged,
      });
    }
  }, [product]);

  const stockAvailable = Math.max(
    0,
    (form.stock_current || 0) -
    (form.stock_expired || 0) -
    (form.stock_damaged || 0)
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-3xl w-full max-w-lg mx-4 p-8 shadow-2xl">

        <h2 className="text-3xl font-bold mb-6">
          Inventario Diario
        </h2>

        <div className="space-y-4">

          <div>
            <label className="block mb-2 font-medium">
              Producto
            </label>
            <input
              value={product?.name || ""}
              disabled
              className="w-full border rounded-xl p-3 bg-slate-100"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Stock Total
            </label>
            <input
              type="number"
              value={form.stock_current}
              onChange={(e) =>
                setForm({
                  ...form,
                  stock_current: e.target.valueAsNumber || 0,
                })
              }
              className="w-full border rounded-xl p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Productos Vencidos
            </label>
            <input
              type="number"
              value={form.stock_expired}
              onChange={(e) =>
                setForm({
                  ...form,
                  stock_expired: e.target.valueAsNumber || 0,
                })
              }
              className="w-full border rounded-xl p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Productos Dañados
            </label>
            <input
              type="number"
              value={form.stock_damaged}
              onChange={(e) =>
                setForm({
                  ...form,
                  stock_damaged: e.target.valueAsNumber || 0,
                })
              }
              className="w-full border rounded-xl p-3"
            />
          </div>

          <div className="bg-cyan-50 border border-cyan-200 rounded-2xl p-5">
            <p className="text-slate-500 text-sm">
              Stock Disponible
            </p>
            <h2 className="text-4xl font-bold text-cyan-700 mt-2">
              {stockAvailable}
            </h2>
          </div>

        </div>

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="bg-slate-300 px-5 py-3 rounded-xl"
          >
            Cancelar
          </button>

          <button
            onClick={() => {
              const current = Number(form.stock_current) || 0;
              const expired = Number(form.stock_expired) || 0;
              const damaged = Number(form.stock_damaged) || 0;

              if ((expired + damaged) > current) {
                alert("Los productos vencidos y dañados no pueden ser mayores al stock total.");
                return;
              }

              if (product) {
                // SOLUCIÓN DEFINITIVA:
                // Pasamos absolutamente TODO el producto original (...product)
                // para que mantenga precios, imágenes, descripciones, etc., intactos,
                // y encima sobreescribimos los stocks numéricos actualizados.
                const payload = {
                  ...product, 
                  stock_current: current,
                  stock_expired: expired,
                  stock_damaged: damaged,
                };

                onSave(product.id, payload as unknown as UpdateProductDto);
              }
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