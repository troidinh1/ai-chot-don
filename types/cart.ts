import type { DemoProduct } from "@/types/demo-shop";

export type CartItem = {
  product: DemoProduct;
  quantity: number;
};