"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CTASection() {
    return (
        <section className="relative overflow-hidden bg-linear-to-br from-blue-600 via-indigo-600 to-purple-600 py-20 px-6 md:px-10 rounded-3xl my-6">

            {/* Decorative Blur */}
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-black/20 rounded-full blur-3xl" />

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative z-10 max-w-3xl mx-auto text-center text-white"
            >
                <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                    Ready to Explore Bangladesh Like Never Before?
                </h2>

                <p className="mt-4 text-lg text-white/90">
                    Discover authentic experiences guided by verified local experts.
                    Your next unforgettable journey starts here.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/tour">
                        <Button
                            size="lg"
                            className="cursor-pointer px-8 py-6 text-[17px] font-semibold text-blue-800 transition bg-white hover:bg-transparent border hover:border-white hover:text-white">
                            Explore Tours
                        </Button>
                    </Link>

                    <Link href="/register/guide">
                        <Button
                            size="lg"
                            variant="outline"
                            className="cursor-pointer px-8 py-6 text-[17px] font-semibold border-white text-white bg-white/10"
                        >
                            Become a Guide
                        </Button>
                    </Link>
                </div>
            </motion.div>
        </section>
    );
}
