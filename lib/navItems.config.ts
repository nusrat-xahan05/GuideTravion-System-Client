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
                title: "Upcoming Bookings",
                href: "/guide/dashboard/upcoming-booked-tours",
                icon: "CalendarClock",
                roles: [TUserRole.GUIDE],
            },
            {
                title: "Ongoing Bookings",
                href: "/guide/dashboard/active-booked-tours",
                icon: "PlayCircle",
                roles: [TUserRole.GUIDE],
                badge: "live",
            },
            {
                title: "Completed Bookings",
                href: "/guide/dashboard/completed-booked-tours",
                icon: "CircleCheckBig",
                roles: [TUserRole.GUIDE],
            },
            {
                title: "Cancelled Bookings",
                href: "/guide/dashboard/cancelled-booked-tours",
                icon: "XCircle",
                roles: [TUserRole.GUIDE],
            },
        ],
    },
];



export const touristNavItems: NavSection[] = [
    {
        title: "Wishlist",
        items: [
            {
                title: "My Wishlist",
                href: "/dashboard/my-wishlist",
                icon: "CalendarClock",
                roles: [TUserRole.TOURIST],
            },
        ]
    },
    {
        title: "Explore Bookings",
        items: [
            {
                title: "Upcoming Bookings",
                href: "/dashboard/upcoming-booked-tours",
                icon: "CalendarClock",
                roles: [TUserRole.TOURIST],
            },
            {
                title: "Past Bookings",
                href: "/dashboard/past-booked-tours",
                icon: "CircleCheckBig",
                roles: [TUserRole.TOURIST],
            },
            {
                title: "Cancelled Bookings",
                href: "/dashboard/cancelled-booked-tours",
                icon: "XCircle",
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
    },
    {
        title: "Bookings",
        items: [
            {
                title: "Upcoming Bookings",
                href: "/admin/dashboard/upcoming-booked-tours",
                icon: "CalendarClock",
                roles: [TUserRole.ADMIN],
            },
            {
                title: "Ongoing Bookings",
                href: "/admin/dashboard/active-booked-tours",
                icon: "PlayCircle",
                roles: [TUserRole.ADMIN],
                badge: "live",
            },
            {
                title: "Completed Bookings",
                href: "/admin/dashboard/completed-booked-tours",
                icon: "CircleCheckBig",
                roles: [TUserRole.ADMIN],
            },
            {
                title: "Cancelled Bookings",
                href: "/admin/dashboard/cancelled-booked-tours",
                icon: "XCircle",
                roles: [TUserRole.ADMIN],
            },
        ],
    },
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