import axios from 'axios';
import { toast } from 'sonner';
import { authStorage } from '@/lib/auth-storage';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use((config) => {
    const token = authStorage.getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    // Laisser le navigateur définir le boundary multipart (sinon le CRUD échoue).
    if (config.data instanceof FormData && config.headers) {
        if (typeof config.headers.delete === "function") {
            config.headers.delete("Content-Type");
        } else {
            delete config.headers["Content-Type"];
        }
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error?.response?.status;
        const url: string = error?.config?.url ?? '';

        // 403 = droits insuffisants (ne pas confondre avec une session expirée)
        if (status === 403 && !url.includes('/auth/')) {
            return Promise.reject(error);
        }

        // 401 = session invalide ou expirée
        if (status === 401 && !url.includes('/auth/')) {
            authStorage.clear();
            if (window.location.pathname !== '/login') {
                toast.error('Votre session a expiré. Veuillez vous reconnecter.');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);
