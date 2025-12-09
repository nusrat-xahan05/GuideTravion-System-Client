"use client";

import ClearFiltersButton from "@/components/shared/Table/ClearFiltersButton";
import RefreshButton from "@/components/shared/Table/RefreshButton";
import SearchFilter from "@/components/shared/Table/SearchFilter";
import SelectFilter from "@/components/shared/Table/SelectFilter";



const TouristsFilters = () => {
  return (
    <div className="space-y-3">
      {/* Row 1: Search and Refresh */}
      <div className="flex items-center gap-3 flex-wrap">
        <SearchFilter paramName="searchTerm" placeholder="Search by name or email..." />
        <RefreshButton />
      </div>

      {/* Row 2: Filter Controls - All on same line */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* User Status */}
        <SelectFilter
          paramName="userStatus"
          placeholder="User Status"
          defaultValue="All User Status"
          options={[
            { label: "ACTIVE", value: "ACTIVE" },
            { label: "INACTIVE", value: "INACTIVE" },
            { label: "BLOCKED", value: "BLOCKED" }
          ]}
        />

        {/* Country Filter */}
        <SearchFilter paramName="country" placeholder="Country" />

        <ClearFiltersButton />
      </div>
    </div>
  );
};

export default TouristsFilters;
