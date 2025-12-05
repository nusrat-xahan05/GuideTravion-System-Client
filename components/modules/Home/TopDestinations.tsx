"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import SectionTitle from "@/components/shared/Home/SectionTitle";
import coxsbazar from "../../../assets/images/bazar.jpg"
import sajekV from "../../../assets/images/sajek.jpg"
import bandar from "../../../assets/images/bandar.jpg"

export default function TopDestinations() {
    const destinations = [
        {
            name: "Cox's Bazar",
            location: "Chittagong, Bangladesh",
            image: coxsbazar,
        },
        {
            name: "Sajek Valley",
            location: "Rangamati, Bangladesh",
            image: sajekV,
        },
        {
            name: "Bandarban",
            location: "Chittagong Hill Tracts",
            image: bandar,
        },
    ];

    return (
        <section className="w-full px-4 py-16 md:px-8 lg:px-16">
            <SectionTitle
                title="Top Destinations"
                subtitle="Explore the most popular travel destinations chosen by tourists and guides"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {destinations.map((item, index) => (
                    <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.15 }}
                        viewport={{ once: true }}
                    >
                        <Card className="overflow-hidden rounded-2xl border shadow-sm hover:shadow-xl transition-shadow duration-300">
                            <div className="relative w-full h-56">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <CardContent className="p-5 space-y-2">
                                <h3 className="text-xl font-semibold">{item.name}</h3>
                                <p className="text-gray-600 text-sm">{item.location}</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
