"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { IBooking } from "@/types/booking.interface";
import { ITour } from "@/types/tour.interface";
import { CalendarDays, MapPin, Users, Wallet } from "lucide-react";
import { ITourist, IUser } from "@/types/user.interface";

interface Props {
    open: boolean;
    onClose: () => void;
    booking: IBooking | null;
}

const Row = ({ icon, label, value, }: { icon?: React.ReactNode; label: string; value?: string | number; }) => (
    <div className="flex items-start justify-between gap-4 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
            {icon}
            <span>{label}</span>
        </div>
        <span className="font-medium text-right">{value || "—"}</span>
    </div>
);

const UserInfo = ({ title, name, email, phone, }: { title: string; name?: string; email?: string; phone?: string; }) => (
    <div className="space-y-2">
        <h4 className="font-semibold text-sm">{title}</h4>
        <div className="text-sm space-y-1 text-muted-foreground">
            <div>Name: <span className="font-medium">{name || "—"}</span></div>
            {email && <div>Email: {email}</div>}
            {phone && <div>Phone: {phone}</div>}
        </div>
    </div>
);


export default function BookingsViewDetailDialog({
    open,
    onClose,
    booking,
}: Props) {
    if (!booking) return null;
    const tour = booking.tour as ITour;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>{tour.title}</DialogTitle>
                </DialogHeader>

                {/* SCROLLABLE CONTENT */}
                <div className="overflow-y-auto pr-2 space-y-5">

                    {/* TOUR SUMMARY */}
                    <div className="space-y-2">
                        <div className="flex gap-2 flex-wrap">
                            <Badge variant="secondary">{tour.division}</Badge>
                            <Badge variant="outline">{tour.difficultyLevel}</Badge>
                        </div>
                    </div>

                    <Separator />

                    {/* TRIP DETAILS */}
                    <div className="space-y-3">
                        <Row
                            icon={<CalendarDays className="w-4 h-4" />}
                            label="Travel Dates"
                            value={`${new Date(booking.startDate).toDateString()} → ${new Date(
                                booking.endDate
                            ).toDateString()}`}
                        />
                        <Row icon={<Users className="w-4 h-4" />} label="Persons" value={booking.persons} />
                        <Row icon={<MapPin className="w-4 h-4" />} label="Meeting Time" value={booking.meetingTime} />
                    </div>

                    <Separator />

                    {/* LOCATIONS */}
                    <div className="space-y-2">
                        <Row label="Pickup Location" value={booking.pickupLocation} />
                        <Row label="Drop-off Location" value={booking.dropoffLocation} />
                    </div>

                    <Separator />

                    {/* GUIDE & TOURIST */}
                    <div className="grid md:grid-cols-2 gap-4">
                        {booking.guideUser && (
                            <UserInfo
                                title="Guide Information"
                                name={`${(booking.guideUser as IUser)?.firstName}`}
                                email={(booking.guideUser as IUser)?.email}
                                phone={(booking.guideUser as IUser)?.phone}
                            />
                        )}

                        {booking.touristId && (
                            <UserInfo
                                title="Tourist Information"
                                name={`${(booking.tourist as ITourist)?.firstName}`}
                                email={(booking.tourist as ITourist)?.email}
                                phone={(booking.tourist as ITourist)?.phone}
                            />
                        )}
                    </div>

                    <Separator />

                    {/* PAYMENT */}
                    <div className="space-y-3">
                        <Row icon={<Wallet className="w-4 h-4" />} label="Total Amount" value={`৳ ${booking.totalAmount}`} />
                        <Row label="Platform Fee" value={`৳ ${booking.platformFee}`} />
                        <Row label="Guide Earning" value={`৳ ${booking.guideEarning}`} />
                        <Row label="Payment Status" value={booking.paymentStatus} />
                        <Row label="Booking Status" value={booking.status} />
                    </div>

                    <Separator />

                    {/* META */}
                    <div className="text-xs text-muted-foreground space-y-1">
                        <div>Booking ID: {booking._id}</div>
                        <div>Booked At: {new Date(booking.createdAt!).toLocaleString()}</div>
                        {booking.completedAt && (
                            <div>Completed At: {new Date(booking.completedAt).toLocaleString()}</div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
