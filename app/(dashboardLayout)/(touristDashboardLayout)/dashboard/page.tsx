import TouristDashboard from "@/components/modules/Tourist/TouristDashboard";
import { getUserProfile } from "@/services/auth/getUserProfile";
import { getMybookings } from "@/services/user/booking.services";


const TouristDashboardPage = async () => {
    const userInfo = await getUserProfile();
    const bookingResult = await getMybookings();

    
    return (
        <div className="p-6">
            <TouristDashboard userInfo={userInfo} bookings={bookingResult.data} />
        </div>
    );
};

export default TouristDashboardPage;