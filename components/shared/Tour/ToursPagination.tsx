"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

interface ToursPaginationProps {
    currentPage: number;
    totalPages: number;
}

const ToursPagination = ({ currentPage, totalPages }: ToursPaginationProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const navigateToPage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());

        startTransition(() => {
            router.push(`?${params.toString()}`);
        });
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-3 pt-4">
            {/* Previous Button */}
            <Button
                variant="outline"
                className="cursor-pointer"
                size="sm"
                disabled={currentPage <= 1 || isPending}
                onClick={() => navigateToPage(currentPage - 1)}
            >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
            </Button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
                    let pageNumber;

                    if (totalPages <= 5) {
                        pageNumber = index + 1;
                    } else if (currentPage <= 3) {
                        pageNumber = index + 1;
                    } else if (currentPage >= totalPages - 2) {
                        pageNumber = totalPages - 4 + index;
                    } else {
                        pageNumber = currentPage - 2 + index;
                    }

                    return (
                        <Button
                            key={pageNumber}
                            variant={pageNumber === currentPage ? "default" : "outline"}
                            size="sm"
                            onClick={() => navigateToPage(pageNumber)}
                            disabled={isPending}
                            className="w-10 cursor-pointer"
                        >
                            {pageNumber}
                        </Button>
                    );
                })}
            </div>

            {/* Next Button */}
            <Button
                variant="outline"
                className="cursor-pointer"
                size="sm"
                disabled={currentPage >= totalPages || isPending}
                onClick={() => navigateToPage(currentPage + 1)}
            >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
        </div>
    );
};

export default ToursPagination;
