import { useEffect, useState } from "react";

interface Cash {
  id?: number;
  type: string;
  amount: number;
  method: string;
  concept: string;
  cashier: string;
  date: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (cash: Cash) => void;
  cash: Cash | null;
}

export default function CashModal({
  open,
  onClose,
  onSave,
  cash,
}: Props) {

  const [form, setForm] = useState({
    type: "Ingreso",
    amount: "",
    method: "Efectivo",
    concept: "",
    cashier: "",
    date: "",
  });

  useEffect(() => {

    if (cash) {

      setForm({
        type: cash.type,
        amount: String(cash.amount),
        method: cash.method,
        concept: cash.concept,
        cashier: cash.cashier,
        date: cash.date,
      });

    } else {

      setForm({
        type: "Ingreso",
        amount: "",
        method: "Efectivo",
        concept: "",
        cashier: "",
        date: "",
      });

    }

  }, [cash]);

  if (!open) return null;

  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white w-full max-w-xl mx-4 rounded-3xl p-8 shadow-2xl">

        <h2 className="text-3xl font-bold mb-6">

          {cash ? "Editar Movimiento" : "Nuevo Movimiento"}

        </h2>

        <div className="space-y-4">

          <select
            value={form.type}
            onChange={(e) =>
              setForm({
                ...form,
                type: e.target.value,
              })
            }
            className="w-full border rounded-xl p-3"
          >
            <option>Ingreso</option>
            <option>Egreso</option>
          </select>

          <input
            type="number"
            placeholder="Monto"
            value={form.amount}
            onChange={(e) =>
              setForm({
                ...form,
                amount: e.target.value,
              })
            }
            className="w-full border rounded-xl p-3"
          />

          <select
            value={form.method}
            onChange={(e) =>
              setForm({
                ...form,
                method: e.target.value,
              })
            }
            className="w-full border rounded-xl p-3"
          >
            <option>Efectivo</option>
            <option>Tarjeta</option>
            <option>Transferencia</option>
          </select>

          <input
            placeholder="Concepto"
            value={form.concept}
            onChange={(e) =>
              setForm({
                ...form,
                concept: e.target.value,
              })
            }
            className="w-full border rounded-xl p-3"
          />

          <input
            placeholder="Cajero"
            value={form.cashier}
            onChange={(e) =>
              setForm({
                ...form,
                cashier: e.target.value,
              })
            }
            className="w-full border rounded-xl p-3"
          />

        </div>

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="bg-slate-300 px-6 py-3 rounded-xl"
          >
            Cancelar
          </button>

          <button
            onClick={() =>
              onSave({
                id: cash?.id,
                type: form.type,
                amount: Number(form.amount),
                method: form.method,
                concept: form.concept,
                cashier: form.cashier,
                date:
                  form.date ||
                  new Date().toLocaleString(),
              })
            }
            className="bg-cyan-600 text-white px-6 py-3 rounded-xl"
          >
            Guardar
          </button>

        </div>

      </div>

    </div>

  );

}