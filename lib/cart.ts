import type { DemoProduct } from "@/types/demo-shop";
import type { CartItem } from "@/types/cart";

export function addToCart(
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
  productId: string
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
  productId: string
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

export function updateCartItemQuantity(
  currentItems: CartItem[],
  productId: string,
  quantity: number
): CartItem[] {
  if (quantity <= 0) {
    return removeCartItem(currentItems, productId);
  }

  return currentItems.map((item) =>
    item.product.id === productId
      ? {
          ...item,
          quantity,
        }
      : item
  );
}

export function removeCartItem(
  currentItems: CartItem[],
  productId: string
): CartItem[] {
  return currentItems.filter((item) => item.product.id !== productId);
}

export function clearCart(): CartItem[] {
  return [];
}

export function getCartCount(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function getCartSubtotal(items: CartItem[]): number {
  return items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
}

export function getCartItemQuantity(
  items: CartItem[],
  productId: string
): number {
  return (
    items.find((item) => item.product.id === productId)?.quantity ?? 0
  );
}