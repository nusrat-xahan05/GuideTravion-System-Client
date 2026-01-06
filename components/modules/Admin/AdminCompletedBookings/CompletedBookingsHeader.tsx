import ManagementPageHeader from "@/components/shared/ManagementPage/ManagementPageHeader";


const CompltedBookingsHeader = () => {

    return (
        <>
            <div className="space-y-3">
                <ManagementPageHeader
                    title="All Completed Booked Tours Record"
                    description="See Tours Booking information and details"
                />
            </div>
        </>
    );
};

export default CompltedBookingsHeader;
