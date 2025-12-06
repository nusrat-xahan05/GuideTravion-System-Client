import z from "zod";

export const userLoginSchema = z.object({
    email: z
        .email({ message: "Invalid Email Address Format" })
        .min(1, "Email is required"),
    password: z
        .string({
            error: (issue) => issue.input === undefined
                ? "Password is Required"
                : "Password Must Be a String"
        }).nonempty("Password is required")
})

