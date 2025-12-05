"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import SectionTitle from "@/components/shared/Home/SectionTitle";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

type Tour = {
    _id: string;
    title: string;
    slug: string;
    images?: string[];
    pricePerPerson?: number;
    durationDays?: number;
    averageRating?: number;
    totalReviews?: number;
    location?: string;
};

export const tours: Tour[] = [
    {
        _id: "tour_001",
        title: "Sajek Valley Adventure",
        slug: "Sajek Valley Adventure",
        location: "Rangamati, Bangladesh",
        pricePerPerson: 3500,
        averageRating: 4.8,
        totalReviews: 120,
        images: ["/assets/images/bazar.jpg"],
    },
    {
        _id: "tour_002",
        title: "Saint Martin Island Trip",
        slug: "Saint Martin Island Trip",
        location: "Cox's Bazar, Bangladesh",
        pricePerPerson: 5500,
        averageRating: 4.9,
        totalReviews: 200,
        images: ["/assets/images/tours/st-martin.jpg"],
    },
    {
        _id: "tour_003",
        title: "Bandarban Golden Temple Tour",
        slug: "Bandarban Golden Temple Tour",
        location: "Bandarban, Bangladesh",
        pricePerPerson: 4200,
        averageRating: 4.7,
        totalReviews: 95,
        images: ["/assets/images/tours/bandarban.jpg"],
    },
    {
        _id: "tour_004",
        title: "Tea Garden Experience",
        slug: "Tea Garden Experience",
        location: "Srimangal, Bangladesh",
        pricePerPerson: 3000,
        averageRating: 4.6,
        totalReviews: 88,
        images: ["/assets/images/tours/srimangal.jpg"],
    },
    {
        _id: "tour_005",
        title: "Cox's Bazar Beach Escape",
        slug: "Cox's Bazar Beach Escape",
        location: "Cox's Bazar, Bangladesh",
        pricePerPerson: 3800,
        averageRating: 4.5,
        totalReviews: 150,
        images: ["/assets/images/tours/coxs-bazar.jpg"],
    },
    {
        _id: "tour_006",
        title: "Ratargul Swamp Forest Boat Ride",
        slug: "Ratargul Swamp Forest Boat Ride",
        location: "Sylhet, Bangladesh",
        pricePerPerson: 3200,
        averageRating: 4.8,
        totalReviews: 110,
        images: ["/assets/images/tours/ratargul.jpg"],
    },
];

export default function FeaturedTours() {
// export default function FeaturedTours({ season }: { season?: string }) {
    // const [tours, setTours] = useState<Tour[]>([]);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const q = season ? `?season=${encodeURIComponent(season)}&limit=8` : `?limit=8`;
    //     fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tours/featured${q}`)
    //         .then((r) => r.json())
    //         .then((data) => {
    //             setTours(data.data || []);
    //         })
    //         .catch(console.error)
    //         .finally(() => setLoading(false));
    // }, [season]);

    // if (loading) return <div className="py-16">Loading...</div>;
    // if (!tours.length) return <div className="py-16">No featured tours yet.</div>;

    return (
        <section className="py-16 px-4 md:px-8 lg:px-16">
            <SectionTitle title="Featured Tours" subtitle="Handpicked & Top-rated experiences" />
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
                {tours.map((tour) => (
                    <SwiperSlide key={tour._id}>
                        <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
                            <div className="relative h-56 w-full">
                                <Image
                                    src={tour.images?.[0] || "/images/placeholder.jpg"}
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
