"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function TourCardSkeleton({ items = 6 }: { items?: number }) {
    return (
        <div className="space-y-4">
            {Array.from({ length: items }).map((_, idx) => (
                <div
                    key={idx}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-5 rounded-xl border bg-white shadow-sm p-4"
                >
                    {/* LEFT IMAGE SKELETON */}
                    <div className="relative w-full h-48 lg:h-full rounded-lg overflow-hidden">
                        <Skeleton className="w-full h-full" />
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="flex flex-col justify-between flex-1 space-y-4 lg:col-span-2">

                        {/* Title skeleton */}
                        <Skeleton className="h-5 w-2/3" />

                        {/* Tags row (tourType tags) */}
                        <div className="flex gap-2">
                            <Skeleton className="h-5 w-16 rounded-md" />
                            <Skeleton className="h-5 w-14 rounded-md" />
                            <Skeleton className="h-5 w-20 rounded-md" />
                        </div>

                        {/* DETAILS GRID */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                            <Skeleton className="h-4 w-40" />
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-28" />
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-28" />
                        </div>

                        {/* Rating row */}
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-4 rounded-full" />
                            <Skeleton className="h-4 w-10" />
                            <Skeleton className="h-4 w-16" />
                        </div>

                        {/* BOTTOM SECTION */}
                        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-3 border-t">

                            {/* Tags Row */}
                            <div className="flex flex-wrap gap-2">
                                <Skeleton className="h-5 w-16 rounded-full" />
                                <Skeleton className="h-5 w-20 rounded-full" />
                                <Skeleton className="h-5 w-14 rounded-full" />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-2">
                                <Skeleton className="h-8 w-20 rounded-md" />
                                <Skeleton className="h-8 w-20 rounded-md" />
                                <Skeleton className="h-8 w-20 rounded-md" />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
