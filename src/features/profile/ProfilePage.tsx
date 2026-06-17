import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Shield, UserRound } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { getApiErrorMessage } from "@/lib/api-error";
import { profileSchema, type ProfileFormValues } from "@/lib/profileSchema";
import type { UpdateProfileRequest } from "@/types";
import { Password } from "@/components/password";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const GENDER_OPTIONS = [
    { label: "Homme", value: "M" },
    { label: "Femme", value: "F" },
    { label: "Autre", value: "A" },
];

function roleLabel(role: string | null | undefined): string {
    switch (role) {
        case "ADMIN":
            return "Administrateur";
        case "VENDEUR":
            return "Vendeur";
        default:
            return role ?? "Utilisateur";
    }
}

function initials(prenom: string, nom: string): string {
    const first = prenom.trim().charAt(0).toUpperCase();
    const last = nom.trim().charAt(0).toUpperCase();
    return `${first}${last}` || "?";
}

export default function ProfilePage() {
    const { user, updateProfile } = useAuth();

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            nom_utilisateur: "",
            prenom_utilisateur: "",
            sexe_utilisateur: "",
            telephone_utilisateur: "",
            mail_utilisateur: "",
            residence_utilisateur: "",
            password_utilisateur: "",
            confirmPassword: "",
        },
    });

    const {
        control,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = form;

    useEffect(() => {
        if (!user) return;
        reset({
            nom_utilisateur: user.nom_utilisateur ?? "",
            prenom_utilisateur: user.prenom_utilisateur ?? "",
            sexe_utilisateur: user.sexe_utilisateur ?? "",
            telephone_utilisateur: user.telephone_utilisateur ?? "",
            mail_utilisateur: user.mail_utilisateur ?? "",
            residence_utilisateur: user.residence_utilisateur ?? "",
            password_utilisateur: "",
            confirmPassword: "",
        });
    }, [user, reset]);

    const onSubmit = handleSubmit(async (data) => {
        const payload: UpdateProfileRequest = {
            nom_utilisateur: data.nom_utilisateur,
            prenom_utilisateur: data.prenom_utilisateur,
            sexe_utilisateur: data.sexe_utilisateur,
            telephone_utilisateur: data.telephone_utilisateur,
            mail_utilisateur: data.mail_utilisateur,
            residence_utilisateur: data.residence_utilisateur,
        };

        if (data.password_utilisateur?.trim()) {
            payload.password_utilisateur = data.password_utilisateur;
        }

        try {
            await updateProfile(payload);
            reset({
                ...data,
                password_utilisateur: "",
                confirmPassword: "",
            });
            toast.success("Profil mis à jour avec succès");
        } catch (error) {
            toast.error(
                getApiErrorMessage(error, "Impossible de mettre à jour le profil")
            );
        }
    });

    if (!user) {
        return null;
    }

    return (
        <div className="mx-auto max-w-3xl space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Mon profil</h1>
                    <p className="text-muted-foreground">
                        Gérez vos informations personnelles et votre mot de passe
                    </p>
                </div>
                <div className="flex items-center gap-3 rounded-lg border bg-card px-4 py-3">
                    <Avatar size="lg">
                        <AvatarFallback className="bg-primary/10 text-primary">
                            {initials(user.prenom_utilisateur, user.nom_utilisateur)}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-medium">
                            {user.prenom_utilisateur} {user.nom_utilisateur}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            @{user.login_utilisateur}
                        </p>
                        <span className="mt-1 inline-flex rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                            {roleLabel(user.role)}
                        </span>
                    </div>
                </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <UserRound className="size-5" />
                            Informations personnelles
                        </CardTitle>
                        <CardDescription>
                            Ces informations sont visibles sur vos annonces pour les
                            contacts clients.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FieldSet>
                            <FieldGroup className="grid gap-5 sm:grid-cols-2">
                                <Controller
                                    name="prenom_utilisateur"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="prenom_utilisateur">
                                                Prénom *
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id="prenom_utilisateur"
                                                aria-invalid={fieldState.invalid}
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                                <Controller
                                    name="nom_utilisateur"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="nom_utilisateur">
                                                Nom *
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id="nom_utilisateur"
                                                aria-invalid={fieldState.invalid}
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                                <Controller
                                    name="sexe_utilisateur"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="sexe_utilisateur">
                                                Sexe *
                                            </FieldLabel>
                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger id="sexe_utilisateur" className="w-full">
                                                    <SelectValue placeholder="Choisissez votre sexe" />
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
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                                <Field>
                                    <FieldLabel htmlFor="login_utilisateur">Identifiant</FieldLabel>
                                    <Input
                                        id="login_utilisateur"
                                        value={user.login_utilisateur}
                                        disabled
                                        readOnly
                                    />
                                    <FieldDescription>
                                        L&apos;identifiant de connexion ne peut pas être modifié.
                                    </FieldDescription>
                                </Field>
                                <Controller
                                    name="telephone_utilisateur"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="telephone_utilisateur">
                                                Téléphone *
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id="telephone_utilisateur"
                                                type="tel"
                                                aria-invalid={fieldState.invalid}
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                                <Controller
                                    name="mail_utilisateur"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="mail_utilisateur">
                                                Email *
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id="mail_utilisateur"
                                                type="email"
                                                aria-invalid={fieldState.invalid}
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                                <Controller
                                    name="residence_utilisateur"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Field
                                            data-invalid={fieldState.invalid}
                                            className="sm:col-span-2"
                                        >
                                            <FieldLabel htmlFor="residence_utilisateur">
                                                Résidence *
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id="residence_utilisateur"
                                                aria-invalid={fieldState.invalid}
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                            </FieldGroup>
                        </FieldSet>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="size-5" />
                            Sécurité
                        </CardTitle>
                        <CardDescription>
                            Laissez vide pour conserver votre mot de passe actuel.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FieldSet>
                            <FieldGroup className="grid gap-5 sm:grid-cols-2">
                                <Controller
                                    name="password_utilisateur"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="password_utilisateur">
                                                Nouveau mot de passe
                                            </FieldLabel>
                                            <Password
                                                {...field}
                                                id="password_utilisateur"
                                                placeholder="••••••••"
                                                aria-invalid={fieldState.invalid}
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                                <Controller
                                    name="confirmPassword"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="confirmPassword">
                                                Confirmer le mot de passe
                                            </FieldLabel>
                                            <Password
                                                {...field}
                                                id="confirmPassword"
                                                placeholder="••••••••"
                                                aria-invalid={fieldState.invalid}
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                            </FieldGroup>
                        </FieldSet>
                    </CardContent>
                </Card>

                <Separator />

                <div className="flex justify-end">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting && (
                            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                        )}
                        Enregistrer les modifications
                    </Button>
                </div>
            </form>
        </div>
    );
}
