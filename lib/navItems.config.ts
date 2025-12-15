import { NavSection } from "@/types/dashboard.interface";
import { TUserRole, UserRole } from "@/types/user.interface";
import { getDefaultDashboardRoute } from "./navbar-auth-routes";



export const getCommonNavItems = (role: UserRole): NavSection[] => {
    const defaultDashboard = getDefaultDashboardRoute(role);

    return [
        {
            // Primary quick links
            items: [
                {
                    title: "Dashboard",
                    href: defaultDashboard,
                    icon: "LayoutDashboard",
                    roles: [TUserRole.ADMIN, TUserRole.GUIDE, TUserRole.TOURIST],
                },
                {
                    title: "Edit Profile",
                    href: "/edit-profile",
                    icon: "User",
                    roles: [TUserRole.ADMIN, TUserRole.GUIDE, TUserRole.TOURIST],
                }
            ],
        }
    ];
};

export const guideNavItems: NavSection[] = [
    {
        title: "Tours",
        items: [
            {
                title: "All Tours",
                href: "/guide/dashboard/tours-management",
                icon: "PlusCircle",
                roles: [TUserRole.GUIDE],
            },
            {
                title: "My Tours",
                href: "/guide/dashboard/active-tours",
                icon: "CircleCheckBig",
                roles: [TUserRole.GUIDE],
                badge: "active",
            }
        ],
    },
    {
        title: "Bookings",
        items: [
            {
                title: "Confirmed Bookings",
                href: "/guide/dashboard/booked-tours",
                icon: "CheckCircle",
                roles: [TUserRole.GUIDE],
            }
        ],
    }
];



export const touristNavItems: NavSection[] = [
    {
        title: "Explore & Book",
        items: [
            {
                title: "My Bookings",
                href: "/dashboard/my-bookings",
                icon: "Calendar",
                roles: [TUserRole.TOURIST],
            }
        ],
    }
];


export const adminNavItems: NavSection[] = [
    {
        title: "User Management",
        items: [
            {
                title: "All Guides",
                href: "/admin/dashboard/guides-management",
                icon: "UserPlus",
                roles: [TUserRole.ADMIN],
            },
            {
                title: "All Tourist",
                href: "/admin/dashboard/tourists-management",
                icon: "UserPlus",
                roles: [TUserRole.ADMIN],
            },
            {
                title: "Verify Guides",
                href: "/admin/dashboard/verify-guides",
                icon: "CheckSquare",
                roles: [TUserRole.ADMIN],
                badge: "pending",
            },
        ],
    },
    {
        title: "Tours Management",
        items: [
            {
                title: "All Tours",
                href: "/admin/dashboard/tours-management",
                icon: "PlusCircle",
                roles: [TUserRole.ADMIN]
            },
            {
                title: "Verify Tours",
                href: "/admin/dashboard/verify-tours",
                icon: "ShieldEllipsis",
                roles: [TUserRole.ADMIN],
                badge: "pending",
            }
        ],
    }
];


export const getNavItemsByRole = (role: UserRole): NavSection[] => {
    const commonNavItems = getCommonNavItems(role);

    switch (role) {
        case TUserRole.ADMIN:
            return [...commonNavItems, ...adminNavItems];
        case TUserRole.GUIDE:
            return [...commonNavItems, ...guideNavItems];
        case TUserRole.TOURIST:
            return [...commonNavItems, ...touristNavItems];
        default:
            return [];
    }
}