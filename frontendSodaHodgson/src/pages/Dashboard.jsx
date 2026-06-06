import DashboardHeader from "../components/layout/dashboard/DashboardHeader";
import StatCard from "../components/layout/dashboard/StatCard";
import QuickActions from "../components/layout/dashboard/QuickActions";

export default function Dashboard() {
  return (
    <div className="flex-1 bg-slate-100 min-h-screen p-4 md:p-8">

      <DashboardHeader />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

        <StatCard
          title="Ventas Hoy"
          value="C$ 5,200"
          color="text-cyan-600"
        />

        <StatCard
          title="Facturas"
          value="25"
          color="text-emerald-600"
        />

        <StatCard
          title="Mesas"
          value="12"
          color="text-orange-500"
        />

        <StatCard
          title="Productos"
          value="140"
          color="text-violet-600"
        />

      </div>

      <div className="mt-8">

        <QuickActions />

      </div>

    </div>
  );
}