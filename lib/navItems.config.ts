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
                    title: "My Profile",
                    href: "/my-profile",
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
                href: "/guide/dashboard/tours",
                icon: "Calendar",
                roles: [TUserRole.GUIDE],
                badge: "active",
            }
        ],
    },
    {
        title: "Bookings",
        items: [
            {
                title: "Booking Requests",
                href: "/guide/dashboard/booking-requests",
                icon: "Inbox",
                roles: [TUserRole.GUIDE],
            },
            {
                title: "Confirmed Bookings",
                href: "/guide/dashboard/booked-tours",
                icon: "CheckCircle",
                roles: [TUserRole.GUIDE],
            },
            {
                title: "Past Tours",
                href: "/guide/dashboard/bookings/history",
                icon: "Clock",
                roles: [TUserRole.GUIDE],
            },
        ],
    },
    {
        title: "Earnings",
        items: [
            {
                title: "Payouts",
                href: "/guide/dashboard/payouts",
                icon: "Bank",
                roles: [TUserRole.GUIDE],
            },
            {
                title: "Transactions",
                href: "/guide/dashboard/transactions",
                icon: "CreditCard",
                roles: [TUserRole.GUIDE],
            },
        ],
    }
];



export const touristNavItems: NavSection[] = [
    {
        title: "Explore & Book",
        items: [
            {
                title: "Browse Tours",
                href: "/tours",
                icon: "Compass",
                roles: [TUserRole.TOURIST],
            },
            {
                title: "My Bookings",
                href: "/dashboard/bookings",
                icon: "Calendar",
                roles: [TUserRole.TOURIST],
            },
            {
                title: "Wishlist",
                href: "/dashboard/wishlist",
                icon: "Heart",
                roles: [TUserRole.TOURIST],
            },
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
        title: "Content & Tours",
        items: [
            {
                title: "All Tours",
                href: "/admin/dashboard/tours-management",
                icon: "Calendar",
                roles: [TUserRole.ADMIN]
            },
            {
                title: "Featured Tours",
                href: "/admin/dashboard/featured",
                icon: "Star",
                roles: [TUserRole.ADMIN],
            },
            {
                title: "Categories",
                href: "/admin/dashboard/categories",
                icon: "Tag",
                roles: [TUserRole.ADMIN],
            },
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