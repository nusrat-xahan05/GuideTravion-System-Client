import { queryStringFormatter } from "@/lib/formatters";
import { Suspense } from "react";
import { getUpcomingBookedTours } from "@/services/user/booking.services";
import { TableSkeleton } from "@/components/shared/Table/TableSkeleton";
import TablePagination from "@/components/shared/Table/TablePagination";
import UpcomingBookingsHeader from "@/components/modules/Tourist/TouristUpcomingBookings/UpcomingBookingsHeader";
import BookingFilters from "@/components/modules/Tourist/TouristBookings/BookingFilters";
import BookingsTable from "@/components/modules/Tourist/TouristBookings/BookingsTable";



const TouristUpcomingBookedTourPage = async ({ searchParams, }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }>; }) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);

    const result = await getUpcomingBookedTours(queryString);

    const totalPages = Math.ceil(
        (result?.data?.meta?.total || 1) / (result?.data?.meta?.limit || 1)
    );


    return (
        <div className="space-y-6">
            <UpcomingBookingsHeader></UpcomingBookingsHeader>

            <BookingFilters></BookingFilters>

            <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
                <BookingsTable bookings={result?.data?.data} />
                <TablePagination
                    currentPage={result?.data?.meta?.page || 1}
                    totalPages={totalPages || 1}
                />
            </Suspense>
        </div>
    );
};

export default TouristUpcomingBookedTourPage;
