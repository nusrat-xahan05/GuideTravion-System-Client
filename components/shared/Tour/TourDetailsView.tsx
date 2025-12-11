/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
// import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, DollarSign, Users, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
// import { useRouter } from "next/navigation";
import { ITour } from "@/types/tour.interface";
// import { useAuthStore } from "@/store/auth.store"; // <-- replace with your auth logic

export default function TourDetailsView({ tour }: { tour: ITour }) {
    // const router = useRouter();
    // const user = useAuthStore((state: any) => state.user); // tourist or guide

    // const handleBooking = () => {
    //     if (!user) return router.push("/login?redirect=" + `/tour/${tour.slug}`);
    //     router.push(`/tour/${tour.slug}/booking`);
    // };

    return (
        <div className="max-w-6xl mx-auto py-10 px-4 space-y-10">
            {/* Header Image */}
            <div className="relative h-[420px] w-full rounded-xl overflow-hidden shadow-md">
                <Image
                    src={tour.images?.[0] as string}
                    alt={tour.title}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Title & Basic Info */}
            <div className="space-y-4">
                <h1 className="text-3xl font-bold">{tour.title}</h1>

                <div className="flex flex-wrap gap-6 text-gray-700">
                    <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-primary" />
                        <span>{tour.location}, {tour.division}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-primary" />
                        <span>{tour.durationDays} Day(s)</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-primary" />
                        <span>{tour.pricePerPerson} ৳ / person</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-primary" />
                        <span>Max group: {tour.maxGroupSize}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-500" />
                        <span>{tour.averageRating} ({tour.totalReviews} reviews)</span>
                    </div>
                </div>
            </div>

            {/* Description */}
            <section className="space-y-2">
                <h2 className="text-xl font-semibold">About This Tour</h2>
                <p className="text-gray-700">{tour.description}</p>
            </section>

            {/* Highlights */}
            <section>
                <h2 className="text-xl font-semibold mb-3">Highlights</h2>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    {tour.highlights.map((h: string, i: number) => (
                        <li key={i}>{h}</li>
                    ))}
                </ul>
            </section>

            {/* Includes & Excludes */}
            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <CardContent className="p-5">
                        <h2 className="font-semibold text-lg mb-3">Included</h2>
                        <ul className="list-disc pl-5 text-gray-700 space-y-1">
                            {tour?.includes?.map((inc: string, i: number) => (
                                <li key={i}>{inc}</li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-5">
                        <h2 className="font-semibold text-lg mb-3">Excluded</h2>
                        <ul className="list-disc pl-5 text-gray-700 space-y-1">
                            {tour?.excludes?.map((exc: string, i: number) => (
                                <li key={i}>{exc}</li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>

            {/* Itinerary */}
            <section>
                <h2 className="text-xl font-semibold mb-3">Itinerary</h2>
                {tour?.itinerary?.map((item: any, index: number) => (
                    <Card key={index} className="mb-4">
                        <CardContent className="p-5 space-y-2">
                            <h3 className="font-bold">Day {item.day}: {item.title}</h3>
                            <p className="text-gray-700">{item.description}</p>

                            {item.activities && (
                                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                                    {item.activities.map((act: string, i: number) => (
                                        <li key={i}>{act}</li>
                                    ))}
                                </ul>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </section>

            {/* Meeting & Pickup Details */}
            {(tour.meetingTime || tour.pickupLocation || tour.dropoffLocation) && (
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">Meeting & Pickup Info</h2>

                    {tour.meetingTime && (
                        <p><strong>Meeting Time:</strong> {tour.meetingTime}</p>
                    )}

                    {tour.pickupLocation && (
                        <p><strong>Pickup Address:</strong> {tour.pickupLocation}</p>
                    )}

                    {tour.dropoffLocation && (
                        <p><strong>Drop-off Address:</strong> {tour.dropoffLocation}</p>
                    )}
                </section>
            )}

            {/* Booking Button */}
            <div className="py-8">
                <Button
                    size="lg"
                    className="px-8 text-lg"
                    // onClick={handleBooking}
                >
                    Book This Tour
                </Button>
            </div>
        </div>
    );
}
