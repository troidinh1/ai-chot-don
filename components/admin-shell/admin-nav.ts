export type AdminNavItem = {
  label: string;
  href: string;
  description: string;
  icon: string;
};

export const adminNavItems: AdminNavItem[] = [
  {
    label: "Tổng quan",
    href: "/admin",
    description: "Dashboard vận hành",
    icon: "⌘",
  },
  {
    label: "Đơn hàng",
    href: "/admin/orders",
    description: "Xử lý đơn & AI chốt đơn",
    icon: "□",
  },
  {
    label: "Sản phẩm",
    href: "/admin/products",
    description: "Quản lý sản phẩm & AI nội dung",
    icon: "◇",
  },
  {
    label: "Khách hàng",
    href: "/admin/customers",
    description: "CRM & AI chăm khách",
    icon: "○",
  },
];

export function isAdminNavActive(pathname: string, href: string) {
  if (href === "/admin") {
    return pathname === "/admin";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}