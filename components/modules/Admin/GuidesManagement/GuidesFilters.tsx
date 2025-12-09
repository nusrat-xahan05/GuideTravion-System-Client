"use client";

import ClearFiltersButton from "@/components/shared/Table/ClearFiltersButton";
import RefreshButton from "@/components/shared/Table/RefreshButton";
import SearchFilter from "@/components/shared/Table/SearchFilter";
import SelectFilter from "@/components/shared/Table/SelectFilter";


const GuidesFilters = () => {
  return (
    <div className="space-y-3">
      {/* Row 1: Search + Refresh */}
      <div className="flex items-center gap-3 flex-wrap">
        <SearchFilter paramName="searchTerm" placeholder="Search by name or email..." />
        <RefreshButton />
      </div>

      {/* Row 2: Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Verification Status */}
        <SelectFilter
          paramName="verificationRequest"
          placeholder="Verification Status"
          defaultValue="All Verification Status"
          options={[
            { label: "NOT_SEND", value: "NOT_SEND" },
            { label: "PENDING", value: "PENDING" },
            { label: "APPROVED", value: "APPROVED" },
            { label: "REJECTED", value: "REJECTED" }
          ]}
        />

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

        {/* City Filter */}
        <SearchFilter paramName="city" placeholder="City" />

        {/* Sorting Options */}
        <SelectFilter
          paramName="sort"
          placeholder="Sort By"
          defaultValue="Sort By"
          options={[
            { label: "Daily Rate (Low → High)", value: "dailyRate" },
            { label: "Daily Rate (High → Low)", value: "-dailyRate" },
            { label: "Hourly Rate (Low → High)", value: "hourlyRate" },
            { label: "Hourly Rate (High → Low)", value: "-hourlyRate" },
            { label: "Experience (Low → High)", value: "yearsOfExperience" },
            { label: "Experience (High → Low)", value: "-yearsOfExperience" },
            { label: "Rating (Low → High)", value: "rating" },
            { label: "Rating (High → Low)", value: "-rating" }
          ]}
        />

        <ClearFiltersButton />
      </div>
    </div>
  );
};

export default GuidesFilters;

