import RegisterForm from "@/components/modules/Auth/register-form";
import { registerGuide } from "@/services/auth/registerGuide";
import { TUserRole } from "@/types/user.interface";


export default function GuideRegisterPage() {
    return (
        <div className="px-4 flex min-h-screen items-center justify-center bg-linear-to-b from-white to-blue-50">
            <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Create Your Account</h1>
                    <p className="text-gray-500">
                        Fill in the information below to get started
                    </p>
                </div>
                <RegisterForm action={registerGuide} role={TUserRole.GUIDE} />
            </div>
        </div>
    )
}
