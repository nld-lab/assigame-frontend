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
import { CategorieService } from "@/services/CategorieService";
import type { CategorieProduit } from "@/types";
import { getFallbackCategoryImage } from "@/lib/category-images";
import { getApiErrorMessage } from "@/lib/api-error";

const formSchema = z.object({
  nom_categorieproduit: z
    .string()
    .min(1, "Le nom est requis")
    .max(40, "40 caractères maximum"),
  description: z.string().max(100, "100 caractères maximum").optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface CategoryFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: CategorieProduit | null;
  onSuccess: () => void;
}

export function CategoryFormDialog({
  open,
  onOpenChange,
  category,
  onSuccess,
}: CategoryFormDialogProps) {
  const isEditing = !!category;
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom_categorieproduit: "",
      description: "",
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

    reset({
      nom_categorieproduit: category?.nom_categorieproduit ?? "",
      description: category?.description ?? "",
    });
    setImageFile(null);

    if (category?.image_type) {
      setPreviewUrl(CategorieService.getImageUrl(category.idcategorie_produit));
    } else {
      setPreviewUrl(null);
    }
  }, [open, category, reset]);

  useEffect(() => {
    if (!imageFile) return;
    const objectUrl = URL.createObjectURL(imageFile);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  const onSubmit = async (data: FormValues) => {
    try {
      const payload = {
        nom_categorieproduit: data.nom_categorieproduit,
        description: data.description || null,
      };

      if (isEditing && category) {
        await CategorieService.update(
          category.idcategorie_produit,
          payload,
          imageFile ?? undefined
        );
        toast.success("Catégorie mise à jour.");
      } else {
        await CategorieService.add(payload, imageFile ?? undefined);
        toast.success("Catégorie créée.");
      }

      onSuccess();
      onOpenChange(false);
    } catch (error) {
      toast.error(
        getApiErrorMessage(
          error,
          isEditing
            ? "Impossible de mettre à jour la catégorie."
            : "Impossible de créer la catégorie."
        )
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Modifier la catégorie" : "Nouvelle catégorie"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Modifiez les informations et l'image de la catégorie."
              : "Ajoutez une catégorie visible sur la page d'accueil."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            control={control}
            name="nom_categorieproduit"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="nom_categorieproduit">Nom *</FieldLabel>
                <Input
                  id="nom_categorieproduit"
                  placeholder="Ex : Électronique"
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
                  placeholder="Description courte (optionnel)"
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <Field>
            <FieldLabel htmlFor="image">Image</FieldLabel>
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
                className="mt-2 h-32 w-full rounded-lg object-cover"
                onError={() =>
                  setPreviewUrl(
                    getFallbackCategoryImage(
                      category?.nom_categorieproduit ?? "",
                      0
                    )
                  )
                }
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
                  : "Créer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
