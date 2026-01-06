import BookingStepper from "@/components/modules/Booking/BookingStepper";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BookingCancelPage() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
            <BookingStepper currentStep={2} />

            <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />

            <h1 className="text-2xl font-bold text-yellow-600">
                Payment Cancelled
            </h1>

            <p className="text-gray-600 mt-3">
                You cancelled the payment process.
                Your booking is still pending and unpaid.
            </p>

            <div className="mt-8 flex justify-center gap-4">
                <Link href="/">
                    <Button variant="outline" className="cursor-pointer">
                        Browse Tours
                    </Button>
                </Link>

                <Link href="/dashboard/bookings">
                    <Button className="cursor-pointer">
                        Resume Payment
                    </Button>
                </Link>
            </div>
        </div>
    );
}
