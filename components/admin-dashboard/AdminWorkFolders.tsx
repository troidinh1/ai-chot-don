"use client";

import { useState } from "react";
import DashboardCustomersFolder from "./DashboardCustomersFolder";
import DashboardOrdersFolder from "./DashboardOrdersFolder";
import DashboardProductsFolder from "./DashboardProductsFolder";
import type { AdminDashboardData } from "@/types/database";

type AdminWorkFoldersProps = {
  data: AdminDashboardData;
};

type FolderKey = "orders" | "products" | "customers";

const folders: {
  key: FolderKey;
  label: string;
  desc: string;
}[] = [
  {
    key: "orders",
    label: "Đơn hàng",
    desc: "Xử lý đơn mới và trạng thái giao hàng",
  },
  {
    key: "products",
    label: "Sản phẩm",
    desc: "Theo dõi sản phẩm, tồn kho và flash sale",
  },
  {
    key: "customers",
    label: "Khách hàng",
    desc: "Chăm sóc khách cũ và khách tiềm năng",
  },
];

export default function AdminWorkFolders({ data }: AdminWorkFoldersProps) {
  const [activeFolder, setActiveFolder] = useState<FolderKey>("orders");

  return (
    <section className="rounded-[2rem] border border-stone-200 bg-white p-5 shadow-xl shadow-slate-900/5 sm:p-6">
      <div className="flex flex-col justify-between gap-4 border-b border-stone-200 pb-5 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700">
            Dashboard folders
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-slate-950">
            Thư mục vận hành trong ngày
          </h2>
          <p className="mt-2 text-sm font-semibold leading-7 text-slate-500">
            Không chỉ là link nhanh. Mỗi thư mục hiển thị dữ liệu quan trọng để
            chủ shop xử lý ngay trong dashboard.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {folders.map((folder) => (
          <button
            key={folder.key}
            type="button"
            onClick={() => setActiveFolder(folder.key)}
            className={`rounded-[1.5rem] border p-4 text-left transition ${
              activeFolder === folder.key
                ? "border-slate-950 bg-slate-950 text-white shadow-lg shadow-slate-950/10"
                : "border-stone-200 bg-stone-50 text-slate-950 hover:bg-white"
            }`}
          >
            <p className="text-lg font-black">{folder.label}</p>
            <p
              className={`mt-2 text-sm font-semibold leading-6 ${
                activeFolder === folder.key
                  ? "text-slate-300"
                  : "text-slate-500"
              }`}
            >
              {folder.desc}
            </p>
          </button>
        ))}
      </div>

      <div className="mt-6">
        {activeFolder === "orders" && (
          <DashboardOrdersFolder orders={data.orders} />
        )}
        {activeFolder === "products" && (
          <DashboardProductsFolder products={data.products} />
        )}
        {activeFolder === "customers" && (
          <DashboardCustomersFolder customers={data.customers} />
        )}
      </div>
    </section>
  );
}
