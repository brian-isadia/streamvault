import { useState } from "react";
import { LayoutDashboard, Film, Tv, Menu, X } from "lucide-react";
import { AdminNavItem } from "./AdminNavItem";

export function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-background-elevated border border-border rounded-md"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-overlay-heavy z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-60 bg-background-elevated border-r border-border z-40 transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="p-6">
          <h3 className="text-h3 font-semibold text-brand">StreamVault</h3>
          <p className="text-caption text-foreground-secondary mt-1 uppercase tracking-widest font-bold">
            Admin
          </p>
        </div>

        <nav className="mt-4">
          <AdminNavItem to="/admin" icon={LayoutDashboard} label="Dashboard" />
          <AdminNavItem to="/admin/movies" icon={Film} label="Movies" />
          <AdminNavItem to="/admin/tv" icon={Tv} label="TV Shows" />
        </nav>
      </aside>
    </>
  );
}
