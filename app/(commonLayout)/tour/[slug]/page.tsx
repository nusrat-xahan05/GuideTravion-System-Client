import TourDetailsView from "@/components/shared/Tour/TourDetailsView";
import { getUserRole } from "@/services/auth/getUserRole";
import { getTourBySlug } from "@/services/user/tour.services";


const PublicTourDetailsPage = async ({ params, }: { params: Promise<{ slug: string }>; }) => {
    const { slug } = await params;
    const tourData = await getTourBySlug(slug);

    const userRole = await getUserRole();
    console.log('getuserRole: ', userRole);


    return (
        <TourDetailsView tour={tourData.data} user={userRole}>
            {/* <AvailabilityCard tourId={tourData._id} /> */}
        </TourDetailsView>
    );
};

export default PublicTourDetailsPage;