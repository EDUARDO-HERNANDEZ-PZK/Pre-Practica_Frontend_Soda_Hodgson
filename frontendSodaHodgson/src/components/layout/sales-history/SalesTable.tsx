import React, { useState } from "react";
import SaleDetailModal from "./SaleDetailModal";
import Sales from "../../../models/Sales";

interface SalesTableProps {
  salesData: Sales[];
}

const SalesTable: React.FC<SalesTableProps> = ({ salesData }) => {
  // Guardamos el ID de la venta seleccionada para pasarlo al modal
  const [selectedSaleId, setSelectedSaleId] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-slate-800 text-white">
          <tr>
            <th className="px-6 py-3 text-left">Factura (ID)</th>
            <th className="px-6 py-3 text-left">Fecha</th>
            <th className="px-6 py-3 text-left">Mesa</th>
            <th className="px-6 py-3 text-left">Cajero</th>
            <th className="px-6 py-3 text-left">Total</th>
            <th className="px-6 py-3 text-center">Estado</th>
            <th className="px-6 py-3 text-center">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {salesData.map((sale) => {
            // Convertir fecha de manera segura si viene como string de la API
            const saleDate = new Date(sale.sale_time).toLocaleDateString("es-NI");

            return (
              <tr key={sale.id} className="border-b hover:bg-gray-50 transition-colors">
                {/* Mostramos los primeros caracteres del ID como número de factura si es UUID */}
                <td className="px-6 py-4 font-medium">
                  {sale.id.slice(0, 6).toUpperCase()}
                </td>

                <td className="px-6 py-4">{saleDate}</td>

                {/* Campos estáticos/relacionales de tu UI que dejas para desarrollo futuro */}
                <td className="px-6 py-4">Mesa {sale.table_id || "1"}</td>
                <td className="px-6 py-4">Cajero (ID: {sale.user_creator_id.slice(0,4)})</td>
                
                {/* Total estático temporal (hasta que asocies totales o detalles) */}
                <td className="px-6 py-4 font-semibold text-green-600">
                  C$ 350.00
                </td>

                <td className="px-6 py-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      sale.status === "Pagada"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {sale.status || "Pagada"}
                  </span>
                </td>

                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => setSelectedSaleId(sale.id)}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition-all"
                  >
                    👁 Ver
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Modal de Detalle */}
      <SaleDetailModal
        isOpen={Boolean(selectedSaleId)}
        saleId={selectedSaleId}
        onClose={() => setSelectedSaleId(null)}
      />
    </div>
  );
};

export default SalesTable;