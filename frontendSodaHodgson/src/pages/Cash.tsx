import { useState } from "react";
import Header from "../components/layout/Header";

import { useCashSessions, useCreateCashSession, useDeleteCashSession, useUpdateCashSession } from "../hooks/useCashSession";
import { useCreateDailyExpense, useDailyExpenses, useDeleteDailyExpense, useUpdateDailyExpense } from "../hooks/useDailyExpense";
import DailyExpense, { CreateDailyExpenseDto } from "../models/DailyExpense";
import ExpenseModal from "../components/layout/cash/CashModal";
import CashSession from "../models/CashSession";
import CashSessionModal from "./CashSessionModal";

export default function Cash() {

  const { data: cashSessions = [] } = useCashSessions();
  const { data: dailyExpenses = [] } = useDailyExpenses();

  const createCashSession = useCreateCashSession();
  const updateCashSession = useUpdateCashSession();
  const deleteCashSession = useDeleteCashSession();

  const createDailyExpense = useCreateDailyExpense();
  const updateDailyExpense = useUpdateDailyExpense();
  const deleteDailyExpense = useDeleteDailyExpense();

  const [showExpenseModal, setShowExpenseModal] =
    useState(false);

  const [showSessionModal, setShowSessionModal] =
    useState(false);

  const [editingExpense, setEditingExpense] =
    useState<DailyExpense | null>(null);

  const [editingSession, setEditingSession] =
    useState<CashSession | null>(null);

  const ingresos = cashSessions.reduce(
    (acc, item) => acc + item.opening_balance,
    0
  );

  const egresos = dailyExpenses.reduce(
    (acc, item) => acc + item.amount,
    0
  );

  const saldo = ingresos - egresos;

  const saveExpense = async ({
    description,
    amount,
  }: {
    description: string;
    amount: number;
  }) => {
    const dto: CreateDailyExpenseDto = {
      session_id: cashSessions[0]?.id ?? "",
      description,
      amount,
      expense_time: new Date(),
    };

    if (editingExpense) {
      await updateDailyExpense.mutateAsync({
        id: editingExpense.id,
        data: dto,
      });
    } else {
      await createDailyExpense.mutateAsync(dto);
    }

    setShowExpenseModal(false);
    setEditingExpense(null);
  };


  const saveSession = async ({
    opening_balance,
  }: {
    opening_balance: number;
  }) => {
    try {

      const dto = {
        user_id: editingSession?.user_id ?? "USER_ID",
        open_time: editingSession?.open_time ?? new Date(),
        close_time: editingSession?.close_time ?? new Date(),
        opening_balance,
        closing_balance_real:
          editingSession?.closing_balance_real ?? 0,
        expected_closing_balance:
          editingSession?.expected_closing_balance ?? 0,
        cash_difference:
          editingSession?.cash_difference ?? 0,
        status:
          editingSession?.status ?? "OPEN",
      };

      if (editingSession) {

        await updateCashSession.mutateAsync({
          id: editingSession.id,
          data: dto,
        });

      } else {

        await createCashSession.mutateAsync(dto);

      }

      setShowSessionModal(false);
      setEditingSession(null);

    } catch (error) {
      console.error(error);
    }
  };

  const deleteExpense = async (id: string) => {

    if (!window.confirm("Eliminar gasto?")) return;

    await deleteDailyExpense.mutateAsync(id);

  };

  const editExpense = (expense: DailyExpense) => {
    setEditingExpense(expense);
    setShowExpenseModal(true);
  };

  const editSession = (
    session: CashSession
  ) => {

    setEditingSession(session);
    setShowSessionModal(true);

  };

  const removeSession = async (
    id: string
  ) => {

    if (
      !window.confirm(
        "¿Eliminar sesión de caja?"
      )
    ) return;

    await deleteCashSession.mutateAsync(id);

  };

  return (

    <div className="p-8 w-full bg-slate-50 min-h-screen">

      <div className="flex justify-between items-center">

        <Header title="Caja" />

        <div className="flex gap-3">

          <button
            onClick={() => {
              setEditingSession(null);
              setShowSessionModal(true);
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-semibold"
          >
            Abrir Caja
          </button>

          <button
            onClick={() => {
              setEditingExpense(null);
              setShowExpenseModal(true);
            }}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-2xl font-semibold"
          >
            Nuevo Gasto
          </button>

        </div>

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

        <div className="p-6 border-b">

          <h2 className="text-2xl font-bold">
            Sesiones de Caja
          </h2>

        </div>

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>
              <th className="p-4 text-left">Apertura</th>
              <th className="p-4 text-left">Cierre</th>
              <th className="p-4 text-left">Inicial</th>
              <th className="p-4 text-left">Esperado</th>
              <th className="p-4 text-left">Real</th>
              <th className="p-4 text-left">Diferencia</th>
              <th className="p-4 text-left">Estado</th>
              <th className="p-4 text-left">
                Acciones
              </th>
            </tr>

          </thead>

          <tbody>

            {cashSessions.map((session) => (

              <tr
                key={session.id}
                className="border-t"
              >

                <td className="p-4">
                  {new Date(session.open_time).toLocaleString()}
                </td>

                <td className="p-4">
                  {session.close_time
                    ? new Date(session.close_time).toLocaleString()
                    : "-"}
                </td>

                <td className="p-4">
                  C$ {session.opening_balance}
                </td>

                <td className="p-4">
                  C$ {session.expected_closing_balance}
                </td>

                <td className="p-4">
                  C$ {session.closing_balance_real}
                </td>

                <td className="p-4">
                  C$ {session.cash_difference}
                </td>

                <td className="p-4">
                  {session.status}
                </td>

                <td className="p-4 flex gap-2">

                  <button
                    onClick={() =>
                      editSession(session)
                    }
                    className="bg-cyan-600 text-white px-4 py-2 rounded-xl"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() =>
                      removeSession(session.id)
                    }
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

            {dailyExpenses.map((item) => (

              <tr key={item.id} className="border-t">

                <td className="p-4">
                  {new Date(item.expense_time).toLocaleDateString()}
                </td>

                <td className="p-4">
                  Egreso
                </td>

                <td className="p-4">
                  -
                </td>

                <td className="p-4">
                  {item.description}
                </td>

                <td className="p-4">
                  -
                </td>

                <td className="p-4 font-bold text-red-500">
                  C$ {item.amount}
                </td>

                <td className="p-4 flex gap-2">

                  <button
                    onClick={() => editExpense(item)}
                    className="bg-cyan-600 text-white px-4 py-2 rounded-xl"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => deleteExpense(item.id)}
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

      <ExpenseModal
        open={showExpenseModal}
        expense={editingExpense}
        onClose={() => {
          setShowExpenseModal(false);
          setEditingExpense(null);
        }}
        onSave={saveExpense}
      />

      <CashSessionModal
        open={showSessionModal}
        session={editingSession}
        onClose={() => {
          setShowSessionModal(false);
          setEditingSession(null);
        }}
        onSave={saveSession}
      />

    </div>

  );

}