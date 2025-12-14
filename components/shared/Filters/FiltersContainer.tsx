"use client";

import { ReactNode } from "react";

interface FiltersContainerProps {
    title?: string;
    children: ReactNode;
    sticky?: boolean;
}

const FiltersContainer = ({
    title = "Filters",
    children,
    sticky = true,
}: FiltersContainerProps) => {
    return (
        <div
            className={`space-y-4 rounded-xl border bg-white p-4 ${sticky ? "sticky top-20" : ""
                }`}
        >
            <h3 className="text-lg font-semibold">{title}</h3>
            {children}
        </div>
    );
};

export default FiltersContainer;
