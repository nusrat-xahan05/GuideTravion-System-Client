/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import noImage from "@/assets/images/noImage.png";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DollarSign, MapPin, Eye, Star, CalendarDays, Users, BadgeCheck, Hourglass } from "lucide-react";
import { ITour } from "@/types/tour.interface";



interface TourCardProps {
    tour: Partial<ITour>;
}

const StatusIcons: Record<string, any> = {
    ACTIVE: <BadgeCheck className="w-4 h-4 text-green-600" />,
    PENDING: <Hourglass className="w-4 h-4 text-yellow-600" />,
};


export default function VerifyTourCard({ tour }: TourCardProps) {

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 rounded-xl border bg-white shadow-sm hover:shadow-lg transition-all p-4">

            {/* LEFT IMAGE */}
            <div className="relative w-full h-48 lg:h-full rounded-lg overflow-hidden">
                <Image
                    src={tour.images?.[0] || noImage}
                    alt={tour.title || "Tour Image"}
                    fill
                    className="object-cover"
                />

                {/* Status Badge */}
                <span
                    className="absolute top-2 left-2 px-3 py-1 text-xs font-medium rounded-full text-white bg-yellow-500">
                    {tour.statusByAdmin}
                </span>
            </div>

            {/* RIGHT CONTENT */}
            <div className="flex flex-col justify-between flex-1 space-y-3 lg:col-span-2">
                {/* Title */}
                <div className="flex justify-between">
                    <div>
                        <h2 className="text-lg font-semibold line-clamp-1">
                            {tour.title}
                        </h2>

                        {/* Tags row */}
                        <div className="flex flex-wrap gap-2">
                            {tour.tourType?.map((t, i) => (
                                <span
                                    key={i}
                                    className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-md"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* TOUR DETAILS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">

                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <div className="flex divide-x divide-gray-400">
                            <span className="pr-2">{tour.location}</span>
                            <span className="pl-2">{tour.division}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <CalendarDays className="w-4 h-4" />
                        <span>Duration: {tour.durationDays} Days</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        <span>{tour.pricePerPerson}৳ / person</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>Maximum: {tour.maxGroupSize} person</span>
                    </div>

                    <div className="flex items-center gap-2">
                        {StatusIcons[tour.status as string]}
                        <span className="capitalize">{tour.status}</span>
                    </div>

                    {/* Rating */}
                    {tour.averageRating !== undefined && (
                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="font-medium">{tour.averageRating} / 5</span>
                            <span className="text-gray-500 text-xs">
                                ({tour.totalReviews} reviews)
                            </span>
                        </div>
                    )}
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pt-3 border-t mt-3">

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {tour.tags?.map((t, i) => (
                            <span
                                key={i}
                                className="bg-blue-100 text-gray-600 lowercase text-xs rounded-4xl px-3 py-1"
                            >
                                {t}
                            </span>
                        ))}
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-2">
                        <Link href={`/admin/dashboard/verify-tours/${tour.slug}`}>
                            <Button size="sm" variant="outline" className="bg-black text-white flex items-center gap-1 cursor-pointer">
                                <Eye className="w-4 h-4" /> View & Update
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
