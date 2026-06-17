const API_URL = import.meta.env.VITE_API_URL;

export function getCategoryImageUrl(id: number) {
    return `${API_URL}/categorieproduit/${id}/image`;
}

export function getProduitImageUrl(id: number) {
    return `${API_URL}/produit/${id}/image`;
}
