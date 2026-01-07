import Image from "next/image";
import noImg from "@/assets/images/noImage.png"
import { IUser } from "@/types/user.interface";
import { IAdminDashboardStats } from "@/types/stats.interface";
import { StatCard } from "@/components/shared/statCard";
import { BadgeCheck, Users, UserRound, Map, ClipboardX, CalendarCheck, } from "lucide-react";

interface AdminDashboardProps {
    userInfo: IUser;
    statsResult: IAdminDashboardStats
}

export default function AdminDashboard({ userInfo, statsResult }: AdminDashboardProps) {

    return (
        <div className="space-y-10">

            {/* ================= ADMIN HEADER ================= */}
            <div className="flex items-center gap-5 rounded-xl border bg-white p-6 shadow-sm">
                <Image
                    src={userInfo.profileImage || noImg}
                    alt="Admin profile"
                    width={80}
                    height={80}
                    className="rounded-full border object-cover"
                />

                <div className="flex-1">
                    <h1 className="text-xl font-semibold">
                        {userInfo.firstName} {userInfo.lastName}
                    </h1>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span>{userInfo.role}</span>
                        <span>{userInfo.email}</span>
                    </div>

                    {userInfo.isVerified && (
                        <span className="inline-flex items-center gap-1 mt-1 text-sm text-green-600">
                            <BadgeCheck className="w-4 h-4" /> Verified Admin
                        </span>
                    )}
                </div>
            </div>

            {/* ================= ANALYTICS ================= */}
            <div>
                <h2 className="text-lg font-semibold mb-4">Platform Overview</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-4">
                    <StatCard
                        title="Total Guides"
                        value={statsResult?.totalGuides ?? 0}
                        icon={<UserRound className="w-5 h-5 text-blue-600" />}
                        color="bg-blue-100"
                    />
                    <StatCard
                        title="Total Tourists"
                        value={statsResult?.totalTourists ?? 0}
                        icon={<Users className="w-5 h-5 text-indigo-600" />}
                        color="bg-indigo-100"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-4">
                    <StatCard
                        title="Total Tours"
                        value={statsResult?.totalTours ?? 0}
                        icon={<Map className="w-5 h-5 text-green-600" />}
                        color="bg-green-100"
                    />
                    <StatCard
                        title="Approved Tours"
                        value={statsResult?.approvedTours ?? 0}
                        icon={<Map className="w-5 h-5 text-green-600" />}
                        color="bg-green-100"
                    />
                    <StatCard
                        title="Pending Tours"
                        value={statsResult?.pendingTours ?? 0}
                        icon={<ClipboardX className="w-5 h-5 text-red-600" />}
                        color="bg-red-100"
                    />
                    <StatCard
                        title="Rejected Tours"
                        value={statsResult?.rejectedTours ?? 0}
                        icon={<ClipboardX className="w-5 h-5 text-red-600" />}
                        color="bg-red-100"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-4">
                    <StatCard
                        title="Total Bookings"
                        value={statsResult?.totalBookings ?? 0}
                        icon={<CalendarCheck className="w-5 h-5 text-purple-600" />}
                        color="bg-purple-100"
                    />
                    <StatCard
                        title="Completed Bookings"
                        value={statsResult?.completedBookings ?? 0}
                        icon={<CalendarCheck className="w-5 h-5 text-purple-600" />}
                        color="bg-purple-100"
                    />
                    <StatCard
                        title="Currently Confirmed Bookings"
                        value={statsResult?.confirmedBookings ?? 0}
                        icon={<CalendarCheck className="w-5 h-5 text-purple-600" />}
                        color="bg-purple-100"
                    />
                    <StatCard
                        title="Cancelled Bookings"
                        value={statsResult?.cancelledBookings ?? 0}
                        icon={<ClipboardX className="w-5 h-5 text-red-600" />}
                        color="bg-purple-100"
                    />
                </div>
            </div>
        </div>
    );
}

