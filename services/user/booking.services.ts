/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { serverFetch } from "@/lib/server-fetch";
import { CheckAvailabilityParams } from "@/types/booking.interface";


export async function checkAvailability({ tourId, startDate, endDate, persons }: CheckAvailabilityParams) {
    try {
        const query = new URLSearchParams({
            tourId,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            persons: persons.toString(),
        }).toString();

        const response = await serverFetch.get(`/availability/check?${query}`);
        const result = await response.json();
        console.log('from server function response: ', result);
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


export async function createBookingAction(_prevState: any, formData: FormData) {
    try {
        const payload = {
            tourId: formData.get("tourId"),
            startDate: formData.get("startDate"),
            endDate: formData.get("endDate"),
            persons: Number(formData.get("persons")),
            meetingTime: formData.get("meetingTime"),
            pickupLocation: formData.get("pickupLocation"),
            dropoffLocation: formData.get("dropoffLocation"),
            notes: formData.get("notes"),
        };

        const res = await serverFetch.post(`/bookings`, {
            body: JSON.stringify(payload),
            headers: { "Content-Type": "application/json" },
        })
        
        const result = await res.json();
        console.log('from result creatw booking: ', result);
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



