import { Button } from "@/components/ui/button";
import { NavMenu } from "@/components/nav-menu";
import { NavigationSheet } from "@/components/navigation-sheet";
import { ModeToggle } from "./Toogle-mode";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="fixed z-30 inset-x-4 top-6 mx-auto h-16 max-w-(--breakpoint-xl) rounded-full border bg-background shadow-md">
      <div className="mx-auto flex h-full items-center justify-between px-4">
        <h2 className="font-bold text-sm">ASSIGAME</h2>

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-3">
          <Link to="/login">
          <Button
            className="hidden rounded-full sm:inline-flex"
            variant="outline"
          >
            Se Connecter
          </Button>
          </Link>
          <Button className="rounded-full">Publier un produit</Button>
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
