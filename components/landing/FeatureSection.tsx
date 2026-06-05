import { features } from "@/data/landing";

const miniFeatures = [
  {
    title: "Trang bán hàng riêng",
    icon: "store",
  },
  {
    title: "Form đặt hàng nhanh",
    icon: "form",
  },
  {
    title: "Quản lý đơn hàng",
    icon: "orders",
  },
  {
    title: "Lưu khách hàng",
    icon: "users",
  },
  {
    title: "AI tạo caption",
    icon: "ai",
  },
  {
    title: "Kịch bản TikTok",
    icon: "video",
  },
];

const productPreviewItems = [
  {
    name: "Sản phẩm nổi bật",
    price: "189K",
  },
  {
    name: "Combo bán chạy",
    price: "299K",
  },
  {
    name: "Ưu đãi hôm nay",
    price: "159K",
  },
];

const orderStatuses = [
  {
    label: "Đơn mới",
    count: "4 đơn",
  },
  {
    label: "Đã xác nhận",
    count: "5 đơn",
  },
  {
    label: "Đang giao",
    count: "6 đơn",
  },
];

export default function FeatureSection() {
  return (
    <section
      id="features"
      className="relative scroll-mt-28 px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
    >
      <div className="absolute left-[-10%] top-10 h-[420px] w-[420px] rounded-full bg-emerald-400/10 blur-[130px]" />
      <div className="absolute right-[-10%] bottom-10 h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-emerald-300">
            Tính năng chính
          </p>

          <h2 className="mt-5 text-4xl font-black leading-[1.04] tracking-[-0.05em] text-white sm:text-5xl">
            Một bộ công cụ bán hàng gọn nhẹ, đủ để shop bắt đầu chuyên nghiệp.
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-400">
            AI Chốt Đơn không chỉ là trang giới thiệu. Đây là web app giúp shop
            có nơi trưng bày sản phẩm, nhận đơn, quản lý khách hàng và tạo nội
            dung bán hàng bằng AI.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-12">
          <article className="group relative overflow-hidden rounded-[2.4rem] border border-emerald-300/20 bg-gradient-to-br from-emerald-400/20 via-teal-400/10 to-white/[0.05] p-6 shadow-2xl shadow-emerald-500/10 transition duration-300 hover:-translate-y-1 lg:col-span-7 lg:p-7">
            <div className="absolute right-[-80px] top-[-80px] h-72 w-72 rounded-full bg-emerald-300/20 blur-[90px]" />

            <div className="relative grid gap-7 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-lg font-black text-slate-950">
                  01
                </div>

                <p className="text-sm font-black uppercase tracking-[0.22em] text-emerald-200">
                  {features[0]?.eyebrow ?? "Cửa hàng mini"}
                </p>

                <h3 className="mt-4 text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl">
                  {features[0]?.title ?? "Một link bán hàng riêng cho shop"}
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-300">
                  {features[0]?.description ??
                    "Tạo trang bán hàng chuyên nghiệp với sản phẩm, giá, ảnh, feedback, FAQ, nút Zalo và form đặt hàng rõ ràng trên điện thoại."}
                </p>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-slate-950/65 p-4 shadow-2xl shadow-black/25">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-black text-white">
                      Shop của bạn
                    </p>
                    <p className="mt-1 text-xs font-semibold text-slate-500">
                      Giao diện bán hàng
                    </p>
                  </div>

                  <span className="rounded-full bg-emerald-400 px-3 py-1 text-xs font-black text-slate-950">
                    Online
                  </span>
                </div>

                <div className="rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 p-4 text-slate-950">
                  <p className="text-xs font-black uppercase tracking-[0.18em]">
                    Ưu đãi hôm nay
                  </p>
                  <p className="mt-2 text-xl font-black leading-tight">
                    Sản phẩm rõ giá, khách dễ đặt hàng
                  </p>
                </div>

                <div className="mt-4 space-y-3">
                  {productPreviewItems.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.06] p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-300 to-teal-400 text-slate-950">
                          <Icon name="store" />
                        </div>

                        <div>
                          <p className="text-sm font-black text-white">
                            {item.name}
                          </p>
                          <p className="text-xs font-semibold text-slate-500">
                            Có sẵn tại shop
                          </p>
                        </div>
                      </div>

                      <p className="text-sm font-black text-emerald-300">
                        {item.price}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>

          <article className="rounded-[2.4rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-emerald-300/25 lg:col-span-5 lg:p-7">
            <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-400 text-lg font-black text-slate-950">
              02
            </div>

            <p className="text-sm font-black uppercase tracking-[0.22em] text-teal-300">
              {features[1]?.eyebrow ?? "Quản trị bán hàng"}
            </p>

            <h3 className="mt-4 text-3xl font-black tracking-[-0.04em] text-white">
              {features[1]?.title ??
                "Theo dõi đơn hàng, khách hàng và doanh thu"}
            </h3>

            <p className="mt-4 text-sm leading-7 text-slate-400">
              {features[1]?.description ??
                "Chủ shop dễ dàng xem đơn mới, cập nhật trạng thái, lưu khách cũ, theo dõi doanh thu và chăm sóc lại khách hàng."}
            </p>

            <div className="mt-7 space-y-3">
              {orderStatuses.map((status) => (
                <div
                  key={status.label}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.06] p-4 transition hover:bg-white/[0.09]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300">
                      <Icon name="orders" />
                    </div>

                    <span className="text-sm font-bold text-white">
                      {status.label}
                    </span>
                  </div>

                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-black text-emerald-300">
                    {status.count}
                  </span>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[2.4rem] border border-orange-300/15 bg-gradient-to-br from-orange-400/12 via-white/[0.055] to-transparent p-6 backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-orange-300/30 lg:col-span-5 lg:p-7">
            <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-400 text-lg font-black text-slate-950">
              03
            </div>

            <p className="text-sm font-black uppercase tracking-[0.22em] text-orange-300">
              {features[2]?.eyebrow ?? "AI chốt đơn"}
            </p>

            <h3 className="mt-4 text-3xl font-black tracking-[-0.04em] text-white">
              {features[2]?.title ??
                "Tạo nội dung bán hàng nhanh hơn bằng AI"}
            </h3>

            <p className="mt-4 text-sm leading-7 text-slate-400">
              {features[2]?.description ??
                "AI hỗ trợ viết caption, mô tả sản phẩm, tin nhắn trả lời khách và kịch bản TikTok để shop bán hàng đều hơn."}
            </p>

            <div className="mt-7 rounded-3xl border border-orange-300/15 bg-orange-300/10 p-5">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-400 text-slate-950">
                <Icon name="ai" />
              </div>

              <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-200">
                AI gợi ý
              </p>
              <p className="mt-3 text-sm font-bold leading-7 text-white">
                “Viết caption TikTok cho sản phẩm mới, giọng tự nhiên, dễ chốt
                đơn và phù hợp khách nữ 18-30 tuổi.”
              </p>
            </div>
          </article>

          <article className="rounded-[2.4rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-black/15 lg:col-span-7 lg:p-7">
            <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-emerald-300">
                  Bộ tính năng đi kèm
                </p>
                <h3 className="mt-3 text-3xl font-black tracking-[-0.04em] text-white">
                  Đủ gọn để dễ dùng, đủ sâu để bán thật.
                </h3>
              </div>

              <span className="w-fit rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-xs font-black text-emerald-200">
                Mobile-first
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {miniFeatures.map((item) => (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-white/10 bg-white/[0.06] p-4 transition hover:-translate-y-1 hover:border-emerald-300/25 hover:bg-emerald-300/10"
                >
                  <IconBadge name={item.icon} />
                  <p className="mt-4 text-sm font-black text-white">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function IconBadge({ name }: { name: string }) {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-400 text-slate-950 shadow-lg shadow-emerald-500/20 transition group-hover:scale-110">
      <Icon name={name} />
    </div>
  );
}

function Icon({ name }: { name: string }) {
  if (name === "store") {
    return (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 10h16" />
        <path d="M5 10l1-5h12l1 5" />
        <path d="M6 10v9h12v-9" />
        <path d="M9 19v-5h6v5" />
      </svg>
    );
  }

  if (name === "form") {
    return (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 6h10" />
        <path d="M8 12h10" />
        <path d="M8 18h6" />
        <path d="M4 6h.01" />
        <path d="M4 12h.01" />
        <path d="M4 18h.01" />
      </svg>
    );
  }

  if (name === "orders") {
    return (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 3h12l2 4v14H4V7l2-4z" />
        <path d="M4 7h16" />
        <path d="M9 12h6" />
        <path d="M9 16h4" />
      </svg>
    );
  }

  if (name === "users") {
    return (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
        <circle cx="9.5" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  }

  if (name === "ai") {
    return (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2l1.6 5.2L19 9l-5.4 1.8L12 16l-1.6-5.2L5 9l5.4-1.8L12 2z" />
        <path d="M19 15l.8 2.6L22 18.5l-2.2.9L19 22l-.8-2.6-2.2-.9 2.2-.9L19 15z" />
      </svg>
    );
  }

  if (name === "video") {
    return (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="5" width="14" height="14" rx="3" />
        <path d="M17 9l4-2v10l-4-2" />
        <path d="M9 9l4 3-4 3V9z" />
      </svg>
    );
  }

  return null;
}