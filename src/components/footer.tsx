import { Link } from "react-router";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-background border-t">
      <div
        className="w-full py-12 md:py-16 px-6 lg:px-10"
        style={{
          backgroundImage: 'url("/motif.jpg")',
          backgroundRepeat: 'repeat',
        }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logoWhite.png" alt="ASSIGAME" className="h-10 w-auto object-contain" />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              La plateforme de référence pour acheter, vendre ou échanger vos articles en toute simplicité au Togo. Connectez-vous directement avec des acheteurs et vendeurs locaux pour faire de bonnes affaires.
            </p>
            <div className="flex gap-3 mt-2">
              <a href="#" aria-label="Facebook" className="p-2 rounded-full bg-muted/80 border hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="p-2 rounded-full bg-muted/80 border hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="p-2 rounded-full bg-muted/80 border hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="p-2 rounded-full bg-muted/80 border hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-base text-foreground tracking-tight">Marketplace</h3>
            <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground">
              <li>
                <Link to="/produits" className="hover:text-primary transition-colors">Acheter des articles</Link>
              </li>
              <li>
                <Link to="/dashboard/produits" className="hover:text-primary transition-colors">Vendre un produit</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary transition-colors">Catégories de produits</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary transition-colors">Bonnes affaires</Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-base text-foreground tracking-tight">Assistance</h3>
            <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground">
              <li>
                <Link to="#" className="hover:text-primary transition-colors">Centre d'aide & FAQ</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary transition-colors">Règles de publication</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary transition-colors">Conseils de sécurité</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary transition-colors">Conditions d'utilisation</Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-base text-foreground tracking-tight">Contact</h3>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li className="flex gap-2 items-start">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Lomé, Togo</span>
              </li>
              <li className="flex gap-2 items-center">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>+228 90 00 00 00</span>
              </li>
              <li className="flex gap-2 items-center">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>support@assigame.tg</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-8 border-border" />

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Assigame. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-primary transition-colors">Politique de confidentialité</Link>
            <Link to="#" className="hover:text-primary transition-colors">Mentions légales</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
