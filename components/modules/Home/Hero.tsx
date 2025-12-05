"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HeroProps } from "@/types/heroProps";

// Default Props
const defaultProps: HeroProps = {
    badge: { text: "Explore Bangladesh" },
    heading: {
        line1: "Discover Your Next",
        line2: "Adventure with GuideTravion",
    },
    description: [
        "Connect with trusted guides and explore authentic destinations.",
        "Book tours, get local insights, and enjoy personalized travel.",
    ],
    buttons: {
        primary: { text: "Explore Tours" },
        secondary: { text: "Become a Guide" },
    },
    searchBar: {
        placeholder: "Search destinations, tours, or experiences...",
        buttonText: "Search",
    },
};

export default function Hero(props: HeroProps = defaultProps) {
    const {
        badge,
        heading,
        description,
        buttons,
        searchBar,
    } = { ...defaultProps, ...props };

    return (
        <section className="relative h-[100vh] w-full overflow-hidden flex items-center justify-center">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://images.com')",
                }}
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" />

            {/* Content */}
            <div className="relative z-10 w-full px-4 md:px-10 flex flex-col items-center text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 inline-flex items-center gap-2 bg-white/90 px-4 py-2 rounded-full"
                >
                    <span className="text-xs font-medium text-blue-700">{badge?.text}</span>
                </motion.div>

                {/* Headings */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-white text-4xl md:text-6xl font-bold leading-tight"
                >
                    {heading?.line1}
                    <br />
                    {heading?.line2}
                </motion.h1>

                {/* Description */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-4 text-white/80 text-lg max-w-2xl space-y-1"
                >
                    {description?.map((line, index) => (
                        <p key={index}>{line}</p>
                    ))}
                </motion.div>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 flex flex-col sm:flex-row gap-4"
                >
                    {buttons?.primary && (
                        <Button className="px-8 py-6 text-lg bg-blue-600 hover:bg-blue-700">
                            {buttons.primary.text}
                        </Button>
                    )}

                    {buttons?.secondary && (
                        <Button
                            variant="outline"
                            className="px-8 py-6 text-lg text-white border-white hover:bg-white/10"
                        >
                            {buttons.secondary.text}
                        </Button>
                    )}
                </motion.div>

                {/* Floating Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="absolute bottom-10 w-full flex justify-center"
                >
                    <div className="bg-white/95 shadow-xl backdrop-blur-sm p-4 rounded-2xl w-[90%] md:w-[60%] flex gap-3">
                        <Input
                            placeholder={searchBar?.placeholder}
                            className="h-12"
                        />
                        <Button className="h-12 px-5 bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                            <Search size={18} />
                            {searchBar?.buttonText}
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
