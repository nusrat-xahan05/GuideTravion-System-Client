/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";


import { serverFetch } from "@/lib/server-fetch";
import { zodValidatorRequest } from "@/lib/zodValidateRequest";
import { ActionResponse } from "@/types/response.interface";
import { createTourSchema, updateTourSchema } from "@/zod/tour.validation";
import { revalidateTag } from "next/cache";

export async function createTourAction(_prevState: any, formData: FormData): Promise<ActionResponse> {
    try {
        const rawImages: File[] = [];
        formData.forEach((v, k) => {
            if (k === "images" && v instanceof File) rawImages.push(v);
        });

        const payload: any = {};

        formData.forEach((value, key) => {
            if (key === "images") return; // handled already

            const numFields = ["durationDays", "pricePerPerson", "maxGroupSize", "minAge"];
            if (numFields.includes(key)) {
                const n = Number(value);
                if (!isNaN(n)) payload[key] = n;
                return;
            }

            const jsonArrayFields = ["highlights", "includes", "excludes", "itinerary"];
            if (jsonArrayFields.includes(key)) {
                try {
                    payload[key] = JSON.parse(String(value));
                } catch {
                    payload[key] = [];
                }
                return;
            }

            if (key === "tags") {
                if (value) payload["tags"] = JSON.parse(String(value));
                return;
            }

            if (key === "tourType") {
                const parsed = JSON.parse(String(value));
                payload.tourType = parsed;
                return;
            }

            if (value !== "") payload[key] = String(value);
        });

        const validated = zodValidatorRequest(payload, createTourSchema);
        if (!validated.success) return validated;

        const finalFD = new FormData();

        finalFD.append("data", JSON.stringify(validated.data));
        rawImages.forEach(file => {
            if (file && file instanceof File && file.size > 0) {
                finalFD.append("files", file);
            }
        });

        const response = await serverFetch.post(`/tour/create-tour`, {
            body: finalFD, // Multipart request
        });

        const result = await response.json();

        revalidateTag("tours-list", { expire: 0 });
        return result;
    } catch (error: any) {
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Something went wrong",
        };
    }
}


export async function updateTourAction(slug: string, _prevState: any, formData: FormData): Promise<ActionResponse> {
    try {
        const rawImages: File[] = [];
        formData.forEach((v, k) => {
            if (k === "images" && v instanceof File) rawImages.push(v);
        });

        const payload: any = {};

        formData.forEach((value, key) => {
            if (key === "images") return; // handled already

            const jsonArrayFields = ["highlights", "includes", "excludes", "itinerary"];
            if (jsonArrayFields.includes(key)) {
                try {
                    payload[key] = JSON.parse(String(value));
                } catch {
                    payload[key] = [];
                }
                return;
            }

            if (key === "tags") {
                if (value) payload["tags"] = JSON.parse(String(value));
                return;
            }

            if (key === "tourType") {
                const parsed = JSON.parse(String(value));
                payload.tourType = parsed;
                return;
            }

            if (value !== "") payload[key] = String(value);
        });

        const validated = zodValidatorRequest(payload, updateTourSchema);
        if (!validated.success) return validated;

        const finalFD = new FormData();

        finalFD.append("data", JSON.stringify(validated.data));
        rawImages.forEach(file => {
            if (file && file instanceof File && file.size > 0) {
                finalFD.append("files", file);
            }
        });

        const response = await serverFetch.patch(`/tour/update/${slug}`, {
            body: finalFD, // Multipart request
        });

        const result = await response.json();
        revalidateTag("tours-list", { expire: 0 });
        return result;
    } catch (error: any) {
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Something went wrong",
        };
    }
}


export async function getMyTours(queryString?: string) {
    try {
        const response = await serverFetch.get(`/tour/my-tours${queryString ? `?${queryString}` : ""}`);
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


export async function getMyActiveTours(queryString?: string) {
    try {
        const response = await serverFetch.get(`/tour/my-active-tours${queryString ? `?${queryString}` : ""}`);
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


export async function getAllActiveApprovedTours(queryString?: string) {
    try {
        const response = await serverFetch.get(`/tour${queryString ? `?${queryString}` : ""}`, {
            next: { revalidate: 60 }
        });
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


export async function getDiviosnStats() {
    try {
        const response = await serverFetch.get(`/tour/division-stats`,
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
};


export async function getTopTours() {
    try {
        const response = await serverFetch.get(`/tour/top-tours`,
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
};


export async function getNewTours() {
    try {
        const response = await serverFetch.get(`/tour/new-arrival`,
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
};


export async function getTourBySlug(slug?: string) {
    try {
        const response = await serverFetch.get(`/tour/${slug}`);
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


export async function deleteTourBySlug(_prevState: any, formData: FormData) {
    const slug = formData.get("slug") as string;

    try {
        const res = await serverFetch.delete(`/tour/${slug}`);
        const result = await res.json();

        revalidateTag("tours-list", { expire: 0 });
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}


export async function sendTourVerificationRequest(_prevState: any, formData: FormData) {
    try {
        const slug = formData.get("slug") as string;
        const response = await serverFetch.patch(`/tour/${slug}/send-verify-req`, {
            body: '',
        });

        const result = await response.json();

        // revalidate cache
        revalidateTag("tours-list", { expire: 0 });
        return result;
    } catch (err: any) {
        return {
            success: false,
            message: err?.message || "Failed to submit verification request",
        };
    }
}
