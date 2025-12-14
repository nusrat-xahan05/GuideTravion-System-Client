"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Globe, ShieldCheck, Star } from "lucide-react";
import aboutImg from "@/assets/images/bandar.jpg"

export default function About() {
    return (
        <div className="space-y-20">

            {/* HERO SECTION */}
            <section className="relative overflow-hidden bg-linear-to-r from-blue-600 to-indigo-700 text-white">
                <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                            About GuideTravion
                        </h1>
                        <p className="mt-4 text-lg opacity-90">
                            A trusted platform connecting travelers with verified local guides
                            to create unforgettable travel experiences.
                        </p>

                        <div className="flex flex-wrap gap-3 mt-6">
                            <Badge variant="secondary">Trusted Guides</Badge>
                            <Badge variant="secondary">Secure Booking</Badge>
                            <Badge variant="secondary">Local Experiences</Badge>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden shadow-xl"
                    >
                        <Image
                            src={aboutImg}
                            alt="Travel with GuideTravion"
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                </div>
            </section>

            {/* MISSION & VISION */}
            <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                    <CardContent className="p-6 space-y-3">
                        <h2 className="text-xl font-semibold">Our Mission</h2>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Our mission is to empower travelers by connecting them with
                            experienced, verified local guides, ensuring safe, meaningful,
                            and culturally rich journeys.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6 space-y-3">
                        <h2 className="text-xl font-semibold">Our Vision</h2>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            To become the most trusted travel companion platform where
                            authentic experiences and local expertise redefine tourism.
                        </p>
                    </CardContent>
                </Card>
            </section>

            {/* WHY CHOOSE US */}
            <section className="bg-gray-50 py-16">
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

            {/* HOW IT WORKS */}
            <section className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[{
                        step: "01",
                        title: "Discover Tours",
                        desc: "Browse tours created by verified guides across destinations."
                    }, {
                        step: "02",
                        title: "Book Securely",
                        desc: "Choose your tour and book with confidence through our platform."
                    }, {
                        step: "03",
                        title: "Travel & Explore",
                        desc: "Enjoy memorable experiences guided by local experts."
                    }].map((step, i) => (
                        <Card key={i}>
                            <CardContent className="p-6 space-y-3">
                                <span className="text-blue-600 font-bold text-xl">{step.step}</span>
                                <h3 className="text-lg font-semibold">{step.title}</h3>
                                <p className="text-sm text-gray-600">{step.desc}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* FOOTER CTA */}
            <section className="bg-indigo-700 text-white py-16">
                <div className="max-w-4xl mx-auto text-center px-6 space-y-4">
                    <h2 className="text-3xl font-bold">Start Your Journey Today</h2>
                    <p className="opacity-90">
                        Join GuideTravion and explore destinations with trusted local guides.
                    </p>
                </div>
            </section>

        </div>
    );
}
