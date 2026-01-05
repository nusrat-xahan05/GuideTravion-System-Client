"use client";

import { toggleWishlist } from "@/services/user/wishlist.service";
import { TUserRole } from "@/types/user.interface";
import { Heart } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";


interface WishlistButtonProps {
    tourId: string;
    initiallyWishlisted: boolean;
    user: TUserRole | null;
}

export function WishlistButton({ tourId, initiallyWishlisted, user }: WishlistButtonProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState(false);

    const handleToggleWishlist = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        setLoading(true);

        if (!user) {
            // router.push(`/login`);
            router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
            return;
        }

        const res = await toggleWishlist(tourId);
        console.log('from toggle wishlistButton res: ', res);

        setLoading(false);
    };

    return (
        <button onClick={handleToggleWishlist} disabled={loading}>
            <Heart
                className={`w-6 h-6 transition cursor-pointer ${initiallyWishlisted
                    ? "fill-red-500 text-red-500"
                    : "text-white"
                    }`}
            />
        </button>
    );
}
