import PaymentPageClient from "@/components/modules/Booking/PaymentPageClient";


const PaymentPage = async ({ searchParams }: { searchParams: Promise<{ bookingId: string }> }) => {
    const { bookingId } = await searchParams;

    return <PaymentPageClient bookingId={bookingId} />;
}

export default PaymentPage;