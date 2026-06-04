import { orders } from "../data/orders";

export default function Orders() {
  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold mb-8">
        Pedidos Activos
      </h1>

      <div className="grid grid-cols-3 gap-6">

        {orders.map((order, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl shadow p-6"
          >
            <h2 className="text-2xl font-bold">
              Mesa {order.tableId}
            </h2>

            <p className="mt-2">
              Productos: {order.items.length}
            </p>

            <p className="font-bold mt-2">
              C$ {order.total}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
}