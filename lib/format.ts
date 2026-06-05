export function formatCurrency(value: number) {
  return new Intl.NumberFormat("vi-VN").format(value) + "đ";
}

export function getDiscountPercent(price: number, oldPrice: number | null) {
  if (!oldPrice || oldPrice <= price) return null;

  return Math.round(((oldPrice - price) / oldPrice) * 100);
}