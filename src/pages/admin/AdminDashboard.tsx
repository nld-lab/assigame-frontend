import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
            <p className="text-sm text-muted-foreground">À implémenter</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Produits</CardTitle>
            <CardDescription>Modérer les annonces</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">À implémenter</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Catégories</CardTitle>
            <CardDescription>Gérer les catégories</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">À implémenter</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
