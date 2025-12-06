import { getNavItemsByRole } from "@/lib/navItems.config";
import DashboardSidebarContent from "./DashboardSidebarContent";
import { getDefaultDashboardRoute } from "@/lib/navbar-auth-routes";
import { NavSection } from "@/types/dashboard.interface";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { IUser, TUserRole } from "@/types/user.interface";



const DashboardSidebar = async () => {
  const userInfo = (await getUserInfo()) as IUser;

  const navItems: NavSection[] = getNavItemsByRole(userInfo.role as TUserRole);
  const dashboardHome = getDefaultDashboardRoute(userInfo.role as TUserRole);

  return (
    <DashboardSidebarContent
      userInfo={userInfo}
      navItems={navItems}
      dashboardHome={dashboardHome}
    />
  );
};

export default DashboardSidebar;
