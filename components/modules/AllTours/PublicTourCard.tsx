import Image from "next/image";
import Link from "next/link";
import { ITour } from "@/types/tour.interface";
import { Button } from "@/components/ui/button";
import noImage from "@/assets/images/noImage.png";
import { DollarSign, MapPin, Star, CalendarDays, Users, } from "lucide-react";
import { TUserRole } from "@/types/user.interface";
import { WishlistButton } from "@/components/shared/WishlistButton";


interface Props {
    tour: ITour;
    wishlistIds: string[];
    user: TUserRole | null;
}

export default function PublicTourCard({ tour, wishlistIds, user }: Props) {

    return (
        <div className="flex gap-6 rounded-xl border bg-white shadow-sm hover:shadow-lg transition-all p-4">
            {/* LEFT IMAGE */}
            <div className="relative w-48 h-36 rounded-lg overflow-hidden">
                <Image
                    src={tour.images?.[0] || noImage}
                    alt={tour.title || "Tour Image"}
                    fill
                    className="object-cover"
                />

                <div className="absolute top-3 left-3 z-10">
                    <WishlistButton
                        tourId={tour._id as string}
                        initiallyWishlisted={
                            wishlistIds.includes(tour._id as string)
                        }
                        user={user}
                    />
                </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="flex-1 space-y-2">
                {/* Title */}
                <div className="flex flex-wrap gap-4 justify-between items-center">
                    <h2 className="text-lg font-semibold line-clamp-1">
                        {tour.title}
                    </h2>

                    {/* CTA */}
                    <div className="flex items-end">
                        <Link href={`/tour/${tour.slug}`}>
                            <Button className="cursor-pointer">View Details</Button>
                        </Link>
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

                {/* Tags row */}
                <div className="flex flex-wrap justify-end gap-2 pt-3 border-t mt-3">
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
    );
}
