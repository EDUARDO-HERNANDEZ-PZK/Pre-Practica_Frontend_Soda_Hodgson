import { useState } from "react";

import Header from "../components/layout/Header";
import CashModal from "../components/layout/cash/CashModal";

import { cashData } from "../data/cash";

export default function Cash() {

  const [cash, setCash] = useState(cashData);

  const [showModal, setShowModal] = useState(false);

  const [editingCash, setEditingCash] = useState<any>(null);

  const ingresos = cash
    .filter((m) => m.type === "Ingreso")
    .reduce((a, b) => a + b.amount, 0);

  const egresos = cash
    .filter((m) => m.type === "Egreso")
    .reduce((a, b) => a + b.amount, 0);

  const saldo = ingresos - egresos;

  const saveCash = (movement: any) => {

    if (editingCash) {

      setCash(

        cash.map((item) =>

          item.id === movement.id

            ? movement

            : item

        )

      );

    } else {

      setCash([

        ...cash,

        {

          ...movement,

          id: Date.now(),

        },

      ]);

    }

    setShowModal(false);

    setEditingCash(null);

  };

  const deleteCash = (id: number) => {

    if (!window.confirm("Eliminar movimiento?")) return;

    setCash(

      cash.filter(

        (item) => item.id !== id

      )

    );

  };

  const editCash = (movement: any) => {

    setEditingCash(movement);

    setShowModal(true);

  };

  return (

    <div className="p-8 w-full bg-slate-50 min-h-screen">

      <div className="flex justify-between items-center">

        <Header title="Caja" />

        <button

          onClick={() => {

            setEditingCash(null);

            setShowModal(true);

          }}

          className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-2xl font-semibold"

        >

          Nuevo Movimiento

        </button>

      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-6">

        <div className="bg-white rounded-3xl shadow p-6">

          <p className="text-slate-500">

            Ingresos

          </p>

          <h2 className="text-4xl font-bold text-green-600 mt-2">

            C$ {ingresos}

          </h2>

        </div>

        <div className="bg-white rounded-3xl shadow p-6">

          <p className="text-slate-500">

            Egresos

          </p>

          <h2 className="text-4xl font-bold text-red-500 mt-2">

            C$ {egresos}

          </h2>

        </div>

        <div className="bg-cyan-600 text-white rounded-3xl shadow p-6">

          <p>

            Saldo

          </p>

          <h2 className="text-4xl font-bold mt-2">

            C$ {saldo}

          </h2>

        </div>

      </div>

      <div className="bg-white rounded-3xl shadow mt-8 overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4 text-left">Fecha</th>
              <th className="p-4 text-left">Tipo</th>
              <th className="p-4 text-left">Método</th>
              <th className="p-4 text-left">Concepto</th>
              <th className="p-4 text-left">Cajero</th>
              <th className="p-4 text-left">Monto</th>
              <th className="p-4 text-left">Acciones</th>

            </tr>

          </thead>

          <tbody>

            {cash.map((item) => (

              <tr key={item.id} className="border-t">

                <td className="p-4">{item.date}</td>

                <td className="p-4">{item.type}</td>

                <td className="p-4">{item.method}</td>

                <td className="p-4">{item.concept}</td>

                <td className="p-4">{item.cashier}</td>

                <td className="p-4 font-bold">

                  C$ {item.amount}

                </td>

                <td className="p-4 flex gap-2">

                  <button

                    onClick={() => editCash(item)}

                    className="bg-cyan-600 text-white px-4 py-2 rounded-xl"

                  >

                    Editar

                  </button>

                  <button

                    onClick={() => deleteCash(item.id)}

                    className="bg-red-500 text-white px-4 py-2 rounded-xl"

                  >

                    Eliminar

                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <CashModal

        open={showModal}

        cash={editingCash}

        onClose={() => {

          setShowModal(false);

          setEditingCash(null);

        }}

        onSave={saveCash}

      />

    </div>

  );

}