import ManagementPageHeader from "@/components/shared/ManagementPage/ManagementPageHeader";


const CancelledBookingsHeader = () => {

    return (
        <>
            <div className="space-y-3">
                <ManagementPageHeader
                    title="All Cancelled Booked Tours Record"
                    description="See Tours Booking information and details"
                />
            </div>
        </>
    );
};

export default CancelledBookingsHeader;
