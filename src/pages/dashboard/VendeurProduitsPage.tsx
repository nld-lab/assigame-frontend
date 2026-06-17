import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Pencil, Plus, Trash2 } from "lucide-react";
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
import { ProduitFormDialog } from "@/features/vendeur/ProduitFormDialog";
import { ProduitService } from "@/services/ProduitService";
import type { Produit } from "@/types";
import { getApiErrorMessage } from "@/lib/api-error";

function formatPrice(prix: number) {
  return new Intl.NumberFormat("fr-FR").format(prix) + " FCFA";
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

export default function VendeurProduitsPage() {
  const location = useLocation();
  const [produits, setProduits] = useState<Produit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduit, setEditingProduit] = useState<Produit | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Produit | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadProduits = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await ProduitService.getMine();
      setProduits(data);
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Impossible de charger vos produits."));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProduits();
  }, [loadProduits]);

  useEffect(() => {
    if (location.pathname.endsWith("/nouveau")) {
      setEditingProduit(null);
      setFormOpen(true);
    }
  }, [location.pathname]);

  const openCreate = () => {
    setEditingProduit(null);
    setFormOpen(true);
  };

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
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Mes produits</h1>
          <p className="text-muted-foreground">
            Gérez vos annonces publiées sur Assigame.
          </p>
        </div>
        <Button onClick={openCreate} className="gap-2">
          <Plus className="size-4" />
          Publier un produit
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Annonces</CardTitle>
          <CardDescription>
            {produits.length} produit{produits.length > 1 ? "s" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <p className="text-sm text-muted-foreground">Chargement...</p>
          )}

          {!isLoading && produits.length === 0 && (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <p className="text-sm text-muted-foreground">
                Vous n&apos;avez publié aucun produit pour le moment.
              </p>
              <Button onClick={openCreate} variant="outline" className="gap-2">
                <Plus className="size-4" />
                Publier votre premier produit
              </Button>
            </div>
          )}

          {!isLoading && produits.length > 0 && (
            <div className="divide-y">
              {produits.map((produit) => (
                <div
                  key={produit.id_produit}
                  className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <ProduitThumbnail produit={produit} />
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-medium">{produit.nom_produit}</p>
                        <StatutBadge statut={produit.statut} />
                      </div>
                      <p className="text-sm font-semibold text-primary">
                        {formatPrice(produit.prix)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {produit.categorie_produit?.nom_categorieproduit ??
                          "Sans catégorie"}
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
                      Modifier
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
