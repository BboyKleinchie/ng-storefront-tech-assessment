import { CartProduct } from "./cart-product.model";

export interface Cart {
  id: number;
  userId: number;
  date: Date | string;
  products: CartProduct[];
}
