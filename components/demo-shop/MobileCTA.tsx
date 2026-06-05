import type { DemoShop } from "@/types/demo-shop";

type MobileCTAProps = {
  shop: DemoShop;
  cartCount: number;
  onOpenCart: () => void;
};

export default function MobileCTA({
  shop,
  cartCount,
  onOpenCart,
}: MobileCTAProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 p-3 backdrop-blur-2xl md:hidden">
      <div className="grid grid-cols-3 gap-2">
        <a
          href={`tel:${shop.phone}`}
          className="rounded-2xl bg-slate-950 px-3 py-3 text-center text-xs font-black text-white"
          style={{ color: "#ffffff" }}
        >
          Gọi shop
        </a>
        <a
          href={shop.zalo}
          target="_blank"
          rel="noreferrer"
          className="rounded-2xl bg-emerald-600 px-3 py-3 text-center text-xs font-black text-white"
          style={{ color: "#ffffff" }}
        >
          Zalo
        </a>
        <button
          onClick={onOpenCart}
          className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center text-xs font-black text-slate-950"
        >
          Giỏ {cartCount}
        </button>
      </div>
    </div>
  );
}