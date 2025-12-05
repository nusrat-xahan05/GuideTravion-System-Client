import { TUserRole, UserRole } from "@/types/User.interface";

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