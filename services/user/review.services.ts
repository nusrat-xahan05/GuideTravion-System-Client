/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

export async function createReviewAction(_prevState: any, formData: FormData) {
    try {
        const payload = {
            bookingId: formData.get("bookingId"),
            tourId: formData.get("tourId"),
            rating: Number(formData.get("rating")),
            review: formData.get("review"),
        };

        const updatedpayload = JSON.stringify(payload)
        const res = await serverFetch.post(`/reviews`, {
            body: updatedpayload,
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await res.json();
        return result;
    } catch {
        return {
            success: false,
            message: "Something went wrong",
        };
    }
}
