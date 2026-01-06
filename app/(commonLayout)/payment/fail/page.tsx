import BookingStepper from "@/components/modules/Booking/BookingStepper";
import { XCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BookingFailPage() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
            <BookingStepper currentStep={2} />

            <XCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />

            <h1 className="text-2xl font-bold text-red-600">
                Payment Failed
            </h1>

            <p className="text-gray-600 mt-3">
                Unfortunately, your payment could not be completed.
                Please try again or use a different payment method.
            </p>

            <div className="mt-8 flex justify-center gap-4">
                <Link href="/">
                    <Button variant="outline" className="cursor-pointer">
                        Go Home
                    </Button>
                </Link>

                <Link href="/dashboard/bookings">
                    <Button className="cursor-pointer">
                        Retry Payment
                    </Button>
                </Link>
            </div>
        </div>
    );
}
