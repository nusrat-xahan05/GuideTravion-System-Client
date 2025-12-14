"use client";

import SectionTitle from "@/components/shared/Home/SectionTitle";
import { ITour } from "@/types/tour.interface";
import TopTourCard from "./TopTourCard";

interface Props {
    topTours: ITour[];
}

export default function TopToursSection({ topTours }: Props) {
    return (
        <section className="px-4 mt-20 mb-16 md:px-8 lg:px-16 pb-10">
            <SectionTitle
                title="Top Destinations"
                subtitle="Explore the most popular and best-rated tours curated for you"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 items-stretch">
                {topTours.map((tour, index) => (
                    <TopTourCard key={tour._id} tour={tour} index={index} />
                ))}
            </div>
        </section>
    );
}
