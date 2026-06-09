export default interface SalesDetail {
  id: string;
  sale_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

export type CreateSalesDetailDto = Omit<SalesDetail, "id">;
