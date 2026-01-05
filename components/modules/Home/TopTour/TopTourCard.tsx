"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, Clock } from "lucide-react";
import noImage from "@/assets/images/noImage.png";
import { ITour } from "@/types/tour.interface";
import { WishlistButton } from "@/components/shared/WishlistButton";
import { TUserRole } from "@/types/user.interface";

interface TopTourCardProps {
    tour: ITour;
    index: number;
    wishlistIds: string[];
    user: TUserRole | null;
}

export default function TopTourCard({ tour, index, wishlistIds, user }: TopTourCardProps) {

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="h-full"
        >
            <Link href={`/tour/${tour.slug}`} className="h-full block">
                <div className="group relative h-full rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">

                    {/* IMAGE */}
                    <div className="relative h-56 w-full">
                        <Image
                            src={tour.images?.[0] ?? noImage}
                            alt={tour.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        {tour.averageRating && tour.averageRating > 0 && (
                            <div className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full flex items-center gap-1 text-sm font-medium shadow">
                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                {tour.averageRating.toFixed(1)}
                            </div>
                        )}

                        <div className="absolute top-3 right-3 z-10">
                            <WishlistButton
                                tourId={tour._id as string}
                                initiallyWishlisted={
                                    wishlistIds.includes(tour._id as string)
                                }
                                user={user}
                            />
                        </div>
                    </div>

                    {/* CONTENT */}
                    <div className="p-5 space-y-3 flex flex-col flex-1">

                        <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-600">
                                Max Group: {tour.maxGroupSize}
                            </p>
                            <p className="text-xs text-gray-600">
                                From
                                <span className="text-lg font-medium text-green-600">
                                    {" "}৳{tour.pricePerPerson}
                                </span>{" "}
                                / Person
                            </p>
                        </div>

                        <h3 className="text-xl font-semibold line-clamp-2">
                            {tour.title}
                        </h3>

                        {/* BOTTOM ROW */}
                        <div className="flex flex-col gap-2.5 pb-6 mt-auto">
                            <p className="flex items-center gap-2 text-sm text-gray-600">
                                <MapPin className="w-4 h-4 text-blue-600" />
                                {tour.location}, {tour.division}
                            </p>

                            <span className="flex items-center gap-1 text-sm">
                                <Clock className="w-4 h-4 text-blue-600" />
                                {tour.durationDays} Days
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>

    );
}
