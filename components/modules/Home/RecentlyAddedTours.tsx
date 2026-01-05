"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import SectionTitle from "@/components/shared/Home/SectionTitle";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { ITour } from "@/types/tour.interface";
import noImg from "@/assets/images/noImage.png"
import Link from "next/link";
import { MapPin } from "lucide-react";
import { TUserRole } from "@/types/user.interface";
import { WishlistButton } from "@/components/shared/WishlistButton";


interface Props {
    newTours: ITour[];
    wishlistIds: string[];
    user: TUserRole | null;
}


export default function RecentlyAddedTours({ newTours, wishlistIds, user }: Props) {
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
                    <SwiperSlide className="mb-10" key={tour._id}>
                        <Link href={`/tour/${tour.slug}`} className="h-full block">
                            <div className="h-full rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">
                                <div className="relative h-56 w-full">
                                    <Image
                                        src={tour.images?.[0] || noImg}
                                        alt={tour.title}
                                        fill
                                        className="object-cover"
                                    />

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
                                <div className="p-5 space-y-3 flex flex-col flex-1">
                                    <h3 className="text-lg font-semibold">{tour.title}</h3>
                                    <p className="flex items-center gap-2 text-sm text-gray-500">
                                        <MapPin className="w-4 h-4 text-blue-600" />
                                        {tour.location}, {tour.division}
                                    </p>

                                    <div className="mt-2 flex items-center justify-between">
                                        <p className="text-xs text-gray-600">
                                            <span className="text-base font-medium text-green-600">
                                                {" "}৳{tour.pricePerPerson}
                                            </span>{" "}
                                            / Person
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {tour.averageRating ?? "—"} ★ ({tour.totalReviews ?? 0})
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
