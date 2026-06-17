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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Password } from "@/components/password";
import { AuthService } from "@/services/AuthService";
import { UtilisateurService } from "@/services/UtilisateurService";
import type { TypeUtilisateur, Utilisateur } from "@/types";
import { getApiErrorMessage } from "@/lib/api-error";

const GENDER_OPTIONS = [
    { label: "Homme", value: "M" },
    { label: "Femme", value: "F" },
    { label: "Autre", value: "A" },
];

const formSchema = z
    .object({
        nom_utilisateur: z.string().min(1, "Le nom est requis"),
        prenom_utilisateur: z.string().min(1, "Le prénom est requis"),
        sexe_utilisateur: z.string().min(1, "Sélectionnez une option"),
        telephone_utilisateur: z
            .string()
            .min(6, "Numéro invalide")
            .regex(/^[+0-9 ]+$/, "Numéro invalide"),
        mail_utilisateur: z.email("Email invalide"),
        login_utilisateur: z.string().min(2, "Au moins 2 caractères"),
        password_utilisateur: z.string().optional(),
        confirmPassword: z.string().optional(),
        residence_utilisateur: z.string().min(1, "Ce champ est requis"),
        id_type_utilisateur: z.string().min(1, "Sélectionnez un rôle"),
    })
    .superRefine((data, ctx) => {
        const password = data.password_utilisateur?.trim() ?? "";
        const confirm = data.confirmPassword?.trim() ?? "";

        if (password && password.length < 6) {
            ctx.addIssue({
                code: "custom",
                message: "Au moins 6 caractères",
                path: ["password_utilisateur"],
            });
        }

        if (password && password !== confirm) {
            ctx.addIssue({
                code: "custom",
                message: "Les mots de passe ne correspondent pas",
                path: ["confirmPassword"],
            });
        }
    });

type FormValues = z.infer<typeof formSchema>;

interface UtilisateurFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    utilisateur?: Utilisateur | null;
    onSuccess: () => void;
}

