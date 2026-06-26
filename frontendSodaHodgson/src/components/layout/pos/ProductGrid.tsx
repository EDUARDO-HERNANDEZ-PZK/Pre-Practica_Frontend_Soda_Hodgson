import { Search } from "lucide-react";
import ProductCard from "./ProductCard";

interface Props {
  products: any[];
  search: string;
  onSearch: (value: string) => void;
  onAdd: (product: any) => void;
}

export default function ProductGrid({
  products,
  search,
  onSearch,
  onAdd,
}: Props) {

  const filteredProducts = products.filter((product) =>
    product.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (

    <div className="space-y-6">

      {/* Buscador */}

      <div className="relative">

        <Search
          className="absolute left-5 top-4 text-slate-400"
          size={22}
        />

        <input
  type="text"
  placeholder="Buscar hamburguesa, bebida..."
  value={search}
  onChange={(e) => onSearch(e.target.value)}
  className="
    w-full
    rounded-3xl
    bg-white
    border
    border-slate-200
    py-5
    pl-16
    pr-5
    text-lg
    shadow-lg
    focus:border-cyan-500
    focus:ring-4
    focus:ring-cyan-200
    outline-none
    transition
  "
/>

      </div>

      {/* Productos */}

     <div
  className="
    grid
    grid-cols-1
    sm:grid-cols-2
    xl:grid-cols-3
    gap-8
  "
>

        {filteredProducts.map((product) => (

          <ProductCard
            key={product.id}
            product={product}
            onAdd={onAdd}
          />

        ))}

      </div>

    </div>

  );

}