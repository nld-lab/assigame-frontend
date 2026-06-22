import * as z from "zod";

export const formSchema = z
  .object({
    name: z.string().min(1, "Ce champ est requis"),
    surname: z.string().min(1, "Ce champ est requis"),
    username: z.string().min(2, "Au moins 2 caractères"),
    email: z.email("Veuillez entrer un email valide"),
    telephone: z
      .string()
      .min(1, "Ce champ est requis")
      .regex(/^\+[0-9]+$/, "Numéro de téléphone invalide"),
    password: z.string().min(6, "Au moins 6 caractères"),
    confirm_password: z.string().min(1, "Ce champ est requis"),
    gender: z.string().min(1, "Veuillez sélectionner une option"),
    residence: z.string().min(1, "Ce champ est requis"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirm_password"],
  });
