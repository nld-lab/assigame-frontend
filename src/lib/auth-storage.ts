import type { Utilisateur } from "@/types";

const TOKEN_KEY = "assigame_token";
const USER_KEY = "assigame_user";

export const authStorage = {
    getToken(): string | null {
        return localStorage.getItem(TOKEN_KEY);
    },
    setToken(token: string): void {
        localStorage.setItem(TOKEN_KEY, token);
    },
    getUser(): Utilisateur | null {
        const raw = localStorage.getItem(USER_KEY);
        if (!raw) return null;
        try {
            return JSON.parse(raw) as Utilisateur;
        } catch {
            return null;
        }
    },
    setUser(user: Utilisateur): void {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    },
    clear(): void {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    },
};
