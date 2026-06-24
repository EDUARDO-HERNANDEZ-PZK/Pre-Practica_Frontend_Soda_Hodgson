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

      {/* Agregamos flex y flex-col a la tarjeta blanca junto con un max-h dinámico */}
      <div className="bg-white rounded-3xl w-full max-w-lg p-8 shadow-2xl max-h-[85vh] flex flex-col">

        {/* TÍTULO: Se queda fijo arriba */}
        <h2 className="text-3xl font-bold mb-6 flex-shrink-0">
          Inventario Diario
        </h2>

        {/* CONTENEDOR CON SCROLL: flex-1 le permite ocupar el espacio estirable, pr-2 evita que el scroll tape los inputs */}
        <div className="space-y-4 overflow-y-auto flex-1 pr-2 min-h-0">

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
              // Si el valor es 0, lo mostramos como "" para que no estorbe al dar clic, o simplemente pasamos el valor tal cual
              value={form.stock_damaged === 0 ? "" : form.stock_damaged}
              onChange={(e) =>
                setForm({
                  ...form,
                  // Si el usuario borra todo, guardamos 0. Si escribe, lo convertimos a número inmediatamente.
                  stock_damaged: e.target.value === "" ? 0 : Number(e.target.value),
                })
              }
              placeholder="0" // Agregamos un placeholder para que se siga viendo un 0 gris cuando esté vacío
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

        {/* BOTONES: Se quedan fijos abajo */}
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100 flex-shrink-0">

          <button
            onClick={onClose}
            className="bg-slate-300 px-5 py-3 rounded-xl hover:bg-slate-400 transition"
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
                const payload = {
                  ...product,
                  stock_current: current,
                  stock_expired: expired,
                  stock_damaged: damaged,
                };

                onSave(product.id, payload as unknown as UpdateProductDto);
              }
            }}
            className="bg-cyan-600 text-white px-5 py-3 rounded-xl hover:bg-cyan-700 transition"
          >
            Guardar
          </button>

        </div>

      </div>

    </div>
  );
}