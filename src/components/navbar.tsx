import { Button } from "@/components/ui/button";
import { NavMenu } from "@/components/nav-menu";
import { NavigationSheet } from "@/components/navigation-sheet";
import { ModeToggle } from "./Toogle-mode";
import { Link, useNavigate } from "react-router";
import { useAuth } from "@/hooks/use-auth";
import { homePathForRole } from "@/routes/role-redirect";

const Navbar = () => {
  const { isAuthenticated, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="fixed z-30 inset-x-4 top-6 mx-auto h-16 max-w-(--breakpoint-xl) rounded-full border bg-background shadow-md">
      <div className="mx-auto flex h-full items-center justify-between px-6">
        <Link to="/">
          <h2 className="font-bold text-sm">ASSIGAME</h2>
        </Link>

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              {(role === "VENDEUR" || role === "ADMIN") && (
                <Link to={homePathForRole(role)}>
                  <Button
                    className="hidden rounded-full sm:inline-flex"
                    variant="outline"
                  >
                    Mon espace
                  </Button>
                </Link>
              )}
              <Button className="rounded-full" onClick={handleLogout}>
                Se déconnecter
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button
                  className="hidden rounded-full sm:inline-flex"
                  variant="outline"
                >
                  Se Connecter
                </Button>
              </Link>
              <Link to="/register">
                <Button className="rounded-full">Publier un produit</Button>
              </Link>
            </>
          )}
          <ModeToggle />

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
