// Rutas públicas (solo accesibles sin sesión)
export const PUBLIC_AUTH_ROUTES = [
  '/feed/login',
  '/feed/register',
] as const;

// Rutas protegidas (requieren autenticación)
export const PROTECTED_ROUTES = [
  '/usuario/perfil',
  '/feed/ajustes',
  '/feed/perfil',
] as const;

// Rutas de redirección
export const REDIRECT_ROUTES = {
  LOGIN: '/feed/login',
  FEED: '/feed',
} as const;
