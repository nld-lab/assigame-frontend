import { api } from "@/api/Client";
import { authStorage } from "@/lib/auth-storage";
import type {
    AuthResponse,
    LoginRequest,
    RegisterRequest,
    TypeUtilisateur,
    Utilisateur,
} from "@/types";

export const AuthService = {
    login: async (credentials: LoginRequest): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>("/auth/login", credentials);
        authStorage.setToken(response.data.token);
        authStorage.setUser(response.data.user);
        return response.data;
    },

    register: async (payload: RegisterRequest): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>("/auth/register", payload);
        authStorage.setToken(response.data.token);
        authStorage.setUser(response.data.user);
        return response.data;
    },

    getMe: async (): Promise<Utilisateur> => {
        const response = await api.get<Utilisateur>("/auth/me");
        authStorage.setUser(response.data);
        return response.data;
    },

    getTypes: async (): Promise<TypeUtilisateur[]> => {
        const response = await api.get<TypeUtilisateur[]>("/typeutilisateur");
        return response.data;
    },

    logout: (): void => {
        authStorage.clear();
    },
};
