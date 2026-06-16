/* eslint-disable @typescript-eslint/no-explicit-any */
import * as z from "zod";
import { useEffect, useState } from "react";
import { formSchema } from "../lib/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import { homePathForRole } from "@/routes/role-redirect";
import { AuthService } from "@/services/AuthService";
import type { RegisterRequest } from "@/types";
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import {
  FormHeader,
  FormFooter,
  StepFields,
  PreviousButton,
  NextButton,
  SubmitButton,
  MultiStepFormContent,
} from "@/components/multi-step-viewer";
import { MultiStepFormProvider, type Stepfields } from "@/hooks/use-multi-step-viewer";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Password } from "@/components/password";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

//------------------------------
type Schema = z.infer<typeof formSchema>;

// Tout compte créé à l'inscription est un VENDEUR (les clients n'ont pas de compte).
const ROLE_VENDEUR = "VENDEUR";

export function RegisterForm() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [vendeurTypeId, setVendeurTypeId] = useState<number | null>(null);

  const form = useForm<Schema>({
    resolver: zodResolver(formSchema as any),
  });
  const {
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    AuthService.getTypes()
      .then((data) => {
        const vendeur = data.find(
          (t) => t.libelle_type_utilisateur.toUpperCase() === ROLE_VENDEUR
        );
        setVendeurTypeId(vendeur ? vendeur.id_type_utilisateur : null);
      })
      .catch(() => setVendeurTypeId(null));
  }, []);

  const handleSubmit = form.handleSubmit(async (data: Schema) => {
    if (vendeurTypeId === null) {
      toast.error(
        "Le type de compte « VENDEUR » est introuvable côté serveur. Contactez l'administrateur."
      );
      return;
    }
    try {
      const payload: RegisterRequest = {
        nom_utilisateur: data.name,
        prenom_utilisateur: data.surname,
        sexe_utilisateur: data.gender,
        telephone_utilisateur: data.telephone,
        mail_utilisateur: data.email,
        login_utilisateur: data.username,
        password_utilisateur: data.password,
        residence_utilisateur: data.residence,
        type_utilisateur: { id_type_utilisateur: vendeurTypeId },
      };
      const user = await register(payload);
      toast.success("Compte vendeur créé avec succès !");
      navigate(homePathForRole(user.role), { replace: true });
    } catch {
      toast.error(
        "L'inscription a échoué. Vérifiez vos informations (login/téléphone/email déjà utilisés ?)."
      );
    }
  });
  const stepsFields: Stepfields<keyof Schema>[] = [
    {
      fields: ["name", "surname", "username", "email", "telephone"],
      component: (
        <>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="gap-1 col-span-3"
              >
                <FieldLabel htmlFor="name">Nom *</FieldLabel>
                <Input
                  {...field}
                  id="name"
                  type="text"
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  aria-invalid={fieldState.invalid}
                  placeholder="Entrez votre nom"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="surname"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="gap-1 col-span-3 "
              >
                <FieldLabel htmlFor="surname">Prénoms *</FieldLabel>
                <Input
                  {...field}
                  id="surname"
                  type="text"
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  aria-invalid={fieldState.invalid}
                  placeholder="Entrez vos prénoms"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="username"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="gap-1 col-span-full"
              >
                <FieldLabel htmlFor="username">Nom d'utilisateur *</FieldLabel>
                <Input
                  {...field}
                  id="username"
                  type="text"
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  aria-invalid={fieldState.invalid}
                  placeholder={`Entrez votre nom d'utilisateur`}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="gap-1 col-span-full"
              >
                <FieldLabel htmlFor="email">Email *</FieldLabel>
                <Input
                  {...field}
                  id="email"
                  type="text"
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  aria-invalid={fieldState.invalid}
                  placeholder="Entrez votre email"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="telephone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="gap-1 col-span-full"
              >
                <FieldLabel htmlFor="telephone">Téléphone *</FieldLabel>
                <Input
                  {...field}
                  id="telephone"
                  type="text"
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  aria-invalid={fieldState.invalid}
                  placeholder="Entrez votre numéro de téléphone"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </>
      ),
    },
    {
      fields: ["password", "confirm_password", "gender", "residence"],
      component: (
        <>
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="gap-1 col-span-full"
              >
                <FieldContent className="gap-0.5">
                  <FieldLabel htmlFor="password">Mot de passe *</FieldLabel>
                </FieldContent>
                <Password
                  {...field}
                  aria-invalid={fieldState.invalid}
                  id="password"
                  placeholder="Entrez votre mot de passe"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="confirm_password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="gap-1 col-span-full"
              >
                <FieldContent className="gap-0.5">
                  <FieldLabel htmlFor="confirm_password">
                    Confirmation du mot de passe *
                  </FieldLabel>
                </FieldContent>
                <Password
                  {...field}
                  aria-invalid={fieldState.invalid}
                  id="confirm_password"
                  placeholder="Confirmez votre mot de passe"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="gender"
            control={form.control}
            render={({ field, fieldState }) => {
              const options = [
                { label: "Homme", value: "M" },
                { label: "Femme", value: "F" },
                { label: "Autre", value: "A" },
              ];
              return (
                <Field
                  data-invalid={fieldState.invalid}
                  className="gap-1 col-span-3"
                >
                  <FieldLabel htmlFor="gender">Sexe *</FieldLabel>

                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choisissez votre sexe" />
                    </SelectTrigger>
                    <SelectContent>
                      {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              );
            }}
          />

          <Controller
            name="residence"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="gap-1 col-span-3"
              >
                <FieldLabel htmlFor="residence">Résidence *</FieldLabel>
                <Input
                  {...field}
                  id="residence"
                  type="text"
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  aria-invalid={fieldState.invalid}
                  placeholder="Entrez votre adresse de résidence"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-2">Créer un compte</h1>
      <p className="text-center text-sm text-pretty text-muted-foreground mb-6">
        Veuillez remplir le formulaire ci-dessous pour créer votre compte
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col p-4 md:p-5 mx-auto rounded-md w-full gap-2 "
      >
        <MultiStepFormProvider
          stepsFields={stepsFields}
          onStepValidation={async (step) => {
            const isValid = await form.trigger(step.fields);
            return isValid;
          }}
        >
          <MultiStepFormContent>
            <FormHeader />
            <StepFields />
            <FormFooter>
              <PreviousButton>
                <ChevronLeft />
                Précédent
              </PreviousButton>
              <NextButton>
                Suivant <ChevronRight />
              </NextButton>
              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Inscription..." : "S'inscrire"}
              </SubmitButton>
            </FormFooter>
          </MultiStepFormContent>
        </MultiStepFormProvider>
      </form>
      <p className="text-center text-sm">
        Vous avez un compte?
        <Link className="ml-1 text-muted-foreground underline" to="/login">
          Se connecter
        </Link>
      </p>
    </div>
  );
}
