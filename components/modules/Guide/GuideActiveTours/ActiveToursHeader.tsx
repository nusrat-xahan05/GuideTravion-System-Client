import ManagementPageHeader from "@/components/shared/ManagementPage/ManagementPageHeader";


const ActiveToursHeader = () => {

  return (
    <>
      <div className="space-y-3">
        <ManagementPageHeader
          title="All Active/Running Tours"
          description="See Tours information and details"
        />
      </div>
    </>
  );
};

export default ActiveToursHeader;
