import ManagementPageHeader from "@/components/shared/ManagementPage/ManagementPageHeader";


const BookingManagementHeader = () => {

    return (
        <>
            <div className="space-y-3">
                <ManagementPageHeader
                    title="All Booking Record"
                    description="See Booking information and details"
                />
            </div>
        </>
    );
};

export default BookingManagementHeader;
