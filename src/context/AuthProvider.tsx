import { useCallback, useEffect, useMemo, useState } from "react";
import type { PropsWithChildren } from "react";
import { AuthService } from "@/services/AuthService";
import { authStorage } from "@/lib/auth-storage";
import type { LoginRequest, RegisterRequest, Utilisateur } from "@/types";
import { AuthContext, type AuthContextValue } from "./auth-context";

export function AuthProvider({ children }: PropsWithChildren) {
    const [user, setUser] = useState<Utilisateur | null>(() => authStorage.getUser());
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const token = authStorage.getToken();
        if (!token) {
            setIsLoading(false);
            return;
        }
        // On valide la session au démarrage en rechargeant l'utilisateur courant.
        AuthService.getMe()
            .then((me) => setUser(me))
            .catch(() => {
                authStorage.clear();
                setUser(null);
            })
            .finally(() => setIsLoading(false));
    }, []);

    const login = useCallback(async (credentials: LoginRequest) => {
        const { user: loggedUser } = await AuthService.login(credentials);
        setUser(loggedUser);
        return loggedUser;
    }, []);

    const register = useCallback(async (payload: RegisterRequest) => {
        const { user: createdUser } = await AuthService.register(payload);
        setUser(createdUser);
        return createdUser;
    }, []);

    const logout = useCallback(() => {
        AuthService.logout();
        setUser(null);
    }, []);

    const value = useMemo<AuthContextValue>(
        () => ({
            user,
            role: user?.role ?? null,
            isAuthenticated: !!user,
            isLoading,
            login,
            register,
            logout,
        }),
        [user, isLoading, login, register, logout]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
