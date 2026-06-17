import * as z from "zod";

export const profileSchema = z
    .object({
        nom_utilisateur: z.string().min(1, "Ce champ est requis"),
        prenom_utilisateur: z.string().min(1, "Ce champ est requis"),
        sexe_utilisateur: z.string().min(1, "Veuillez sélectionner une option"),
        telephone_utilisateur: z
            .string()
            .min(6, "Numéro de téléphone invalide")
            .regex(/^[+0-9 ]+$/, "Numéro de téléphone invalide"),
        mail_utilisateur: z.email("Veuillez entrer un email valide"),
        residence_utilisateur: z.string().min(1, "Ce champ est requis"),
        password_utilisateur: z.string().optional(),
        confirmPassword: z.string().optional(),
    })
    .refine(
        (data) =>
            !data.password_utilisateur ||
            data.password_utilisateur.length === 0 ||
            data.password_utilisateur.length >= 6,
        {
            message: "Au moins 6 caractères",
            path: ["password_utilisateur"],
        }
    )
    .refine(
        (data) =>
            !data.password_utilisateur ||
            data.password_utilisateur.length === 0 ||
            data.password_utilisateur === data.confirmPassword,
        {
            message: "Les mots de passe ne correspondent pas",
            path: ["confirmPassword"],
        }
    );

export type ProfileFormValues = z.infer<typeof profileSchema>;
