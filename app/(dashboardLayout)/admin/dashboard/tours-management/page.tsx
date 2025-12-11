import ToursManagementHeader from "@/components/modules/Admin/ToursManagement/ToursManagementHeader";
// import TablePagination from "@/components/shared/Table/TablePagination";
// import { TableSkeleton } from "@/components/shared/Table/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
// import { getAllTours } from "@/services/admin/tourManagement";
// import { Suspense } from "react";

const AdminToursManagementPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
    // const toursResult = await getAllTours(queryString);
    // console.log({ toursResult });
    // const totalPages = Math.ceil(
    //     (toursResult?.meta?.total || 1) / (toursResult?.meta?.limit || 1)
    // );
    return (
        <div className="space-y-6">
            <ToursManagementHeader />
            {/* <TourFilters /> */}
            {/* <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
                <ToursTable
                    tours={toursResult.data}
                />
                <TablePagination
                    currentPage={toursResult?.meta?.page || 1}
                    totalPages={totalPages || 1}
                />
            </Suspense> */}
        </div>
    );
};

export default AdminToursManagementPage;