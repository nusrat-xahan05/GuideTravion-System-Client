"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Heart, CalendarDays, User } from "lucide-react";
import { ITourist } from "@/types/user.interface";
import noImg from "@/assets/images/noImage.png"
import { IBooking } from "@/types/booking.interface";

interface TouristDashboardProps {
    userInfo: ITourist;
    bookings: IBooking[]
}

export default function TouristDashboard({ userInfo, bookings }: TouristDashboardProps) {
    
    return (
        <div className="space-y-8">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6 rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 text-white">
                <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white">
                    <Image
                        src={userInfo.profileImage || noImg}
                        alt="Profile"
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-2xl font-bold">
                        {userInfo.firstName} {userInfo.lastName}
                    </h1>
                    <p className="text-sm opacity-90">{userInfo.email}</p>

                    <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
                        <Badge variant="secondary">{userInfo.role}</Badge>
                        <Badge variant={userInfo.userStatus === "ACTIVE" ? "default" : "destructive"}>
                            {userInfo.userStatus}
                        </Badge>
                    </div>
                </div>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-5 flex items-center gap-4">
                        <User className="w-8 h-8 text-blue-600" />
                        <div>
                            <p className="text-sm text-gray-500">Verified</p>
                            <p className="font-semibold">
                                {userInfo.isVerified ? "Yes" : "No"}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-5 flex items-center gap-4">
                        <CalendarDays className="w-8 h-8 text-green-600" />
                        <div>
                            <p className="text-sm text-gray-500">Bookings</p>
                            <p className="font-semibold">{bookings?.length}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-5 flex items-center gap-4">
                        <Heart className="w-8 h-8 text-pink-600" />
                        <div>
                            <p className="text-sm text-gray-500">Wishlist</p>
                            <p className="font-semibold">{userInfo?.wishlistTours?.length}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-5 flex items-center gap-4">
                        <MapPin className="w-8 h-8 text-purple-600" />
                        <div>
                            <p className="text-sm text-gray-500">Country</p>
                            <p className="font-semibold">{userInfo.country}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* ABOUT */}
            <Card>
                <CardContent className="p-6 space-y-4">
                    <h2 className="text-lg font-semibold">About You</h2>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        {userInfo.bio}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Languages</p>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {userInfo?.languages?.map((lang: string) => (
                                    <Badge key={lang} variant="outline">{lang}</Badge>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p className="text-sm font-medium text-gray-500">Travel Interests</p>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {userInfo?.travelInterests?.map((i: string) => (
                                    <Badge key={i} variant="secondary">{i}</Badge>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p className="text-sm font-medium text-gray-500">Preferred Style</p>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {userInfo?.preferredStyles?.map((s: string) => (
                                    <Badge key={s}>{s}</Badge>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p className="text-sm font-medium text-gray-500">Address</p>
                            <p className="text-sm text-gray-600 mt-1">{userInfo.address}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
