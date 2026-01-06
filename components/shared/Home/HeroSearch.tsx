"use client";


import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";


export const HeroSearch = () => {
    const router = useRouter();
    const [value, setValue] = useState("");
    const [isPending, startTransition] = useTransition();

    const handleSearch = () => {
        if (!value.trim()) return;

        const params = new URLSearchParams();
        params.set("search", value.trim());
        params.set("page", "1");

        startTransition(() => {
            router.push(`/tour?${params.toString()}`);
        });
    };

    return (
        <div className="bg-white/95 shadow-md backdrop-blur-sm p-4 rounded-xl w-[90%] md:w-[60%] flex gap-3">
            <Input
                type="text"
                placeholder="Search destinations, tours, or experiences..."
                className="flex-1"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                disabled={isPending}
            />
            <Button
                onClick={handleSearch}
                disabled={isPending}
                className="px-5 bg-primary hover:bg-blue-800 flex items-center gap-2 font-semibold cursor-pointer"
            >
                <Search size={18} />
                Search
            </Button>
        </div>
    );
}
