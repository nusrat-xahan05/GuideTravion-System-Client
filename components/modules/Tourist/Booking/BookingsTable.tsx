"use client";

import ManagementTable from "@/components/shared/ManagementPage/ManagementTable";
import { IBooking } from "@/types/booking.interface";
import { bookingsColumn } from "./bookingsColumn";



interface BookingsTableProps {
    bookings: IBooking[];
}


const BookingsTable = ({ bookings }: BookingsTableProps) => {
    // const router = useRouter();
    // const [, startTransition] = useTransition();
    // const [viewingGuide, setViewingGuide] = useState<IGuide | null>(null);

    // const handleRefresh = () => {
    //     startTransition(() => {
    //         router.refresh();
    //     });
    // };

    // const handleView = (guide: IGuide) => {
    //     setViewingGuide(guide);
    // };



    return (
        <>
            <ManagementTable
                data={bookings}
                columns={bookingsColumn}
                // onView={handleView}
                getRowKey={(bookings) => bookings._id!}
                emptyMessage="No Bookings Found"
            />

            {/* View Guide Detail Dialog
            <GuideViewDetailDialog
                open={!!viewingGuide}
                onClose={() => setViewingGuide(null)}
                guide={viewingGuide}
            /> */}
        </>
    );
};

export default BookingsTable;
