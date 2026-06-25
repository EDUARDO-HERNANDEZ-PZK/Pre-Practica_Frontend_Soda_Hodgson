import React from "react";

const SalesFilters: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 mb-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Filtros de búsqueda
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Buscar factura..."
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <input
          type="date"
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <select
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          <option>Todos los estados</option>
          <option>Pagada</option>
          <option>Anulada</option>
        </select>

        <button
          className="
            bg-cyan-600
            hover:bg-cyan-700
            text-white
            rounded-lg
            px-4
            py-2
            font-semibold
            transition-all
          "
        >
          Buscar
        </button>
      </div>
    </div>
  );
};

export default SalesFilters;