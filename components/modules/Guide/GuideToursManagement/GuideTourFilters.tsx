"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import SearchFilter from "@/components/shared/Table/SearchFilter";
import RefreshButton from "@/components/shared/Table/RefreshButton";
import SelectFilter from "@/components/shared/Table/SelectFilter";

const GuideTourFilters = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const updateQuery = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) params.set(key, value);
        else params.delete(key);

        params.set("page", "1"); // reset pagination
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 border rounded-lg bg-white">

            {/* Search */}
            {/* <Input
                placeholder="Search tours..."
                className="w-full md:w-1/3"
                defaultValue={searchParams.get("search") || ""}
                onChange={(e) => updateQuery("search", e.target.value)}
            /> */}
            <div className="flex items-center gap-3 flex-wrap">
                <SearchFilter paramName="searchTerm" placeholder="Search by place name..." />
                <RefreshButton />
            </div>

            <div className="flex items-center gap-3 flex-wrap">

                <SelectFilter
                    paramName="statusByAdmin"
                    placeholder="Verify Status"
                    defaultValue="All Verification Status"
                    options={[
                        { label: "SEND REQUEST", value: "SEND REQUEST" },
                        { label: "PENDING", value: "PENDING" },
                        { label: "APPROVED", value: "APPROVED" },
                        { label: "REJECTED", value: "REJECTED" }
                    ]}
                />

                <SearchFilter paramName="division" placeholder="Division" />

                {/* Sort */}
                {/* <Select
                    defaultValue={searchParams.get("sort") || ""}
                    onValueChange={(v) => updateQuery("sort", v)}
                >
                    <SelectTrigger className="w-40">
                        <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="">Default</SelectItem>
                        <SelectItem value="priceAsc">Price: Low → High</SelectItem>
                        <SelectItem value="priceDesc">Price: High → Low</SelectItem>
                        <SelectItem value="ratingDesc">Rating: High → Low</SelectItem>
                    </SelectContent>
                </Select> */}

                <Select
                    defaultValue={searchParams.get("sort") || "default"}
                    onValueChange={(v) => updateQuery("sort", v === "default" ? "" : v)}
                >
                    <SelectTrigger className="w-40">
                        <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="priceAsc">Price: Low → High</SelectItem>
                        <SelectItem value="priceDesc">Price: High → Low</SelectItem>
                        <SelectItem value="ratingDesc">Rating: High → Low</SelectItem>
                    </SelectContent>
                </Select>

                {/* Status
                <Select
                    defaultValue={searchParams.get("admin") || ""}
                    onValueChange={(v) => updateQuery("admin", v)}
                >
                    <SelectTrigger className="w-40">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="">All</SelectItem>
                        <SelectItem value="APPROVED">Approved</SelectItem>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="REJECTED">Rejected</SelectItem>
                    </SelectContent>
                </Select> */}

            </div>
        </div>
    );
};

export default GuideTourFilters;
