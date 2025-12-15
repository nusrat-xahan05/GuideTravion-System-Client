// // import LoginForm from "@/components/login-form";
import LoginForm from "@/components/modules/Auth/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login | GuideTravion",
    description: "Login to your GuideTravion account to explore tours and manage your dashboard.",
};

const LoginPage = async ({
    searchParams,
}: {
    searchParams?: Promise<{ redirect?: string }>;
}) => {
    const params = (await searchParams) || {};

    return (
        <div className="px-4 flex min-h-screen items-center justify-center bg-linear-to-b from-white to-blue-50">
            <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Welcome Back</h1>
                    <p className="text-gray-500">
                        Enter your credentials to access your account
                    </p>
                </div>
                <LoginForm redirect={params.redirect} />
            </div>
        </div>
    );
};

export default LoginPage;

