import DashboardHeader from "../components/layout/dashboard/DashboardHeader";
import StatCard from "../components/layout/dashboard/StatCard";
import QuickActions from "../components/layout/dashboard/QuickActions";
import { useCashSessions } from "../hooks/useCashSession";
import { useSales } from "../hooks/useSales";
import { useSalesDetails } from "../hooks/useSalesDetail";
import { useTables } from "../hooks/useTables";
import {useProducts} from "../hooks/useProducts";
import { Chart } from "primereact/chart";

export default function Dashboard() {
  const { data: cashSessions = [] } = useCashSessions();
  const { data: sales = [] } = useSales();
  const { data: initialTables = [] } = useTables();
  const { data: products = [] } = useProducts();
  const { data: salesDetails = [] } = useSalesDetails();

  const ingresos = cashSessions.reduce(
    (acc, item) => acc + item.opening_balance,
    0
  );
  const facturas= sales.length;
  const tables= initialTables.length;
  const initialProducts= products.length;

  const productsSoldMap = salesDetails.reduce((acc, detail) => {
  acc[detail.product_id] =
    (acc[detail.product_id] || 0) + detail.quantity;

  return acc;
}, {});

const topProducts = Object.entries(productsSoldMap)
  .map(([productId, quantity]) => ({
    name:
      products.find((p) => p.id === productId)?.name ||
      "Desconocido",
    quantity,
  }))
  .sort((a, b) => b.quantity - a.quantity)
  .slice(0, 5);

  const topProductsChartData = {
  labels: topProducts.map((p) => p.name),
  datasets: [
    {
      label: "Unidades vendidas",
      data: topProducts.map((p) => p.quantity),
    },
  ],
};

const totalsBySale = salesDetails.reduce((acc, detail) => {
  acc[detail.sale_id] =
    (acc[detail.sale_id] || 0) + detail.subtotal;

  return acc;
}, {});

const salesByDay = sales.reduce((acc, sale) => {
  const date = new Date(sale.sale_time)
    .toLocaleDateString();

  const total = totalsBySale[sale.id] || 0;

  acc[date] = (acc[date] || 0) + total;

  return acc;
}, {});

const salesChartData = {
  labels: Object.keys(salesByDay),
  datasets: [
    {
      label: "Ventas C$",
      data: Object.values(salesByDay),
    },
  ],
};

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

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
  <div className="bg-white rounded-xl shadow p-6">
    <h3 className="text-lg font-semibold mb-4">
      Ventas por Día
    </h3>

    <Chart
      type="line"
      data={salesChartData}
    />
  </div>

  <div className="bg-white rounded-xl shadow p-6">
    <h3 className="text-lg font-semibold mb-4">
      Top 5 Productos Más Vendidos
    </h3>

    <Chart
      type="bar"
      data={topProductsChartData}
    />
  </div>
</div>

    </div>
  );
}