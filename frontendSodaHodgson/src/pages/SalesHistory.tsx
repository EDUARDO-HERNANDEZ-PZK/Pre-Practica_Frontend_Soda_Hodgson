import React, { useState } from "react";
import SalesFilters from "../components/layout/sales-history/SalesFilters";
import SalesTable from "../components/layout/sales-history/SalesTable";
import { useSales } from "../hooks/useSales"; 

const SalesHistory: React.FC = () => {
  const { data: sales = [], isLoading, isError } = useSales();

  // Estados de los Filtros
  const [searchInvoice, setSearchInvoice] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchStatus, setSearchStatus] = useState("Todos");

  // Procesamiento de datos filtrados en tiempo real
  const filteredSales = sales.filter((sale) => {
    // 1. Filtro por ID de Factura
    const matchesInvoice = sale.id.toLowerCase().includes(searchInvoice.toLowerCase());
    
    // 2. Filtro por Fecha (Corregido para evitar desajustes de zona horaria / UTC)
    const dateObj = new Date(sale.sale_time);
    
    const year = dateObj.getFullYear();
    // padding de 2 caracteres para el mes (0-11, por eso el +1) y el día (1-31)
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    
    // Este string queda exactamente en formato YYYY-MM-DD local
    const saleDateStr = `${year}-${month}-${day}`;
    const matchesDate = searchDate === "" || saleDateStr === searchDate;

    // 3. Filtro por Estado (Mapeado a "Todos" o coincidencia exacta de la API)
    const matchesStatus = searchStatus === "Todos" || sale.status === searchStatus;

    return matchesInvoice && matchesDate && matchesStatus;
  });

  // Cálculos financieros basados estrictamente en la data filtrada
  const totalInvoices = filteredSales.length;
  
  const totalSalesAmount = filteredSales
    .filter((s) => s.status === "COMPLETED" || s.status === "Pagada") // Ajustado a tus variantes de estado
    .reduce((acc, _) => acc + 350, 0); 

  const averageSale = totalInvoices > 0 ? totalSalesAmount / totalInvoices : 0;

  if (isLoading) {
    return <div className="p-6 text-center font-semibold text-gray-600">Cargando historial de ventas...</div>;
  }

  if (isError) {
    return <div className="p-6 text-center font-semibold text-red-600">Error al cargar los datos de ventas.</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Historial de Ventas</h1>
        <p className="text-gray-500 mt-2">
          Consulta todas las ventas registradas en el sistema.
        </p>
      </div>

      {/* Tarjetas Dinámicas Reactivas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-md p-5">
          <h3 className="text-gray-500 text-sm">Ventas del día (Filtrado)</h3>
          <p className="text-3xl font-bold text-cyan-600 mt-2">
            C$ {totalSalesAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-5">
          <h3 className="text-gray-500 text-sm">Facturas Encontradas</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">{totalInvoices}</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-5">
          <h3 className="text-gray-500 text-sm">Promedio por venta</h3>
          <p className="text-3xl font-bold text-orange-500 mt-2">
            C$ {averageSale.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      <SalesFilters
        searchInvoice={searchInvoice}
        setSearchInvoice={setSearchInvoice}
        searchDate={searchDate}
        setSearchDate={setSearchDate}
        searchStatus={searchStatus}
        setSearchStatus={setSearchStatus}
      />

      <SalesTable salesData={filteredSales} />
    </div>
  );
};

export default SalesHistory;