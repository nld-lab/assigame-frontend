import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
            <p className="text-sm text-muted-foreground">À implémenter</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Publier un produit</CardTitle>
            <CardDescription>Ajoutez une nouvelle annonce</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">À implémenter</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Mon profil</CardTitle>
            <CardDescription>Vos informations de contact</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">À implémenter</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
