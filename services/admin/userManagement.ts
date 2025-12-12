/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { IGuide, TUserStatus, TVerificationReqStatus } from "@/types/user.interface";



export async function getAllGuides(queryString?: string) {
    try {
        const response = await serverFetch.get(`/user/all-guides${queryString ? `?${queryString}` : ""}`);
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


export async function getAllPendingGuides(queryString?: string) {
    try {
        const response = await serverFetch.get(`/user/pending-guides${queryString ? `?${queryString}` : ""}`);
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


export async function getAllTourist(queryString?: string) {
    try {
        const response = await serverFetch.get(`/user/all-tourists${queryString ? `?${queryString}` : ""}`);
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


export async function updateUser(id: string, _prevState: any, formData: FormData) {
    const payload: Partial<IGuide> = {
        userStatus: formData.get("userStatus") as TUserStatus,
        isVerified: formData.get("isVerified") === "true" ? true : false,
        verificationRequest: formData.get("verificationRequest") as TVerificationReqStatus,
    };

    try {
        const response = await serverFetch.patch(`/user/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
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

export async function updateGuideVerification(id: string, _prevState: any, formData: FormData) {
    const payload: Partial<IGuide> = {
        verificationRequest: formData.get("verificationRequest") as TVerificationReqStatus,
    };

    try {
        const response = await serverFetch.patch(`/user/${id}/verify`, {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
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

