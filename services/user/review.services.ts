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

        console.log('from payload: ', payload);
        const updatedpayload = JSON.stringify(payload)
        console.log('from payload updatedpayload: ', updatedpayload);

        const res = await serverFetch.post(`/reviews`, {
            body: updatedpayload,
        });

        const result = await res.json();
        console.log('from payload result: ', result);
        return result;
    } catch {
        return {
            success: false,
            message: "Something went wrong",
        };
    }
}
