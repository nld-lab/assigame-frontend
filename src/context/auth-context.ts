import { createContext } from "react";
import type { LoginRequest, RegisterRequest, UpdateProfileRequest, Utilisateur } from "@/types";

export interface AuthContextValue {
    user: Utilisateur | null;
    role: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: LoginRequest) => Promise<Utilisateur>;
    register: (payload: RegisterRequest) => Promise<Utilisateur>;
    updateProfile: (payload: UpdateProfileRequest) => Promise<Utilisateur>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
