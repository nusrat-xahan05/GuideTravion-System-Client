import BookingStepper from "@/components/modules/Booking/BookingStepper";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
            <BookingStepper currentStep={3} />

            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />

            <h1 className="text-2xl font-bold">Booking Confirmed 🎉</h1>
            <p className="text-gray-600 mt-2">
                Your payment was successful. The guide will contact you soon.
            </p>
        </div>
    );
}
