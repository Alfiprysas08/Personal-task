import AppSidebar from "@/components/layout/AppSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background lg:flex">
      <AppSidebar />

      <main className="w-full min-w-0 flex-1 px-4 py-6 sm:px-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
