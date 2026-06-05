import {
  demoCategories,
  demoFaqs,
  demoProducts,
  demoShop,
  demoTestimonials,
} from "@/data/demo-shop";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("vi-VN").format(value) + "đ";
}

export default function DemoShopPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f2] text-slate-950">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-sm font-black text-white">
              LB
            </div>

            <div>
              <p className="text-base font-black">{demoShop.name}</p>
              <p className="hidden text-xs font-bold text-slate-500 sm:block">
                {demoShop.slogan}
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-bold text-slate-600 md:flex">
            <a href="#products" className="transition hover:text-emerald-700">
              Sản phẩm
            </a>
            <a href="#feedback" className="transition hover:text-emerald-700">
              Feedback
            </a>
            <a href="#faq" className="transition hover:text-emerald-700">
              FAQ
            </a>
          </nav>

          <a
            href={demoShop.zalo}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-black text-white transition hover:bg-emerald-700"
          >
            Chat Zalo
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="absolute right-[-10%] top-10 h-[420px] w-[420px] rounded-full bg-emerald-200 blur-[120px]" />
        <div className="absolute left-[-10%] bottom-0 h-[420px] w-[420px] rounded-full bg-orange-100 blur-[120px]" />

        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-800">
              Ưu đãi hôm nay cho khách đặt online
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-[0.96] tracking-[-0.06em] sm:text-6xl">
              Mỹ phẩm dễ dùng, rõ giá, đặt hàng nhanh.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              {demoShop.description} Khách có thể xem sản phẩm, chọn combo và
              gửi thông tin đặt hàng ngay trên điện thoại.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#products"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-7 py-4 text-sm font-black text-white transition hover:bg-emerald-700"
              >
                Xem sản phẩm
              </a>

              <a
                href={demoShop.zalo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-4 text-sm font-black text-slate-950 transition hover:border-emerald-300 hover:text-emerald-700"
              >
                Tư vấn qua Zalo
              </a>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
              <MiniStat value="6+" label="sản phẩm" />
              <MiniStat value="20%" label="ưu đãi" />
              <MiniStat value="24h" label="xác nhận" />
            </div>
          </div>

          <div className="rounded-[2.5rem] bg-slate-950 p-4 shadow-2xl shadow-slate-300">
            <div className="rounded-[2rem] bg-white p-5">
              <div className="rounded-[1.6rem] bg-gradient-to-br from-emerald-500 to-teal-600 p-6 text-white">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-100">
                  Combo nổi bật
                </p>
                <h2 className="mt-3 text-3xl font-black">
                  Skincare sáng da chỉ từ 299K
                </h2>
                <p className="mt-3 text-sm font-semibold leading-6 text-emerald-50">
                  Phù hợp cho khách muốn routine đơn giản, tiết kiệm và dễ dùng.
                </p>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {demoProducts.slice(0, 4).map((product) => (
                  <div
                    key={product.id}
                    className="rounded-3xl border border-slate-200 bg-slate-50 p-3"
                  >
                    <div className="h-24 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100" />
                    <p className="mt-3 text-sm font-black">{product.name}</p>
                    <p className="mt-1 text-sm font-black text-emerald-700">
                      {formatCurrency(product.price)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700">
                Sản phẩm
              </p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.04em]">
                Danh sách sản phẩm nổi bật
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {demoCategories.map((category) => (
                <button
                  key={category}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {demoProducts.map((product) => (
              <article
                key={product.id}
                className="group rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200"
              >
                <div className="relative h-56 overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-emerald-100 via-teal-50 to-orange-50">
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

                    <button className="rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-emerald-700">
                      Đặt hàng
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="feedback" className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-slate-950 p-6 text-white sm:p-8 lg:p-10">
          <div className="mb-8">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-300">
              Feedback
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.04em]">
              Khách hàng nói gì?
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {demoTestimonials.map((item) => (
              <article
                key={item.name}
                className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5"
              >
                <p className="text-sm leading-7 text-slate-300">
                  “{item.content}”
                </p>
                <p className="mt-5 font-black">{item.name}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700">
              FAQ
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.04em]">
              Câu hỏi thường gặp
            </h2>
          </div>

          <div className="space-y-4">
            {demoFaqs.map((item) => (
              <div
                key={item.question}
                className="rounded-[2rem] border border-slate-200 bg-white p-6"
              >
                <p className="text-lg font-black">{item.question}</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MobileCTA />
    </main>
  );
}

function MiniStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-2xl font-black">{value}</p>
      <p className="mt-1 text-xs font-bold text-slate-500">{label}</p>
    </div>
  );
}

function MobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 p-3 backdrop-blur-2xl md:hidden">
      <div className="grid grid-cols-2 gap-2">
        <a
          href={`tel:${demoShop.phone}`}
          className="rounded-2xl bg-slate-950 px-4 py-3 text-center text-sm font-black text-white"
        >
          Gọi shop
        </a>
        <a
          href={demoShop.zalo}
          target="_blank"
          rel="noreferrer"
          className="rounded-2xl bg-emerald-600 px-4 py-3 text-center text-sm font-black text-white"
        >
          Chat Zalo
        </a>
      </div>
    </div>
  );
}