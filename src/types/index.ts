export interface Produit {
    id_produit: number;
    nom_produit: string;
    description: string;
    prix: number;
    image: string | null;
    image_type: string;
    date_ajout: string;
    statut: string;
}