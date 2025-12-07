import MyProfile from "@/components/modules/MyProfile/MyProfile";
import { getUserProfile } from "@/services/auth/getUserProfile";


const MyProfilePage = async () => {
    const userInfo = await getUserProfile();
    return <MyProfile userInfo={userInfo} />;
};

export default MyProfilePage;