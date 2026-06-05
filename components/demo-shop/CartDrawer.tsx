import { formatCurrency } from "@/lib/format";
import type { CartItem } from "@/types/cart";

type CartDrawerProps = {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onIncrease: (productId: number) => void;
  onDecrease: (productId: number) => void;
  onRemove: (productId: number) => void;
};

export default function CartDrawer({
  isOpen,
  items,
  onClose,
  onIncrease,
  onDecrease,
  onRemove,
}: CartDrawerProps) {
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

  const totalAmount = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <div
      className={`fixed inset-0 z-[100] transition ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-slate-950/40 backdrop-blur-sm transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[#fffdf8] shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="border-b border-slate-200 bg-white px-5 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-black text-slate-950">Giỏ hàng</p>
              <p className="mt-1 text-sm font-semibold text-slate-500">
                {items.length > 0
                  ? `${totalQuantity} sản phẩm đã chọn`
                  : "Chưa có sản phẩm nào"}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-xl font-black text-slate-700 transition hover:bg-slate-200"
            >
              ×
            </button>
          </div>
        </div>

        {items.length === 0 ? (
          <EmptyCart onClose={onClose} />
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
              {items.map((item) => (
                <CartProductItem
                  key={item.product.id}
                  item={item}
                  onIncrease={onIncrease}
                  onDecrease={onDecrease}
                  onRemove={onRemove}
                />
              ))}
            </div>

            <CartSummary
              totalAmount={totalAmount}
              totalQuantity={totalQuantity}
              onClose={onClose}
            />
          </>
        )}
      </aside>
    </div>
  );
}

function EmptyCart({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-[2rem] bg-slate-100 text-slate-500">
        <CartIcon />
      </div>

      <p className="mt-5 text-xl font-black text-slate-950">
        Giỏ hàng đang trống
      </p>

      <p className="mt-2 text-sm leading-7 text-slate-500">
        Bấm “Mua ngay” ở sản phẩm để thêm vào giỏ hàng.
      </p>

      <button
        type="button"
        onClick={onClose}
        className="mt-6 rounded-full bg-slate-950 px-6 py-3 text-sm font-black text-white"
        style={{ color: "#ffffff" }}
      >
        Tiếp tục mua hàng
      </button>
    </div>
  );
}

function CartProductItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: {
  item: CartItem;
  onIncrease: (productId: number) => void;
  onDecrease: (productId: number) => void;
  onRemove: (productId: number) => void;
}) {
  return (
    <article className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex gap-4">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-orange-50 text-emerald-700">
          <ProductIcon />
        </div>

        <div className="min-w-0 flex-1">
          <p className="line-clamp-2 text-sm font-black text-slate-950">
            {item.product.name}
          </p>

          <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
            {item.product.category}
          </p>

          <div className="mt-3 flex items-center justify-between gap-3">
            <p className="text-base font-black text-red-600">
              {formatCurrency(item.product.price)}
            </p>

            <button
              type="button"
              onClick={() => onRemove(item.product.id)}
              className="text-xs font-black text-slate-400 transition hover:text-red-600"
            >
              Xóa
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 p-1">
          <button
            type="button"
            onClick={() => onDecrease(item.product.id)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg font-black text-slate-700 shadow-sm transition hover:bg-slate-100"
          >
            -
          </button>

          <span className="w-10 text-center text-sm font-black text-slate-950">
            {item.quantity}
          </span>

          <button
            type="button"
            onClick={() => onIncrease(item.product.id)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-lg font-black text-white shadow-sm transition hover:bg-emerald-700"
            style={{ color: "#ffffff" }}
          >
            +
          </button>
        </div>

        <p className="text-sm font-black text-slate-950">
          {formatCurrency(item.product.price * item.quantity)}
        </p>
      </div>
    </article>
  );
}

function CartSummary({
  totalAmount,
  totalQuantity,
  onClose,
}: {
  totalAmount: number;
  totalQuantity: number;
  onClose: () => void;
}) {
  return (
    <div className="border-t border-slate-200 bg-white p-5">
      <div className="mb-4 rounded-2xl bg-slate-50 p-4">
        <div className="flex items-center justify-between text-sm font-bold text-slate-500">
          <span>Số lượng</span>
          <span>{totalQuantity} sản phẩm</span>
        </div>

        <div className="mt-3 flex items-center justify-between text-sm font-bold text-slate-500">
          <span>Tạm tính</span>
          <span>{formatCurrency(totalAmount)}</span>
        </div>

        <div className="mt-3 flex items-center justify-between text-sm font-bold text-slate-500">
          <span>Phí giao hàng</span>
          <span>Tính sau</span>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4">
          <span className="text-base font-black text-slate-950">
            Tổng đơn hàng
          </span>
          <span className="text-2xl font-black text-red-600">
            {formatCurrency(totalAmount)}
          </span>
        </div>
      </div>

      <a
        href="/demo/checkout"
        className="flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 px-5 py-4 text-sm font-black text-white shadow-lg shadow-orange-200 transition hover:scale-[1.01]"
        style={{ color: "#ffffff" }}
      >
        Tiến hành đặt hàng
      </a>

      <button
        type="button"
        onClick={onClose}
        className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-black text-slate-950 transition hover:bg-slate-50"
      >
        Tiếp tục mua hàng
      </button>

      <p className="mt-4 text-center text-xs font-semibold leading-5 text-slate-500">
        Ở bước tiếp theo, khách nhập thông tin nhận hàng và gửi đơn. Đơn được ghi
        nhận ngay sau khi gửi form.
      </p>
    </div>
  );
}

function ProductIcon() {
  return (
    <svg
      className="h-9 w-9 opacity-70"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 3h6v4H9z" />
      <path d="M8 7h8v14H8z" />
      <path d="M10 12h4" />
      <path d="M10 16h4" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      className="h-10 w-10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 6h15l-2 9H8L6 6z" />
      <path d="M6 6L5 3H2" />
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
    </svg>
  );
}