import DashboardHeader from "../components/layout/dashboard/DashboardHeader";
import StatCard from "../components/layout/dashboard/StatCard";
import QuickActions from "../components/layout/dashboard/QuickActions";
import { useCashSessions } from "../hooks/useCashSession";
import { useSales } from "../hooks/useSales";
import { useTables } from "../hooks/useTables";
import {useProducts} from "../hooks/useProducts";

export default function Dashboard() {
  const { data: cashSessions = [] } = useCashSessions();
  const { data: sales = [] } = useSales();
  const { data: initialTables = [] } = useTables();
  const { data: products = [] } = useProducts();

  const ingresos = cashSessions.reduce(
    (acc, item) => acc + item.opening_balance,
    0
  );
  const facturas= sales.length;
  const tables= initialTables.length;
  const initialProducts= products.length;

  return (
    <div className="flex-1 bg-slate-100 min-h-screen p-4 md:p-8">

      <DashboardHeader />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

        <StatCard
          title="Ventas Hoy"
          value={`C$ ${ingresos}`}
          color="text-cyan-600"
        />

        <StatCard
          title="Facturas"
          value={facturas}
          color="text-emerald-600"
        />

        <StatCard
          title="Mesas"
          value={tables}
          color="text-orange-500"
        />

        <StatCard
          title="Productos"
          value={initialProducts}
          color="text-violet-600"
        />

      </div>

      <div className="mt-8">

        <QuickActions />

      </div>

    </div>
  );
}