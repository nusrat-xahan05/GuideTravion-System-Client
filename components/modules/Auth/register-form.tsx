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
import { Eye, EyeOff } from "lucide-react";


interface RegisterFormProps {
    action: (formData: FormData) => Promise<ActionResponse>;
    role: TUserRole.TOURIST | TUserRole.GUIDE;
}

export default function RegisterForm({ action, role }: RegisterFormProps) {
    const [state, setState] = useState<ActionResponse | null>(null);
    const [showPassword, setShowPassword] = useState(false);
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

                    <div className="relative">
                        <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="pr-10"
                        />

                        <div
                            onClick={() => setShowPassword(prev => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? (
                                <Eye className="h-4 w-4" />
                            ) : (
                                <EyeOff className="h-4 w-4" />
                            )}
                        </div>
                    </div>

                    <InputFieldError field="password" state={state} />
                </Field>

                <Field>
                    <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>

                    <div className="relative">
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            className="pr-10"
                        />

                        <div
                            onClick={() => setShowPassword(prev => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? (
                                <Eye className="h-4 w-4" />
                            ) : (
                                <EyeOff className="h-4 w-4" />
                            )}
                        </div>
                    </div>

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
                    <Button className="cursor-pointer" type="submit" disabled={isPending}>
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
