"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { IBooking } from "@/types/booking.interface";
import { ITour } from "@/types/tour.interface";

interface Props {
    open: boolean;
    onClose: () => void;
    booking: IBooking | null;
}

const InfoRow = ({ label, value }: { label: string; value?: string | number }) => (
    <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{value || "—"}</span>
    </div>
);

export default function BookingViewDetailDialog({ open, onClose, booking }: Props) {
    if (!booking) return null;

    const tour = booking.tourId as ITour;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Booking Details</DialogTitle>
                </DialogHeader>

                {/* TOUR INFO */}
                <div className="space-y-2 border-b pb-3">
                    <h3 className="font-semibold text-lg">
                        {tour?.title}
                    </h3>

                    <div className="flex gap-2">
                        <Badge variant="secondary">{tour?.division}</Badge>
                        <Badge variant="outline">{tour?.difficultyLevel}</Badge>
                    </div>
                </div>

                {/* BOOKING INFO */}
                <div className="space-y-2 pt-3">
                    <InfoRow
                        label="Travel Date"
                        value={`${new Date(booking.startDate).toDateString()} → ${new Date(
                            booking.endDate
                        ).toDateString()}`}
                    />

                    <InfoRow label="Persons" value={booking.persons} />

                    <InfoRow label="Total Amount" value={`৳ ${booking.totalAmount}`} />

                    <InfoRow label="Payment Status" value={booking.paymentStatus} />

                    <InfoRow label="Booking Status" value={booking.status} />
                </div>

                {/* LOCATION */}
                <div className="space-y-2 border-t pt-3">
                    <InfoRow label="Pickup Location" value={booking.pickupLocation} />
                    <InfoRow label="Drop-off Location" value={booking.dropoffLocation} />
                </div>

                {/* META */}
                <div className="border-t pt-3 text-xs text-muted-foreground">
                    Booked on: {booking?.createdAt?.toString() as string}
                </div>
            </DialogContent>
        </Dialog>
    );
}
