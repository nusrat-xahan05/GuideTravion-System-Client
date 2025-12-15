"use client";

import ManagementTable from "@/components/shared/ManagementPage/ManagementTable";
import { IBooking } from "@/types/booking.interface";
import { bookingsColumn } from "./bookingsColumn";
import BookingViewDetailDialog from "./BookingViewDetailDialog";
import { useState } from "react";



interface BookingsTableProps {
    bookings: IBooking[];
}


const BookingsTable = ({ bookings }: BookingsTableProps) => {
    // const router = useRouter();
    // const [, startTransition] = useTransition();
    const [viewingBooking, setViewingBooking] = useState<IBooking | null>(null);

    // const handleRefresh = () => {
    //     startTransition(() => {
    //         router.refresh();
    //     });
    // };

    const handleView = (bookings: IBooking) => {
        setViewingBooking(bookings);
    };



    return (
        <>
            <ManagementTable
                data={bookings}
                columns={bookingsColumn}
                onView={handleView}
                getRowKey={(bookings) => bookings._id!}
                emptyMessage="No Bookings Found"
            />

            <BookingViewDetailDialog
                open={!!viewingBooking}
                booking={viewingBooking}
                onClose={() => setViewingBooking(null)}
            />
        </>
    );
};

export default BookingsTable;
