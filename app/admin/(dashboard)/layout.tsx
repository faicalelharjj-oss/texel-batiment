import AdminSidebar from "@/components/AdminSidebar";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-shell">
      <AdminSidebar />
      <div className="admin-main">{children}</div>
    </div>
  );
}
