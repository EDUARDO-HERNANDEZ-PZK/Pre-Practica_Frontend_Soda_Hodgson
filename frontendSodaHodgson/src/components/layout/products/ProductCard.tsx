import { Product } from "../../../models/Product";

interface Props {
  product: Product;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ProductCard({
  product,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div
      className="
      bg-white
      rounded-3xl
      overflow-hidden
      border
      border-slate-200
      shadow-lg
      hover:shadow-2xl
      hover:-translate-y-1
      transition-all
      duration-300
      flex
      flex-col
    "
    >
      {/* Imagen */}

      <div className="relative">

        <img
          src={product.imageUrl || "https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png"}
          alt={product.name}
          className="w-full h-52 object-cover"
        />

        <span
          className="
          absolute
          top-4
          left-4
          bg-cyan-500
          text-white
          px-3
          py-1
          rounded-full
          text-xs
          font-bold
          shadow
          "
        >
          {product.category_id}
        </span>

      </div>

      {/* Contenido */}

      <div className="p-6 flex flex-col flex-1">

        <h2 className="text-2xl font-bold text-slate-800">
          {product.name}
        </h2>

        <div className="grid grid-cols-2 gap-4 mt-6">

          <div>

            <p className="text-slate-400 text-sm">
              Precio
            </p>

            <h3 className="text-3xl font-bold text-cyan-600">
              C$ {product.price_sell}
            </h3>

          </div>

          <div className="text-right">

            <p className="text-slate-400 text-sm">
              Stock
            </p>

            <h3
              className={`text-2xl font-bold ${
                product.stock_current <= 10
                  ? "text-red-500"
                  : "text-emerald-600"
              }`}
            >
              {product.stock_current}
            </h3>

          </div>

        </div>

        {/* Estado */}

        <div className="mt-5">

          <span
            className="
            bg-emerald-100
            text-emerald-700
            px-4
            py-2
            rounded-full
            text-sm
            font-semibold
            "
          >
            Disponible
          </span>

        </div>

        {/* Botones */}

        <div className="grid grid-cols-2 gap-3 mt-8">

        <button
  onClick={onEdit}
  className="
    flex-1
    bg-cyan-600
    hover:bg-cyan-700
    text-white
    p-3
    rounded-xl
    font-semibold
  "
>
  Editar
</button>

<button
  onClick={onDelete}
  className="
    flex-1
    bg-red-500
    hover:bg-red-600
    text-white
    p-3
    rounded-xl
    font-semibold
  "
>
  Eliminar
</button>

        </div>

      </div>

    </div>
  );
}