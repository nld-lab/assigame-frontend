export interface TypeUtilisateur {
    id_type_utilisateur: number;
    libelle_type_utilisateur: string;
    description_type_utilisateur: string | null;
}

export interface CategorieProduit {
    idcategorie_produit: number;
    nom_categorieproduit: string;
    description: string | null;
}

export interface Utilisateur {
    id_utilisateur: number;
    nom_utilisateur: string;
    prenom_utilisateur: string;
    sexe_utilisateur: string;
    telephone_utilisateur: string;
    mail_utilisateur: string | null;
    login_utilisateur: string;
    residence_utilisateur: string | null;
    id_type_utilisateur: number | null;
    role: string | null;
}

export interface Produit {
    id_produit: number;
    nom_produit: string;
    description: string;
    prix: number;
    image: string | null;
    image_type: string;
    date_ajout: string;
    statut: string;
    categorie_produit?: CategorieProduit | null;
    utilisateur?: Utilisateur | null;
}

export type Role = "CLIENT" | "VENDEUR" | "ADMIN";

export interface LoginRequest {
    login: string;
    password: string;
}

export interface RegisterRequest {
    nom_utilisateur: string;
    prenom_utilisateur: string;
    sexe_utilisateur: string;
    telephone_utilisateur: string;
    mail_utilisateur: string;
    login_utilisateur: string;
    password_utilisateur: string;
    residence_utilisateur: string;
    type_utilisateur: { id_type_utilisateur: number };
}

export interface AuthResponse {
    token: string;
    user: Utilisateur;
}
