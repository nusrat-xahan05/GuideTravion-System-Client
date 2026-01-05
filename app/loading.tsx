import Image from "next/image";
import logoImg from '../assets/images/logo.png'

export default function Loading() {
    return (
        <div className="flex min-h-[70vh] items-center justify-center bg-[#07102A]">
            <div className="flex flex-col items-center gap-3 text-center">

                {/* Logo / Travel Indicator */}
                <div className="flex flex-col gap-2 justify-center items-center">
                    <div className="relative flex h-10 w-10 items-center justify-center">
                        <Image
                            src={logoImg}
                            alt="GuideTravion"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <span className="text-white text-2xl font-semibold">
                        GuideTravion
                    </span>
                </div>

                {/* Progress Bar */}
                <div className="h-1 w-48 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-1/2 animate-loading-bar rounded-full bg-primary" />
                </div>

                {/* Loading Text */}
                <div className="mt-2.5">
                    <p className="text-lg font-medium text-white">
                        Preparing your journey
                    </p>
                </div>
            </div>
        </div>
    );
}