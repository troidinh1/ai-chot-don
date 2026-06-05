import type { CartItem } from "@/types/cart";
import type { DemoProduct } from "@/types/demo-shop";

export function addProductToCart(
  currentItems: CartItem[],
  product: DemoProduct
): CartItem[] {
  const existingItem = currentItems.find(
    (item) => item.product.id === product.id
  );

  if (existingItem) {
    return currentItems.map((item) =>
      item.product.id === product.id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    );
  }

  return [
    ...currentItems,
    {
      product,
      quantity: 1,
    },
  ];
}

export function increaseCartItem(
  currentItems: CartItem[],
  productId: number
): CartItem[] {
  return currentItems.map((item) =>
    item.product.id === productId
      ? {
          ...item,
          quantity: item.quantity + 1,
        }
      : item
  );
}

export function decreaseCartItem(
  currentItems: CartItem[],
  productId: number
): CartItem[] {
  return currentItems
    .map((item) =>
      item.product.id === productId
        ? {
            ...item,
            quantity: item.quantity - 1,
          }
        : item
    )
    .filter((item) => item.quantity > 0);
}

export function removeCartItem(
  currentItems: CartItem[],
  productId: number
): CartItem[] {
  return currentItems.filter((item) => item.product.id !== productId);
}

export function getCartTotal(items: CartItem[]) {
  return items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
}

export function getCartQuantity(items: CartItem[]) {
  return items.reduce((total, item) => total + item.quantity, 0);
}