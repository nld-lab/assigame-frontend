import { Card, CardContent } from "@/components/ui/card";

export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="mb-6 text-2xl font-bold">{title}</h1>
      <Card>
        <CardContent className="flex h-48 items-center justify-center">
          <p className="text-sm text-muted-foreground">
            Cette section sera bientôt disponible.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
