"use client";

import { usePathname } from "next/navigation";
import AdminMobileTabbar from "./AdminMobileTabbar";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

type AdminShellProps = {
  children: React.ReactNode;
};

export default function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#f5f3ee] text-slate-950">
      <AdminSidebar />

      <div className="min-h-screen xl:pl-[280px]">
        <AdminTopbar />

        <div className="pb-24 xl:pb-0">{children}</div>
      </div>

      <AdminMobileTabbar />
    </div>
  );
}
