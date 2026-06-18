import { RegisterForm } from "@/components/registerform";
import { AuthPageShell } from "@/features/auth/AuthPageShell";

export default function RegisterPage() {
  return (
    <AuthPageShell
      title="Créer un compte"
      description="Inscrivez-vous en tant que vendeur pour publier vos annonces sur Assigame."
      imageSrc="/register image.jpg"
      reverse
    >
      <RegisterForm />
    </AuthPageShell>
  );
}
