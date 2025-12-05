"use client";

import { motion } from "framer-motion";

export default function SectionTitle({
    title,
    subtitle,
}: {
    title: string;
    subtitle?: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto space-y-3 mb-10"
        >
            <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
            {subtitle && (
                <p className="text-gray-600 text-[15px] leading-6">{subtitle}</p>
            )}
        </motion.div>
    );
}
