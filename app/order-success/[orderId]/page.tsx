import { notFound } from "next/navigation";
import { getOrderById } from "@/lib/supabase/queries";
import { formatCurrency } from "@/lib/format";

type OrderSuccessPageProps = {
  params: Promise<{
    orderId: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function OrderSuccessPage({
  params,
}: OrderSuccessPageProps) {
  const { orderId } = await params;

  try {
    const order = await getOrderById(orderId);

    return (
      <main className="min-h-screen bg-[#f6f2ec] px-4 py-8 text-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-[2rem] border border-[#eadfce] bg-white p-6 text-center shadow-xl shadow-slate-900/5 sm:p-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-3xl text-white">
              ✓
            </div>

            <h1 className="mt-5 text-4xl font-black tracking-[-0.05em] text-slate-950">
              Đặt hàng thành công
            </h1>

            <p className="mt-3 text-sm font-semibold leading-7 text-slate-500">
              Đơn hàng của bạn đã được gửi vào hệ thống. Shop sẽ xử lý và liên
              hệ nếu cần xác nhận thêm thông tin giao hàng.
            </p>

            <div className="mx-auto mt-6 max-w-md rounded-2xl border border-[#eadfce] bg-[#fffdf8] p-5 text-left">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-slate-500">Mã đơn</p>
                <p className="font-black text-slate-950">{order.order_code}</p>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <p className="text-sm font-bold text-slate-500">Khách hàng</p>
                <p className="font-black text-slate-950">
                  {order.customer_name}
                </p>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <p className="text-sm font-bold text-slate-500">
                  Số điện thoại
                </p>
                <p className="font-black text-slate-950">
                  {order.customer_phone}
                </p>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <p className="text-sm font-bold text-slate-500">Tổng tiền</p>
                <p className="text-xl font-black text-[#e11d48]">
                  {formatCurrency(order.total)}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="/demo"
                className="inline-flex items-center justify-center rounded-2xl bg-[#07111f] px-6 py-4 text-sm font-black text-white"
              >
                <span className="solid-white-text">Tiếp tục mua hàng</span>
              </a>

              <a
                href="/"
                className="inline-flex items-center justify-center rounded-2xl border border-[#eadfce] bg-white px-6 py-4 text-sm font-black text-slate-950"
              >
                Về trang chủ
              </a>
            </div>
          </div>

          <div className="mt-6 rounded-[2rem] border border-[#eadfce] bg-[#fffdf8] p-5 shadow-xl shadow-slate-900/5">
            <p className="text-lg font-black text-slate-950">Sản phẩm đã đặt</p>

            <div className="mt-4 space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4 rounded-2xl bg-white p-4"
                >
                  <div>
                    <p className="font-black text-slate-950">
                      {item.product_name}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-500">
                      Số lượng: {item.quantity}
                    </p>
                  </div>

                  <p className="font-black text-[#e11d48]">
                    {formatCurrency(item.line_total)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  } catch {
    notFound();
  }
}
