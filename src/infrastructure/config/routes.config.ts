export const PUBLIC_ONLY_ROUTES = ["/", "/login", "/register", "/register/verify"] as const;
export const PROTECTED_ROUTE_PREFIXES = ["/feed", "/usuario/perfil"] as const;

export const REDIRECT_ROUTES = { LOGIN: "/login", FEED: "/feed" } as const;
