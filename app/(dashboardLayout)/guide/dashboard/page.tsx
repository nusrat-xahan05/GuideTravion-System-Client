import GuideDashboard from "@/components/modules/Guide/GuideDashboard";
import { getUserProfile } from "@/services/auth/getUserProfile";
import { IGuide } from "@/types/user.interface";


const GuideDashboardPage = async () => {
    const userInfo = await getUserProfile() as IGuide;
    console.log('from guide userinfo: ', userInfo) ;

    return (
        <div className="p-6">
            <GuideDashboard userInfo={userInfo}></GuideDashboard>
        </div>
    );
};

export default GuideDashboardPage;