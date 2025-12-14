// import PaymentPageClient from "@/components/modules/Booking/PaymentPageClient";


// const PaymentPage = async ({ searchParams }: { searchParams: Promise<{ bookingId: string }> }) => {
//     const { bookingId } = await searchParams;

//     return <PaymentPageClient bookingId={bookingId} />;
// }

// export default PaymentPage;


import BookingStepper from "@/components/modules/Booking/BookingStepper";
import PaymentStep from "@/components/modules/Booking/paymentStep";

const PaymentPage = async ({ searchParams, }: { searchParams: Promise<{ bookingId: string }>; }) => {
    const { bookingId } = await searchParams;

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <BookingStepper currentStep={2} />
            <PaymentStep bookingId={bookingId} />
        </div>
    );
};

export default PaymentPage;
