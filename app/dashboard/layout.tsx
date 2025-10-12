import Sidebar from "./_components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen  dark:bg-gray-900 py-10 mx-auto bg-card rounded-2xl shadow-lg p-6 md:p-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <aside className="md:col-span-1">
            <Sidebar />
          </aside>

          <main className="md:col-span-3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
