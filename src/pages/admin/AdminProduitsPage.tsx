import { useCallback, useEffect, useMemo, useState } from "react";
import { Pencil, Search, Trash2 } from "lucide-react";
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
import { ProduitFormDialog } from "@/features/vendeur/ProduitFormDialog";
import { ProduitService } from "@/services/ProduitService";
import type { Produit } from "@/types";
import { getApiErrorMessage } from "@/lib/api-error";

function formatPrice(prix: number) {
    return new Intl.NumberFormat("fr-FR").format(prix) + " FCFA";
}

function formatDate(date: string) {
    return new Intl.DateTimeFormat("fr-FR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(new Date(date));
}

function StatutBadge({ statut }: { statut: string }) {
    const styles: Record<string, string> = {
        ACTIF: "bg-green-500/10 text-green-600",
        INACTIF: "bg-muted text-muted-foreground",
        VENDU: "bg-primary/10 text-primary",
    };

    return (
        <span
            className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[statut] ?? styles.INACTIF}`}
        >
            {statut}
        </span>
    );
}

function ProduitThumbnail({ produit }: { produit: Produit }) {
    const [imageSrc, setImageSrc] = useState<string | null>(
        produit.image_type ? ProduitService.getImageUrl(produit.id_produit) : null
    );

    if (!imageSrc) {
        return (
            <div className="flex size-16 items-center justify-center rounded-lg bg-muted text-xs text-muted-foreground">
                N/A
            </div>
        );
    }

    return (
        <img
            src={imageSrc}
            alt={produit.nom_produit}
            className="size-16 rounded-lg object-cover"
            onError={() => setImageSrc(null)}
        />
    );
}

function getVendeurLabel(produit: Produit): string {
    const vendeur = produit.utilisateur;
    if (!vendeur) return "Vendeur inconnu";
    return `${vendeur.prenom_utilisateur} ${vendeur.nom_utilisateur} (@${vendeur.login_utilisateur})`;
}

export default function AdminProduitsPage() {
    const [produits, setProduits] = useState<Produit[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [formOpen, setFormOpen] = useState(false);
    const [editingProduit, setEditingProduit] = useState<Produit | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Produit | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const loadProduits = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await ProduitService.getAll();
            setProduits(data);
        } catch (error) {
            toast.error(getApiErrorMessage(error, "Impossible de charger les produits."));
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadProduits();
    }, [loadProduits]);

    const filteredProduits = useMemo(() => {
        const query = search.trim().toLowerCase();
        if (!query) return produits;

        return produits.filter((produit) => {
            const vendeur = getVendeurLabel(produit).toLowerCase();
            return (
                produit.nom_produit.toLowerCase().includes(query) ||
                produit.statut.toLowerCase().includes(query) ||
                (produit.categorie_produit?.nom_categorieproduit ?? "")
                    .toLowerCase()
                    .includes(query) ||
                vendeur.includes(query)
            );
        });
    }, [produits, search]);

    const openEdit = (produit: Produit) => {
        setEditingProduit(produit);
        setFormOpen(true);
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        setIsDeleting(true);
        try {
            await ProduitService.delete(deleteTarget.id_produit);
            toast.success("Produit supprimé.");
            setDeleteTarget(null);
            loadProduits();
        } catch (error) {
            toast.error(getApiErrorMessage(error, "Impossible de supprimer le produit."));
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold">Produits</h1>
                <p className="text-muted-foreground">
                    Modérez toutes les annonces publiées sur la marketplace.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Annonces</CardTitle>
                    <CardDescription>
                        {filteredProduits.length} produit
                        {filteredProduits.length > 1 ? "s" : ""}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="relative max-w-sm">
                        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Rechercher par nom, vendeur, statut..."
                            className="pl-9"
                        />
                    </div>

                    {isLoading && (
                        <p className="text-sm text-muted-foreground">Chargement...</p>
                    )}

                    {!isLoading && filteredProduits.length === 0 && (
                        <p className="text-sm text-muted-foreground">
                            {search
                                ? "Aucun produit ne correspond à votre recherche."
                                : "Aucun produit publié."}
                        </p>
                    )}

                    {!isLoading && filteredProduits.length > 0 && (
                        <div className="divide-y">
                            {filteredProduits.map((produit) => (
                                <div
                                    key={produit.id_produit}
                                    className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                                >
                                    <div className="flex items-center gap-4">
                                        <ProduitThumbnail produit={produit} />
                                        <div>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <p className="font-medium">
                                                    {produit.nom_produit}
                                                </p>
                                                <StatutBadge statut={produit.statut} />
                                            </div>
                                            <p className="text-sm font-semibold text-primary">
                                                {formatPrice(produit.prix)}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {produit.categorie_produit?.nom_categorieproduit ??
                                                    "Sans catégorie"}{" "}
                                                · {formatDate(produit.date_ajout)}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {getVendeurLabel(produit)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="gap-1"
                                            onClick={() => openEdit(produit)}
                                        >
                                            <Pencil className="size-3.5" />
                                            Modérer
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="gap-1 text-destructive hover:text-destructive"
                                            onClick={() => setDeleteTarget(produit)}
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

            <ProduitFormDialog
                open={formOpen}
                onOpenChange={setFormOpen}
                produit={editingProduit}
                onSuccess={loadProduits}
            />

            <Dialog
                open={!!deleteTarget}
                onOpenChange={(open) => !open && setDeleteTarget(null)}
            >
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Supprimer le produit</DialogTitle>
                        <DialogDescription>
                            Voulez-vous vraiment supprimer « {deleteTarget?.nom_produit} » ?
                            Cette action est irréversible.
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
