import { Suspense } from "react";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllActiveApprovedTours } from "@/services/user/tour.services";
import PublicTourList from "@/components/modules/AllTours/PublicTourList";
import TourCardSkeleton from "@/components/shared/Tour/TourCardSkeleton";
import PublicTourPageHeader from "@/components/modules/AllTours/PublicTourPageHeader";
import AllToursFiltersSidebar from "@/components/modules/AllTours/AllToursFiltersSidebar";
import ToursPagination from "@/components/shared/Tour/ToursPagination";
import { getMyWishlist } from "@/services/user/wishlist.service";
import { getUserRole } from "@/services/auth/getUserRole";

const TourPage = async ({
    searchParams,
}: {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}) => {
    const wishlistIds = await getMyWishlist();
    const user = await getUserRole();

    const params = await searchParams;
    const queryString = queryStringFormatter(params);

    const toursResult = await getAllActiveApprovedTours(queryString);

    const totalPages = Math.ceil(
        (toursResult?.data?.meta?.total || 1) / (toursResult?.data?.meta?.limit || 1)
    );


    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-12 gap-6">
                {/* LEFT SIDEBAR */}
                <div className="col-span-12 md:col-span-3">
                    <AllToursFiltersSidebar />
                </div>

                {/* RIGHT CONTENT */}
                <div className="col-span-12 md:col-span-9">
                    <PublicTourPageHeader />
                    <Suspense fallback={<TourCardSkeleton items={8} />}>
                        <PublicTourList tours={toursResult.data.data} wishlistIds={wishlistIds} user={user}></PublicTourList>
                        <ToursPagination
                            currentPage={toursResult?.data?.meta?.page || 1}
                            totalPages={totalPages}
                        ></ToursPagination>
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default TourPage;


