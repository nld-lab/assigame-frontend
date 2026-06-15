import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { DotPattern } from "@/components/ui/dot-pattern";

const formSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters long"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const Login = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="grid h-full w-full lg:grid-cols-2">
        <div>
          <div className="hidden lg:block h-full w-full bg-muted rounded-lg"></div>
          {/* <div className="h-full w-full bg-muted rounded-lg" style={{ backgroundImage: 'url(https://plus.unsplash.com/premium_photo-1683746792239-6ce8cdd3ac78?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZWNvbW1lcmNlfGVufDB8fDB8fHww)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} /> */}
        </div>

        <div className="m-auto h-screen flex w-full max-w-xs flex-col justify-center items-center">
          <DotPattern width={40} height={40} className="-z-10 " glow={true} />
            
          
          <form
            className="w-full space-y-4 z-10"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="mb-20 space-y-2">
              <h1 className="text-4xl font-bold text-center">Se Connecter</h1>
              <p className="text-center text-sm">
                Entrez vos identifiants pour vous connecter
              </p>
            </div>

            <Controller
              control={form.control}
              name="username"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Username</FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    className="w-full"
                    placeholder="Username"
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
                  <FieldLabel>Password</FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    className="w-full"
                    placeholder="Password"
                    type="password"
                    {...field}
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
            <Button className="mt-4 w-full" type="submit">
              Se Connecter
            </Button>
          </form>

          <div className="mt-5 space-y-5">
            {/* <Link
              className="block text-center text-muted-foreground text-sm underline"
              to="#"
            >
              Forgot your password?
            </Link> */}
            <p className="text-center text-sm">
              Vous n&apos;avez pas de compte?
              <Link
                className="ml-1 text-muted-foreground underline"
                to="/register"
              >
                Créer un compte
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
