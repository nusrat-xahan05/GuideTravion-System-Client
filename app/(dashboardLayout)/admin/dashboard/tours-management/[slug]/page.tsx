import TourDetailsView from "@/components/shared/Tour/TourDetailsView";
import { getUserRole } from "@/services/auth/getUserRole";
import { getTourBySlug } from "@/services/user/tour.services";


const AdminTourDetailsPage = async ({ params, }: { params: Promise<{ slug: string }>; }) => {
    const { slug } = await params;
    const tourData = await getTourBySlug(slug);
    const userRole = await getUserRole();

    return (
        <TourDetailsView tour={tourData.data} user={userRole} />
    );
};

export default AdminTourDetailsPage;