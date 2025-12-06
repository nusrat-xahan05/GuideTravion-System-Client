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
    // console.log('from login-form state: ', state);

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
                        //   required
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
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Logging in..." : "Login"}
                        </Button>

                        <FieldDescription className="px-6 text-center">
                            Don&apos;t have an account?{" "}
                            <Link href="/register" className="text-blue-600 hover:underline">
                                 Sign up
                            </Link>
                        </FieldDescription>
                        <FieldDescription className="px-6 text-center">
                            <Link href="/forget-password" className="text-blue-600 hover:underline">
                                Forgot password?
                            </Link>
                        </FieldDescription>
                    </Field>
                </FieldGroup>
            </FieldGroup>
        </form>
    );
};

export default LoginForm;