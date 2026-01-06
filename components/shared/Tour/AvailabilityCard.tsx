/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import DateRangePicker from "./DateRangePicker";
import { TUserRole } from "@/types/user.interface";
import { ITour } from "@/types/tour.interface";
import { checkAvailability } from "@/services/user/booking.services";
import { formatDateOnly } from "@/lib/formatDateOnly";


interface AvailabilityCardProps {
    tour: ITour;
    user: TUserRole | null;
}

export default function AvailabilityCard({ tour, user }: AvailabilityCardProps) {
    const router = useRouter();
    const [dateRange, setDateRange] = useState<any>();
    const [persons, setPersons] = useState<number>(1);
    const [loading, setLoading] = useState(false);


    const handleCheck = async () => {
        if (!user) {
            router.push(`/login?redirect=/tour/${tour.slug}`);
            return;
        }

        if (!dateRange?.from || !dateRange?.to) {
            toast.error("Select date range");
            return;
        }

        if (persons < 1) {
            toast.error("Minimum 1 person required");
            return;
        }

        setLoading(true);
        try {
            const result = await checkAvailability({
                tourId: tour._id as string,
                startDate: formatDateOnly(dateRange.from),
                endDate: formatDateOnly(dateRange.to),
                persons: persons
            });
            if (result.success) {
                if (result.data.available) {
                    toast.success(result.data.message);
                    router.push(
                        `/tour/${tour.slug}/booking?startDate=${formatDateOnly(dateRange.from)}&endDate=${formatDateOnly(dateRange.to)}&persons=${persons}`
                    );
                }
                else {
                    toast.error(result.data.message);
                }
            }
            else {
                toast.error(result.message);
            }
        } catch (err: any) {
            toast.error(err.message || "Not available");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="border rounded-xl p-5 space-y-4">
            <h3 className="text-lg font-semibold">Check Availability</h3>

            <DateRangePicker value={dateRange} onChange={setDateRange} />

            <div className="space-y-2">
                <label className="text-sm font-medium">
                    Number of Persons
                </label>
                <input
                    type="number"
                    min={1}
                    value={persons}
                    onChange={(e) => setPersons(Number(e.target.value))}
                    className="w-full border rounded-md px-3 py-2"
                />
            </div>

            <Button
                className="w-full cursor-pointer"
                onClick={handleCheck}
                disabled={loading}
            >
                {loading ? "Checking..." : "Check & Continue"}
            </Button>
        </div>
    );
}
