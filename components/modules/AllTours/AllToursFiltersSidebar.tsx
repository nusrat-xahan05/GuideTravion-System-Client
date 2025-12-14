"use client";

import FiltersContainer from "@/components/shared/Filters/FiltersContainer";
import SearchFilter from "@/components/shared/Table/SearchFilter";
import SelectFilter from "@/components/shared/Table/SelectFilter";
import ClearFiltersButton from "@/components/shared/Table/ClearFiltersButton";
import RefreshButton from "@/components/shared/Table/RefreshButton";
import { TTourType } from "@/types/tour.interface";



const tourTypeOptions = Object.values(TTourType).map((type) => ({
    value: type,
    label: type
        .replace(/_/g, " ")
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase()),
}));

const AllToursFiltersSidebar = () => {
    return (
        <FiltersContainer title="Search & Filters">
            {/* Search */}
            <SearchFilter paramName="search" placeholder="Search by place name..." />
            <SearchFilter paramName="division" placeholder="Division" />

            {/* Tour Type */}
            <SelectFilter
                paramName="tourType"
                placeholder="Tour Type"
                defaultValue="Tour Types"
                options={tourTypeOptions}
            />
            {/* <SelectFilter
                paramName="tourType"
                placeholder="Tour Type"
                defaultValue="Tour Types"
                options={[
                    { label: "Adventure", value: "adventure" },
                    { label: "Sightseeing", value: "sightseeing" },
                    { label: "Hiking", value: "hiking" },
                    { label: "Cultural", value: "cultural" },
                ]}
            /> */}

            {/* Difficulty */}
            <SelectFilter
                paramName="difficultyLevel"
                placeholder="Difficulty"
                defaultValue="All Levels"
                options={[
                    { label: "Easy", value: "EASY" },
                    { label: "Moderate", value: "MODERATE" },
                    { label: "Hard", value: "HARD" },
                ]}
            />

            {/* Sort */}
            <SelectFilter
                paramName="sortBy"
                placeholder="Sort By"
                defaultValue="Sort By"
                options={[
                    { label: "Price (Low → High)", value: "pricePerPerson" },
                    { label: "Price (High → Low)", value: "-pricePerPerson" },
                    { label: "Duration (Short → Long)", value: "durationDays" },
                    { label: "Duration (Long → Short)", value: "-durationDays" },
                    { label: "Rating (High → Low)", value: "-averageRating" },
                ]}
            />

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2">
                <RefreshButton variant="outline" />
                <ClearFiltersButton preserveParams={["limit"]} />
            </div>
        </FiltersContainer>
    );
};

export default AllToursFiltersSidebar;
