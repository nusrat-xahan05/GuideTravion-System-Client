import ManagementPageHeader from "@/components/shared/ManagementPage/ManagementPageHeader";


const ActiveBookingsHeader = () => {

    return (
        <>
            <div className="space-y-3">
                <ManagementPageHeader
                    title="All Active Booked Tours Record"
                    description="See Tours Booking information and details"
                />
            </div>
        </>
    );
};

export default ActiveBookingsHeader;
