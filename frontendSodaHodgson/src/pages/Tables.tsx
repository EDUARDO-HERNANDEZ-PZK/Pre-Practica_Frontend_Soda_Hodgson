import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTables } from "../hooks/useTables";

// 1. Definimos un tipo estricto para los estados de la mesa
export type TableStatus = "Disponible" | "Ocupada" | "Reservada";

// 2. Tipamos explícitamente el objeto de colores usando Record
const statusColors: Record<TableStatus, string> = {
  Disponible: "bg-green-100 text-green-700",
  Ocupada: "bg-red-100 text-red-700",
  Reservada: "bg-yellow-100 text-yellow-700",
};

// 3. Interfaz de la entidad Mesa
export interface Table {
  id: string | number;
  table_number: string | number;
  status: TableStatus;
}

export default function Tables() {
  const { data: initialTables = [] } = useTables() as { data: Table[] };
  const navigate = useNavigate();

  // Estado de las mesas en pantalla
  const [tables, setTables] = useState<Table[]>([]);
  
  // Modales de control
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTable, setEditingTable] = useState<Table | null>(null);

  useEffect(() => {
    if (initialTables.length > 0) {
      setTables(initialTables);
    }
  }, [initialTables]);

  // Navegación al POS
  const handleTableClick = (table: Table) => {
    if (table.status === "Ocupada") {
      navigate(`/pos?table=${table.id}&mode=edit`);
    } else {
      navigate(`/pos?table=${table.id}&mode=new`);
    }
  };

  // Crear nueva mesa
  const handleSelectStatusAndCreate = (selectedStatus: TableStatus) => {
    const maxNumber = tables.reduce((max, t) => {
      const num = Number(t.table_number);
      return !isNaN(num) && num > max ? num : max;
    }, 0);

    const nextNumber = maxNumber + 1;

    const newTable: Table = {
      id: `temp-${Date.now()}`, 
      table_number: nextNumber,
      status: selectedStatus,
    };

    setTables([...tables, newTable]);
    setIsCreateModalOpen(false);
  };

  // Cambiar estado de mesa existente
  const handleChangeStatusExisting = (selectedStatus: TableStatus) => {
    if (!editingTable) return;
    setTables(tables.map((t) => t.id === editingTable.id ? { ...t, status: selectedStatus } : t));
    setEditingTable(null);
  };

  // Confirmación de borrado
  const handleDeleteTable = (e: React.MouseEvent, table: Table) => {
    e.stopPropagation();
    const confirmar = window.confirm(`¿Estás seguro de que deseas eliminar la Mesa ${table.table_number}?`);
    if (confirmar) {
      setTables(tables.filter((t) => t.id !== table.id));
    }
  };

  return (
    // He quitado 'pb-28' del contenedor principal ya que el botón no es flotante
    <div className="p-8 flex-1 select-none relative min-h-screen pb-12">
      
      {/* CABECERA: Título y el NUEVO Botón "Add New" Verde */}
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-4xl font-bold text-gray-800">
          Gestión de Mesas
        </h1>

        {/* 4. EL NUEVO BOTÓN DE AGREGAR CON ESTILO DE TU IMAGEN */}
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2.5 px-6 py-3 rounded-lg text-white font-bold transition-all duration-150 active:scale-95 shadow-md hover:brightness-105"
          style={{ backgroundColor: "#82E0AA" }} // El color verde pastel exacto de tu imagen
        >
          {/* Icono de '+' dentro de un círculo blanco sutil */}
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/40 border border-white/60">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </span>
          {/* Texto idéntico a tu imagen */}
          <span className="text-lg">Agregar Mesa</span>
        </button>
      </div>

      {/* Grid de Mesas (El resto de la interfaz se mantiene igual) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {tables.map((table) => (
          <div key={table.id} onClick={() => handleTableClick(table)} className="bg-white rounded-2xl shadow-md p-6 cursor-pointer hover:shadow-xl hover:scale-105 transition-all border border-gray-100 flex flex-col justify-between min-h-[130px] relative group/card">
            {/* BOTÓN ELIMINAR */}
            <button onClick={(e) => handleDeleteTable(e, table)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-full transition-colors md:opacity-0 md:group-hover/card:opacity-100 focus:opacity-100" title="Eliminar mesa">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
            </button>
            <div><h2 className="text-xl font-bold text-gray-700 pr-6">Mesa {table.table_number}</h2></div>
            {/* Badge de Estado editable */}
            <div className="mt-4 flex justify-end">
              <span onClick={(e) => { e.stopPropagation(); setEditingTable(table); }} className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide cursor-pointer hover:brightness-95 transition-all active:scale-95 ${statusColors[table.status] || "bg-gray-100 text-gray-700"}`} title="Haga clic para cambiar el estado">
                {table.status} ⚙️
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 1. MODAL: SELECCIÓN MANUAL AL CREAR NUEVA MESA */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in animate-duration-150">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Crear Nueva Mesa</h3>
            <p className="text-sm text-gray-500 mb-6">Selecciona con qué estado inicial va a nacer la nueva mesa.</p>
            <div className="flex flex-col gap-3">
              {(["Disponible", "Ocupada", "Reservada"] as TableStatus[]).map((status) => (
                <button key={status} onClick={() => handleSelectStatusAndCreate(status)} className={`w-full py-3 px-4 rounded-xl font-bold border-2 text-left flex justify-between items-center transition-colors ${status === "Disponible" ? "border-green-200 bg-green-50 text-green-700 hover:bg-green-100" : status === "Ocupada" ? "border-red-200 bg-red-50 text-red-700 hover:bg-red-100" : "border-yellow-200 bg-yellow-50 text-yellow-700 hover:bg-yellow-100"}`}>
                  <span>{status}</span>
                  <span className={`w-3 h-3 rounded-full ${status === "Disponible" ? "bg-green-500" : status === "Ocupada" ? "bg-red-500" : "bg-yellow-500"}`}></span>
                </button>
              ))}
            </div>
            <button onClick={() => setIsCreateModalOpen(false)} className="mt-6 w-full py-2.5 text-center font-semibold text-gray-400 hover:text-gray-600 transition-colors">Cancelar</button>
          </div>
        </div>
      )}

      {/* 2. MODAL: EDITAR ESTADO DE MESA EXISTENTE */}
      {editingTable && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in animate-duration-150">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Cambiar Estado - Mesa {editingTable.table_number}</h3>
            <p className="text-sm text-gray-500 mb-6">Actualiza manualmente el estado de esta mesa en tiempo real.</p>
            <div className="flex flex-col gap-3">
              {(["Disponible", "Ocupada", "Reservada"] as TableStatus[]).map((status) => (
                <button key={status} onClick={() => handleChangeStatusExisting(status)} className={`w-full py-3 px-4 rounded-xl font-bold border-2 text-left flex justify-between items-center transition-colors ${status === "Disponible" ? "border-green-200 bg-green-50 text-green-700 hover:bg-green-100" : status === "Ocupada" ? "border-red-200 bg-red-50 text-red-700 hover:bg-red-100" : "border-yellow-200 bg-yellow-50 text-yellow-700 hover:bg-yellow-100"} ${editingTable.status === status ? "ring-4 ring-blue-400/30" : ""}`}>
                  <span>{status} {editingTable.status === status && " (Actual)"}</span>
                  <span className={`w-3 h-3 rounded-full ${status === "Disponible" ? "bg-green-500" : status === "Ocupada" ? "bg-red-500" : "bg-yellow-500"}`}></span>
                </button>
              ))}
            </div>
            <button onClick={() => setEditingTable(null)} className="mt-6 w-full py-2.5 text-center font-semibold text-gray-400 hover:text-gray-600 transition-colors">Cerrar sin guardar</button>
          </div>
        </div>
      )}
    </div>
  );
}