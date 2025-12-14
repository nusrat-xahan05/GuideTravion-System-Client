import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheck, MapPin, Star, Briefcase, Clock, CalendarDays } from "lucide-react";
import noImg from "@/assets/images/noImage.png"
import { IGuide } from "@/types/user.interface";

interface GuideDashboardProps {
    userInfo: IGuide;
}

export default function GuideDashboard({ userInfo }: GuideDashboardProps) {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <Image
                        src={userInfo.profileImage || noImg}
                        alt="Guide profile"
                        width={96}
                        height={96}
                        className="rounded-full border object-cover"
                    />
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {userInfo.firstName} {userInfo.lastName}
                        </h1>
                        <p className="text-sm text-gray-600">{userInfo.occupation}</p>
                        {userInfo.isVerifiedByAdmin && (
                            <span className="inline-flex items-center gap-1 mt-1 text-sm text-green-600">
                                <BadgeCheck className="w-4 h-4" /> Verified Guide
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardContent className="p-5 space-y-2">
                        <div className="flex items-center gap-2 text-gray-500">
                            <Star className="w-4 h-4" /> Rating
                        </div>
                        <p className="text-2xl font-bold">{userInfo.rating || 0}</p>
                        <p className="text-sm text-gray-500">{userInfo.totalReviews || 0} reviews</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-5 space-y-2">
                        <div className="flex items-center gap-2 text-gray-500">
                            <Clock className="w-4 h-4" /> Hourly Rate
                        </div>
                        <p className="text-2xl font-bold">৳ {userInfo.hourlyRate}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-5 space-y-2">
                        <div className="flex items-center gap-2 text-gray-500">
                            <CalendarDays className="w-4 h-4" /> Daily Rate
                        </div>
                        <p className="text-2xl font-bold">৳ {userInfo.dailyRate}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-5 space-y-2">
                        <div className="flex items-center gap-2 text-gray-500">
                            <Briefcase className="w-4 h-4" /> Experience
                        </div>
                        <p className="text-2xl font-bold">{userInfo.yearsOfExperience}+ yrs</p>
                    </CardContent>
                </Card>
            </div>

            {/* Profile Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* About */}
                <Card className="lg:col-span-2">
                    <CardContent className="p-6 space-y-4">
                        <h2 className="text-lg font-semibold">About Me</h2>
                        <p className="text-gray-600 leading-relaxed">{userInfo.bio}</p>

                        <div className="grid sm:grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2 text-gray-600">
                                <MapPin className="w-4 h-4" /> {userInfo.city}, {userInfo.country}
                            </div>
                            <div className="text-gray-600">
                                Languages: {userInfo.languages?.join(", ")}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Expertise */}
                <Card>
                    <CardContent className="p-6 space-y-4">
                        <h2 className="text-lg font-semibold">Expertise</h2>
                        <div className="flex flex-wrap gap-2">
                            {userInfo.expertise?.map((item, i) => (
                                <span
                                    key={i}
                                    className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
