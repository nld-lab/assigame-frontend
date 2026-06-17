const DEFAULT_IMAGES = [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1461896836934-ff607b308f01?w=600&auto=format&fit=crop&q=80",
];

const KEYWORD_IMAGES: { keywords: string[]; image: string }[] = [
    {
        keywords: ["vetement", "vêtement", "mode", "habit", "textile", "fashion"],
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&auto=format&fit=crop&q=80",
    },
    {
        keywords: ["meuble", "mobilier", "deco", "décoration", "maison"],
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80",
    },
    {
        keywords: ["electronique", "électronique", "telephone", "téléphone", "tech", "informatique"],
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80",
    },
    {
        keywords: ["sport", "fitness", "loisir"],
        image: "https://images.unsplash.com/photo-1461896836934-ff607b308f01?w=600&auto=format&fit=crop&q=80",
    },
];

function normalize(value: string) {
    return value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

export function getFallbackCategoryImage(name: string, index: number) {
    const normalized = normalize(name);

    for (const entry of KEYWORD_IMAGES) {
        if (entry.keywords.some((keyword) => normalized.includes(normalize(keyword)))) {
            return entry.image;
        }
    }

    return DEFAULT_IMAGES[index % DEFAULT_IMAGES.length];
}
