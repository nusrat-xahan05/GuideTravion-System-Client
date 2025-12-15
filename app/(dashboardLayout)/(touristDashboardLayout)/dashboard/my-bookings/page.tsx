import { queryStringFormatter } from "@/lib/formatters";
import { Suspense } from "react";
import { getMybookings } from "@/services/user/booking.services";
import BookingManagementHeader from "@/components/modules/Tourist/Booking/BookingManagementHeader";
import { TableSkeleton } from "@/components/shared/Table/TableSkeleton";
import TablePagination from "@/components/shared/Table/TablePagination";
import BookingsTable from "@/components/modules/Tourist/Booking/BookingsTable";



const TouristMyBookingPage = async ({ searchParams, }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }>; }) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);

    const bookingResult = await getMybookings(queryString);

    const totalPages = Math.ceil(
        (bookingResult?.meta?.total || 1) / (bookingResult?.meta?.limit || 1)
    );


    return (
        <div className="space-y-6">
            <BookingManagementHeader></BookingManagementHeader>

            {/* <GuideTourFilters /> */}

            <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
                <BookingsTable bookings={bookingResult.data} />
                <TablePagination
                    currentPage={bookingResult?.meta?.page || 1}
                    totalPages={totalPages || 1}
                />
            </Suspense>
        </div>
    );
};

export default TouristMyBookingPage;
