import { useNavigate } from "react-router-dom";
import { useTables } from "../hooks/useTables";


const statusColors = {
  Disponible: "bg-green-100 text-green-700",
  Ocupada: "bg-red-100 text-red-700",
  Reservada: "bg-yellow-100 text-yellow-700",
};

export default function Tables() {
  const { data: tables = [] } = useTables();
  const navigate = useNavigate();
  return (
    <div className="p-8 flex-1">
      <h1 className="text-4xl font-bold mb-8">
        Gestión de Mesas
      </h1>

      <div className="grid grid-cols-4 gap-5">
        {tables.map((table) => (
          <div
            key={table.id}
            onClick={() => navigate(`/pos?table=${table.id}`)}
            className="bg-white rounded-2xl shadow-lg p-5 cursor-pointer hover:shadow-xl hover:scale-105 transition-all"
          >
            <h2 className="text-xl font-bold">
              Mesa {table.table_number}
            </h2>

            {/* <p className="mt-2">
              Capacidad: {table.capacity}
            </p> */}

            <div className="mt-3">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[table.status]
                  }`}
              >
                {table.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}