import { TPaymentStatus } from "./payment.interface";
import { ITour } from "./tour.interface";

export interface CheckAvailabilityParams {
    tourId: string;
    startDate: Date;
    endDate: Date;
    persons: number;
}


export enum TBookingStatus {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    CANCELLED = "CANCELLED",
    COMPLETED = "COMPLETED"
}

export enum TCancelledBy {
    TOURIST = "TOURIST",
    GUIDE = "GUIDE",
    ADMIN = "ADMIN",
    SYSTEM = "SYSTEM", // for auto-expiry
}

export interface IBooking {
    _id?: string;

    tourId: string;
    guideId: string;   // user id that acts as guide (matches GuideModel _id)
    touristId: ITour; // user id of tourist

    startDate: Date; // start of booking (date/time)
    endDate: Date;   // end of booking (date/time)         

    meetingTime?: string;      // optional, time of meeting (e.g. "09:30")
    pickupLocation?: string;
    dropoffLocation?: string;

    persons: number;
    totalAmount: number;
    platformFee: number;
    guideEarning: number;

    paymentStatus: TPaymentStatus;
    paymentId?: string;

    status: TBookingStatus;
    cancelledBy?: TCancelledBy;
    expiresAt?: Date | null;

    notes?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
