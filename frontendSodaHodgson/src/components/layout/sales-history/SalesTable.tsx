import React from "react";
import { useState } from "react";
import SaleDetailModal from "./SaleDetailModal";

const SalesTable: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const sales = [
    {
      id: 1,
      invoice: "000001",
      date: "25/06/2026",
      table: "Mesa 1",
      cashier: "Carlos",
      total: "C$ 350.00",
      status: "Pagada",
    },
    {
      id: 2,
      invoice: "000002",
      date: "25/06/2026",
      table: "Mesa 4",
      cashier: "María",
      total: "C$ 780.00",
      status: "Pagada",
    },
    {
      id: 3,
      invoice: "000003",
      date: "25/06/2026",
      table: "Mesa 2",
      cashier: "José",
      total: "C$ 1,250.00",
      status: "Anulada",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-slate-800 text-white">
          <tr>
            <th className="px-6 py-3 text-left">Factura</th>
            <th className="px-6 py-3 text-left">Fecha</th>
            <th className="px-6 py-3 text-left">Mesa</th>
            <th className="px-6 py-3 text-left">Cajero</th>
            <th className="px-6 py-3 text-left">Total</th>
            <th className="px-6 py-3 text-center">Estado</th>
            <th className="px-6 py-3 text-center">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {sales.map((sale) => (
            <tr
              key={sale.id}
              className="border-b hover:bg-gray-50 transition-colors"
            >
              <td className="px-6 py-4 font-medium">{sale.invoice}</td>

              <td className="px-6 py-4">{sale.date}</td>

              <td className="px-6 py-4">{sale.table}</td>

              <td className="px-6 py-4">{sale.cashier}</td>

              <td className="px-6 py-4 font-semibold text-green-600">
                {sale.total}
              </td>

              <td className="px-6 py-4 text-center">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    sale.status === "Pagada"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {sale.status}
                </span>
              </td>

              <td className="px-6 py-4 text-center">
             <button
  onClick={() => setOpenModal(true)}
  className="
    bg-cyan-600
    hover:bg-cyan-700
    text-white
    px-4
    py-2
    rounded-lg
    transition-all
  "
>
  👁 Ver
</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <SaleDetailModal
  isOpen={openModal}
  onClose={() => setOpenModal(false)}
/>
    </div>
  );
};

export default SalesTable;