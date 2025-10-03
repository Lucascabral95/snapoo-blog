export const PUBLIC_AUTH_ROUTES = [
  '/feed/login',
  '/feed/register',
] as const;

export const PROTECTED_ROUTES = [
  '/usuario/perfil',
  '/feed/ajustes',
  '/feed/perfil',
] as const;

export const REDIRECT_ROUTES = {
  LOGIN: '/feed/login',
  FEED: '/feed',
} as const;
