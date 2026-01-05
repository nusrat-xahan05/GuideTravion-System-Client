"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { ITourist } from "@/types/user.interface";
import ManagementTable from "@/components/shared/ManagementPage/ManagementTable";
import TouristFormDialog from "./TouristFormDialog";
import TouristViewDetailDialog from "./TouristViewDetailDialog";
import { touristsColumns } from "./touristsColumns";



interface TouristsTableProps {
  tourists: ITourist[];
}

const TouristsTable = ({ tourists }: TouristsTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [viewingTourists, setViewingTourists] = useState<ITourist | null>(null);
  const [editingTourists, setEditingTourists] = useState<ITourist | null>(null);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (tourist: ITourist) => {
    setViewingTourists(tourist);
  };

  const handleEdit = (tourist: ITourist) => {
    setEditingTourists(tourist);
  };


  return (
    <>
      <ManagementTable
        data={tourists}
        columns={touristsColumns}
        onView={handleView}
        onEdit={handleEdit}
        getRowKey={(tourist) => tourist._id as string}
        emptyMessage="No Guides Found"
      />
      {/* Edit Tourist Form Dialog */}
      <TouristFormDialog
        open={!!editingTourists}
        onClose={() => setEditingTourists(null)}
        tourist={editingTourists!}
        onSuccess={() => {
          setEditingTourists(null);
          handleRefresh();
        }}
      />

      {/* View Tourists Detail Dialog */}
      <TouristViewDetailDialog
        open={!!viewingTourists}
        onClose={() => setViewingTourists(null)}
        tourist={viewingTourists}
      />
    </>
  );
};

export default TouristsTable;
