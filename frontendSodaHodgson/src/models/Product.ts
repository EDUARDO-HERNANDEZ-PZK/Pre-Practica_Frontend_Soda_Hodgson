export interface Product {
  id: string;
  name: string;
  imageUrl?: string;//esta propiedad no esta en el backend
  category_id: string;
  unit_id: string;
  description: string;
  price_sell: number;
  stock_current: number;
  stock_min: number;
}