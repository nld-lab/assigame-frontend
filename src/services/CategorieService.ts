import { api } from "@/api/Client";
import { getCategoryImageUrl } from "@/lib/media";
import type { CategorieProduit } from "@/types";

type CategoriePayload = Pick<
    CategorieProduit,
    "nom_categorieproduit" | "description"
>;

function buildCategorieFormData(categorie: CategoriePayload, image?: File) {
    const formData = new FormData();
    formData.append(
        "categorie",
        new Blob([JSON.stringify(categorie)], { type: "application/json" }),
        "categorie.json"
    );
    if (image) {
        formData.append("image", image);
    }
    return formData;
}

export const CategorieService = {
    getAll: async (): Promise<CategorieProduit[]> => {
        const response = await api.get<CategorieProduit[]>("/categorieproduit/list");
        return response.data;
    },

    getImageUrl: (id: number) => getCategoryImageUrl(id),

    add: async (categorie: CategoriePayload, image?: File): Promise<CategorieProduit> => {
        if (image) {
            const response = await api.post<CategorieProduit>(
                "/categorieproduit/add",
                buildCategorieFormData(categorie, image)
            );
            return response.data;
        }

        const response = await api.post<CategorieProduit>(
            "/categorieproduit/add",
            categorie
        );
        return response.data;
    },

    uploadImage: async (id: number, file: File): Promise<CategorieProduit> => {
        const formData = new FormData();
        formData.append("file", file);
        const response = await api.post<CategorieProduit>(
            `/categorieproduit/${id}/upload-image`,
            formData
        );
        return response.data;
    },

    update: async (
        id: number,
        categorie: CategoriePayload,
        image?: File
    ): Promise<CategorieProduit> => {
        if (image) {
            const response = await api.post<CategorieProduit>(
                `/categorieproduit/update/${id}`,
                buildCategorieFormData(categorie, image)
            );
            return response.data;
        }

        const response = await api.put<CategorieProduit>(
            `/categorieproduit/update/${id}`,
            categorie
        );
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await api.delete(`/categorieproduit/delete/${id}`);
    },
};
