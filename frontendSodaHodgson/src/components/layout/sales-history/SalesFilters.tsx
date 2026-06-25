import React from "react";

interface SalesFiltersProps {
  searchInvoice: string;
  setSearchInvoice: (val: string) => void;
  searchDate: string;
  setSearchDate: (val: string) => void;
  searchStatus: string;
  setSearchStatus: (val: string) => void;
}

const SalesFilters: React.FC<SalesFiltersProps> = ({
  searchInvoice,
  setSearchInvoice,
  searchDate,
  setSearchDate,
  searchStatus,
  setSearchStatus,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 mb-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Filtros de búsqueda
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Buscar factura por ID..."
          value={searchInvoice}
          onChange={(e) => setSearchInvoice(e.target.value)}
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <select
          value={searchStatus}
          onChange={(e) => setSearchStatus(e.target.value)}
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          <option value="Todos">Todos los estados</option>
          <option value="COMPLETED">Pagada</option>
          <option value="Anulada">Anulada</option>
        </select>

        <button
          onClick={(e) => e.preventDefault()} // Reactivo en tiempo real, pero previene recarga si está en un form
          className="bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg px-4 py-2 font-semibold transition-all"
        >
          Filtrar
        </button>
      </div>
    </div>
  );
};

export default SalesFilters;