export const PUBLIC_ONLY_ROUTES = ["/", "/login", "/register", "/register/verify"] as const;
export const PROTECTED_ROUTE_PREFIXES = ["/feed", "/usuario/perfil"] as const;

// Rutas anidadas bajo un prefijo protegido que igual deben quedar accesibles sin sesión
// (un usuario deslogueado es justamente quien necesita recuperar su contraseña o verificar su email).
export const PUBLIC_EXCEPTIONS_UNDER_PROTECTED = [
    "/feed/forgot-password",
    "/feed/reset-password",
    "/feed/verify-email",
] as const;

export const REDIRECT_ROUTES = { LOGIN: "/login", FEED: "/feed" } as const;
