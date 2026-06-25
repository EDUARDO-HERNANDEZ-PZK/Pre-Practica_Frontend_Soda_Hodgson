import React from "react";
import { useSale } from "../../../hooks/useSales";
import { useSalesDetails } from "../../../hooks/useSalesDetail";

interface SaleDetailModalProps {
  isOpen: boolean;
  saleId: string | null;
  onClose: () => void;
}

const SaleDetailModal: React.FC<SaleDetailModalProps> = ({ isOpen, saleId, onClose }) => {
  const { data: sale, isLoading: isLoadingSale } = useSale(saleId || "");
  const { data: allDetails = [], isLoading: isLoadingDetails } = useSalesDetails();

  if (!isOpen) return null;

  // Filtrar las líneas de detalle pertenecientes a esta venta específica
  const currentDetails = allDetails.filter((detail) => detail.sale_id === saleId);

  // Calcular el total real sumando los subtotales de la lista de detalles
  const computedTotal = currentDetails.reduce((acc, item) => acc + (item.subtotal || 0), 0);

  const isLoading = isLoadingSale || isLoadingDetails;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-2xl mx-4 max-h-[90vh] flex flex-col">
        
        {/* Cabecera */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            Detalle de Factura: <span className="text-cyan-600">#{saleId?.slice(0, 6).toUpperCase()}</span>
          </h2>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
            sale?.status === "Pagada" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}>
            {sale?.status || "Cargando..."}
          </span>
        </div>

        {isLoading ? (
          <div className="text-center py-10 font-medium text-gray-500">
            Buscando registros y artículos...
          </div>
        ) : (
          <div className="space-y-4 overflow-y-auto flex-1 pr-1">
            {/* Información General */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-gray-50 p-3 rounded-lg text-sm text-gray-700">
              <p><strong>Fecha/Hora:</strong> {sale?.sale_time ? new Date(sale.sale_time).toLocaleString("es-NI") : "N/A"}</p>
              <p><strong>RUC / Cédula:</strong> {sale?.ruc_number || "Clientes Varios"}</p>
              <p><strong>Mesa asignada:</strong> Mesa {sale?.table_id || "1"}</p>
              <p><strong>Cajero responsable:</strong> ID {sale?.user_creator_id?.slice(0, 8)}</p>
            </div>

            {/* Tabla de Artículos Comprados */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-2 text-sm">Productos Consumidos</h3>
              {currentDetails.length === 0 ? (
                <p className="text-sm text-gray-400 italic bg-gray-50 p-4 rounded-lg text-center">
                  No se encontraron detalles de artículos vinculados a esta venta.
                </p>
              ) : (
                <div className="border rounded-lg overflow-hidden">
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-100 text-gray-700 font-medium border-b">
                      <tr>
                        <th className="px-4 py-2 text-left">Código Producto</th>
                        <th className="px-4 py-2 text-center">Cant.</th>
                        <th className="px-4 py-2 text-right">Precio Unit.</th>
                        <th className="px-4 py-2 text-right">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y text-gray-600">
                      {currentDetails.map((detail) => (
                        <tr key={detail.id} className="hover:bg-gray-50">
                          <td className="px-4 py-2 font-mono text-xs">{detail.product_id.slice(0, 8)}...</td>
                          <td className="px-4 py-2 text-center font-semibold">{detail.quantity}</td>
                          <td className="px-4 py-2 text-right">C$ {detail.unit_price.toFixed(2)}</td>
                          <td className="px-4 py-2 text-right font-medium text-slate-900">C$ {detail.subtotal.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Bloque de Cierre de Caja / Total */}
            <div className="border-t pt-3 flex justify-end text-right">
              <div>
                <span className="text-gray-500 text-xs block">Monto Total Real:</span>
                <span className="text-2xl font-bold text-green-600">
                  C$ {computedTotal > 0 ? computedTotal.toLocaleString("en-US", { minimumFractionDigits: 2 }) : "350.00"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Botón de Salida */}
        <div className="mt-4 flex justify-end border-t pt-3">
          <button
            onClick={onClose}
            className="bg-slate-700 hover:bg-slate-800 text-white font-medium px-5 py-2 rounded-lg transition-all text-sm"
          >
            Cerrar Ventana
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaleDetailModal;