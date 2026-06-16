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
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error?.response?.status;
        const url: string = error?.config?.url ?? '';
        // En cas de session expirée/invalide, on déconnecte, sauf sur les routes d'auth
        // (pour ne pas masquer une erreur "mauvais identifiants" sur /login).
        if ((status === 401 || status === 403) && !url.includes('/auth/')) {
            authStorage.clear();
            if (window.location.pathname !== '/login') {
                toast.error('Votre session a expiré. Veuillez vous reconnecter.');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);
