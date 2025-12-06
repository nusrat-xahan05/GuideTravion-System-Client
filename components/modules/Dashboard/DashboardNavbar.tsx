import DashboardNavbarContent from "./DashboardNavbarContent";
import { getDefaultDashboardRoute } from "@/lib/navbar-auth-routes";
import { getNavItemsByRole } from "@/lib/navItems.config";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { IUser, TUserRole } from "@/types/user.interface";

const DashboardNavbar = async () => {
  const userInfo = (await getUserInfo()) as IUser;
  const navItems = getNavItemsByRole(userInfo.role as TUserRole);
  const dashboardHome = getDefaultDashboardRoute(userInfo.role as TUserRole);

  return (
    <DashboardNavbarContent
      userInfo={userInfo}
      navItems={navItems}
      dashboardHome={dashboardHome}
    />
  );
};

export default DashboardNavbar;
