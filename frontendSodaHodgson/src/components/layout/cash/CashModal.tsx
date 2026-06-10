import { useEffect, useState } from "react";
import DailyExpense from "../../../models/DailyExpense";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: {
    description: string;
    amount: number;
  }) => void;
  expense: DailyExpense | null;
}

export default function ExpenseModal({
  open,
  onClose,
  onSave,
  expense,
}: Props) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (expense) {
      setDescription(expense.description);
      setAmount(String(expense.amount));
    } else {
      setDescription("");
      setAmount("");
    }
  }, [expense]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg rounded-3xl p-8">

        <h2 className="text-2xl font-bold mb-6">
          {expense ? "Editar Gasto" : "Nuevo Gasto"}
        </h2>

        <div className="space-y-4">

          <input
            placeholder="Descripción"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="w-full border rounded-xl p-3"
          />

          <input
            type="number"
            placeholder="Monto"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
            className="w-full border rounded-xl p-3"
          />

        </div>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="bg-slate-300 px-5 py-3 rounded-xl"
          >
            Cancelar
          </button>

          <button
            onClick={() =>
              onSave({
                description,
                amount: Number(amount),
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