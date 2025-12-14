import ViewVerifyTour from "@/components/modules/Admin/VerifyTours/ViewVerifyTour";
import { getTourBySlug } from "@/services/user/tour.services";


const AdminTourViewVerifyPage = async ({ params, }: { params: Promise<{ slug: string }>; }) => {
    const { slug } = await params;
    const tourData = await getTourBySlug(slug);

    return (
        <ViewVerifyTour tour={tourData.data} />
    );
};

export default AdminTourViewVerifyPage;