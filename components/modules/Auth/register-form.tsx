// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useActionState, useEffect, useState } from "react";
// import { toast } from "sonner";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import InputFieldError from "@/components/shared/Form/InputFieldError";
// import PhoneInput from "@/components/shared/Form/PhoneInput";
// import { countries } from "@/constants/countries";
// import { ActionResponse } from "@/types/response.interface";
// import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";

// export default function RegisterForm({ action, role }: any) {
//     const [state, formAction, isPending] =
//         useActionState<ActionResponse | null>(action, null);

//     const [phone, setPhone] = useState("");

//     useEffect(() => {
//         if (state && !state.success && state.message) {
//             toast.error(state.message);
//         }
//         if (state && state.success) {
//             toast.success(state.message);
//         }
//     }, [state]);

//     return (
//         <form action={formAction}>
//             <FieldGroup>
//                 <div className="grid grid-cols-1 gap-4">
//                     {/* First Name */}
//                     <Field>
//                         <FieldLabel htmlFor="firstName">First Name</FieldLabel>
//                         <Input
//                             id="firstName"
//                             name="firstName"
//                             placeholder="John"
//                         />
//                         <InputFieldError field="firstName" state={state} />
//                     </Field>

//                     {/* Last Name */}
//                     <Field>
//                         <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
//                         <Input
//                             id="lastName"
//                             name="lastName"
//                             placeholder="Doe"
//                         />
//                         <InputFieldError field="lastName" state={state} />
//                     </Field>

//                     {/* Email */}
//                     <Field>
//                         <FieldLabel htmlFor="email">Email</FieldLabel>
//                         <Input
//                             id="email"
//                             name="email"
//                             type="email"
//                             placeholder="m@example.com"
//                         />
//                         <InputFieldError field="email" state={state} />
//                     </Field>

//                     {/* Password */}
//                     <Field>
//                         <FieldLabel htmlFor="password">Password</FieldLabel>
//                         <Input
//                             id="password"
//                             name="password"
//                             type="password"
//                             placeholder="Enter your password"
//                         />
//                         <InputFieldError field="password" state={state} />
//                     </Field>

//                     {/* Confirm Password */}
//                     <Field>
//                         <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
//                         <Input
//                             id="confirmPassword"
//                             name="confirmPassword"
//                             type="password"
//                             placeholder="Re-enter your password"
//                         />
//                         <InputFieldError field="confirmPassword" state={state} />
//                     </Field>

//                     {/* Country */}
//                     <Field>
//                         <FieldLabel htmlFor="country">Country</FieldLabel>
//                         <select
//                             id="country"
//                             name="country"
//                             className="border rounded p-2 w-full"
//                         >
//                             {countries.map((c) => (
//                                 <option key={c.code} value={c.name}>
//                                     {c.name}
//                                 </option>
//                             ))}
//                         </select>
//                         <InputFieldError field="country" state={state} />
//                     </Field>

//                     {/* Phone Number */}
//                     <Field>
//                         <FieldLabel htmlFor="phone">Phone</FieldLabel>
//                         <PhoneInput value={phone} onChange={setPhone} />
//                         <input type="hidden" name="phone" value={phone} />
//                         <InputFieldError field="phone" state={state} />
//                     </Field>

//                     {/* Guide-Only Field */}
//                     {role === "GUIDE" && (
//                         <Field>
//                             <FieldLabel htmlFor="occupation">Occupation</FieldLabel>
//                             <Input
//                                 id="occupation"
//                                 name="occupation"
//                                 placeholder="Tour Guide, Driver, Host..."
//                             />
//                             <InputFieldError field="occupation" state={state} />
//                         </Field>
//                     )}
//                 </div>

//                 {/* Submit Button & Links */}
//                 <FieldGroup className="mt-4">
//                     <Field>
//                         <Button type="submit" disabled={isPending}>
//                             {isPending ? "Registering..." : "Register"}
//                         </Button>

//                         <FieldDescription className="px-6 text-center mt-2">
//                             Already have an account?{" "}
//                             <a href="/login" className="text-blue-600 hover:underline">
//                                 Login
//                             </a>
//                         </FieldDescription>
//                     </Field>
//                 </FieldGroup>
//             </FieldGroup>
//         </form>
//     );
// }


"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InputFieldError from "@/components/shared/Form/InputFieldError";
import PhoneInput from "@/components/shared/Form/PhoneInput";
import { countries } from "@/constants/countries";
import { ActionResponse } from "@/types/response.interface";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { TUserRole } from "@/types/user.interface";

interface RegisterFormProps {
    action: (formData: FormData) => Promise<ActionResponse>;
    role: TUserRole.TOURIST | TUserRole.GUIDE;
}

export default function RegisterForm({ action, role }: RegisterFormProps) {
    const [state, setState] = useState<ActionResponse | null>(null);
    const [isPending, setIsPending] = useState(false);
    const [phone, setPhone] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsPending(true);

        const formData = new FormData(e.currentTarget);
        formData.set("phone", phone); // include phone input

        const res = await action(formData);
        setState(res);
        setIsPending(false);

        if (res.success) {
            toast.success(res.message);
        } else if (!res.success && "errors" in res) {
            toast.error("Please fix the errors below.");
        } else {
            toast.error(res.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <FieldGroup className="gap-4">
                <Field>
                    <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                    <Input
                        id="firstName"
                        name="firstName"
                        placeholder="John"
                        defaultValue={state?.data?.firstName || ""}
                    />
                    <InputFieldError field="firstName" state={state} />
                </Field>

                <Field>
                    <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                    <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Doe"
                        defaultValue={state?.data?.lastName || ""}
                    />
                    <InputFieldError field="lastName" state={state} />
                </Field>

                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="m@example.com"
                        defaultValue={state?.data?.email || ""}
                    />
                    <InputFieldError field="email" state={state} />
                </Field>

                <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input id="password" name="password" type="password" />
                    <InputFieldError field="password" state={state} />
                </Field>

                <Field>
                    <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                    <Input id="confirmPassword" name="confirmPassword" type="password" />
                    <InputFieldError field="confirmPassword" state={state} />
                </Field>

                <Field>
                    <FieldLabel htmlFor="country">Country</FieldLabel>
                    <select
                        id="country"
                        name="country"
                        defaultValue={state?.data?.country || ""}
                        className="border rounded p-2 w-full"
                    >
                        {countries.map((c) => (
                            <option key={c.code} value={c.name}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                    <InputFieldError field="country" state={state} />
                </Field>

                <Field>
                    <FieldLabel htmlFor="phone">Phone</FieldLabel>
                    <PhoneInput value={phone} onChange={setPhone} />
                    <input type="hidden" name="phone" value={phone} />
                    <InputFieldError field="phone" state={state} />
                </Field>

                {role === TUserRole.GUIDE && (
                    <Field>
                        <FieldLabel htmlFor="occupation">Occupation</FieldLabel>
                        <Input
                            id="occupation"
                            name="occupation"
                            placeholder="Tour Guide, Driver, Host..."
                            defaultValue={state?.data?.occupation || ""}
                        />
                        <InputFieldError field="occupation" state={state} />
                    </Field>
                )}
            </FieldGroup>

            <FieldGroup className="mt-4">
                <Field>
                    <Button type="submit" disabled={isPending}>
                        {isPending ? "Registering..." : "Register"}
                    </Button>
                    <FieldDescription className="px-6 text-center mt-2">
                        Already have an account?{" "}
                        <a href="/login" className="text-blue-600 hover:underline">
                            Login
                        </a>
                    </FieldDescription>
                </Field>
            </FieldGroup>
        </form>
    );
}
