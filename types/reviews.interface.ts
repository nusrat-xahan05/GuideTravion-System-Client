import { IUser } from "./user.interface";

export interface IReview {
    _id?: string;

    tourId: string;
    bookingId: string;
    touristId: IUser;
    guideId: string;

    rating: number;
    review?: string;

    createdAt?: string | undefined;
    
}