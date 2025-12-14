import { queryStringFormatter } from "@/lib/formatters";
import { Suspense } from "react";
import TourCardSkeleton from "@/components/modules/Guide/GuideToursManagement/TourCardSkeleton";
import AdminTourFilters from "@/components/modules/Admin/ToursManagement/AdminTourFilters";
import ToursPagination from "@/components/shared/Tour/ToursPagination";
import { getUserProfile } from "@/services/auth/getUserProfile";
import { getAllPendingTours } from "@/services/admin/tourManagement";
import VerifyToursHeader from "@/components/modules/Admin/VerifyTours/VerifyToursHeader";
import VerifyToursViewMap from "@/components/modules/Admin/VerifyTours/VerifyToursViewMap";



const AdminVerifyToursPage = async ({ searchParams, }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }>; }) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);

    const toursResult = await getAllPendingTours(queryString);

    const totalPages = Math.ceil(
        (toursResult?.meta?.total || 1) / (toursResult?.meta?.limit || 1)
    );


    return (
        <div className="space-y-6">
            <VerifyToursHeader />

            <AdminTourFilters />

            <Suspense fallback={<TourCardSkeleton items={8} />}>
                <VerifyToursViewMap tours={toursResult?.data?.data} />
                <ToursPagination
                    currentPage={toursResult?.meta?.page || 1}
                    totalPages={totalPages}
                />
            </Suspense>
        </div>
    );
};

export default AdminVerifyToursPage;
