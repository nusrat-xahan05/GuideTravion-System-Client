"use client";

// import { useRouter, useSearchParams } from "next/navigation";
import SearchFilter from "@/components/shared/Table/SearchFilter";
import RefreshButton from "@/components/shared/Table/RefreshButton";
import SelectFilter from "@/components/shared/Table/SelectFilter";
import ClearFiltersButton from "@/components/shared/Table/ClearFiltersButton";

const BookingFilters = () => {
    // const router = useRouter();
    // const searchParams = useSearchParams();

    // const updateQuery = (key: string, value: string) => {
    //     const params = new URLSearchParams(searchParams.toString());
    //     if (value) params.set(key, value);
    //     else params.delete(key);

    //     params.set("page", "1"); // reset pagination
    //     router.push(`?${params.toString()}`);
    // };

    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 border rounded-lg bg-white">

            {/* Search */}
            <div className="flex items-center gap-3 flex-wrap">
                <SearchFilter paramName="search" placeholder="Search by tour name..." />
                <SearchFilter paramName="tourist" placeholder="Tourist Email" />
                <RefreshButton />
            </div>

            <div className="flex items-center gap-3 flex-wrap">


                {/* Sorting Options */}
                <SelectFilter
                    paramName="sort"
                    placeholder="Sort By"
                    defaultValue="Sort By"
                    options={[
                        { label: "Completed At (Low → High)", value: "completedAt" },
                        { label: "Completed At (High → Low)", value: "-completedAt" },
                        { label: "Created At (Low → High)", value: "createdAt" },
                        { label: "Created At (High → Low)", value: "-createdAt" },
                    ]}
                />

                <ClearFiltersButton />
            </div>
        </div>
    );
};

export default BookingFilters;
