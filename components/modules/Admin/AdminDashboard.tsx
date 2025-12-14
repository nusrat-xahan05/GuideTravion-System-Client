import Image from "next/image";
import { BadgeCheck, } from "lucide-react";
import noImg from "@/assets/images/noImage.png"
import { IUser } from "@/types/user.interface";

interface AdminDashboardProps {
    userInfo: IUser;
}

export default function AdminDashboard({ userInfo }: AdminDashboardProps) {

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Image
                    src={userInfo.profileImage || noImg}
                    alt="Admin profile"
                    width={96}
                    height={96}
                    className="rounded-full border object-cover"
                />
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {userInfo.firstName} {userInfo.lastName}
                    </h1>
                    <p className="text-sm text-gray-600">{userInfo.role}</p>
                    {userInfo.isVerified && (
                        <span className="inline-flex items-center gap-1 mt-1 text-sm text-green-600">
                            <BadgeCheck className="w-4 h-4" /> Verified Guide
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
