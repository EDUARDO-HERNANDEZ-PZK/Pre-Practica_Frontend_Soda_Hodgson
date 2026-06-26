interface Props {
  total: number;
  cartLength: number;
  saleType: "RAPIDA" | "MESA";
  selectedTable: any;
  onCheckout: () => void;
  onClear: () => void;
}

export default function OrderSummary({
  total,
  cartLength,
  saleType,
  selectedTable,
  onCheckout,
  onClear,
}: Props) {
  return (
    <div
      className="
      sticky
      top-6
      rounded-[30px]
      overflow-hidden
      shadow-2xl
      "
    >

      <div
        className="
        bg-gradient-to-br
        from-slate-900
        via-slate-800
        to-cyan-800
        p-7
        text-white
        "
      >

        <p className="uppercase tracking-widest text-cyan-300 text-sm">

          Resumen

        </p>

        <h2 className="text-5xl font-black mt-3">

          C$ {total}

        </h2>

        <div className="flex flex-wrap gap-2 mt-6">

          <span className="bg-white/10 px-3 py-2 rounded-full text-sm">

            {cartLength} Productos

          </span>

          <span className="bg-emerald-500/20 px-3 py-2 rounded-full text-sm">

            {saleType === "RAPIDA"
              ? "🛍 Para Llevar"
              : `🍽 Mesa ${selectedTable?.table_number}`}

          </span>

        </div>

        <button
          onClick={onCheckout}
          disabled={cartLength === 0}
          className="
          mt-8
          w-full
          rounded-2xl
          py-4
          font-bold
          text-lg
          bg-gradient-to-r
          from-emerald-500
          to-green-600
          hover:scale-105
          transition
          disabled:bg-slate-600
          disabled:cursor-not-allowed
          "
        >

          💳 Cobrar

        </button>

        <button
          onClick={onClear}
          className="
          mt-4
          w-full
          rounded-2xl
          py-4
          bg-red-500
          hover:bg-red-600
          transition
          font-bold
          "
        >

          🗑 Vaciar Pedido

        </button>

      </div>

    </div>
  );
}