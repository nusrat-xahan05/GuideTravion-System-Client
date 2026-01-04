import { queryStringFormatter } from "@/lib/formatters";
import { Suspense } from "react";
import { getActiveBookedTours } from "@/services/user/booking.services";
import { TableSkeleton } from "@/components/shared/Table/TableSkeleton";
import TablePagination from "@/components/shared/Table/TablePagination";
import BookingFilters from "@/components/modules/Guide/GuideBookings/BookingFilters";
import ActiveBookingsHeader from "@/components/modules/Guide/GuideActiveBookings/ActiveBookingsHeader";
import BookingsTable from "@/components/modules/Guide/GuideBookings/BookingsTable";



const GuideActiveBookedTourPage = async ({ searchParams, }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }>; }) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);

    const result = await getActiveBookedTours(queryString);

    const totalPages = Math.ceil(
        (result?.data?.meta?.total || 1) / (result?.data?.meta?.limit || 1)
    );


    return (
        <div className="space-y-6">
            <ActiveBookingsHeader></ActiveBookingsHeader>

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

export default GuideActiveBookedTourPage;
