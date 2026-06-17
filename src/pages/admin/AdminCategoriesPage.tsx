import { useCallback, useEffect, useState } from "react";
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
import { CategoryFormDialog } from "@/features/admin/CategoryFormDialog";
import { CategorieService } from "@/services/CategorieService";
import type { CategorieProduit } from "@/types";
import { getFallbackCategoryImage } from "@/lib/category-images";
import { getApiErrorMessage } from "@/lib/api-error";

function CategoryThumbnail({
  categorie,
  index,
}: {
  categorie: CategorieProduit;
  index: number;
}) {
  const fallback = getFallbackCategoryImage(
    categorie.nom_categorieproduit,
    index
  );
  const src = categorie.image_type
    ? CategorieService.getImageUrl(categorie.idcategorie_produit)
    : fallback;
  const [imageSrc, setImageSrc] = useState(src);

  return (
    <img
      src={imageSrc}
      alt={categorie.nom_categorieproduit}
      className="size-14 rounded-lg object-cover"
      onError={() => {
        if (imageSrc !== fallback) setImageSrc(fallback);
      }}
    />
  );
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategorieProduit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategorieProduit | null>(
    null
  );
  const [deleteTarget, setDeleteTarget] = useState<CategorieProduit | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadCategories = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await CategorieService.getAll();
      setCategories(data);
    } catch {
      toast.error("Impossible de charger les catégories.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const openCreate = () => {
    setEditingCategory(null);
    setFormOpen(true);
  };

  const openEdit = (category: CategorieProduit) => {
    setEditingCategory(category);
    setFormOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await CategorieService.delete(deleteTarget.idcategorie_produit);
      toast.success("Catégorie supprimée.");
      setDeleteTarget(null);
      loadCategories();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Impossible de supprimer la catégorie."));
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="mx-auto">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Catégories</h1>
          <p className="text-muted-foreground">
            Gérez les catégories affichées sur la marketplace.
          </p>
        </div>
        <Button onClick={openCreate} className="gap-2">
          <Plus className="size-4" />
          Ajouter une catégorie
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des catégories</CardTitle>
          <CardDescription>
            {categories.length} catégorie{categories.length > 1 ? "s" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <p className="text-sm text-muted-foreground">Chargement...</p>
          )}

          {!isLoading && categories.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Aucune catégorie. Cliquez sur « Ajouter une catégorie » pour
              commencer.
            </p>
          )}

          {!isLoading && categories.length > 0 && (
            <div className="divide-y">
              {categories.map((categorie, index) => (
                <div
                  key={categorie.idcategorie_produit}
                  className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <CategoryThumbnail categorie={categorie} index={index} />
                    <div>
                      <p className="font-medium">
                        {categorie.nom_categorieproduit}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {categorie.description || "Aucune description"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1"
                      onClick={() => openEdit(categorie)}
                    >
                      <Pencil className="size-3.5" />
                      Modifier
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1 text-destructive hover:text-destructive"
                      onClick={() => setDeleteTarget(categorie)}
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

      <CategoryFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        category={editingCategory}
        onSuccess={loadCategories}
      />

      <Dialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Supprimer la catégorie</DialogTitle>
            <DialogDescription>
              Voulez-vous vraiment supprimer «{" "}
              {deleteTarget?.nom_categorieproduit} » ? Cette action est
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
