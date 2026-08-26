import Link from "next/link";
import { LogOut, PackagePlus, Store } from "lucide-react";
import { logoutAction } from "@/app/admin/actions";
import { AdminShellNav } from "@/components/admin/AdminShellNav";

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-shell-root">
      <aside aria-label="Admin navigation" className="admin-shell-sidebar">
        <Link className="admin-shell-brand" href="/admin">
          <span>KM</span>
          <strong>Kanak Admin</strong>
          <small>Website CMS</small>
        </Link>

        <AdminShellNav />

        <div className="admin-shell-sidebar__foot">
          <Link className="admin-shell-site-link" href="/" target="_blank">
            <Store aria-hidden="true" size={17} />
            View Website
          </Link>
          <form action={logoutAction}>
            <button className="admin-shell-logout" type="submit">
              <LogOut aria-hidden="true" size={17} />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      <div className="admin-shell-main">
        <header className="admin-shell-topbar">
          <div>
            <span>Admin Panel</span>
            <strong>Manage products, media and quote requests</strong>
          </div>
          <Link className="admin-shell-topbar__cta" href="/admin/products/new">
            <PackagePlus aria-hidden="true" size={17} />
            New Product
          </Link>
        </header>
        <div className="admin-shell-content">{children}</div>
      </div>
    </div>
  );
}
