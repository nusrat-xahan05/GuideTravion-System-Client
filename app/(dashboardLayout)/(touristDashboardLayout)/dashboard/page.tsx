import TouristDashboard from "@/components/modules/Tourist/TouristDashboard";
import { getUserProfile } from "@/services/auth/getUserProfile";


const TouristDashboardPage = async () => {
    const userInfo = await getUserProfile();
    return (
        <div className="p-6">
            <TouristDashboard userInfo={userInfo} />
        </div>
    );
};

export default TouristDashboardPage;