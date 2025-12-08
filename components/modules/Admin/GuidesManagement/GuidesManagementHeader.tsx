"use client";

// import { ISpecialty } from "@/types/specialities.interface";
// import { Plus } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useState, useTransition } from "react";
// import DoctorFormDialog from "./DoctorFormDialog";
import ManagementPageHeader from "@/components/shared/ManagementPage/ManagementPageHeader";

// interface DoctorsManagementHeaderProps {
//   specialities?: ISpecialty[];
// }


  // const UsersManagementHeader = ({ specialities, }: DoctorsManagementHeaderProps) => {
  const GuidesManagementHeader = () => {
  // const router = useRouter();
  // const [, startTransition] = useTransition();
  // const [isDialogOpen, setIsDialogOpen] = useState(false);

  // const handleSuccess = () => {
  //   startTransition(() => {
  //     router.refresh();
  //   });
  // };

  // const [dialogKey, setDialogKey] = useState(0);

  // const handleOpenDialog = () => {
  //   setDialogKey((prev) => prev + 1); // Force remount
  //   setIsDialogOpen(true);
  // };

  // const handleCloseDialog = () => {
  //   setIsDialogOpen(false);
  // };
  return (
    <>
      {/* <DoctorFormDialog
        key={dialogKey}
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSuccess={handleSuccess}
        specialities={specialities}
      /> */}

      <ManagementPageHeader
        title="Users Management"
        description="Manage Users information and details"
        // action={{
        //   label: "Add User    ",
        //   icon: Plus,
        //   onClick: handleOpenDialog,
        // }}
      />
    </>
  );
};

export default GuidesManagementHeader;
