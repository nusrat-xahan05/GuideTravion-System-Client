"use client";

import { motion } from "framer-motion";
import { BadgeCheck, ShieldCheck, Star, Headset } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card"; // replace with your actual shadcn card path
import type { ReactNode } from "react";
import SectionTitle from "@/components/shared/Home/SectionTitle";

/**
 * Props & default data first (matches your requested style)
 */
export type FeatureItem = {
    title: string;
    description: string;
    icon?: ReactNode;
};

export type WhyChooseUsProps = {
    heading?: {
        badge?: string;
        title?: string;
        subtitle?: string;
    };
    features?: FeatureItem[];
};

const chooseUsValues: WhyChooseUsProps = {
    heading: {
        badge: "Why Choose Us",
        title: "Your Trusted Travel Experience Platform",
        subtitle:
            "We ensure quality, safety, and memorable journeys with verified local guides, secure booking and 24/7 support.",
    },
    features: [
        {
            icon: <BadgeCheck className="w-8 h-8 text-[#FD705C]" />,
            title: "Verified Expert Guides",
            description:
                "All guides pass identity checks and approval flows — trust built from verification and reviews.",
        },
        {
            icon: <ShieldCheck className="w-8 h-8 text-[#FD705C]" />,
            title: "Secure & Transparent Booking",
            description:
                "Encrypted payments, transparent fees, and flexible cancellation policies for peace of mind.",
        },
        {
            icon: <Star className="w-8 h-8 text-[#FD705C]" />,
            title: "Top-rated Experiences",
            description:
                "Tours ranked by real traveler reviews and performance signals to help you choose the best.",
        },
        {
            icon: <Headset className="w-8 h-8 text-[#FD705C]" />,
            title: "24/7 Customer Support",
            description:
                "Dedicated support that’s available round-the-clock to assist before, during, and after your trip.",
        },
    ],
};

export default function WhyChooseUs() {
    return (
        <section className="w-full py-20 bg-[#07102A]">
            <div className="mx-auto max-w-[1200px] px-4 md:px-8 lg:px-16">
                {/* Section Title (shared) */}
                <SectionTitle
                    title={chooseUsValues.heading?.title as string}
                    subtitle={chooseUsValues.heading?.subtitle as string}
                />

                {/* Feature Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                    {chooseUsValues.features?.map((f, idx) => (
                        <motion.div
                            key={f.title}
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45, delay: idx * 0.08 }}
                            viewport={{ once: true }}
                        >
                            <Card className="rounded-2xl border-0 bg-gradient-to-br from-white/3 via-white/2 to-white/1 hover:scale-[1.01] transform transition-shadow duration-300 shadow-lg">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="rounded-lg bg-gradient-to-tr from-[#FFCFCC]/10 via-[#FD705C]/10 to-[#FF2056]/10 p-2">
                                            {f.icon}
                                        </div>
                                        <h3 className="text-white text-lg font-semibold">{f.title}</h3>
                                    </div>

                                    <p className="mt-3 text-[14px] text-white/80 leading-6">
                                        {f.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
