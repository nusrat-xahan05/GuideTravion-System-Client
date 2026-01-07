import AdminDashboard from "@/components/modules/Admin/AdminDashboard";
import { getAllStats } from "@/services/admin/statsManagement";
import { getUserProfile } from "@/services/auth/getUserProfile";


const AdminDashboardPage = async () => {
  const userInfo = await getUserProfile();
  const statsResult = await getAllStats();

  return (
    <div className="space-y-6 flex flex-col justify-center">
      <h3 className="text-3xl font-semibold">WelCome To GuideTravion System Dashboad</h3>
      <AdminDashboard userInfo={userInfo} statsResult={statsResult?.data} />
    </div>
  );
};

export default AdminDashboardPage;