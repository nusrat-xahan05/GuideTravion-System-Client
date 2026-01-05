import ManagementPageHeader from "@/components/shared/ManagementPage/ManagementPageHeader";


const PastBookingsHeader = () => {

    return (
        <>
            <div className="space-y-3">
                <ManagementPageHeader
                    title="All Past Booked Tours Record"
                    description="See Tours Booking information and details"
                />
            </div>
        </>
    );
};

export default PastBookingsHeader;
