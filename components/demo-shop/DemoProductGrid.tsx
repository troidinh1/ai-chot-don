type DemoProduct = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice: number;
  badge: string;
  description: string;
};

type DemoProductGridProps = {
  products: DemoProduct[];
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("vi-VN").format(value) + "đ";
}

export default function DemoProductGrid({
  products,
  categories,
  activeCategory,
  onCategoryChange,
}: DemoProductGridProps) {
  return (
    <section id="products" className="scroll-mt-32 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700">
              Sản phẩm
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.04em]">
              Danh sách sản phẩm nổi bật
            </h2>
            <p className="mt-3 text-sm font-semibold text-slate-500">
              {products.length} sản phẩm phù hợp với tìm kiếm của bạn.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`rounded-full border px-4 py-2 text-sm font-black transition ${
                  activeCategory === category
                    ? "border-slate-950 bg-slate-950 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:text-emerald-700"
                }`}
                style={{
                  color: activeCategory === category ? "#ffffff" : "#334155",
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {products.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <article
                key={product.id}
                className="group rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200"
              >
                <div className="relative flex h-56 items-center justify-center overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-emerald-100 via-teal-50 to-orange-50 text-emerald-700">
                  <ProductIcon />
                  <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-black text-emerald-700 shadow-sm">
                    {product.badge}
                  </div>
                </div>

                <div className="p-2 pt-4">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">
                    {product.category}
                  </p>

                  <h3 className="mt-2 text-xl font-black">{product.name}</h3>

                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {product.description}
                  </p>

                  <div className="mt-4 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-2xl font-black text-emerald-700">
                        {formatCurrency(product.price)}
                      </p>
                      <p className="text-sm font-bold text-slate-400 line-through">
                        {formatCurrency(product.oldPrice)}
                      </p>
                    </div>

                    <button
                      className="rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-emerald-700"
                      style={{ color: "#ffffff" }}
                    >
                      Đặt hàng
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 text-center">
            <p className="text-xl font-black">Không tìm thấy sản phẩm</p>
            <p className="mt-2 text-sm font-semibold text-slate-500">
              Thử nhập từ khóa khác hoặc chọn lại danh mục.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function ProductIcon() {
  return (
    <svg
      className="h-12 w-12 opacity-70"
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