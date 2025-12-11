"use client";

import ClearFiltersButton from "@/components/shared/Table/ClearFiltersButton";
import RefreshButton from "@/components/shared/Table/RefreshButton";
import SearchFilter from "@/components/shared/Table/SearchFilter";
import SelectFilter from "@/components/shared/Table/SelectFilter";


const GuideVerifyFilters = () => {
    return (
        <div className="space-y-3">
            {/* Row 1: Search + Refresh */}
            <div className="flex items-center gap-3 flex-wrap">
                <SearchFilter paramName="searchTerm" placeholder="Search by email..." />
                <RefreshButton />
            </div>

            {/* Row 2: Filters */}
            <div className="flex items-center gap-3 flex-wrap">
                {/* Sorting Options */}
                <SelectFilter
                    paramName="sort"
                    placeholder="Sort By"
                    defaultValue="Sort By"
                    options={[
                        { label: "Experience (Low → High)", value: "yearsOfExperience" },
                        { label: "Experience (High → Low)", value: "-yearsOfExperience" },
                        { label: "Join Date (High → Low)", value: "createdAt" },
                        { label: "Join Date (High → Low)", value: "-createdAt" },
                    ]}
                />

                <ClearFiltersButton />
            </div>
        </div>
    );
};

export default GuideVerifyFilters;

