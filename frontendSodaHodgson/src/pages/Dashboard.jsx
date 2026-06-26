import DashboardHeader from "../components/layout/dashboard/DashboardHeader";
import QuickActions from "../components/layout/dashboard/QuickActions";
import StatsCards from "../components/layout/dashboard/StatsCards";
import SalesChart from "../components/layout/dashboard/SalesChart";
import TopProductsChart from "../components/layout/dashboard/TopProductsChart";
import RecentActivity from "../components/layout/dashboard/RecentActivity";
import SystemStatus from "../components/layout/dashboard/SystemStatus";
import { useCashSessions } from "../hooks/useCashSession";
import { useSales } from "../hooks/useSales";
import { useSalesDetails } from "../hooks/useSalesDetail";
import { useTables } from "../hooks/useTables";
import {useProducts} from "../hooks/useProducts";

export default function Dashboard() {
  const { data: cashSessions = [] } = useCashSessions();
  const { data: sales = [] } = useSales();
  const { data: initialTables = [] } = useTables();
  const { data: products = [] } = useProducts();
  const { data: salesDetails = [] } = useSalesDetails();

  const user = JSON.parse(
  localStorage.getItem("user") || "{}"
);

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

    <DashboardHeader user={user} />

    <StatsCards
  ingresos={ingresos}
  facturas={facturas}
  tables={tables}
  products={initialProducts}
/>
     

      <div className="mt-8">

        <QuickActions />

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">

  <SalesChart
    data={salesChartData}
  />

  <TopProductsChart
    data={topProductsChartData}
  />

</div>

{/* NUEVOS PANELES */}

<div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">

  <RecentActivity />

  <SystemStatus user={user} />

</div>

    </div>
  );
}