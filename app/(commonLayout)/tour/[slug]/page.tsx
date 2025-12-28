import TourDetailsView from "@/components/shared/Tour/TourDetailsView";
import { getUserRole } from "@/services/auth/getUserRole";
import { getTourReview } from "@/services/user/review.services";
import { getTourBySlug } from "@/services/user/tour.services";


const PublicTourDetailsPage = async ({ params, }: { params: Promise<{ slug: string }>; }) => {
    const { slug } = await params;
    const tourData = await getTourBySlug(slug);
    const tourReviewData = await getTourReview(tourData.data._id);
    const userRole = await getUserRole();


    return (
        <TourDetailsView tour={tourData.data} user={userRole} reviews={tourReviewData?.data}>
        </TourDetailsView>
    );
};

export default PublicTourDetailsPage;