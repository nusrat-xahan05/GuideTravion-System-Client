import BookingForm from "@/components/modules/Booking/BookingForm";
import BookingStepper from "@/components/modules/Booking/BookingStepper";
import BookingSummary from "@/components/modules/Booking/BookingSummary";
import { getTourBySlug } from "@/services/user/tour.services";


const BookingPage = async ({ searchParams, params, }: { searchParams: Promise<{ startDate: Date, endDate: Date, persons:string }>, params: Promise<{ slug: string }>; }) => {
    const { slug } = await params;
    const { startDate, endDate, persons } = await searchParams;
    const tourData = await getTourBySlug(slug);

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <BookingStepper currentStep={1} />

            <div className="grid md:grid-cols-3 gap-8">
                {/* LEFT */}
                <div className="md:col-span-2">
                    <BookingForm
                        tour={tourData?.data}
                        startDate={startDate}
                        endDate={endDate}
                    />
                </div>

                {/* RIGHT */}
                <BookingSummary
                    tour={tourData?.data}
                    startDate={startDate}
                    endDate={endDate}
                    persons={persons}
                />
            </div>
        </div>
    );
}

export default BookingPage;


// const BookingPage = async ({ searchParams, params, }: { searchParams: Promise<{ startDate: Date, endDate: Date }>, params: Promise<{ slug: string }>; }) => {
//     const { slug } = await params;
//     const { startDate, endDate } = await searchParams;

//     return (
//         <div className="max-w-5xl mx-auto py-10 space-y-8">
//             <BookingSummary
//                 tourSlug={slug}
//                 startDate={startDate}
//                 endDate={endDate}
//             />

//             <BookingForm
//                 tourSlug={slug}
//                 startDate={startDate}
//                 endDate={endDate}
//             />
//         </div>
//     );
// };