import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation, useNavigate } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { AuthPageShell } from "@/features/auth/AuthPageShell";
import { useAuth } from "@/hooks/use-auth";
import { homePathForRole } from "@/routes/role-redirect";
import { DotPattern } from "@/components/ui/dot-pattern";

const formSchema = z.object({
  username: z
    .string()
    .min(2, "Le nom d'utilisateur doit contenir au moins 2 caractères"),
  password: z.string().min(1, "Le mot de passe est requis"),
});

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const user = await login({
        login: data.username,
        password: data.password,
      });
      toast.success(`Bienvenue ${user.prenom_utilisateur} !`);
      const from = (location.state as { from?: { pathname?: string } } | null)
        ?.from?.pathname;
      navigate(from ?? homePathForRole(user.role), { replace: true });
    } catch {
      toast.error("Identifiants invalides. Veuillez réessayer.");
    }
  };

  return (
    <AuthPageShell
      title="Se connecter"
      description="Entrez vos identifiants pour accéder à votre espace."
      imageSrc="/connexion image.jpg"
    >
      <form className="space-y-4 w-full max-w-sm" onSubmit={form.handleSubmit(onSubmit)}>
        <DotPattern className="absolute inset-0 z-0 opacity-50" width={40} height={40} glow={true} />
        <Controller
          control={form.control}
          name="username"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Nom d&apos;utilisateur</FieldLabel>
              <Input
                aria-invalid={fieldState.invalid}
                placeholder="Nom d'utilisateur"
                {...field}
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Mot de passe</FieldLabel>
              <Input
                aria-invalid={fieldState.invalid}
                placeholder="Mot de passe"
                type="password"
                {...field}
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
        <Button className="mt-2 w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Connexion..." : "Se connecter"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Vous n&apos;avez pas de compte ?{" "}
        <Link className="font-medium text-foreground underline" to="/register">
          Créer un compte
        </Link>
      </p>
    </AuthPageShell>
  );
};

export default Login;
