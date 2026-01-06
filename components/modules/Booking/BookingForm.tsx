"use client";

import { useEffect } from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createBookingAction } from "@/services/user/booking.services";
import { ITour } from "@/types/tour.interface";

const initialState = {
    statusCode: 201,
    success: false,
    message: "",
    data: [],
};

export default function BookingForm({ tour, startDate, endDate, }: {
    tour: ITour; startDate: Date; endDate: Date;
}) {

    const router = useRouter();
    const [state, formAction, isPending] = useActionState(
        createBookingAction,
        initialState
    );

    useEffect(() => {
        if (state && state.success) {
            toast.success(state.message);
            router.push(
                `/tour/${tour?.slug}/booking/payment?bookingId=${state.data._id}`
            );
        }

        if (!state.success && state.message) {
            toast.error(state.message);
        }
    }, [state, router, tour?.slug]);

    return (
        <form action={formAction} className="space-y-6">
            <h2 className="text-xl font-semibold">Booking Details</h2>

            {/* Hidden fields */}
            <input type="hidden" name="tourId" value={tour?._id} />
            <input
                type="hidden"
                name="startDate"
                value={startDate instanceof Date ? startDate.toISOString() : startDate}
            />
            <input
                type="hidden"
                name="endDate"
                value={endDate instanceof Date ? endDate.toISOString() : endDate}
            />

            {/* Persons */}
            <div>
                <label className="text-sm font-medium">Number of Persons</label>
                <Input name="persons" type="number" min={1} defaultValue={1} required />
            </div>

            {/* Meeting Time */}
            <div>
                <label className="text-sm font-medium">Meeting Time</label>
                <Input name="meetingTime" type="time" required />
            </div>

            {/* Pickup */}
            <div>
                <label className="text-sm font-medium">Pickup Location</label>
                <Input
                    name="pickupLocation"
                    placeholder="Hotel / Airport / Address"
                    required
                />
            </div>

            {/* Dropoff */}
            <div>
                <label className="text-sm font-medium">Drop-off Location</label>
                <Input
                    name="dropoffLocation"
                    placeholder="Final destination"
                    required
                />
            </div>

            {/* Notes */}
            <div>
                <label className="text-sm font-medium">
                    Special Notes (Optional)
                </label>
                <Textarea
                    name="notes"
                    placeholder="Anything you want to inform the guide..."
                />
            </div>

            <Button size="lg" className="w-full cursor-pointer" disabled={isPending}>
                {isPending ? "Processing..." : "Continue to Payment"}
            </Button>
        </form>
    );
}