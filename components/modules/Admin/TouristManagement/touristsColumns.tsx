"use client";

import { Column } from "@/components/shared/ManagementPage/ManagementTable";
import { UserInfoCell } from "@/components/shared/Table/cell/UserInfoCell";
import { ITourist } from "@/types/user.interface";

export const touristsColumns: Column<ITourist>[] = [
  {
    header: "Tourist",
    accessor: (tourist) => (
      <UserInfoCell
        name={tourist.user?.firstName}
        email={tourist.user?.email}
        photo={tourist.user?.profileImage as string}
      />
    )
  },
  {
    header: "Country",
    accessor: (tourist) => (
      <span className="text-sm capitalize">{tourist.country}</span>
    ),
  },
  {
    header: "Bookings",
    accessor: (tourist) => (
      <span className="text-sm capitalize">{tourist.bookings}</span>
    ),
  },
  {
    header: "TravelInterests",
    accessor: (tourist) => (
      <span className="text-sm font-medium">{tourist.travelInterests}</span>
    ),
  },
  {
    header: "Verification",
    accessor: (tourist) => (
      <span className="text-sm bg-red-50">{tourist.isVerified}</span>
    ),
  }
];
