/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidateTag } from "next/cache";


export async function getMyAllWishlist() {
    try {
        const response = await serverFetch.get(`/wishlist/myWishlist`,
            { cache: "no-store" }
        );
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}


export async function getMyWishlist() {
    try {
        const response = await serverFetch.get(`/wishlist/myWishlist`,
            { cache: "no-store" }
        );
        const result = await response.json();

        return result.data?.wishlistTours?.map((tour: any) => tour._id) ?? [];

    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}


export async function toggleWishlist(tourId: string) {
    try {
        const response = await serverFetch.post(`/wishlist/toggleWishlist`, {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ tourId: tourId })
        });
        const result = await response.json();

        revalidateTag("user-info", { expire: 0 });
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Something went wrong",
        };
    }
}