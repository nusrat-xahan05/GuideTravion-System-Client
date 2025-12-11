/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";


import { serverFetch } from "@/lib/server-fetch";
import { zodValidatorRequest } from "@/lib/zodValidateRequest";
import { ActionResponse } from "@/types/response.interface";
import { createTourSchema } from "@/zod/tour.validation";
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
        // append image files LAST
        // rawImages.forEach(file => {
        //     finalFD.append("files", file);
        // });

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
        console.log("Create tour error:", error);
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
