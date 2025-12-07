import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";


export const registerBaseUserSchema = z.object({
    firstName: z
        .string({
            error: (issue) => issue.input === undefined
                ? "Name is Required"
                : "Name Must Be a String"
        })
        .min(3, { message: "Name Must Be Atleast 3 Characters Long" })
        .max(50, { message: "Name is Too Long" }),

    lastName: z
        .string({ error: "LastName Must Be String" })
        .max(200, { message: "lastName Cannot Exceed 8 Characters" })
        .optional(),

    email: z
        .email({ message: "Invalid Email Address Format" })
        .regex(
            /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i,
            { message: "Invalid Email Address Format" }
        )
        .transform((val) => val.toLowerCase()),

    password: z
        .string({
            error: (issue) => issue.input === undefined
                ? "Password is Required"
                : "Password Must Be a String"
        })
        .min(8, { message: "Password Must Be At Least 8 Characters Long" })
        .regex(/^(?=.*[A-Z])/, { message: "Password Must Contain At Least 1 Uppercase Letter" })
        .regex(/^(?=.*[!@#$%^&*])/, { message: "Password Must Contain At Least 1 Special Character" })
        .regex(/^(?=.*\d)/, { message: "Password Must Contain At Least 1 Number" }),

    confirmPassword: z.string(),

    country: z.string().min(2, "Country is required"),

    phone: z
        .string()
        .min(1, "Phone number is required")
        .refine((value) => {
            const phone = parsePhoneNumberFromString(value);
            return phone?.isValid();
        }, "Invalid phone number in international format (e.g., +14155552671)")

}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
});

export const registerGuideSchema = registerBaseUserSchema.safeExtend({
    occupation: z
        .string({
            error: (issue) => issue.input === undefined
                ? "occupation is Required"
                : "occupation Must Be a String"
        })
        .min(2, { message: "occupation is Required" })
        .max(30, { message: "occupation is Too Long" })
});

export const registerTouristSchema = registerBaseUserSchema.safeExtend({
    // role: z.enum(TUserRole).default(TUserRole.TOURIST),
});



export const updateBaseUserSchema = z.object({
    firstName: z
        .string({
            error: (issue) => issue.input === undefined
                ? "Name is Required"
                : "Name Must Be a String"
        })
        .min(3, { message: "Name Must Be Atleast 3 Characters Long" })
        .max(50, { message: "Name is Too Long" }),

    lastName: z
        .string({ error: "LastName Must Be String" })
        .max(200, { message: "lastName Cannot Exceed 8 Characters" })
        .optional(),

    phone: z
        .string()
        .min(1, "Phone number is required")
        .refine((value) => {
            const phone = parsePhoneNumberFromString(value);
            return phone?.isValid();
        }, "Invalid phone number in international format (e.g., +14155552671)"),

    profileImage: z.string().optional(),
    bio: z.string().optional(),
    country: z.string().min(2, "Country is required").optional(),

    address: z
        .string({ error: "Address Must Be String" })
        .max(200, { message: "Address Cannot Exceed 200 Characters" })
        .optional(),

    languages: z.array(z.string()).optional(),

});


export const updateTouristSchema = updateBaseUserSchema.extend({
    travelInterests: z.array(z.string()).optional(),
    preferredStyles: z.array(z.string()).optional()
});


export const updateGuideSchema = updateBaseUserSchema.extend({
    occupation: z
        .string({
            error: (issue) => issue.input === undefined
                ? "occupation is Required"
                : "occupation Must Be a String"
        })
        .min(2, { message: "occupation is Required" })
        .max(30, { message: "occupation is Too Long" }),
    city: z
        .string({
            error: (issue) => issue.input === undefined
                ? "City is Required"
                : "City Must Be a String"
        })
        .min(3, { message: "City is Too Short" })
        .max(16, { message: "City is Too Long" })
        .optional(),
    expertise: z.array(z.string()),
    yearsOfExperience: z.coerce
        .number()
        .min(0, { message: "Experience must be a Positive Number" })
        .optional(),
    hourlyRate: z.coerce
        .number()
        .min(0, { message: "Hourly Rate must be a Positive Number" })
        .optional(),
    dailyRate: z.coerce
        .number()
        .min(0, { message: "Daily Rate must be a Positive Number" })
        .optional(),
});
