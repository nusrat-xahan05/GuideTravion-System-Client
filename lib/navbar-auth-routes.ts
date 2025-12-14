import { TUserRole, UserRole } from "@/types/user.interface";

export type RouteConfig = {
    exact: string[],
    patterns: RegExp[],
}

export const authRoutes = ["/login", "/register/guide", "/register/tourist", "/forgot-password"];

export const commonProtectedRoutes: RouteConfig = {
    exact: ["/edit-profile", "/settings", "/change-password", "/reset-password"],
    patterns: [],
}

export const guideProtectedRoutes: RouteConfig = {
    patterns: [/^\/guide/],
    exact: [],
}

export const adminProtectedRoutes: RouteConfig = {
    patterns: [/^\/admin/], 
    exact: [],
}

export const touristProtectedRoutes: RouteConfig = {
    patterns: [/^\/dashboard/],
    exact: [],
}

export const isAuthRoute = (pathname: string) => {
    return authRoutes.some((route: string) => route === pathname);
}


export const getDefaultDashboardRoute = (role: UserRole): string => {
    if (role === TUserRole.ADMIN) {
        return "/admin/dashboard";
    }
    if (role === TUserRole.GUIDE) {
        return "/guide/dashboard";
    }
    if (role === TUserRole.TOURIST) {
        return "/dashboard";
    }
    return "/";
}


export const isRouteMatches = (pathname: string, routes: RouteConfig): boolean => {
    if (routes.exact.includes(pathname)) {
        return true;
    }
    return routes.patterns.some((pattern: RegExp) => pattern.test(pathname))
    // if pathname === /dashboard/my-appointments => matches /^\/dashboard/ => true
}


export const getRouteOwner = (pathname: string): UserRole | "COMMON" | null => {
    if (isRouteMatches(pathname, adminProtectedRoutes)) {
        return TUserRole.ADMIN;
    }
    if (isRouteMatches(pathname, guideProtectedRoutes)) {
        return TUserRole.GUIDE;
    }
    if (isRouteMatches(pathname, touristProtectedRoutes)) {
        return TUserRole.TOURIST;
    }
    if (isRouteMatches(pathname, commonProtectedRoutes)) {
        return "COMMON";
    }
    return null;
}


export const isValidRedirectForRole = (redirectPath: string, role: UserRole): boolean => {
    const routeOwner = getRouteOwner(redirectPath);
    if (routeOwner === null || routeOwner === "COMMON") {
        return true;
    }
    if (routeOwner === role) {
        return true;
    }
    return false;
}