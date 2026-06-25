import React from "react";

interface SaleDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SaleDetailModal: React.FC<SaleDetailModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl p-6">

        {/* Encabezado */}
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Detalle de Venta
            </h2>

            <p className="text-gray-500">
              Factura #000001
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600 text-2xl"
          >
            ✖
          </button>
        </div>

        {/* Información */}
        <div className="grid grid-cols-2 gap-4 mb-6">

          <div>
            <span className="font-semibold">Fecha:</span>
            <p>25/06/2026</p>
          </div>

          <div>
            <span className="font-semibold">Hora:</span>
            <p>12:45 PM</p>
          </div>

          <div>
            <span className="font-semibold">Mesa:</span>
            <p>Mesa 1</p>
          </div>

          <div>
            <span className="font-semibold">Cajero:</span>
            <p>Carlos</p>
          </div>

        </div>

        {/* Productos */}
        <div className="mb-6">

          <h3 className="font-bold text-lg mb-3">
            Productos
          </h3>

          <table className="w-full border">

            <thead className="bg-slate-100">

              <tr>

                <th className="p-2 text-left">Producto</th>

                <th className="p-2 text-center">Cantidad</th>

                <th className="p-2 text-right">Precio</th>

              </tr>

            </thead>

            <tbody>

              <tr className="border-t">

                <td className="p-2">
                  Hamburguesa
                </td>

                <td className="p-2 text-center">
                  2
                </td>

                <td className="p-2 text-right">
                  C$ 180.00
                </td>

              </tr>

              <tr className="border-t">

                <td className="p-2">
                  Coca Cola
                </td>

                <td className="p-2 text-center">
                  2
                </td>

                <td className="p-2 text-right">
                  C$ 35.00
                </td>

              </tr>

            </tbody>

          </table>

        </div>

        {/* Total */}

        <div className="flex justify-end">

          <div className="text-right">

            <p className="text-gray-600">
              Total
            </p>

            <h2 className="text-3xl font-bold text-cyan-600">
              C$ 430.00
            </h2>

          </div>

        </div>

      </div>
    </div>
  );
};

export default SaleDetailModal;