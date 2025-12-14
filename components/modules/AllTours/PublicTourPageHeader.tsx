"use client";

import ManagementPageHeader from "@/components/shared/ManagementPage/ManagementPageHeader";


const PublicTourPageHeader = () => {

    return (
        <>
            <div className="space-y-3 mb-6">
                <ManagementPageHeader
                    title="Explore All Tours"
                    description="Get Tours with more information and details"
                />
            </div>
        </>
    );
};

export default PublicTourPageHeader;
