import { TPaymentStatus } from "./payment.interface";
import { ITour } from "./tour.interface";
import { IGuide, ITourist, IUser } from "./user.interface";

export interface CheckAvailabilityParams {
    tourId: string;
    startDate: Date | string;
    endDate: Date | string;
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
    tour: ITour;
    guideId: string | IUser;
    guide: IGuide;
    guideUser: IUser;
    touristId: string; // user id of tourist
    tourist: string | ITourist | IUser; // user id of tourist

    startDate: Date | string; // start of booking (date/time)
    endDate: Date | string;   // end of booking (date/time)         

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
    isReviewd?: boolean;

    notes?: string;
    createdAt?: Date;
    updatedAt?: Date;
    completedAt?: Date;
}
