"use client";

import ManagementPageHeader from "@/components/shared/ManagementPage/ManagementPageHeader";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import TourCreateDialog from "./TourCreateDialog";
import { IGuide, TVerificationReqStatus } from "@/types/user.interface";



interface ToursManagementHeaderProps {
  guideInfo?: IGuide;
}


const ToursManagementHeader = ({ guideInfo }: ToursManagementHeaderProps) => {
  const verifyByAdminStatus = guideInfo?.verificationRequest
  const canCreateTour = verifyByAdminStatus === TVerificationReqStatus.APPROVED;


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
          action={
            canCreateTour
              ? {
                label: "Add Tour",
                icon: Plus,
                onClick: handleOpenDialog,
              }
              : undefined
          }
        />

        {!canCreateTour && (
          <p className="text-red-600 text-sm font-medium px-2">
            Need to verify by admin first before you can create tours.
          </p>
        )}
      </div>
    </>
  );
};

export default ToursManagementHeader;
