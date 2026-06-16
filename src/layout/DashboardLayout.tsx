import { useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router";
import { LogOut, Menu, Store } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { VisuallyHidden } from "radix-ui";
import { ModeToggle } from "@/components/Toogle-mode";
import { useAuth } from "@/hooks/use-auth";
import { adminNav, vendeurNav, type NavItem } from "./dashboard-nav";

function getInitials(prenom?: string, nom?: string) {
  const a = prenom?.[0] ?? "";
  const b = nom?.[0] ?? "";
  return (a + b).toUpperCase() || "U";
}

function SidebarNav({
  items,
  onNavigate,
}: {
  items: NavItem[];
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex flex-col gap-1 px-3">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )
            }
          >
            <Icon className="size-4" />
            {item.label}
          </NavLink>
        );
      })}
    </nav>
  );
}

function SidebarContent({
  items,
  title,
  onNavigate,
}: {
  items: NavItem[];
  title: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center gap-2 px-5">
        <Link to="/" className="flex items-center gap-2" onClick={onNavigate}>
          <Store className="size-5" />
          <span className="font-bold">ASSIGAME</span>
        </Link>
      </div>
      <p className="px-5 pb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {title}
      </p>
      <SidebarNav items={items} onNavigate={onNavigate} />
    </div>
  );
}

export default function DashboardLayout() {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isAdminArea = location.pathname.startsWith("/admin");
  const items = isAdminArea ? adminNav : vendeurNav;
  const sectionTitle = isAdminArea ? "Administration" : "Espace vendeur";

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Sidebar desktop */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r bg-background md:block">
        <SidebarContent items={items} title={sectionTitle} />
      </aside>

      <div className="flex min-h-screen flex-col md:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur">
          {/* Menu mobile */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="size-5" />
                <span className="sr-only">Ouvrir le menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <VisuallyHidden.Root>
                <SheetTitle>Menu de navigation</SheetTitle>
              </VisuallyHidden.Root>
              <SidebarContent
                items={items}
                title={sectionTitle}
                onNavigate={() => setMobileOpen(false)}
              />
            </SheetContent>
          </Sheet>

          <span className="font-semibold md:hidden">ASSIGAME</span>

          <div className="flex-1" />

          <ModeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 px-2">
                <span className="flex size-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                  {getInitials(user?.prenom_utilisateur, user?.nom_utilisateur)}
                </span>
                <span className="hidden text-sm font-medium sm:inline">
                  {user?.prenom_utilisateur}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="font-medium">
                    {user?.prenom_utilisateur} {user?.nom_utilisateur}
                  </span>
                  <span className="text-xs font-normal text-muted-foreground">
                    {role}
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onClick={handleLogout}>
                <LogOut className="size-4" />
                Se déconnecter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
