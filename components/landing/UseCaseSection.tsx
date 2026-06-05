import { shopTypes } from "@/data/landing";

const customerProblems = [
  {
    before: "Trước đây",
    title: "Khách hỏi giá lặp lại",
    description:
      "Sản phẩm nằm rải rác trên bài đăng, khách phải inbox hỏi từng món.",
  },
  {
    before: "Sau khi dùng",
    title: "Một link xem đủ thông tin",
    description:
      "Khách xem sản phẩm, giá, ưu đãi, feedback và gửi đơn trong một trang.",
  },
];

const useCaseCards = [
  {
    title: "Shop bán qua TikTok",
    description:
      "Gắn link shop mini vào bio, video hoặc phần mô tả để khách xem sản phẩm ngay sau khi thấy nội dung.",
    icon: "video",
  },
  {
    title: "Shop bán qua Facebook",
    description:
      "Gửi một link gọn trong comment, inbox, fanpage để khách không phải kéo nhiều bài viết.",
    icon: "facebook",
  },
  {
    title: "Shop bán qua Zalo",
    description:
      "Dùng link shop như catalogue mini, khách xem sản phẩm trước rồi nhắn Zalo chốt nhanh hơn.",
    icon: "chat",
  },
];

export default function UseCaseSection() {
  return (
    <section
      id="usecases"
      className="relative scroll-mt-28 px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
    >
      <div className="absolute left-0 top-1/4 h-[420px] w-[420px] rounded-full bg-orange-400/10 blur-[130px]" />
      <div className="absolute right-0 bottom-10 h-[420px] w-[420px] rounded-full bg-emerald-400/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-orange-300">
              Phù hợp với ai?
            </p>

            <h2 className="mt-5 max-w-3xl text-4xl font-black leading-[1.04] tracking-[-0.05em] text-white sm:text-5xl">
              Dành cho shop nhỏ đang bán tốt trên mạng xã hội nhưng quản lý còn
              thủ công.
            </h2>
          </div>

          <p className="max-w-2xl text-base leading-8 text-slate-400 lg:ml-auto">
            AI Chốt Đơn phù hợp với các shop đang bán qua TikTok, Facebook, Zalo
            và cần một kênh chốt đơn riêng chuyên nghiệp hơn.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[2.6rem] border border-white/10 bg-gradient-to-br from-orange-400/12 via-white/[0.06] to-emerald-400/10 p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-orange-300">
              Từ rối sang gọn
            </p>

            <div className="mt-7 space-y-4">
              {customerProblems.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-5"
                >
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                    {item.before}
                  </p>
                  <h3 className="mt-3 text-2xl font-black text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[2rem] bg-white p-5 text-slate-950">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
                <UseCaseIcon name="result" />
              </div>

              <p className="text-sm font-black">Kết quả mong muốn</p>
              <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">
                Khách hiểu sản phẩm nhanh hơn, shop nhận đơn rõ hơn, nội dung
                bán hàng có nơi dẫn về chuyên nghiệp hơn.
              </p>
            </div>
          </div>

          <div className="grid gap-5">
            <div className="rounded-[2.6rem] border border-white/10 bg-slate-950/70 p-6 sm:p-8">
              <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-emerald-300">
                    Nhóm shop phù hợp
                  </p>
                  <h3 className="mt-3 text-3xl font-black tracking-[-0.04em] text-white">
                    Những ngành dễ triển khai trước.
                  </h3>
                </div>

                <span className="w-fit rounded-full bg-emerald-400 px-4 py-2 text-xs font-black text-slate-950">
                  Ưu tiên shop nhỏ
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {shopTypes.map((item) => (
                  <div
                    key={item}
                    className="group rounded-2xl border border-white/10 bg-white/[0.06] p-4 transition hover:-translate-y-1 hover:border-emerald-300/25 hover:bg-emerald-300/10"
                  >
                    <ShopTypeIcon name={item} />
                    <p className="mt-4 text-sm font-black text-white">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {useCaseCards.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 transition hover:-translate-y-1 hover:border-orange-300/25"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-300 to-emerald-400 text-slate-950">
                    <UseCaseIcon name={item.icon} />
                  </div>

                  <p className="text-lg font-black text-white">{item.title}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ShopTypeIcon({ name }: { name: string }) {
  const iconType = getShopIconType(name);

  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-400 text-slate-950 shadow-lg shadow-emerald-500/20 transition group-hover:scale-110">
      <UseCaseIcon name={iconType} />
    </div>
  );
}

function getShopIconType(name: string) {
  const lowerName = name.toLowerCase();

  if (lowerName.includes("mỹ phẩm")) return "beauty";
  if (lowerName.includes("thời trang")) return "fashion";
  if (lowerName.includes("ăn") || lowerName.includes("đồ")) return "food";
  if (lowerName.includes("đặc sản")) return "local";
  if (lowerName.includes("handmade") || lowerName.includes("phụ kiện")) {
    return "handmade";
  }
  if (lowerName.includes("mẹ") || lowerName.includes("bé")) return "baby";

  return "local";
}

function UseCaseIcon({ name }: { name: string }) {
  if (name === "beauty") {
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
        <path d="M9 3h6v4H9z" />
        <path d="M8 7h8v14H8z" />
        <path d="M10 12h4" />
      </svg>
    );
  }

  if (name === "fashion") {
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
        <path d="M8 4l4 3 4-3 4 4-3 3v10H7V11L4 8l4-4z" />
        <path d="M12 7v14" />
      </svg>
    );
  }

  if (name === "food") {
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
        <path d="M6 10v8a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-8" />
        <path d="M8 6h.01" />
        <path d="M12 4h.01" />
        <path d="M16 6h.01" />
      </svg>
    );
  }

  if (name === "local") {
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
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    );
  }

  if (name === "handmade") {
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
        <path d="M12 3l8 4-8 4-8-4 8-4z" />
        <path d="M4 12l8 4 8-4" />
        <path d="M4 17l8 4 8-4" />
      </svg>
    );
  }

  if (name === "baby") {
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
        <circle cx="12" cy="8" r="4" />
        <path d="M6 21v-2a6 6 0 0 1 12 0v2" />
        <path d="M10 8h.01" />
        <path d="M14 8h.01" />
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

  if (name === "facebook") {
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
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    );
  }

  if (name === "chat") {
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
        <path d="M21 12a8 8 0 0 1-8 8H7l-4 3 1.5-5A8 8 0 1 1 21 12z" />
        <path d="M8 12h.01" />
        <path d="M12 12h.01" />
        <path d="M16 12h.01" />
      </svg>
    );
  }

  if (name === "result") {
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
        <path d="M20 6L9 17l-5-5" />
      </svg>
    );
  }

  return null;
}