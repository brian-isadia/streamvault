import { Outlet } from "@tanstack/react-router";
import { AdminSidebar } from "./AdminSidebar";

export function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <AdminSidebar />
      <main className="flex-1 md:ml-60 p-6 overflow-y-auto">
        <div className="max-w-content mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
