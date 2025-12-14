"use client";

import ManagementPageHeader from "@/components/shared/ManagementPage/ManagementPageHeader";
import TourCreateDialog from "@/components/shared/Tour/TourCreateDialog";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";



const ToursManagementHeader = () => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const [dialogKey, setDialogKey] = useState(0);

  const handleOpenDialog = () => {
    setDialogKey((prev) => prev + 1); // Force remount
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  return (
    <>
      <TourCreateDialog
        key={dialogKey}
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSuccess={handleSuccess}
      />

      <div className="space-y-3">
        <ManagementPageHeader
          title="Tours Management"
          description="Manage Tours information and details"
          action={{
            label: "Add Tour",
            icon: Plus,
            onClick: handleOpenDialog,
          }}
        />
      </div>
    </>
  );
};

export default ToursManagementHeader;
