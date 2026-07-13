import { PROTECTED_ROUTE_PREFIXES, PUBLIC_EXCEPTIONS_UNDER_PROTECTED, PUBLIC_ONLY_ROUTES } from "../config/routes.config";

export function isPublicOnlyRoute(pathname: string): boolean {
    return PUBLIC_ONLY_ROUTES.some((route) => pathname === route);
}

export function isProtectedRoute(pathname: string): boolean {
    const isException = PUBLIC_EXCEPTIONS_UNDER_PROTECTED.some(
        (route) => pathname === route || pathname.startsWith(`${route}/`),
    );

    if (isException) return false;

    return PROTECTED_ROUTE_PREFIXES.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}
