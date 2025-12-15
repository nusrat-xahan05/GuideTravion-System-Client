/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

export async function paymentInit(bookingId: string) {
    try {
        const res = await serverFetch.post(`/payment/init`, {
            body: JSON.stringify({ bookingId }),
            headers: { "Content-Type": "application/json" },
        })

        const result = await res.json();
        return result;
    } catch (error: any) {
        return {
            success: false,
            paymentUrl: "",
            message: error.message || "Something went wrong",
        };
    }
}
