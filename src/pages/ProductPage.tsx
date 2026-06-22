import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { motion } from "motion/react";
import { Filter, Search } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    ProductCard,
    ProductSkeleton,
} from "@/features/homepage/ProductCard";
import { CategorieService } from "@/services/CategorieService";
import { ProduitService } from "@/services/ProduitService";
import type { CategorieProduit, Produit } from "@/types";
import { cn } from "@/lib/utils";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/motion";

function CategoryFilters({
    categories,
    selectedCategoryId,
    onSelect,
    className,
}: {
    categories: CategorieProduit[];
    selectedCategoryId: number | null;
    onSelect: (id: number | null) => void;
    className?: string;
}) {
    return (
        <div className={cn("space-y-1", className)}>
            <Button
                type="button"
                variant={selectedCategoryId === null ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => onSelect(null)}
            >
                Toutes les catégories
            </Button>
            {categories.map((categorie) => (
                <Button
                    key={categorie.idcategorie_produit}
                    type="button"
                    variant={
                        selectedCategoryId === categorie.idcategorie_produit
                            ? "secondary"
                            : "ghost"
                    }
                    className="w-full justify-start text-left"
                    onClick={() => onSelect(categorie.idcategorie_produit)}
                >
                    {categorie.nom_categorieproduit}
                </Button>
            ))}
        </div>
    );
}

export default function ProductPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [produits, setProduits] = useState<Produit[]>([]);
    const [categories, setCategories] = useState<CategorieProduit[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchInput, setSearchInput] = useState(
        () => searchParams.get("q") ?? ""
    );

    const selectedCategoryId = useMemo(() => {
        const value = searchParams.get("categorie");
        if (!value) return null;
        const parsed = Number(value);
        return Number.isNaN(parsed) ? null : parsed;
    }, [searchParams]);

    const searchQuery = searchParams.get("q") ?? "";

    useEffect(() => {
        setIsLoading(true);
        Promise.all([ProduitService.getAll(), CategorieService.getAll()])
            .then(([productsData, categoriesData]) => {
                setProduits(productsData);
                setCategories(categoriesData);
            })
            .catch(() => toast.error("Impossible de charger les produits."))
            .finally(() => setIsLoading(false));
    }, []);

    const filteredProducts = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        return produits
            .filter((produit) => produit.statut === "ACTIF")
            .filter((produit) => {
                if (selectedCategoryId === null) return true;
                return (
                    produit.categorie_produit?.idcategorie_produit ===
                    selectedCategoryId
                );
            })
            .filter((produit) => {
                if (!query) return true;
                return (
                    produit.nom_produit.toLowerCase().includes(query) ||
                    produit.description?.toLowerCase().includes(query) ||
                    produit.categorie_produit?.nom_categorieproduit
                        .toLowerCase()
                        .includes(query)
                );
            });
    }, [produits, searchQuery, selectedCategoryId]);

    const setCategory = (id: number | null) => {
        const next = new URLSearchParams(searchParams);
        if (id === null) {
            next.delete("categorie");
        } else {
            next.set("categorie", String(id));
        }
        setSearchParams(next);
    };

    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const next = new URLSearchParams(searchParams);
        const value = searchInput.trim();
        if (value) {
            next.set("q", value);
        } else {
            next.delete("q");
        }
        setSearchParams(next);
    };

    const clearSearch = () => {
        setSearchInput("");
        const next = new URLSearchParams(searchParams);
        next.delete("q");
        setSearchParams(next);
    };

    const selectedCategoryName =
        categories.find(
            (c) => c.idcategorie_produit === selectedCategoryId
        )?.nom_categorieproduit ?? null;

    return (
        <div className="mx-auto w-full max-w-7xl px-4 pt-28 pb-20">
            <motion.div
                className="mb-8 space-y-6"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
            >
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Nos produits
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Parcourez les annonces publiées par nos vendeurs.
                    </p>
                </div>

                <Card>
                    <CardContent className="p-4">
                        <form
                            onSubmit={handleSearchSubmit}
                            className="flex flex-col gap-3 sm:flex-row"
                        >
                            <div className="relative flex-1">
                                <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    value={searchInput}
                                    onChange={(e) =>
                                        setSearchInput(e.target.value)
                                    }
                                    placeholder="Rechercher un produit, une catégorie..."
                                    className="pl-9"
                                />
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit" className="gap-2">
                                    <Search className="size-4" />
                                    Rechercher
                                </Button>
                                {searchQuery && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={clearSearch}
                                    >
                                        Effacer
                                    </Button>
                                )}
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>

            <div className="flex flex-col gap-8 lg:flex-row">
                <aside className="hidden w-64 shrink-0 lg:block">
                    <Card className="sticky top-28">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base">
                                Catégories
                            </CardTitle>
                            <CardDescription>
                                Filtrez les produits par catégorie
                            </CardDescription>
                        </CardHeader>
                        <Separator />
                        <CardContent className="pt-4">
                            <CategoryFilters
                                categories={categories}
                                selectedCategoryId={selectedCategoryId}
                                onSelect={setCategory}
                            />
                        </CardContent>
                    </Card>
                </aside>

                <div className="flex-1 space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="text-sm text-muted-foreground">
                            {isLoading
                                ? "Chargement..."
                                : `${filteredProducts.length} produit${filteredProducts.length > 1 ? "s" : ""} trouvé${filteredProducts.length > 1 ? "s" : ""}`}
                            {selectedCategoryName &&
                                ` · ${selectedCategoryName}`}
                            {searchQuery && ` · « ${searchQuery} »`}
                        </p>

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-2 lg:hidden"
                                >
                                    <Filter className="size-4" />
                                    Catégories
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-80">
                                <SheetHeader>
                                    <SheetTitle>Catégories</SheetTitle>
                                </SheetHeader>
                                <CategoryFilters
                                    categories={categories}
                                    selectedCategoryId={selectedCategoryId}
                                    onSelect={setCategory}
                                    className="mt-6"
                                />
                            </SheetContent>
                        </Sheet>
                    </div>

                    {isLoading && (
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4">
                            {Array.from({ length: 8 }).map((_, index) => (
                                <ProductSkeleton key={index} />
                            ))}
                        </div>
                    )}

                    {!isLoading && filteredProducts.length === 0 && (
                        <Card>
                            <CardContent className="py-12 text-center">
                                <p className="text-sm text-muted-foreground">
                                    Aucun produit ne correspond à votre recherche.
                                </p>
                                {(searchQuery || selectedCategoryId) && (
                                    <Button
                                        variant="link"
                                        className="mt-2"
                                        onClick={() => {
                                            clearSearch();
                                            setCategory(null);
                                        }}
                                    >
                                        Réinitialiser les filtres
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {!isLoading && filteredProducts.length > 0 && (
                        <motion.div
                            key={`${selectedCategoryId ?? "all"}-${searchQuery}`}
                            className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4"
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                        >
                            {filteredProducts.map((produit) => (
                                <motion.div
                                    key={produit.id_produit}
                                    variants={staggerItem}
                                >
                                    <ProductCard produit={produit} />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
