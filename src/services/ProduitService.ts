import { api } from "@/api/Client";
import { getProduitImageUrl } from "@/lib/media";
import type { Produit } from "@/types";

export type ProduitPayload = {
    nom_produit: string;
    description?: string | null;
    prix: number;
    statut: string;
    categorie_produit: { idcategorie_produit: number };
};

function buildProduitFormData(produit: ProduitPayload, image?: File) {
    const formData = new FormData();
    formData.append(
        "produit",
        new Blob([JSON.stringify(produit)], { type: "application/json" }),
        "produit.json"
    );
    if (image) {
        formData.append("image", image);
    }
    return formData;
}

export const ProduitService = {
    getAll: async (): Promise<Produit[]> => {
        const response = await api.get<Produit[]>("/produit");
        return response.data;
    },

    getMine: async (): Promise<Produit[]> => {
        const response = await api.get<Produit[]>("/produit/mes-produits");
        return response.data;
    },

    getById: async (id: number): Promise<Produit> => {
        const response = await api.get<Produit>(`/produit/${id}`);
        return response.data;
    },

    getImageUrl: (id: number) => getProduitImageUrl(id),

    add: async (produit: ProduitPayload, image: File): Promise<Produit> => {
        const response = await api.post<Produit>(
            "/produit/add",
            buildProduitFormData(produit, image)
        );
        return response.data;
    },

    update: async (
        id: number,
        produit: ProduitPayload,
        image?: File
    ): Promise<Produit> => {
        if (image) {
            const response = await api.post<Produit>(
                `/produit/update/${id}`,
                buildProduitFormData(produit, image)
            );
            return response.data;
        }

        const response = await api.put<Produit>(`/produit/update/${id}`, produit);
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await api.delete(`/produit/delete/${id}`);
    },
};
