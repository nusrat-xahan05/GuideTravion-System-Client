import AdminDashboard from "@/components/modules/Admin/AdminDashboard";
import { getUserProfile } from "@/services/auth/getUserProfile";


const AdminDashboardPage = async () => {
  const userInfo = await getUserProfile();
  return (
    <div className="p-6 flex flex-col justify-center">
      <h3 className="text-3xl font-semibold">WelCome To GuideTravion System Dashboad</h3>
      <h3 className="text-xl font-semibold italic text-gray-500">(as a sdmin)</h3>
      <AdminDashboard userInfo={userInfo} />
    </div>
  );
};

export default AdminDashboardPage;