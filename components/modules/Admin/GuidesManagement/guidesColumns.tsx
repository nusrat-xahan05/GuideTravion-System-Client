"use client";

import { Column } from "@/components/shared/ManagementPage/ManagementTable";
import { UserInfoCell } from "@/components/shared/Table/cell/UserInfoCell";
import { IGuide } from "@/types/user.interface";
import { Star } from "lucide-react";

export const guidesColumns: Column<IGuide>[] = [
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
    header: "City",
    accessor: (guide) => (
      <span className="text-sm capitalize">{guide.city}</span>
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
  },
  {
    header: "Rating",
    accessor: (guide) => (
      <div className="flex items-center gap-1">
        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        <span className="text-sm font-medium">
          {guide.rating!.toFixed(1)}
        </span>
      </div>
    ),
    sortKey: "rating",
  },
  {
    header: "Verification",
    accessor: (guide) => (
      <span className="text-sm bg-red-50">{guide.verificationRequest}</span>
    ),
  }
];
