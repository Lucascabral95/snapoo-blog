import { PROTECTED_ROUTE_PREFIXES, PUBLIC_ONLY_ROUTES } from "../config/routes.config";

export function isPublicOnlyRoute(pathname: string): boolean {
    return PUBLIC_ONLY_ROUTES.some((route) => pathname === route);
}

export function isProtectedRoute(pathname: string): boolean {
    return PROTECTED_ROUTE_PREFIXES.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}
