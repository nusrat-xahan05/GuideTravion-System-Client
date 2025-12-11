import { queryStringFormatter } from "@/lib/formatters";
import TablePagination from "@/components/shared/Table/TablePagination";
import { TableSkeleton } from "@/components/shared/Table/TableSkeleton";
import { Suspense } from "react";
import { getAllPendingGuides } from "@/services/admin/userManagement";
import VerifyGuidesHeader from "@/components/modules/Admin/VerifyGuides/VerifyGuidesHeader";
import GuideVerifyFilters from "@/components/modules/Admin/VerifyGuides/GuideVerifyFilters";
import VerifyGuidesTable from "@/components/modules/Admin/VerifyGuides/VerifyGuidesTable";



const AdminVerifyGuidesPage = async ({ searchParams, }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }>; }) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);

    const guidesResult = await getAllPendingGuides(queryString);
    const totalPages = Math.ceil(
        (guidesResult?.meta?.total || 1) / (guidesResult?.meta?.limit || 1)
    );

    return (
        <div className="space-y-6">
            <VerifyGuidesHeader />
            <GuideVerifyFilters />
            <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
                <VerifyGuidesTable
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

export default AdminVerifyGuidesPage;