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


export async function getTourReview(tourId?: string) {
    try {
        const response = await serverFetch.get(`/reviews/${tourId}`);
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
