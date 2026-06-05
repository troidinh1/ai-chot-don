import type { DemoProduct } from "./demo-shop";

export type CartItem = {
  product: DemoProduct;
  quantity: number;
};