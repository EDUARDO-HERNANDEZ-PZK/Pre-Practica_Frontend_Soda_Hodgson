import {
  Minus,
  Plus,
  ShoppingCart,
} from "lucide-react";

interface Props {
  cart: any[];
  saleType: "RAPIDA" | "MESA";
  selectedTable: any;
  addProduct: (product: any) => void;
  removeProduct: (id: string) => void;
}

export default function Cart({
  cart,
  saleType,
  selectedTable,
  addProduct,
  removeProduct,
}: Props) {
  return (
    <div
      className="
      bg-white
      rounded-[30px]
      shadow-xl
      border
      border-slate-200
      p-6
      "
    >
      {/* ENCABEZADO */}

      <div className="flex justify-between items-start mb-6">

        <div>

          <h2 className="text-3xl font-black text-slate-800">
            Pedido Actual
          </h2>

          <div className="flex items-center gap-3 mt-3">

            <span
              className="
              px-3
              py-1
              rounded-full
              bg-emerald-100
              text-emerald-700
              text-sm
              font-semibold
              "
            >
              {saleType === "RAPIDA"
                ? "🛍 Venta rápida"
                : `🍽 Mesa ${selectedTable?.table_number ?? ""}`}
            </span>

            <span className="text-slate-500 text-sm">
              {cart.length} producto{cart.length !== 1 ? "s" : ""}
            </span>

          </div>

        </div>

        <ShoppingCart
          size={34}
          className="text-cyan-600"
        />

      </div>

      {cart.length === 0 ? (

        <div className="text-center py-20">

          <ShoppingCart
            size={70}
            className="mx-auto text-slate-300"
          />

          <h3 className="text-2xl font-bold mt-5">
            Carrito vacío
          </h3>

          <p className="text-slate-500 mt-2">
            Agrega productos para comenzar.
          </p>

        </div>

      ) : (

        <div>

          {/* CABECERA */}

          <div
            className="
            grid
            grid-cols-12
            gap-4
            bg-cyan-50
            rounded-2xl
            px-4
            py-3
            mb-4
            text-sm
            font-bold
            text-cyan-700
            "
          >

            <div className="col-span-5">
              Producto
            </div>

            <div className="col-span-2 text-center">
              Cant.
            </div>

            <div className="col-span-2 text-center">
              Subtotal
            </div>

            <div className="col-span-3 text-center">
              Acción
            </div>

          </div>

          {/* PRODUCTOS */}

          <div className="space-y-2">

            {cart.map((item) => (

              <div
                key={item.id}
                className="
                grid
                grid-cols-12
                items-center
                gap-4
                py-3
                px-3
                rounded-2xl
                hover:bg-slate-50
                transition
                "
              >

                {/* PRODUCTO */}

                <div className="col-span-5">

                  <h3 className="font-semibold text-slate-800">
                    {item.product.name}
                  </h3>

                  <p className="text-sm text-slate-500">
                    C$ {item.product.price_sell}
                  </p>

                </div>

                {/* CANTIDAD */}

                <div className="col-span-2 text-center">

                  <span
                    className="
                    inline-flex
                    items-center
                    justify-center
                    w-10
                    h-10
                    rounded-xl
                    bg-slate-100
                    font-bold
                    "
                  >
                    {item.quantity}
                  </span>

                </div>

                {/* SUBTOTAL */}

                <div className="col-span-2 text-center">

                  <span className="font-bold text-cyan-700">
                    C$ {item.subtotal}
                  </span>

                </div>

                {/* ACCIONES */}

                <div className="col-span-3">

                  <div className="flex justify-center gap-2">

                    <button
                      onClick={() => removeProduct(item.id)}
                      className="
                      w-9
                      h-9
                      rounded-xl
                      bg-red-100
                      hover:bg-red-500
                      hover:text-white
                      transition
                      flex
                      items-center
                      justify-center
                      "
                    >
                      <Minus size={16}/>
                    </button>

                    <button
                      onClick={() => addProduct(item.product)}
                      className="
                      w-9
                      h-9
                      rounded-xl
                      bg-emerald-100
                      hover:bg-emerald-500
                      hover:text-white
                      transition
                      flex
                      items-center
                      justify-center
                      "
                    >
                      <Plus size={16}/>
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      )}

    </div>
  );
}