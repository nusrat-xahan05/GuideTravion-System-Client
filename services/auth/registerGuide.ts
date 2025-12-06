// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use server"

// import { serverFetch } from "@/lib/server-fetch";
// import { zodValidatorRequest } from "@/lib/zodValidateRequest";
// import { userLogin } from "./userLogin";
// import { registerGuideSchema } from "@/zod/userRegister.validation";


// export const registerGuide = async (_currentState: any | null, formData: FormData): Promise<any> => {
//     try {
//         // --------- REGISTER FORM DATA
//         const payload = {
//             firstName: formData.get('firstName'),
//             lastName: formData.get('lastName'),
//             email: formData.get('email'),
//             password: formData.get('password'),
//             confirmPassword: formData.get('confirmPassword'),
//             phone: formData.get('phone'),
//             country: formData.get('country'),
//             occupation: formData.get('occupation')
//         }


//         // --------- FORM DATA ZOD VALIDATION
//         if (zodValidatorRequest(payload, registerGuideSchema).success === false) {
//             return zodValidatorRequest(payload, registerGuideSchema);
//         }
//         const validatedPayload = zodValidatorRequest(payload, registerGuideSchema);


//         // --------- DATA FETCH REQUEST & RESPONSE
//         const res = await serverFetch.post("/user/register/guide", {
//             body: JSON.stringify(validatedPayload),
//             headers: {
//                 "Content-Type": "application/json",
//             }
//         });
//         const result = await res.json();


//          // --------- AUTOMATICALLY LOGGED IN THE USER
//         if (result.success) {
//             await userLogin(_currentState, formData);
//         }
//         return result;
//     } catch (error: any) {
//         // Re-throw NEXT_REDIRECT errors so Next.js can handle them
//         if (error?.digest?.startsWith('NEXT_REDIRECT')) {
//             throw error;
//         }
//         console.log(error);
//         return { success: false, message: `${process.env.NODE_ENV === 'development' ? error.message : "Registration Failed. Please try again."}` };
//     }
// }



/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidatorRequest } from "@/lib/zodValidateRequest";
import { registerGuideSchema } from "@/zod/userRegister.validation";
import { userLogin } from "./userLogin";
import { ActionResponse } from "@/types/response.interface";

export const registerGuide = async (formData: FormData): Promise<ActionResponse> => {
    try {
        const payload = {
            firstName: formData.get("firstName") as string,
            lastName: formData.get("lastName") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            confirmPassword: formData.get("confirmPassword") as string,
            phone: formData.get("phone") as string,
            country: formData.get("country") as string,
            occupation: formData.get("occupation") as string,
        };

        const validatedPayload = zodValidatorRequest(payload, registerGuideSchema);
        if (!validatedPayload.success) return validatedPayload;

        const res = await serverFetch.post("/user/register/guide", {
            body: JSON.stringify(validatedPayload.data),
            headers: { "Content-Type": "application/json" },
        });

        const result: ActionResponse = await res.json();
        console.log('from register: ', result);

        if (result.success) {
            await userLogin(validatedPayload.data, formData);
        }

        return result;
    } catch (error: any) {
        // Re-throw NEXT_REDIRECT errors so Next.js can handle them
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.log(error);
        return { success: false, message: `${process.env.NODE_ENV === 'development' ? error.message : "Registration Failed. Please try again."}` };
    }
};
