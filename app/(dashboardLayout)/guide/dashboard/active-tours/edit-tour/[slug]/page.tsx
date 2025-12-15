// import TourDetailsView from "@/components/shared/Tour/TourDetailsView";
// import { getTourBySlug } from "@/services/user/tour.services";


const TourEditPage = async ({ params, }: { params: Promise<{ slug: string }>; }) => {
    const { slug } = await params;

    // const tourData = await getTourBySlug(slug);
    return (
        // <TourDetailsView tour={tourData.data} />
        <h2>heeloo from edit page</h2>
    );
};

export default TourEditPage;