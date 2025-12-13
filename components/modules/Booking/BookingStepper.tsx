"use client";

const steps = [
    "Availability",
    "Booking Details",
    "Payment",
    "Confirmation",
];

export default function BookingStepper({ currentStep }: { currentStep: number }) {
    return (
        <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
                <div key={step} className="flex-1 flex items-center">
                    <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
              ${index <= currentStep ? "bg-primary text-white" : "bg-gray-200 text-gray-600"}`}
                    >
                        {index + 1}
                    </div>

                    <span className="ml-2 text-sm font-medium">{step}</span>

                    {index !== steps.length - 1 && (
                        <div className="flex-1 h-px bg-gray-300 mx-4" />
                    )}
                </div>
            ))}
        </div>
    );
}
