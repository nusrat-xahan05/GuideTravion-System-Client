import ToursManagementHeader from "@/components/modules/Guide/GuideToursManagement/ToursManagementHeader";
import { queryStringFormatter } from "@/lib/formatters";
import { Suspense } from "react";
import { getMyTours } from "@/services/user/tour.services";
import GuideToursView from "@/components/modules/Guide/GuideToursManagement/GuideToursView";
import GuideTourPagination from "@/components/modules/Guide/GuideToursManagement/GuideTourPagination";
import TourCardSkeleton from "@/components/modules/Guide/GuideToursManagement/TourCardSkeleton";
// import GuideTourFilters from "@/components/modules/Guide/GuideToursManagement/GuideTourFilters";




const GuideToursManagementPage = async ({ searchParams, }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }>; }) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);

    const toursResult = await getMyTours(queryString);
    console.log(toursResult.data);

    const totalPages = Math.ceil(
        (toursResult?.meta?.total || 1) / (toursResult?.meta?.limit || 1)
    );


    return (
        <div className="space-y-6">
            <ToursManagementHeader />

            {/* <GuideTourFilters /> */}

            <Suspense fallback={<TourCardSkeleton items={8} />}>
                <GuideToursView tours={toursResult.data} />
                <GuideTourPagination
                    currentPage={toursResult?.meta?.page || 1}
                    totalPages={totalPages}
                />
            </Suspense>
        </div>
    );
};

export default GuideToursManagementPage;
