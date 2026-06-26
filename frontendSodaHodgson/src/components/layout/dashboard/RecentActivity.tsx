import React from "react";
import { Receipt } from "lucide-react";

interface Sale {
  id: string;
  table: string;
  total: number;
  date: Date | string;
  status: string;
}

interface Props {
  sales: Sale[];
}

export default function RecentActivity({
  sales,
}: Props) {
  return (
    <div
      className="
      bg-white
      rounded-3xl
      shadow-xl
      border
      border-slate-200
      p-7
      "
    >
      <h2 className="text-2xl font-bold mb-6">
        📝 Actividad Reciente
      </h2>

      <div className="space-y-4">

        {sales.length === 0 ? (

          <p className="text-slate-500">
            No hay ventas registradas.
          </p>

        ) : (

          sales.map((sale) => (

            <div
              key={sale.id}
              className="
              flex
              items-center
              justify-between
              p-4
              rounded-2xl
              hover:bg-slate-50
              transition
              "
            >

              <div className="flex items-center gap-4">

                <div
                  className="
                  w-12
                  h-12
                  rounded-xl
                  bg-cyan-100
                  text-cyan-700
                  flex
                  items-center
                  justify-center
                  "
                >
                  <Receipt size={22} />
                </div>

                <div>

                  <h3 className="font-bold">
                    Factura #{sale.id}
                  </h3>

                  <p className="text-sm text-slate-500">
                    Mesa: {sale.table}
                  </p>

                  <p className="text-xs text-slate-400">
                    {new Date(
                      sale.date
                    ).toLocaleString()}
                  </p>

                </div>

              </div>

              <div className="text-right">

                <h3 className="font-bold text-emerald-600">
                  C$ {Number(sale.total).toFixed(2)}
                </h3>

                <span
                  className={`
                    text-xs
                    font-semibold
                    px-3
                    py-1
                    rounded-full

                    ${
                      sale.status === "ACTIVA"
                        ? "bg-green-100 text-green-700"
                        : sale.status === "ANULADA"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }
                  `}
                >
                  {sale.status}
                </span>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}