import React from "react";
import SalesFilters from "../components/layout/sales-history/SalesFilters";
import SalesTable from "../components/layout/sales-history/SalesTable";

const SalesHistory: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Título */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">
          Historial de Ventas
        </h1>

        <p className="text-gray-500 mt-2">
          Consulta todas las ventas registradas en el sistema.
        </p>
      </div>

      {/* Tarjetas resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

        <div className="bg-white rounded-xl shadow-md p-5">
          <h3 className="text-gray-500 text-sm">
            Ventas del día
          </h3>

          <p className="text-3xl font-bold text-cyan-600 mt-2">
            C$ 0.00
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-5">
          <h3 className="text-gray-500 text-sm">
            Facturas
          </h3>

          <p className="text-3xl font-bold text-green-600 mt-2">
            0
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-5">
          <h3 className="text-gray-500 text-sm">
            Promedio por venta
          </h3>

          <p className="text-3xl font-bold text-orange-500 mt-2">
            C$ 0.00
          </p>
        </div>

      </div>

      {/* Filtros */}
      <SalesFilters />

      {/* Tabla */}
      <SalesTable />

    </div>
  );
};

export default SalesHistory;