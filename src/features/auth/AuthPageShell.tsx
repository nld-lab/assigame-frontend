import type { PropsWithChildren } from "react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/Toogle-mode";

interface AuthPageShellProps extends PropsWithChildren {
  title: string;
  description?: string;
  imageSrc?: string;
  reverse?: boolean;
}

export function AuthPageShell({
  children,
  title,
  description,
  imageSrc = "/register image.jpg",
  reverse = false,
}: AuthPageShellProps) {
  const formPanel = (
    <div className="relative flex min-h-screen flex-col px-6 py-6 sm:px-10">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" className="-ml-2 gap-2" asChild>
          <Link to="/">
            <ArrowLeft className="size-4" />
            Retour
          </Link>
        </Button>
        <ModeToggle />
      </div>

      <div className="mx-auto flex w-full items-center max-w-md flex-1 flex-col justify-center py-6">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {children}
      </div>
    </div>
  );

  const imagePanel = (
    <div className="relative hidden min-h-screen lg:block">
      <img
        src={imageSrc}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-black/10" />
      <div className="absolute inset-x-10 bottom-10">
        <p className="text-2xl font-bold text-white">ASSIGAME</p>
        <p className="mt-2 max-w-sm text-sm text-white/80">
          Publiez vos produits et mettez-vous en relation avec les acheteurs en
          toute simplicité.
        </p>
      </div>
    </div>
  );

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {reverse ? (
        <>
          {formPanel}
          {imagePanel}
        </>
      ) : (
        <>
          {imagePanel}
          {formPanel}
        </>
      )}
    </div>
  );
}
