import React from "react";
import {
  Wallet,
  Receipt,
  UtensilsCrossed,
  Package,
} from "lucide-react";

import StatCard from "./StatCard";

interface Props {
  ingresos: number;
  facturas: number;
  tables: number;
  products: number;
}

const StatsCards: React.FC<Props> = ({
  ingresos,
  facturas,
  tables,
  products,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

      <StatCard
        icon={<Wallet size={30} />}
        title="Ventas del Día"
        value={`C$ ${ingresos.toLocaleString()}`}
        color="bg-gradient-to-br from-cyan-500 to-blue-700"
      />

      <StatCard
        icon={<Receipt size={30} />}
        title="Facturas"
        value={facturas}
        color="bg-gradient-to-br from-emerald-500 to-green-700"
      />

      <StatCard
        icon={<UtensilsCrossed size={30} />}
        title="Mesas"
        value={tables}
        color="bg-gradient-to-br from-orange-500 to-red-500"
      />

      <StatCard
        icon={<Package size={30} />}
        title="Productos"
        value={products}
        color="bg-gradient-to-br from-violet-500 to-purple-700"
      />

    </div>
  );
};

export default StatsCards;