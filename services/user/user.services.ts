/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { ActionResponse } from "@/types/response.interface";
import { serverFetch } from "@/lib/server-fetch";
import { revalidateTag } from "next/cache";
import { zodValidatorRequest } from "@/lib/zodValidateRequest";
import { updateBaseUserSchema, updateGuideSchema, updateTouristSchema } from "@/zod/user.validation";
import { TUserRole } from "@/types/user.interface";



export async function updateMyProfile(
    _prevState: any,
    formData: FormData
): Promise<ActionResponse> {
    try {
        const uploadFormData = new FormData();
        const raw: any = {};

        formData.forEach((value, key) => {
            if (key === "file") return;

            const arrayFields = ["languages", "travelInterests", "preferredStyles", "expertise",];
            if (arrayFields.includes(key)) {
                try {
                    raw[key] = JSON.parse(String(value));
                } catch {
                    raw[key] = [];
                }
                return;
            }

            // number fields
            const numberFields = ["yearsOfExperience", "hourlyRate", "dailyRate",];
            if (numberFields.includes(key)) {
                const n = Number(value);
                if (!isNaN(n)) raw[key] = n;
                return;
            }

            // normal strings
            if (value !== "") {
                raw[key] = String(value);
            }
        });

        const userRole = formData.get("role") || raw.role;

        let selectSchema = updateBaseUserSchema;

        if (userRole === TUserRole.GUIDE) {
            selectSchema = updateGuideSchema;
        }
        if (userRole === TUserRole.TOURIST) {
            selectSchema = updateTouristSchema
        }
        // --------- FORM DATA ZOD VALIDATION
        if (zodValidatorRequest(raw, selectSchema).success === false) {
            return zodValidatorRequest(raw, selectSchema);
        }
        const validatedPayload = zodValidatorRequest(raw, selectSchema).data;
        console.log('from login action function: ', validatedPayload);


        uploadFormData.append("data", JSON.stringify(validatedPayload));
        const file = formData.get("file");
        if (file && file instanceof File && file.size > 0) {
            uploadFormData.append("file", file);
        }

        console.log('from update uploadFormData: ', uploadFormData);

        const response = await serverFetch.patch(`/user/update-profile`, {
            body: uploadFormData,
        });

        const result = await response.json();
        console.log('from update result: ', result);

        // revalidate cache
        revalidateTag("user-info", { expire: 0 });
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}



// export async function updateMyProfile(_prevState: any, formData: FormData): Promise<ActionResponse> {
//     try {
//         const uploadFormData = new FormData();

//         const data: any = {};
//         formData.forEach((value, key) => {
//             if (key !== 'file' && value) {
//                 data[key] = value;
//             }
//         });
//         uploadFormData.append('data', JSON.stringify(data));

//         const file = formData.get('file');
//         if (file && file instanceof File && file.size > 0) {
//             uploadFormData.append('file', file);
//         }

//         console.log('from update uploadFormData: ', uploadFormData);

//         const response = await serverFetch.patch(`/user/update-profile`, {
//             body: uploadFormData,
//         });

//         const result = await response.json();
//         console.log('from update result: ', result);

//         revalidateTag("user-info", { expire: 0 });
//         return result;
//     } catch (error: any) {
//         console.log(error);
//         return {
//             success: false,
//             message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
//         };
//     }
// }



export async function sendGuideVerificationRequest(_prevState: any, formData: FormData): Promise<ActionResponse> {
    try {
        // parse formData for needed values (like userId)
        const obj = Object.fromEntries(formData);
        // Example: check required field
        // implement backend call to create verification request
        return {
            success: true,
            message: "Verification request submitted successfully",
        };
    } catch (err: any) {
        return {
            success: false,
            message: err?.message || "Failed to submit verification request",
        };
    }
}
