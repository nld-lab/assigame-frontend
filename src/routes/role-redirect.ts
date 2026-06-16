export function homePathForRole(role: string | null | undefined): string {
    switch (role) {
        case "ADMIN":
            return "/admin";
        case "VENDEUR":
            return "/dashboard";
        default:
            return "/";
    }
}
