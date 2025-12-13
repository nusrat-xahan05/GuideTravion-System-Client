"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import SectionTitle from "@/components/shared/Home/SectionTitle";
import { ITour } from "@/types/tour.interface";
import noImage from "@/assets/images/noImage.png";
import { MapPin, Clock, Star } from "lucide-react";


interface TopDestinationsProps {
    topTours: ITour[];
}


export default function TopDestinations({ topTours }: TopDestinationsProps) {
    return (
        <section className="w-full px-4 py-16 md:px-8 lg:px-16">
            <SectionTitle
                title="Top Destinations"
                subtitle="Explore the most popular and best-rated tours curated for you"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                {topTours?.map((tour: ITour, index: number) => (
                    <motion.div
                        key={tour._id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.15 }}
                        viewport={{ once: true }}
                    >
                        <Link href={`/tour/${tour.slug}`}>

                            <Card className="overflow-hidden rounded-2xl border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer bg-white">

                                {/* TOUR IMAGE */}
                                <div className="relative w-full h-56">
                                    <Image
                                        src={tour.images?.[0] ?? noImage}
                                        alt={tour.title}
                                        fill
                                        className="object-cover"
                                    />

                                    {/* Optional rating badge */}
                                    {tour.averageRating ? (
                                        <div className="absolute bottom-3 right-3 bg-white px-3 py-1 rounded-full shadow flex items-center gap-1 text-sm font-medium">
                                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                            {tour.averageRating.toFixed(1)}
                                        </div>
                                    ) : null}
                                </div>

                                <CardContent className="p-5 space-y-3">

                                    {/* TITLE */}
                                    <h3 className="text-xl font-semibold line-clamp-1">
                                        {tour.title}
                                    </h3>

                                    {/* LOCATION */}
                                    <p className="text-gray-600 text-sm flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-blue-600" />
                                        {tour.location}, {tour.division}
                                    </p>

                                    {/* DETAILS ROW */}
                                    <div className="flex items-center justify-between text-sm text-gray-700">
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-4 h-4 text-blue-600" />
                                            {tour.durationDays} Days
                                        </span>

                                        <span className="flex items-center gap-1 font-medium">
                                            
                                            {tour.pricePerPerson}
                                            <p className="text-2xl font-bold text-green-600 pb-1.5">৳</p>
                                        </span>
                                    </div>

                                    {/* TAGS */}
                                    {tour.tags?.length ? (
                                        <div className="flex gap-2 flex-wrap">
                                            {tour.tags.slice(0, 2).map((tag, i) => (
                                                <span
                                                    key={i}
                                                    className="text-xs px-3 py-1 bg-blue-50 text-blue-700 rounded-full"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    ) : null}
                                </CardContent>
                            </Card>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
