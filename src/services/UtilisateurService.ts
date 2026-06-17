import { api } from "@/api/Client";
import type { Utilisateur, UtilisateurPayload } from "@/types";

export const UtilisateurService = {
    getAll: async (): Promise<Utilisateur[]> => {
        const response = await api.get<Utilisateur[]>("/utilisateur");
        return response.data;
    },

    add: async (payload: UtilisateurPayload): Promise<Utilisateur> => {
        const response = await api.post<Utilisateur>("/utilisateur/add", payload);
        return response.data;
    },

    update: async (
        id: number,
        payload: UtilisateurPayload
    ): Promise<Utilisateur> => {
        const response = await api.put<Utilisateur>(
            `/utilisateur/update/${id}`,
            payload
        );
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await api.delete(`/utilisateur/delete/${id}`);
    },
};
