import TouristDashboard from "@/components/modules/Tourist/TouristDashboard";
import { getUserProfile } from "@/services/auth/getUserProfile";
import { getCompletedBookedTours } from "@/services/user/booking.services";


const TouristDashboardPage = async () => {
    const userInfo = await getUserProfile();
    const bookingResult = await getCompletedBookedTours();

    
    return (
        <div className="p-6">
            <TouristDashboard userInfo={userInfo} bookings={bookingResult?.data?.data} />
        </div>
    );
};

export default TouristDashboardPage;