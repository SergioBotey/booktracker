import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { clearAuthStorage, getStoredUser } from "../utils/authStorage";
import type { User } from "../types/auth";

const navItems = [
  { to: "/dashboard", label: "Resumen" },
  { to: "/books", label: "Biblioteca" },
];

export function PrivateLayout() {
  const navigate = useNavigate();
  const user = getStoredUser<User>();

  function handleLogout() {
    clearAuthStorage();
    navigate("/login", { replace: true });
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-200 bg-white p-6 md:block">
        <Link to="/dashboard" className="block">
          <p className="text-sm font-medium text-indigo-600">BookTracker</p>
          <h1 className="mt-1 text-xl font-bold text-slate-900">
            Reading Platform
          </h1>
        </Link>

        <nav className="mt-8 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "block rounded-xl px-4 py-3 text-sm font-medium",
                  isActive
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Usuario
          </p>
          <p className="mt-1 truncate text-sm font-semibold text-slate-900">
            {user?.fullName || "Usuario"}
          </p>
          <p className="truncate text-xs text-slate-500">
            {user?.email || "Sin correo"}
          </p>
        </div>
      </aside>

      <div className="md:pl-64">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 px-6 py-4 backdrop-blur">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">
                BookTracker Dashboard
              </p>
              <p className="text-xs text-slate-400">
                {user?.fullName ? `Hola, ${user.fullName}` : "Bienvenido"}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Cerrar sesión
            </button>
          </div>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}