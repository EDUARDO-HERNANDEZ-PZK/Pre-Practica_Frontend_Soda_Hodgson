import { Chart } from "primereact/chart";
import { Trophy } from "lucide-react";

interface Props {
  data: any;
}

export default function TopProductsChart({ data }: Props) {
  return (
    <div
      className="
      bg-white
      rounded-3xl
      shadow-xl
      border
      border-slate-200
      p-7
      relative
      overflow-hidden
      "
    >
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-violet-500/10 rounded-full blur-3xl" />

      <div className="relative z-10">

        <div className="flex justify-between items-center mb-6">

          <div>

            <div className="flex items-center gap-3">

              <Trophy
                className="text-violet-600"
                size={30}
              />

              <h2 className="text-2xl font-bold">
                Productos Más Vendidos
              </h2>

            </div>

            <p className="text-slate-500 mt-2">
              Top 5 del negocio
            </p>

          </div>

        </div>

        <Chart
  type="bar"
  data={data}
  style={{ height: "330px" }}
/>

      </div>

    </div>
  );
}