/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { zodValidatorRequest } from "@/lib/zodValidateRequest";
import { ActionResponse } from "@/types/response.interface";
import { verifyTourStatusSchema } from "@/zod/tour.validation";
import { revalidateTag } from "next/cache";


export async function getAllTours(queryString?: string) {
    try {
        const response = await serverFetch.get(`/tour/all-tours${queryString ? `?${queryString}` : ""}`);
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


export async function getAllPendingTours(queryString?: string) {
    try {
        const response = await serverFetch.get(`/tour/pending-tours${queryString ? `?${queryString}` : ""}`);
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


export async function updateTourStatusByAdmin(slug: string, _prevState: ActionResponse | null, formData: FormData): Promise<ActionResponse> {
    try {
        const value = formData.get("statusByAdmin");
        const payload = {
            statusByAdmin: value
        }

        const validated = zodValidatorRequest(payload, verifyTourStatusSchema);
        if (!validated.success) return validated;

        const res = await serverFetch.patch(`/tour/${slug}/verify-tour`, {
            body: JSON.stringify(validated.data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await res.json();
        revalidateTag("tours-list", { expire: 0 });
        return result;
    } catch (error: any) {
        console.error("updateTourStatusByAdmin error:", error);

        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Something went wrong",
        };
    }
}
