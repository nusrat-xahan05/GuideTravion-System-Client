/* eslint-disable @typescript-eslint/no-explicit-any */
// import { ZodObject } from "zod";


// export const zodValidatorRequest = <T>(payload: T, schema: ZodObject) => {
//     const validatedPayload = schema.safeParse(payload)
//     console.log('from zod validation function: ', validatedPayload);

//     if (!validatedPayload.success) {
//         return {
//             success: false,
//             errors: validatedPayload.error.issues.map(issue => {
//                 return {
//                     field: issue.path[0],
//                     message: issue.message,
//                 }
//             })
//         }
//     }

//     return {
//         success: true,
//         data: validatedPayload.data,
//     };
// }


import { ZodObject } from "zod";

export const zodValidatorRequest = <T extends Record<string, any>>(
    payload: T,
    schema: ZodObject<any>
) => {
    const validatedPayload = schema.safeParse(payload);

    if (!validatedPayload.success) {
        return {
            success: false,
            errors: validatedPayload.error.issues.map((issue) => ({
                field: String(issue.path[0]), // <-- cast to string
                message: issue.message,
            })),
        };
    }

    return {
        success: true,
        data: validatedPayload.data as T,
    };
};
