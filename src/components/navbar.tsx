import { Link, NavLink } from "react-router";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Store } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { homePathForRole } from "@/routes/role-redirect";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { OriginButton } from "@/components/ui/origin-button";

const Navbar = () => {
  const { isAuthenticated, role } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 overflow-visible">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-6">

        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src="/logo.png" alt="ASSIGAME" className="h-36 w-auto object-contain" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive ? "text-primary font-semibold" : "text-muted-foreground"
              )
            }
          >
            Accueil
          </NavLink>
          <NavLink
            to="#"
            className={({ isActive }) =>
              cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive ? "text-primary font-semibold" : "text-muted-foreground"
              )
            }
          >
            Marché
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              {(role === "VENDEUR" || role === "ADMIN") && (
                <Link to={homePathForRole(role)}>
                  <Button className="hidden sm:inline-flex rounded-full px-6">
                    Mon espace
                  </Button>
                </Link>
              )}
            </>
          ) : (
            <>
              <Link to="/login" className="hidden sm:block">
                <Button variant="ghost" className="rounded-full">
                  Se connecter
                </Button>
              </Link>
              <Link to="/dashboard/produits">
                <OriginButton className="hidden sm:inline-flex">
                  Publier un produit
                </OriginButton>
              </Link>
            </>
          )}

          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 px-6 py-8">
                <div className="flex items-center gap-2 mb-8">
                  <Store className="h-5 w-5 text-primary" />
                  <span className="font-bold text-lg">ASSIGAME</span>
                </div>
                <nav className="flex flex-col gap-4">
                  <NavLink
                    to="/"
                    end
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "text-sm font-medium transition-colors hover:text-primary py-2 border-b border-border",
                        isActive ? "text-primary font-semibold" : "text-muted-foreground"
                      )
                    }
                  >
                    Accueil
                  </NavLink>
                  <NavLink
                    to="#"
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "text-sm font-medium transition-colors hover:text-primary py-2 border-b border-border",
                        isActive ? "text-primary font-semibold" : "text-muted-foreground"
                      )
                    }
                  >
                    Marché
                  </NavLink>
                  {isAuthenticated ? (
                    (role === "VENDEUR" || role === "ADMIN") && (
                      <Link to={homePathForRole(role)} onClick={() => setOpen(false)}>
                        <Button className="w-full mt-4 rounded-full">Mon espace</Button>
                      </Link>
                    )
                  ) : (
                    <div className="flex flex-col gap-3 mt-4">
                      <Link to="/login" onClick={() => setOpen(false)}>
                        <Button variant="outline" className="w-full rounded-full">Se connecter</Button>
                      </Link>
                      <Link to="/dashboard/produits" onClick={() => setOpen(false)}>
                        <OriginButton className="w-full">Publier un produit</OriginButton>
                      </Link>
                    </div>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
