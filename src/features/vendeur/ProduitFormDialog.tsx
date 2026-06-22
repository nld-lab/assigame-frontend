import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CategorieService } from "@/services/CategorieService";
import { ProduitService } from "@/services/ProduitService";
import type { CategorieProduit, Produit } from "@/types";
import { getApiErrorMessage } from "@/lib/api-error";

const STATUTS = [
  { value: "ACTIF", label: "Actif" },
  { value: "INACTIF", label: "Inactif" },
  { value: "VENDU", label: "Vendu" },
] as const;

const formSchema = z.object({
  nom_produit: z
    .string()
    .min(1, "Le nom est requis")
    .max(50, "50 caractères maximum"),
  description: z.string().max(200, "200 caractères maximum").optional(),
  prix: z.number({ error: "Le prix doit être un nombre" }).min(1, "Le prix doit être supérieur à 0"),
  id_categorie: z.string().min(1, "Sélectionnez une catégorie"),
  statut: z.string().min(1, "Sélectionnez un statut"),
});

type FormValues = z.infer<typeof formSchema>;

interface ProduitFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  produit?: Produit | null;
  onSuccess: () => void;
}

export function ProduitFormDialog({
  open,
  onOpenChange,
  produit,
  onSuccess,
}: ProduitFormDialogProps) {
  const isEditing = !!produit;
  const [categories, setCategories] = useState<CategorieProduit[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom_produit: "",
      description: "",
      prix: 0,
      id_categorie: "",
      statut: "ACTIF",
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    if (!open) return;
    CategorieService.getAll()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, [open]);

  useEffect(() => {
    if (!open) return;

    reset({
      nom_produit: produit?.nom_produit ?? "",
      description: produit?.description ?? "",
      prix: produit?.prix ?? 0,
      id_categorie: produit?.categorie_produit
        ? String(produit.categorie_produit.idcategorie_produit)
        : "",
      statut: produit?.statut ?? "ACTIF",
    });
    setImageFile(null);

    if (produit?.image_type) {
      setPreviewUrl(ProduitService.getImageUrl(produit.id_produit));
    } else {
      setPreviewUrl(null);
    }
  }, [open, produit, reset]);

  useEffect(() => {
    if (!imageFile) return;
    const objectUrl = URL.createObjectURL(imageFile);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  const onSubmit = async (data: FormValues) => {
    if (!isEditing && !imageFile) {
      toast.error("L'image du produit est obligatoire.");
      return;
    }

    try {
      const payload = {
        nom_produit: data.nom_produit,
        description: data.description || null,
        prix: data.prix,
        statut: data.statut,
        categorie_produit: {
          idcategorie_produit: Number(data.id_categorie),
        },
      };

      if (isEditing && produit) {
        await ProduitService.update(
          produit.id_produit,
          payload,
          imageFile ?? undefined
        );
        toast.success("Produit mis à jour.");
      } else {
        await ProduitService.add(payload, imageFile!);
        toast.success("Produit publié.");
      }

      onSuccess();
      onOpenChange(false);
    } catch (error) {
      toast.error(
        getApiErrorMessage(
          error,
          isEditing
            ? "Impossible de mettre à jour le produit."
            : "Impossible de publier le produit."
        )
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Modifier le produit" : "Publier un produit"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Mettez à jour les informations de votre annonce."
              : "Remplissez les informations pour publier votre annonce."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            control={control}
            name="nom_produit"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="nom_produit">Nom du produit *</FieldLabel>
                <Input
                  id="nom_produit"
                  placeholder="Ex : iPhone 13 Pro"
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Textarea
                  id="description"
                  placeholder="Décrivez votre produit..."
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <Controller
              control={control}
              name="prix"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="prix">Prix (FCFA) *</FieldLabel>
                  <Input
                    id="prix"
                    type="number"
                    min={1}
                    aria-invalid={fieldState.invalid}
                    value={field.value}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === "" ? 0 : e.target.valueAsNumber
                      )
                    }
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />

            <Controller
              control={control}
              name="statut"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Statut *</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choisir un statut" />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUTS.map((statut) => (
                        <SelectItem key={statut.value} value={statut.value}>
                          {statut.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
          </div>

          <Controller
            control={control}
            name="id_categorie"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Catégorie *</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choisir une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem
                        key={cat.idcategorie_produit}
                        value={String(cat.idcategorie_produit)}
                      >
                        {cat.nom_categorieproduit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <Field>
            <FieldLabel htmlFor="image">
              Image {isEditing ? "" : "*"}
            </FieldLabel>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
            />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Aperçu"
                className="mt-2 h-40 w-full rounded-lg object-cover"
              />
            )}
          </Field>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Enregistrement..."
                : isEditing
                  ? "Enregistrer"
                  : "Publier"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
