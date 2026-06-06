import type { ProductWithCategory } from "@/types/database";
import { formatCurrency } from "@/lib/format";

type ProductFilter = "all" | "active" | "hidden" | "flash" | "featured";

type ProductListProps = {
  products: ProductWithCategory[];
  totalProducts: number;
  selectedProductId: string | null;
  searchValue: string;
  filter: ProductFilter;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: ProductFilter) => void;
  onSelectProduct: (productId: string) => void;
  onToggleActive: (product: ProductWithCategory) => void;
};

const filters: {
  value: ProductFilter;
  label: string;
}[] = [
  { value: "all", label: "Tất cả" },
  { value: "active", label: "Đang bán" },
  { value: "hidden", label: "Đang ẩn" },
  { value: "flash", label: "Flash" },
  { value: "featured", label: "Nổi bật" },
];

export default function ProductList({
  products,
  totalProducts,
  selectedProductId,
  searchValue,
  filter,
  onSearchChange,
  onFilterChange,
  onSelectProduct,
  onToggleActive,
}: ProductListProps) {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-xl shadow-slate-900/5">
      <div className="border-b border-stone-200 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700">
              Danh sách sản phẩm
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-500">
              {products.length}/{totalProducts} sản phẩm đang hiển thị
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              onSearchChange("");
              onFilterChange("all");
            }}
            className="rounded-full bg-stone-100 px-3 py-2 text-xs font-black text-slate-600 transition hover:bg-stone-200"
          >
            Reset
          </button>
        </div>

        <input
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Tìm tên, slug, mô tả, danh mục..."
          className="mt-4 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-bold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:bg-white"
        />

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {filters.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => onFilterChange(item.value)}
              className={`shrink-0 rounded-full border px-4 py-2 text-xs font-black transition ${
                filter === item.value
                  ? "border-slate-950 bg-slate-950 text-white"
                  : "border-stone-200 bg-white text-slate-600 hover:bg-stone-50"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-h-[780px] overflow-y-auto p-3">
        {products.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 p-8 text-center">
            <p className="font-black text-slate-950">
              Không có sản phẩm phù hợp
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-500">
              Thử đổi bộ lọc hoặc từ khóa tìm kiếm.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {products.map((product) => {
              const stockLeft = Math.max(product.stock - product.sold, 0);
              const isSelected = selectedProductId === product.id;

              return (
                <article
                  key={product.id}
                  className={`rounded-2xl border p-4 transition ${
                    isSelected
                      ? "border-slate-950 bg-slate-950 text-white shadow-lg shadow-slate-950/10"
                      : "border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => onSelectProduct(product.id)}
                    className="w-full text-left"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="line-clamp-2 font-black">
                          {product.name}
                        </p>
                        <p
                          className={`mt-1 text-sm font-semibold ${
                            isSelected ? "text-slate-300" : "text-slate-500"
                          }`}
                        >
                          {product.category?.name ?? "Chưa có danh mục"} · Còn{" "}
                          {stockLeft}
                        </p>
                      </div>

                      <ProductStatusPill isActive={product.is_active} />
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-4">
                      <p className="text-lg font-black">
                        {formatCurrency(product.price)}
                      </p>

                      <div className="flex gap-2">
                        {product.is_featured && <SmallTag label="Nổi bật" />}
                        {product.is_flash_sale && <SmallTag label="Flash" />}
                      </div>
                    </div>
                  </button>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => onToggleActive(product)}
                      className={`rounded-full px-3 py-2 text-xs font-black transition ${
                        product.is_active
                          ? "bg-rose-50 text-rose-700 hover:bg-rose-100"
                          : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                      }`}
                    >
                      {product.is_active ? "Ẩn sản phẩm" : "Hiện sản phẩm"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

function ProductStatusPill({ isActive }: { isActive: boolean }) {
  return (
    <span
      className={`shrink-0 rounded-full border px-3 py-1 text-xs font-black ${
        isActive
          ? "border-emerald-100 bg-emerald-50 text-emerald-700"
          : "border-slate-200 bg-slate-100 text-slate-600"
      }`}
    >
      {isActive ? "Đang bán" : "Đang ẩn"}
    </span>
  );
}

function SmallTag({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-black text-inherit">
      {label}
    </span>
  );
}
