import {
  LayoutDashboard,
  Package,
  PlusCircle,
  User,
  Users,
  Tags,
} from "lucide-react";
import type { ComponentType } from "react";

export interface NavItem {
  to: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  end?: boolean;
}

export const vendeurNav: NavItem[] = [
  { to: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard, end: true },
  { to: "/dashboard/produits", label: "Mes produits", icon: Package },
  { to: "/dashboard/produits/nouveau", label: "Publier un produit", icon: PlusCircle },
  { to: "/dashboard/profil", label: "Mon profil", icon: User },
];

export const adminNav: NavItem[] = [
  { to: "/admin", label: "Tableau de bord", icon: LayoutDashboard, end: true },
  { to: "/admin/utilisateurs", label: "Utilisateurs", icon: Users },
  { to: "/admin/produits", label: "Produits", icon: Package },
  { to: "/admin/categories", label: "Catégories", icon: Tags },
];
