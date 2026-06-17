import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Administration</h1>
        <p className="text-muted-foreground">
          Connecté en tant que {user?.login_utilisateur}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Utilisateurs</CardTitle>
            <CardDescription>Gérer les comptes</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/admin/utilisateurs">
              <Button variant="outline" size="sm">
                Gérer les utilisateurs
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Produits</CardTitle>
            <CardDescription>Modérer les annonces</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/admin/produits">
              <Button variant="outline" size="sm">
                Modérer les produits
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Catégories</CardTitle>
            <CardDescription>Gérer les catégories</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/admin/categories">
              <Button variant="outline" size="sm">
                Gérer les catégories
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Mon profil</CardTitle>
            <CardDescription>Vos informations personnelles</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/admin/profil">
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
