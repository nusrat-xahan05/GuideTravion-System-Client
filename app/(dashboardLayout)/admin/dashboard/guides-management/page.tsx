import GuidesManagementHeader from "@/components/modules/Admin/GuidesManagement/GuidesManagementHeader";
import GuidesTable from "@/components/modules/Admin/GuidesManagement/GuidesTable";
import { queryStringFormatter } from "@/lib/formatters";
import TablePagination from "@/components/shared/Table/TablePagination";
import { TableSkeleton } from "@/components/shared/Table/TableSkeleton";
import { getAllGuides } from "@/services/admin/userManagement";
import { Suspense } from "react";
import GuidesFilters from "@/components/modules/Admin/GuidesManagement/GuidesFilters";

const AdminGuideManagementPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);

    const guidesResult = await getAllGuides(queryString);

    const totalPages = Math.ceil(
        (guidesResult?.meta?.total || 1) / (guidesResult?.meta?.limit || 1)
    );
    return (
        <div className="space-y-6">
            <GuidesManagementHeader />
            <GuidesFilters />
            <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
                <GuidesTable
                    guides={guidesResult.data}
                />
                <TablePagination
                    currentPage={guidesResult?.meta?.page || 1}
                    totalPages={totalPages || 1}
                />
            </Suspense>
        </div>
    );
};

export default AdminGuideManagementPage;