"use client";

import SectionTitle from "@/components/shared/Home/SectionTitle";
import { DIVISIONS } from "@/types/division.constants";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface DivisionCountMap {
    [key: string]: number;
}

interface Props {
    divisionCounts: DivisionCountMap;
}


export default function DivisionSection({ divisionCounts }: Props) {
    const router = useRouter();

    const handleClick = (division: string) => {
        router.push(`/tour?division=${encodeURIComponent(division)}`);
    };

    return (
        <section className="py-12 mb-8">
            <SectionTitle
                title="Explore Tours by Division"
                subtitle="Explore the tour based on your preffered division"
            />


            {/* 2 rows → 4 cards per row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {DIVISIONS.map((division, index) => {
                    const totalTours = divisionCounts[division.value] ?? 0;

                    return (
                        <motion.div
                            key={division.value}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            whileHover={{ scale: 1.03 }}
                            className="cursor-pointer"
                            onClick={() => handleClick(division.value)}
                        >
                            <div className="relative h-52 rounded-xl overflow-hidden shadow-lg">
                                {/* Image */}
                                <Image
                                    src={division.image}
                                    alt={division.name}
                                    className="w-full h-full object-cover"
                                    fill
                                />

                                {/* Black gradient overlay */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

                                {/* Text */}
                                <div className="absolute bottom-4 left-4 text-white">
                                    <h3 className="text-xl font-semibold">
                                        {division.name}
                                    </h3>
                                    <p className="text-sm text-gray-200">
                                        {totalTours} Tours Available
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
