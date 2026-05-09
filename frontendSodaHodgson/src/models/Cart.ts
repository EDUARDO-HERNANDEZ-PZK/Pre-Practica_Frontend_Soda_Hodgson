import { Product } from "./Product";

export interface InvoiceDetail{
    id: string;
    quantity: number;
    product: Product;
    subtotal: number;
}