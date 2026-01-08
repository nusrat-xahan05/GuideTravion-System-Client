"use client";

import { useEffect } from "react";
import { useActionState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { IBooking } from "@/types/booking.interface";
import { createReviewAction } from "@/services/user/review.services";

const initialState = {
    statusCode: 201,
    success: false,
    message: "",
    data: [],
};

export default function BookingReviewForm({ booking }: { booking: IBooking }) {
    console.log('from BookingReviewForm booking: ', booking);
    console.log('from BookingReviewForm tourId: ', booking.tourId);

    const isEligible =
        booking.status === "COMPLETED" &&
        booking.paymentStatus === "PAID";

    const [state, formAction, isPending] = useActionState(
        createReviewAction,
        initialState
    );

    useEffect(() => {
        if (state.success) {
            toast.success(state.message || "Review submitted successfully");
        }
        if (!state.success && state.message) {
            toast.error(state.message);
        }
    }, [state]);

    if (!isEligible) {
        return (
            <div className="border rounded-md p-4 text-sm text-muted-foreground bg-muted">
                You can submit a review only after the tour is completed.
            </div>
        );
    }

    if (booking.isReviewd) {
        return (
            <div className="border rounded-md p-4 text-sm text-muted-foreground bg-muted">
                You have already submitted a review.
            </div>
        );
    }

    return (
        <form action={formAction} className="space-y-4 border-t pt-4">
            <h4 className="font-semibold">Leave a Review</h4>

            {/* Hidden fields */}
            <input type="hidden" name="bookingId" value={booking._id} />
            <input type="hidden" name="tourId" value={typeof booking.tourId === "string"
                ? booking.tourId
                : booking.tour._id} />

            {/* Rating */}
            <div>
                <label className="text-sm font-medium">Rating (1-5)</label>
                <select
                    name="rating"
                    required
                    className="w-full border rounded-md px-3 py-2 mt-1"
                >
                    <option value="">Select rating</option>
                    {[1, 2, 3, 4, 5].map((r) => (
                        <option key={r} value={r}>
                            {r} Star{r > 1 && "s"}
                        </option>
                    ))}
                </select>
            </div>

            {/* Review */}
            <div>
                <label className="text-sm font-medium">Review</label>
                <Textarea
                    name="review"
                    placeholder="Share your experience with the guide and tour..."
                    required
                />
            </div>

            <Button disabled={isPending} className="w-full cursor-pointer">
                {isPending ? "Submitting..." : "Submit Review"}
            </Button>
        </form>
    );
}
