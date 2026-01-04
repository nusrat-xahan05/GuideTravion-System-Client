"use client";

import ManagementTable from "@/components/shared/ManagementPage/ManagementTable";
import { IBooking } from "@/types/booking.interface";
import { useState } from "react";
import { BookingsColumns } from "./BookingsColumns";
import BookingsViewDetailDialog from "./BookingsViewDetailsDialog";



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
                columns={BookingsColumns}
                onView={handleView}
                getRowKey={(bookings) => bookings._id!}
                emptyMessage="No Bookings Found"
            />

            <BookingsViewDetailDialog
                open={!!viewingBooking}
                booking={viewingBooking}
                onClose={() => setViewingBooking(null)}
            />
        </>
    );
};

export default BookingsTable;
