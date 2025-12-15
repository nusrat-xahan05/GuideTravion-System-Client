/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import SectionTitle from "@/components/shared/Home/SectionTitle";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { ITour } from "@/types/tour.interface";
import noImg from "@/assets/images/noImage.png"



export default function RecentlyAddedTours({ newTours }: any) {
    return (
        <section className="py-16 px-4 md:px-8 lg:px-16">
            <SectionTitle title="Recently Added" subtitle="Explore the lastest trust worthy experiences" />
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                    640: { slidesPerView: 1.2 },
                    768: { slidesPerView: 2.1 },
                    1024: { slidesPerView: 3 },
                }}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000 }}
            >
                {newTours.map((tour: ITour) => (
                    <SwiperSlide key={tour._id}>
                        <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
                            <div className="relative h-56 w-full">
                                <Image
                                    src={tour.images?.[0] || noImg}
                                    alt={tour.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{tour.title}</h3>
                                <p className="text-sm text-gray-500">{tour.location}</p>
                                <div className="mt-2 flex items-center justify-between">
                                    <p className="text-sm font-medium">৳{tour.pricePerPerson}</p>
                                    <p className="text-sm text-gray-600">
                                        {tour.averageRating ?? "—"} ★ ({tour.totalReviews ?? 0})
                                    </p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
