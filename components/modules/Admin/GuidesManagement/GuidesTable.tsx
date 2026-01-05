"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { IGuide } from "@/types/user.interface";
import ManagementTable from "@/components/shared/ManagementPage/ManagementTable";
import { guidesColumns } from "./guidesColumns";
import GuideViewDetailDialog from "./GuideViewDetailDialog";
import GuideFormDialog from "./GuideFormDialog";



interface GuidesTableProps {
  guides: IGuide[];

}

const GuidesTable = ({ guides }: GuidesTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [viewingGuide, setViewingGuide] = useState<IGuide | null>(null);
  const [editingGuide, setEditingGuide] = useState<IGuide | null>(null);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (guide: IGuide) => {
    setViewingGuide(guide);
  };

  const handleEdit = (guide: IGuide) => {
    setEditingGuide(guide);
  };


  return (
    <>
      <ManagementTable
        data={guides}
        columns={guidesColumns}
        onView={handleView}
        onEdit={handleEdit}
        getRowKey={(guide) => guide._id as string}
        emptyMessage="No Guides Found"
      />
      {/* Edit Guide Form Dialog */}
      <GuideFormDialog
        open={!!editingGuide}
        onClose={() => setEditingGuide(null)}
        guide={editingGuide!}
        onSuccess={() => {
          setEditingGuide(null);
          handleRefresh();
        }}
      />

      {/* View Guide Detail Dialog */}
      <GuideViewDetailDialog
        open={!!viewingGuide}
        onClose={() => setViewingGuide(null)}
        guide={viewingGuide}
      />
    </>
  );
};

export default GuidesTable;
