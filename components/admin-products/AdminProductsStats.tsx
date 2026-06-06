import type { ProductWithCategory } from "@/types/database";
import { formatCurrency } from "@/lib/format";

type AdminProductsStatsProps = {
  products: ProductWithCategory[];
};

export default function AdminProductsStats({
  products,
}: AdminProductsStatsProps) {
  const activeProducts = products.filter((product) => product.is_active).length;
  const flashProducts = products.filter(
    (product) => product.is_flash_sale,
  ).length;
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const inventoryValue = products.reduce(
    (sum, product) =>
      sum + product.price * Math.max(product.stock - product.sold, 0),
    0,
  );

  return (
    <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        label="Tổng sản phẩm"
        value={products.length.toString()}
        helper={`${activeProducts} đang bán`}
      />
      <MetricCard
        label="Flash sale"
        value={flashProducts.toString()}
        helper="Sản phẩm đang chạy ưu đãi"
      />
      <MetricCard
        label="Tồn kho"
        value={totalStock.toString()}
        helper="Tổng số lượng khai báo"
      />
      <MetricCard
        label="Giá trị tồn"
        value={formatCurrency(inventoryValue)}
        helper="Ước tính theo giá bán"
      />
    </div>
  );
}

function MetricCard({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <div className="rounded-[2rem] border border-stone-200 bg-white p-5 shadow-xl shadow-slate-900/5">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>
      <p className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950">
        {value}
      </p>
      <p className="mt-2 text-sm font-semibold text-slate-500">{helper}</p>
    </div>
  );
}
