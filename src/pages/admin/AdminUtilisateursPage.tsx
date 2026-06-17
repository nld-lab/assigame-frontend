import { useCallback, useEffect, useMemo, useState } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { UtilisateurFormDialog } from "@/features/admin/UtilisateurFormDialog";
import { UtilisateurService } from "@/services/UtilisateurService";
import type { Utilisateur } from "@/types";
import { getApiErrorMessage } from "@/lib/api-error";

function getUserRole(user: Utilisateur): string {
    return (
        user.type_utilisateur?.libelle_type_utilisateur?.toUpperCase() ??
        user.role ??
        "—"
    );
}

function RoleBadge({ role }: { role: string }) {
    const styles: Record<string, string> = {
        ADMIN: "bg-primary/10 text-primary",
        VENDEUR: "bg-green-500/10 text-green-600",
    };

    return (
        <span
            className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[role] ?? "bg-muted text-muted-foreground"}`}
        >
            {role}
        </span>
    );
}

export default function AdminUtilisateursPage() {
    const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [formOpen, setFormOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<Utilisateur | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Utilisateur | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const loadUtilisateurs = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await UtilisateurService.getAll();
            setUtilisateurs(data);
        } catch (error) {
            toast.error(
                getApiErrorMessage(error, "Impossible de charger les utilisateurs.")
            );
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadUtilisateurs();
    }, [loadUtilisateurs]);

    const filteredUsers = useMemo(() => {
        const query = search.trim().toLowerCase();
        if (!query) return utilisateurs;

        return utilisateurs.filter((user) => {
            const role = getUserRole(user).toLowerCase();
            return (
                user.nom_utilisateur.toLowerCase().includes(query) ||
                user.prenom_utilisateur.toLowerCase().includes(query) ||
                user.login_utilisateur.toLowerCase().includes(query) ||
                (user.mail_utilisateur ?? "").toLowerCase().includes(query) ||
                user.telephone_utilisateur.toLowerCase().includes(query) ||
                role.includes(query)
            );
        });
    }, [search, utilisateurs]);

    const openCreate = () => {
        setEditingUser(null);
        setFormOpen(true);
    };

    const openEdit = (user: Utilisateur) => {
        setEditingUser(user);
        setFormOpen(true);
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        setIsDeleting(true);
        try {
            await UtilisateurService.delete(deleteTarget.id_utilisateur);
            toast.success("Utilisateur supprimé.");
            setDeleteTarget(null);
            loadUtilisateurs();
        } catch (error) {
            toast.error(
                getApiErrorMessage(error, "Impossible de supprimer l'utilisateur.")
            );
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="mx-auto">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Utilisateurs</h1>
                    <p className="text-muted-foreground">
                        Gérez les comptes vendeurs et administrateurs.
                    </p>
                </div>
                <Button onClick={openCreate} className="gap-2">
                    <Plus className="size-4" />
                    Ajouter un utilisateur
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Liste des utilisateurs</CardTitle>
                    <CardDescription>
                        {filteredUsers.length} utilisateur
                        {filteredUsers.length > 1 ? "s" : ""}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="relative max-w-sm">
                        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Rechercher par nom, login, email..."
                            className="pl-9"
                        />
                    </div>

                    {isLoading && (
                        <p className="text-sm text-muted-foreground">Chargement...</p>
                    )}

                    {!isLoading && filteredUsers.length === 0 && (
                        <p className="text-sm text-muted-foreground">
                            {search
                                ? "Aucun utilisateur ne correspond à votre recherche."
                                : "Aucun utilisateur enregistré."}
                        </p>
                    )}

                    {!isLoading && filteredUsers.length > 0 && (
                        <div className="divide-y">
                            {filteredUsers.map((user) => (
                                <div
                                    key={user.id_utilisateur}
                                    className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                                >
                                    <div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <p className="font-medium">
                                                {user.prenom_utilisateur} {user.nom_utilisateur}
                                            </p>
                                            <RoleBadge role={getUserRole(user)} />
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            @{user.login_utilisateur}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {user.mail_utilisateur ?? "—"} ·{" "}
                                            {user.telephone_utilisateur}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="gap-1"
                                            onClick={() => openEdit(user)}
                                        >
                                            <Pencil className="size-3.5" />
                                            Modifier
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="gap-1 text-destructive hover:text-destructive"
                                            onClick={() => setDeleteTarget(user)}
                                        >
                                            <Trash2 className="size-3.5" />
                                            Supprimer
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            <UtilisateurFormDialog
                open={formOpen}
                onOpenChange={setFormOpen}
                utilisateur={editingUser}
                onSuccess={loadUtilisateurs}
            />

            <Dialog
                open={!!deleteTarget}
                onOpenChange={(open) => !open && setDeleteTarget(null)}
            >
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Supprimer l&apos;utilisateur</DialogTitle>
                        <DialogDescription>
                            Voulez-vous vraiment supprimer le compte «{" "}
                            {deleteTarget?.login_utilisateur} » ? Cette action est
                            irréversible.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteTarget(null)}>
                            Annuler
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting ? "Suppression..." : "Supprimer"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
