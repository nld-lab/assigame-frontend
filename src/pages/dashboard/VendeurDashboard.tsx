import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export default function VendeurDashboard() {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Tableau de bord</h1>
        <p className="text-muted-foreground">
          Bienvenue {user?.prenom_utilisateur} {user?.nom_utilisateur}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Mes produits</CardTitle>
            <CardDescription>Gérez vos annonces publiées</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/dashboard/produits">
              <Button variant="outline" size="sm">
                Voir mes produits
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Publier un produit</CardTitle>
            <CardDescription>Ajoutez une nouvelle annonce</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/dashboard/produits/nouveau">
              <Button size="sm">Publier un produit</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Mon profil</CardTitle>
            <CardDescription>Vos informations de contact</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/dashboard/profil">
              <Button variant="outline" size="sm">
                Modifier mon profil
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
