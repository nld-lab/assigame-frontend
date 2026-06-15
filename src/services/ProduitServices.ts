import { api } from "@/api/Client";
import type { Produit } from "@/types";

export const ProduitServices = {

    getAllProduits: async (): Promise<Produit[]> => {
        const response = await api.get<Produit[]>("/produit");
        return response.data;
    },
    getProduitById: async (id: number): Promise<Produit> => {
        const response = await api.get<Produit>(`/produit/${id}`);
        return response.data;
    },
    addProduit: async (produit: Produit): Promise<Produit> => {
        const response = await api.post<Produit>("/produit/add", produit);
        return response.data;
    },
    updateProduit: async (id: number, produit: Produit): Promise<Produit> => {
        const response = await api.put<Produit>(`/produit/update/${id}`, produit);
        return response.data;
    },
    deleteProduit: async (id: number): Promise<void> => {
        await api.delete(`/produit/delete/${id}`);
    }

}