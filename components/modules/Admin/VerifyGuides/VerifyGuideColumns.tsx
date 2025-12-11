"use client";

import { Column } from "@/components/shared/ManagementPage/ManagementTable";
import { UserInfoCell } from "@/components/shared/Table/cell/UserInfoCell";
import { IGuide } from "@/types/user.interface";

export const VerifyGuideColumns: Column<IGuide>[] = [
    {
        header: "Guide",
        accessor: (guide) => (
            <UserInfoCell
                name={guide.user?.firstName}
                email={guide.user?.email}
                photo={guide.user?.profileImage as string}
            />
        )
    },
    {
        header: "Occupation",
        accessor: (guide) => (
            <span className="text-sm capitalize">{guide.occupation}</span>
        ),
    },
    {
        header: "Experience",
        accessor: (guide) => (
            <span className="text-sm font-medium">
                {guide.yearsOfExperience ?? 0} years
            </span>
        ),
        sortKey: "experience",
    },
    {
        header: "Daily Rate",
        accessor: (guide) => (
            <span className="text-sm font-semibold text-green-600">
                ${guide.dailyRate}
            </span>
        ),
        sortKey: "dailyRate",
    }
];
