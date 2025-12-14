"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Users, Globe, ShieldCheck, Star } from "lucide-react";
import { motion } from "framer-motion";


export default function WhyChooseUs() {
    return (
        <section className="bg-gray-50 mt-16 mb-8">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-12">
                    Why Choose GuideTravion
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[{
                        icon: ShieldCheck,
                        title: "Verified Guides",
                        desc: "All guides are verified by our admin team for quality and trust."
                    }, {
                        icon: Globe,
                        title: "Local Expertise",
                        desc: "Explore destinations through knowledgeable local professionals."
                    }, {
                        icon: Users,
                        title: "Tourist Friendly",
                        desc: "Designed for seamless experience for both tourists and guides."
                    }, {
                        icon: Star,
                        title: "Quality Experiences",
                        desc: "Curated tours focused on safety, comfort, and enjoyment."
                    }].map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="h-full">
                                <CardContent className="p-6 text-center space-y-3">
                                    <item.icon className="w-10 h-10 mx-auto text-blue-600" />
                                    <h3 className="font-semibold text-lg">{item.title}</h3>
                                    <p className="text-sm text-gray-600">{item.desc}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}