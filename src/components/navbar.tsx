import { Button } from "@/components/ui/button";
import { NavMenu } from "@/components/nav-menu";
import { NavigationSheet } from "@/components/navigation-sheet";
import { ModeToggle } from "./Toogle-mode";
import { Link } from "react-router";
import { useAuth } from "@/hooks/use-auth";
import { homePathForRole } from "@/routes/role-redirect";

const Navbar = () => {
  const { isAuthenticated, role } = useAuth();
 

  

  return (
    <nav className="fixed z-30 inset-x-4 top-6 mx-auto h-16 max-w-(--breakpoint-xl) rounded-full border bg-[#f9f9f996] backdrop-blur-sm shadow-md dark:bg-black/40">
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
                    className="hidden rounded-full sm:inline-flex px-6"
                  >
                    Mon espace
                  </Button>
                </Link>
              )}
            </>
          ) : (
            <Link to="/dashboard/produits">
              <Button className="rounded-full">Publier un produit</Button>
            </Link>
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
