import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Link } from "react-router";

function HeroSection() {
  return (
    <section className="w-full pt-28 pb-20">
      <div className="mx-auto ">
        {/* Carte hero */}
        <div className="relative overflow-hidden lg:px-6 px-0 rounded-[2rem] shadow-2xl">
          <img
            src="/hero image.png"
            alt="Marketplace Assigame"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Voile pour la lisibilité du texte à gauche */}
          <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/55 to-transparent" />

          <div className="relative px-7 py-16 sm:px-12 sm:py-24">
            <h1 className="text-4xl max-w-xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
              Achetez et <span className="text-primary">vendez en ligne</span>{" "}
              en toute simplicité.
            </h1>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white sm:text-base">
              Assigame met en relation acheteurs et vendeurs. Publiez vos
              produits gratuitement et laissez les acheteurs intéressés vous
              contacter directement par WhatsApp ou email.
            </p>

            <div className="mt-8 flex flex-wrap justify-between items-center gap-4">
              <div className="flex gap-4">
                <Link to="/register">
                  <Button size="lg" className="rounded-full px-4">
                    Publier un produit
                  </Button>
                </Link>
                <Link to="/produits">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full border-3 border-primary bg-white px-4 text-primary hover:bg-primary/10 hover:text-primary"
                  >
                    Explorer
                  </Button>
                </Link>
              </div>

              {/* Barre de recherche qui chevauche la carte */}
              <div className="w-full max-w-2xl">
                <form className="flex items-center gap-2 rounded-full border bg-white p-2 shadow-xl">
                  <Search className="ml-3 size-5 shrink-0 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Rechercher une catégorie, un produit…"
                    className="min-w-0 flex-1 bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
                  />
                  <Button
                    type="submit"
                    size="lg"
                    className="gap-2 rounded-full px-6"
                  >
                    <Search className="size-4" />
                    <span className="hidden sm:inline">Rechercher</span>
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default HeroSection;