export function UtilisateurFormDialog({
    open,
    onOpenChange,
    utilisateur,
    onSuccess,
}: UtilisateurFormDialogProps) {
    const isEditing = !!utilisateur;
    const [types, setTypes] = useState<TypeUtilisateur[]>([]);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nom_utilisateur: "",
            prenom_utilisateur: "",
            sexe_utilisateur: "",
            telephone_utilisateur: "",
            mail_utilisateur: "",
            login_utilisateur: "",
            password_utilisateur: "",
            confirmPassword: "",
            residence_utilisateur: "",
            id_type_utilisateur: "",
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
        AuthService.getTypes()
            .then(setTypes)
            .catch(() => setTypes([]));
    }, [open]);

    useEffect(() => {
        if (!open) return;

        reset({
            nom_utilisateur: utilisateur?.nom_utilisateur ?? "",
            prenom_utilisateur: utilisateur?.prenom_utilisateur ?? "",
            sexe_utilisateur: utilisateur?.sexe_utilisateur ?? "",
            telephone_utilisateur: utilisateur?.telephone_utilisateur ?? "",
            mail_utilisateur: utilisateur?.mail_utilisateur ?? "",
            login_utilisateur: utilisateur?.login_utilisateur ?? "",
            password_utilisateur: "",
            confirmPassword: "",
            residence_utilisateur: utilisateur?.residence_utilisateur ?? "",
            id_type_utilisateur: utilisateur?.type_utilisateur
                ? String(utilisateur.type_utilisateur.id_type_utilisateur)
                : utilisateur?.id_type_utilisateur
                  ? String(utilisateur.id_type_utilisateur)
                  : "",
        });
    }, [open, utilisateur, reset]);

    const onSubmit = handleSubmit(async (data) => {
        const password = data.password_utilisateur?.trim() ?? "";

        if (!isEditing && !password) {
            toast.error("Le mot de passe est obligatoire pour un nouveau compte.");
            return;
        }

        try {
            const payload = {
                nom_utilisateur: data.nom_utilisateur,
                prenom_utilisateur: data.prenom_utilisateur,
                sexe_utilisateur: data.sexe_utilisateur,
                telephone_utilisateur: data.telephone_utilisateur,
                mail_utilisateur: data.mail_utilisateur,
                login_utilisateur: data.login_utilisateur,
                residence_utilisateur: data.residence_utilisateur,
                type_utilisateur: {
                    id_type_utilisateur: Number(data.id_type_utilisateur),
                },
                ...(password ? { password_utilisateur: password } : {}),
            };

            if (isEditing && utilisateur) {
                await UtilisateurService.update(utilisateur.id_utilisateur, payload);
                toast.success("Utilisateur mis à jour.");
            } else {
                await UtilisateurService.add({
                    ...payload,
                    password_utilisateur: password,
                });
                toast.success("Utilisateur créé.");
            }

            onSuccess();
            onOpenChange(false);
        } catch (error) {
            toast.error(
                getApiErrorMessage(
                    error,
                    isEditing
                        ? "Impossible de mettre à jour l'utilisateur."
                        : "Impossible de créer l'utilisateur."
                )
            );
        }
    });

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? "Modifier l'utilisateur" : "Ajouter un utilisateur"}
                    </DialogTitle>
                    <DialogDescription>
                        {isEditing
                            ? "Mettez à jour les informations du compte."
                            : "Créez un compte vendeur ou administrateur."}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Controller
                            control={control}
                            name="prenom_utilisateur"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="prenom_utilisateur">
                                        Prénom *
                                    </FieldLabel>
                                    <Input id="prenom_utilisateur" {...field} />
                                    <FieldError errors={[fieldState.error]} />
                                </Field>
                            )}
                        />
                        <Controller
                            control={control}
                            name="nom_utilisateur"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="nom_utilisateur">Nom *</FieldLabel>
                                    <Input id="nom_utilisateur" {...field} />
                                    <FieldError errors={[fieldState.error]} />
                                </Field>
                            )}
                        />
                    </div>

                    <Controller
                        control={control}
                        name="sexe_utilisateur"
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Sexe *</FieldLabel>
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Choisir" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {GENDER_OPTIONS.map((option) => (
                                            <SelectItem
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FieldError errors={[fieldState.error]} />
                            </Field>
                        )}
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                        <Controller
                            control={control}
                            name="telephone_utilisateur"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="telephone_utilisateur">
                                        Téléphone *
                                    </FieldLabel>
                                    <Input id="telephone_utilisateur" type="tel" {...field} />
                                    <FieldError errors={[fieldState.error]} />
                                </Field>
                            )}
                        />
                        <Controller
                            control={control}
                            name="mail_utilisateur"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="mail_utilisateur">Email *</FieldLabel>
                                    <Input id="mail_utilisateur" type="email" {...field} />
                                    <FieldError errors={[fieldState.error]} />
                                </Field>
                            )}
                        />
                    </div>

                    <Controller
                        control={control}
                        name="login_utilisateur"
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="login_utilisateur">
                                    Identifiant *
                                </FieldLabel>
                                <Input id="login_utilisateur" {...field} />
                                <FieldError errors={[fieldState.error]} />
                            </Field>
                        )}
                    />

                    <Controller
                        control={control}
                        name="residence_utilisateur"
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="residence_utilisateur">
                                    Résidence *
                                </FieldLabel>
                                <Input id="residence_utilisateur" {...field} />
                                <FieldError errors={[fieldState.error]} />
                            </Field>
                        )}
                    />

                    <Controller
                        control={control}
                        name="id_type_utilisateur"
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Rôle *</FieldLabel>
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Choisir un rôle" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {types.map((type) => (
                                            <SelectItem
                                                key={type.id_type_utilisateur}
                                                value={String(type.id_type_utilisateur)}
                                            >
                                                {type.libelle_type_utilisateur}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FieldError errors={[fieldState.error]} />
                            </Field>
                        )}
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                        <Controller
                            control={control}
                            name="password_utilisateur"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="password_utilisateur">
                                        {isEditing ? "Nouveau mot de passe" : "Mot de passe *"}
                                    </FieldLabel>
                                    <Password
                                        id="password_utilisateur"
                                        placeholder="••••••••"
                                        {...field}
                                    />
                                    <FieldError errors={[fieldState.error]} />
                                </Field>
                            )}
                        />
                        <Controller
                            control={control}
                            name="confirmPassword"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="confirmPassword">
                                        Confirmer le mot de passe
                                    </FieldLabel>
                                    <Password
                                        id="confirmPassword"
                                        placeholder="••••••••"
                                        {...field}
                                    />
                                    <FieldError errors={[fieldState.error]} />
                                </Field>
                            )}
                        />
                    </div>

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
