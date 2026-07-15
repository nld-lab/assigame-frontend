import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { motion } from "motion/react";
import {
    ArrowLeft,
    Mail,
    MessageCircle,
    Package,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    ProductCard,
} from "@/features/homepage/ProductCard";
import {
    buildGmailComposeLink,
    buildProductContactMessage,
    buildWhatsAppLink,
} from "@/lib/contact-links";
import { ProduitService } from "@/services/ProduitService";
import {
    fadeRight,
    fadeUp,
    staggerContainer,
    staggerItem,
    viewportOnce,
} from "@/lib/motion";
import type { Produit } from "@/types";

function formatPrice(prix: number) {
    return new Intl.NumberFormat("fr-FR").format(prix) + " FCFA";
}

function formatDate(date: string) {
    return new Intl.DateTimeFormat("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(new Date(date));
}

export default function DetailsProduit() {
    const { id } = useParams<{ id: string }>();
    const [produit, setProduit] = useState<Produit | null>(null);
    const [suggestions, setSuggestions] = useState<Produit[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        const productId = Number(id);
        if (!id || Number.isNaN(productId)) {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setImageError(false);

        Promise.all([
            ProduitService.getById(productId),
            ProduitService.getAll(),
        ])
            .then(([product, allProducts]) => {
                setProduit(product);

                const categoryId =
                    product.categorie_produit?.idcategorie_produit;
                const related = allProducts
                    .filter(
                        (item) =>
                            item.id_produit !== product.id_produit &&
                            item.statut === "ACTIF" &&
                            item.categorie_produit?.idcategorie_produit ===
                                categoryId
                    )
                    .slice(0, 4);

                setSuggestions(related);
            })
            .catch(() => {
                setProduit(null);
                setSuggestions([]);
                toast.error("Impossible de charger ce produit.");
            })
            .finally(() => setIsLoading(false));
    }, [id]);

    if (isLoading) {
        return (
            <div className="mx-auto w-full max-w-6xl px-4 pt-28 pb-20">
                <div className="mb-6 h-8 w-32 animate-pulse rounded bg-muted" />
                <div className="grid gap-8 lg:grid-cols-2">
                    <div className="aspect-square animate-pulse rounded-xl bg-muted" />
                    <div className="space-y-4">
                        <div className="h-6 w-24 animate-pulse rounded bg-muted" />
                        <div className="h-10 w-3/4 animate-pulse rounded bg-muted" />
                        <div className="h-24 animate-pulse rounded bg-muted" />
                    </div>
                </div>
            </div>
        );
    }

    if (!produit) {
        return (
            <div className="mx-auto w-full max-w-6xl px-4 pt-28 pb-20 text-center">
                <Card>
                    <CardContent className="py-12">
                        <p className="text-muted-foreground">
                            Ce produit est introuvable ou n&apos;est plus
                            disponible.
                        </p>
                        <Button asChild className="mt-4">
                            <Link to="/produits">Retour au catalogue</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const vendeur = produit.utilisateur;
    const priceLabel = formatPrice(produit.prix);
    const contactMessage = buildProductContactMessage(
        produit.nom_produit,
        priceLabel
    );
    const whatsappLink = vendeur?.telephone_utilisateur
        ? buildWhatsAppLink(vendeur.telephone_utilisateur, contactMessage)
        : null;
    const mailLink =
        vendeur?.mail_utilisateur
            ? buildGmailComposeLink(
                  vendeur.mail_utilisateur,
                  `Assigame — ${produit.nom_produit}`,
                  contactMessage
              )
            : null;

    const imageUrl = produit.image_type
        ? ProduitService.getImageUrl(produit.id_produit)
        : null;

    return (
        <div className="mx-auto w-full max-w-6xl px-4 pt-28 pb-20">
            <Button variant="ghost" size="sm" className="-ml-2 mb-6 gap-2" asChild>
                <Link to="/produits">
                    <ArrowLeft className="size-4" />
                    Retour aux produits
                </Link>
            </Button>

            <motion.div
                className="grid gap-8 lg:grid-cols-2 lg:gap-12"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={fadeRight}>
                <Card className="overflow-hidden py-0">
                    <CardContent className="p-0">
                        <div className="flex aspect-square items-center justify-center bg-muted/40">
                            {imageUrl && !imageError ? (
                                <img
                                    src={imageUrl}
                                    alt={produit.nom_produit}
                                    className="h-full w-full object-cover"
                                    onError={() => setImageError(true)}
                                />
                            ) : (
                                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                    <Package className="size-16 opacity-40" />
                                    <span className="text-sm">
                                        Image indisponible
                                    </span>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
                </motion.div>

                <motion.div className="space-y-6" variants={fadeUp}>
                    <div className="space-y-3">
                        <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                            {produit.categorie_produit?.nom_categorieproduit ??
                                "Sans catégorie"}
                        </span>
                        <h1 className="text-3xl font-bold tracking-tight">
                            {produit.nom_produit}
                        </h1>
                        <p className="text-2xl font-bold text-primary">
                            {priceLabel}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Publié le {formatDate(produit.date_ajout)}
                        </p>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                        <h2 className="text-lg font-semibold">Description</h2>
                        <Card>
                            <CardContent className="p-4">
                                <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                                    {produit.description?.trim() ||
                                        "Aucune description fournie pour ce produit."}
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {vendeur && (
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base">
                                    Contacter le vendeur
                                </CardTitle>
                                <CardDescription>
                                    {vendeur.prenom_utilisateur}{" "}
                                    {vendeur.nom_utilisateur}
                                    {vendeur.residence_utilisateur &&
                                        ` · ${vendeur.residence_utilisateur}`}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-3 sm:flex-row w-full justify-between">
                                <Button
                                    asChild
                                    className="gap-2 px-20 rounded-full"
                                    disabled={!whatsappLink}
                                >
                                    <a
                                        href={whatsappLink ?? undefined}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => {
                                            if (!whatsappLink) {
                                                e.preventDefault();
                                                toast.error(
                                                    "Numéro WhatsApp indisponible."
                                                );
                                            }
                                        }}
                                    >
                                        <MessageCircle className="size-4" />
                                        WhatsApp
                                    </a>
                                </Button>
                                <Button
                                    asChild
                                    className="gap-2 px-20 rounded-full border-primary border-3 text-primary"
                                    disabled={!mailLink}
                                    variant="outline"
                                >
                                    <a
                                        href={mailLink ?? undefined}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => {
                                            if (!mailLink) {
                                                e.preventDefault();
                                                toast.error(
                                                    "Adresse email indisponible."
                                                );
                                            }
                                        }}
                                    >
                                        <Mail className="size-4" />
                                        Email
                                    </a>
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </motion.div>
            </motion.div>

            {suggestions.length > 0 && (
                <motion.section
                    className="mt-16 space-y-6"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                >
                    <Separator />
                    <motion.div variants={fadeUp}>
                        <h2 className="text-xl font-bold">
                            Produits dans la même categorie
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            D&apos;autres annonces dans la catégorie{" "}
                            {produit.categorie_produit?.nom_categorieproduit ??
                                "« Sans catégorie »"}
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
                        {suggestions.map((item) => (
                            <motion.div key={item.id_produit} variants={staggerItem}>
                                <ProductCard produit={item} />
                            </motion.div>
                        ))}
                    </div>
                </motion.section>
            )}

            {suggestions.length === 0 && (
                <section className="mt-16">
                    <Separator className="mb-6" />
                    <p className="text-center text-sm text-muted-foreground">
                        Aucun autre produit dans cette catégorie pour le moment.
                    </p>
                </section>
            )}
        </div>
    );
}
