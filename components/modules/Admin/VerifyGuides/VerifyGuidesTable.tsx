"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { IGuide } from "@/types/user.interface";
import ManagementTable from "@/components/shared/ManagementPage/ManagementTable";
import { VerifyGuideColumns } from "./VerifyGuideColumns";
import GuideVerifyDialog from "./GuideVerifyDialog";



interface GuidesTableProps {
    guides: IGuide[];

}

const VerifyGuidesTable = ({ guides }: GuidesTableProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [vieweditingGuide, setViewEditingGuide] = useState<IGuide | null>(null);

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleViewEdit = (guide: IGuide) => {
        setViewEditingGuide(guide);
    };


    return (
        <>
            <ManagementTable
                data={guides}
                columns={VerifyGuideColumns}
                onEdit={handleViewEdit}
                getRowKey={(guide) => guide._id as string}
                emptyMessage="No Guides Found"
            />

            {/* View Guide Detail Dialog */}
            <GuideVerifyDialog
                open={!!vieweditingGuide}
                onClose={() => setViewEditingGuide(null)}
                guide={vieweditingGuide as IGuide}
                onSuccess={() => {
                    setViewEditingGuide(null);
                    handleRefresh();
                }}
            />
        </>
    );
};

export default VerifyGuidesTable;
