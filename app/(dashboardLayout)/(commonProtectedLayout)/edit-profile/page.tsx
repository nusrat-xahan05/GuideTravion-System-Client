import MyEditProfile from "@/components/modules/MyProfile/MyEditProfile";
import { getUserProfile } from "@/services/auth/getUserProfile";


const MyEditProfilePage = async () => {
    const userInfo = await getUserProfile();

    return <MyEditProfile userInfo={userInfo} />;
};

export default MyEditProfilePage;