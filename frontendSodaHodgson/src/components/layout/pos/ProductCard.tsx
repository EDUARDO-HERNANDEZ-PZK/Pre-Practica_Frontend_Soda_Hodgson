import {
  Plus,
  Package,
  ImageOff,
} from "lucide-react";

interface Props {
  product: any;
  onAdd: (product: any) => void;
}

export default function ProductCard({
  product,
  onAdd,
}: Props) {
  const hasStock = product.stock_current > 0;

  return (
    <div
      className="
        group
        bg-white
        rounded-[28px]
        overflow-hidden
        border
        border-slate-200
        shadow-lg
        hover:shadow-2xl
        hover:-translate-y-2
        transition-all
        duration-300
      "
    >
      {/* Imagen */}

      <div className="relative h-48 bg-slate-100">

        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="
              w-full
              h-full
              object-cover
              group-hover:scale-105
              transition-transform
              duration-500
            "
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageOff
              size={50}
              className="text-slate-400"
            />
          </div>
        )}

        <div className="absolute top-4 left-4">

          <span
            className={`
              px-3
              py-1
              rounded-full
              text-xs
              font-bold
              ${
                hasStock
                  ? "bg-emerald-500 text-white"
                  : "bg-red-500 text-white"
              }
            `}
          >
            {hasStock
              ? `Stock ${product.stock_current}`
              : "Sin stock"}
          </span>

        </div>

      </div>

      {/* Información */}

      <div className="p-5">

        <h2 className="text-xl font-black text-slate-800 line-clamp-1">
          {product.name}
        </h2>

        <div className="flex items-center gap-2 mt-3">

          <Package
            size={18}
            className="text-cyan-600"
          />

          <span className="text-slate-500 text-sm">
            Disponible
          </span>

        </div>

        <h3 className="text-3xl font-black text-cyan-700 mt-5">
          C$ {Number(product.price_sell).toFixed(2)}
        </h3>

        <button
          disabled={!hasStock}
          onClick={() => onAdd(product)}
          className={`
            mt-6
            w-full
            rounded-2xl
            py-3
            font-bold
            flex
            items-center
            justify-center
            gap-2
            transition

            ${
              hasStock
                ? "bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 text-white"
                : "bg-slate-300 text-slate-500 cursor-not-allowed"
            }
          `}
        >

          <Plus size={20} />

          {hasStock ? "Agregar" : "Agotado"}

        </button>

      </div>

    </div>
  );
}