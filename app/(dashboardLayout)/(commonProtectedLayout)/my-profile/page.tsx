import MyProfile from "@/components/modules/MyProfile/MyProfile";
import { getUserProfile } from "@/services/auth/getUserProfile";


const MyProfilePage = async () => {
    const userInfo = await getUserProfile();
    console.log('from user Info: ', userInfo);
    return <MyProfile userInfo={userInfo} />;
};

export default MyProfilePage;