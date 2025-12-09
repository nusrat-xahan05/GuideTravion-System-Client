import { queryStringFormatter } from "@/lib/formatters";
import TablePagination from "@/components/shared/Table/TablePagination";
import { TableSkeleton } from "@/components/shared/Table/TableSkeleton";
import { Suspense } from "react";
import { getAllTourist } from "@/services/admin/userManagement";
import TouristsManagementHeader from "@/components/modules/Admin/TouristManagement/TouristsManagementHeader";
import TouristsTable from "@/components/modules/Admin/TouristManagement/TouristsTable";
import TouristsFilters from "@/components/modules/Admin/TouristManagement/TouristsFilters";



const AdminTouristManagementPage = async ({ searchParams, }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }>; }) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);

    const touristsResult = await getAllTourist(queryString);

    const totalPages = Math.ceil(
        (touristsResult?.meta?.total || 1) / (touristsResult?.meta?.limit || 1)
    );
    return (
        <div className="space-y-6">
            <TouristsManagementHeader />
            <TouristsFilters />
            <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
                <TouristsTable
                    tourists={touristsResult.data}
                />
                <TablePagination
                    currentPage={touristsResult?.meta?.page || 1}
                    totalPages={totalPages || 1}
                />
            </Suspense>
        </div>
    );
};

export default AdminTouristManagementPage;