/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BookingStepper from "@/components/modules/Booking/BookingStepper";
import { toast } from "sonner";
import { paymentInit } from "@/services/user/payment.services";

export default function PaymentPageClient({ bookingId }: { bookingId: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!bookingId) {
            toast.error("Booking ID is missing");
            router.push("/");
            return;
        }

        const initPayment = async () => {
            try {
                const res = await paymentInit(bookingId);

                if (res.success && res.data) {
                    window.location.href = res.data;
                } else {
                    toast.error(res.message || "Payment initiation failed");
                    setLoading(false);
                }
            } catch (err: any) {
                toast.error(err?.message || "Something went wrong");
                setLoading(false);
            }
        };

        initPayment();
    }, [bookingId, router]);

    return (
        <div className="h-screen flex flex-col items-center justify-center gap-6">
            <BookingStepper currentStep={2} />
            {loading && <p className="text-gray-600">Redirecting to payment...</p>}
        </div>
    );
}
