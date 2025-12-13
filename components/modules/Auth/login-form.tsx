"use client";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InputFieldError from "@/components/shared/Form/InputFieldError";
import { userLogin } from "@/services/auth/userLogin";


const LoginForm = ({ redirect }: { redirect?: string }) => {
    const [state, formAction, isPending] = useActionState(userLogin, null);

    useEffect(() => {
        if (state && !state.success && state.message) {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <form action={formAction}>
            {redirect && <input type="hidden" name="redirect" value={redirect} />}
            <FieldGroup>
                <div className="grid grid-cols-1 gap-4">
                    {/* Email */}
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="m@example.com"
                        />

                        <InputFieldError field="email" state={state} />
                    </Field>

                    {/* Password */}
                    <Field>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                        //   required
                        />
                        <InputFieldError field="password" state={state} />
                    </Field>
                </div>
                <FieldGroup className="mt-4">
                    <Field>
                        <Button className="cursor-pointer" type="submit" disabled={isPending}>
                            {isPending ? "Logging in..." : "Login"}
                        </Button>

                        <FieldDescription className="px-6 text-center">
                            Don&apos;t have an account?{" "}
                            <Link href="/register/tourist" className="text-blue-600 hover:underline">
                                 Sign up
                            </Link>
                        </FieldDescription>
                    </Field>
                </FieldGroup>
            </FieldGroup>
        </form>
    );
};

export default LoginForm;