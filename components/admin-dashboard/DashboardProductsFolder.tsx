import type { ProductWithCategory } from "@/types/database";
import { formatCurrency } from "@/lib/format";

type DashboardProductsFolderProps = {
  products: ProductWithCategory[];
};

export default function DashboardProductsFolder({
  products,
}: DashboardProductsFolderProps) {
  const saleCandidates = [...products]
    .filter((product) => product.is_active)
    .sort((a, b) => {
      const aLeft = Math.max(a.stock - a.sold, 0);
      const bLeft = Math.max(b.stock - b.sold, 0);

      return bLeft - aLeft;
    })
    .slice(0, 6);

  return (
    <div>
      <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-2xl font-black tracking-[-0.04em] text-slate-950">
            Sản phẩm nên đẩy bán
          </h3>
          <p className="mt-1 text-sm font-semibold text-slate-500">
            Ưu tiên sản phẩm đang bán, tồn còn nhiều hoặc có thể đưa vào sale.
          </p>
        </div>

        <a
          href="/admin/products"
          className="w-fit rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white"
        >
          <span className="solid-white-text">Mở sản phẩm</span>
        </a>
      </div>

      {saleCandidates.length === 0 ? (
        <EmptyState text="Chưa có sản phẩm đang bán." />
      ) : (
        <div className="grid gap-3 lg:grid-cols-2">
          {saleCandidates.map((product) => {
            const left = Math.max(product.stock - product.sold, 0);

            return (
              <article
                key={product.id}
                className="rounded-2xl border border-stone-200 bg-stone-50 p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="line-clamp-2 font-black text-slate-950">
                      {product.name}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-500">
                      {product.category?.name ?? "Chưa có danh mục"} · Còn{" "}
                      {left}
                    </p>
                  </div>

                  {product.is_flash_sale ? (
                    <span className="rounded-full border border-rose-100 bg-rose-50 px-3 py-1 text-xs font-black text-rose-700">
                      Flash
                    </span>
                  ) : (
                    <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
                      Đang bán
                    </span>
                  )}
                </div>

                <p className="mt-4 text-lg font-black text-rose-600">
                  {formatCurrency(product.price)}
                </p>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 p-8 text-center">
      <p className="font-black text-slate-950">{text}</p>
    </div>
  );
}
