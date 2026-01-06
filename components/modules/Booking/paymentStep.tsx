/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { paymentInit } from "@/services/user/payment.services";
import { toast } from "sonner";

export default function PaymentStep({ bookingId }: { bookingId: string }) {
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        try {
            setLoading(true);
            const res = await paymentInit(bookingId);

            if (res.success && res?.data) {
                window.location.href = res.data; // 🔥 redirect to SSL
            } else {
                toast.error("Failed to initiate payment");
            }
        } catch (error: any) {
            toast.error(error.message || "Payment error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <CardContent className="p-6 space-y-6">
                <h2 className="text-xl font-semibold">Payment</h2>

                <p className="text-gray-600 text-sm">
                    Complete your payment to confirm the booking.
                </p>

                <Button
                    size="lg"
                    className="w-full cursor-pointer"
                    onClick={handlePayment}
                    disabled={loading}
                >
                    {loading ? "Redirecting..." : "Pay Now"}
                </Button>
            </CardContent>
        </Card>
    );
}
