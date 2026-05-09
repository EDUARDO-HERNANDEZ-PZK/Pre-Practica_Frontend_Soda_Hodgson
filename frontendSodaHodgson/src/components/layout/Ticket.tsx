import React from "react";
import { InvoiceDetail } from "../../models/Cart";

interface TicketProps {
  cart: InvoiceDetail[];
  total: number;
  paymentMethod: string;
  cash: number;
  change: number;
}

const Ticket: React.FC<TicketProps> = ({
  cart,
  total,
  paymentMethod,
  cash,
  change,
}) => {
  const date = new Date();

  const invoiceNumber = Math.floor(Math.random() * 100000);

  return (
    <div className="bg-white p-6 w-[350px] text-black">
      <div className="text-center border-b pb-4">
        <h1 className="text-3xl font-bold">Soda Hodgson</h1>

        <p>Parque Central, Masaya</p>

        <p className="mt-2">Factura #: {invoiceNumber}</p>

        <p>{date.toLocaleDateString()}</p>

        <p>{date.toLocaleTimeString()}</p>
      </div>

      {/* PRODUCTOS */}
      <div className="mt-6">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between mb-3">
            <div>
              <p className="font-semibold">{item.product.name}</p>

              <p className="text-sm text-slate-500">
                {item.quantity} x C$ {item.product.price}
              </p>
            </div>

            <p className="font-bold">C$ {item.subtotal}</p>
          </div>
        ))}
      </div>

      {/* TOTAL */}
      <div className="border-t pt-4 mt-4">
        <div className="flex justify-between">
          <span>Total:</span>
          <span className="font-bold">C$ {total}</span>
        </div>

        <div className="flex justify-between mt-2">
          <span>Pago:</span>
          <span>{paymentMethod}</span>
        </div>

        <div className="flex justify-between mt-2">
          <span>Recibido:</span>
          <span>C$ {cash}</span>
        </div>

        <div className="flex justify-between mt-2">
          <span>Cambio:</span>
          <span className="font-bold text-green-600">C$ {change}</span>
        </div>
      </div>

      <div className="text-center mt-8 border-t pt-4">
        <p className="font-bold">¡Gracias por su compra!</p>
      </div>
    </div>
  );
};

export default Ticket;
