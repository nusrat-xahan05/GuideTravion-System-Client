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
                    href: "/dashboard/my-profile",
                    icon: "User",
                    roles: [TUserRole.ADMIN, TUserRole.GUIDE, TUserRole.TOURIST],
                },
                {
                    title: "Notifications",
                    href: "/dashboard/notifications",
                    icon: "Bell",
                    roles: [TUserRole.ADMIN, TUserRole.GUIDE, TUserRole.TOURIST],
                },
            ],
        },

        {
            title: "Account",
            items: [
                {
                    title: "Settings",
                    href: "/dashboard/settings",
                    icon: "Settings",
                    roles: [TUserRole.ADMIN, TUserRole.GUIDE, TUserRole.TOURIST],
                },
                {
                    title: "Security",
                    href: "/dashboard/security",
                    icon: "Shield",
                    roles: [TUserRole.ADMIN, TUserRole.GUIDE, TUserRole.TOURIST],
                },
                {
                    title: "Help Center",
                    href: "/dashboard/help",
                    icon: "HelpCircle",
                    roles: [TUserRole.ADMIN, TUserRole.GUIDE, TUserRole.TOURIST],
                },
            ],
        },
    ];
};

export const guideNavItems: NavSection[] = [
    {
        title: "Tours",
        items: [
            {
                title: "Create Tour",
                href: "/guide/dashboard/tours/create",
                icon: "PlusCircle",
                roles: [TUserRole.GUIDE],
            },
            {
                title: "My Tours",
                href: "/guide/dashboard/tours",
                icon: "Calendar",
                roles: [TUserRole.GUIDE],
                badge: "new",
            },
            {
                title: "Drafts",
                href: "/guide/dashboard/tours/drafts",
                icon: "File",
                roles: [TUserRole.GUIDE],
            },
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
    },
    {
        title: "Guide Tools",
        items: [
            {
                title: "Availability Calendar",
                href: "/guide/dashboard/availability",
                icon: "CalendarCheck",
                roles: [TUserRole.GUIDE],
            },
            {
                title: "Analytics",
                href: "/guide/dashboard/analytics",
                icon: "ChartPie",
                roles: [TUserRole.GUIDE],
            },
        ],
    },
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
    },
    {
        title: "Records",
        items: [
            {
                title: "Past Bookings",
                href: "/dashboard/bookings/history",
                icon: "Clock",
                roles: [TUserRole.TOURIST],
            },
            {
                title: "Invoices",
                href: "/dashboard/invoices",
                icon: "FileText",
                roles: [TUserRole.TOURIST],
            },
        ],
    },
];


export const adminNavItems: NavSection[] = [
    {
        title: "User Management",
        items: [
            {
                title: "All Guides",
                href: "/admin/dashboard/guides",
                icon: "Users",
                roles: [TUserRole.ADMIN],
            },
            {
                title: "All Tourists",
                href: "/admin/dashboard/tourists",
                icon: "UserPlus",
                roles: [TUserRole.ADMIN],
            },
            {
                title: "Verify Guides",
                href: "/admin/dashboard/verify-guides",
                icon: "CheckSquare",
                roles: [TUserRole.ADMIN],
            },
        ],
    },
    {
        title: "Content & Tours",
        items: [
            {
                title: "All Tours",
                href: "/admin/dashboard/tours",
                icon: "Calendar",
                roles: [TUserRole.ADMIN],
                badge: "pending",
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
    },
    {
        title: "Finance & Reports",
        items: [
            {
                title: "Transactions",
                href: "/admin/dashboard/transactions",
                icon: "CreditCard",
                roles: [TUserRole.ADMIN],
            },
            {
                title: "Reports",
                href: "/admin/dashboard/reports",
                icon: "BarChart",
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