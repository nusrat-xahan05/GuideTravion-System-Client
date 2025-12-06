import RegisterForm from "@/components/modules/Auth/register-form";
import { registerTourist } from "@/services/auth/registerTourist";
import { TUserRole } from "@/types/user.interface";


export default function TouristRegisterPage() {
    return (
        <div className="px-4 flex min-h-screen items-center justify-center bg-linear-to-b from-white to-blue-50">
            <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Become A Tourist</h1>
                    <p className="text-gray-500">
                        Fill in the information below to get started
                    </p>
                </div>
                <RegisterForm action={registerTourist} role={TUserRole.TOURIST} />
            </div>
        </div>
    )
}
