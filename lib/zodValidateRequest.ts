import { ZodObject } from "zod"

export const zodValidatorRequest = <T>(payload: T, schema: ZodObject) => {
    const validatedPayload = schema.safeParse(payload)
    // console.log('from zod validation function: ', validatedPayload);

    if (!validatedPayload.success) {
        return {
            success: false,
            errors: validatedPayload.error.issues.map(issue => {
                return {
                    field: issue.path[0],
                    message: issue.message,
                }
            })
        }
    }

    return {
        success: true,
        data: validatedPayload.data,
    };
}