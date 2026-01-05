/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { serverFetch } from "@/lib/server-fetch";
import { CheckAvailabilityParams } from "@/types/booking.interface";


export async function checkAvailability({ tourId, startDate, endDate, persons }: CheckAvailabilityParams) {
    try {
        const query = new URLSearchParams({
            tourId,
            startDate: startDate.toString(),
            endDate: endDate.toString(),
            persons: persons.toString(),
        });

        const response = await serverFetch.get(`/availability/check?${query}`);
        const result = await response.json();

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


export async function getActiveBookedTours(queryString?: string) {
    try {
        const response = await serverFetch.get(`/bookings/active-booked-tours${queryString ? `?${queryString}` : ""}`);
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


export async function getUpcomingBookedTours(queryString?: string) {
    try {
        const response = await serverFetch.get(`/bookings/upcoming-booked-tours${queryString ? `?${queryString}` : ""}`);
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


export async function getCompletedBookedTours(queryString?: string) {
    try {
        const response = await serverFetch.get(`/bookings/completed-booked-tours${queryString ? `?${queryString}` : ""}`);
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


export async function getCancelledBookedTours(queryString?: string) {
    try {
        const response = await serverFetch.get(`/bookings/cancelled-booked-tours${queryString ? `?${queryString}` : ""}`);
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


// export async function getMybookings(queryString?: string) {
//     try {
//         const response = await serverFetch.get(`/bookings/my-bookings${queryString ? `?${queryString}` : ""}`);
//         const result = await response.json();

//         return result;
//     } catch (error: any) {
//         console.log(error);
//         return {
//             success: false,
//             message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
//         };
//     }
// }


