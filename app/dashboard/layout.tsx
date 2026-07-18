import AppSidebar from "@/components/layout/AppSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <AppSidebar />

      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}