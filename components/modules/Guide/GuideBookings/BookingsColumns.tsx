/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Column } from "@/components/shared/ManagementPage/ManagementTable";
// import { UserInfoCell } from "@/components/shared/Table/cell/UserInfoCell";
import { IBooking } from "@/types/booking.interface";

export const BookingsColumns: Column<IBooking>[] = [
    {
        header: "Tour",
        accessor: (bookings) => (
            <span className="text-sm font-medium">
                {(bookings as any).tour.title}
            </span>
        ),
    },
    {
        header: "Tourist",
        accessor: (bookings) => (
            <span className="text-sm font-medium">
                {(bookings as any).tourist.email}
            </span>
        ),
    },
    {
        header: "Persons",
        accessor: (bookings) => (
            <span className="text-sm font-medium">
                {bookings?.persons}
            </span>
        ),
    },
    {
        header: "Total Amount",
        accessor: (bookings) => (
            <span className="text-sm font-medium">
                {bookings?.totalAmount}
            </span>
        ),
    },
    {
        header: "Booking Date",
        accessor: (bookings) => (
            <span className="text-sm font-semibold text-green-600">
                {new Date(bookings.startDate).toDateString()}
            </span>
        ),
    }
];
