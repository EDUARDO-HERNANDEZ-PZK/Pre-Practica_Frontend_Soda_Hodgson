import { useEffect, useState } from "react";
import CashSession from "../models/CashSession";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: {
    opening_balance: number;
  }) => void;
  session: CashSession | null;
}

export default function CashSessionModal({
  open,
  onClose,
  onSave,
  session,
}: Props) {
  const [openingBalance, setOpeningBalance] = useState("");

  useEffect(() => {
    if (session) {
      setOpeningBalance(
        String(session.opening_balance)
      );
    } else {
      setOpeningBalance("");
    }
  }, [session]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg rounded-3xl p-8">

        <h2 className="text-2xl font-bold mb-6">
          Apertura de Caja
        </h2>
        <input
  type="number"
  min={1}
  placeholder="Saldo Inicial"
  value={openingBalance}
  onChange={(e) =>
    setOpeningBalance(e.target.value)
  }
  className="w-full border rounded-xl p-3"
/>

        <div className="flex justify-end gap-3 mt-6">
          <button
  onClick={onClose}
  className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl"
>
  Cancelar
</button>
<button
  onClick={() => {

    if (!openingBalance || Number(openingBalance) <= 0) {
      alert("El saldo inicial debe ser mayor a 0");
      return;
    }

    onSave({
      opening_balance: Number(openingBalance),
    });

  }}
  className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl"
>
  Guardar
</button>

        </div>

      </div>
    </div>
  );
}