export type UserRole = "ADMIN" | "TOURIST" | "GUIDE";


export enum TUserRole {
    TOURIST = "TOURIST",
    GUIDE = "GUIDE",
    ADMIN = "ADMIN"
};

export enum TUserStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BLOCKED = "BLOCKED"
};

export enum TVerificationReqStatus {
    PENDING = "PENDING",
    REJECTED = "REJECTED",
    APPROVED = "APPROVED",
    NOT_SEND = "SEND REQUEST"
};

export interface IUser {
    _id?: string | IUser;
    firstName: string;
    lastName?: string;
    email: string;
    password?: string;
    profileImage?: string;
    bio?: string;
    phone?: string;
    address?: string;
    country: string;
    languages?: string[];
    role?: TUserRole;
    userStatus?: TUserStatus;
    isVerified?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ITourist extends IUser {
    travelInterests?: string[];
    preferredStyles?: string[];
    wishlistTours?: string[];
    bookings?: string[];
    user?: IUser;
}

export interface IGuide extends IUser {
    // NID / Passport Number: string;
    isVerifiedByAdmin?: boolean;
    verificationRequest?: TVerificationReqStatus;
    occupation: string;
    city?: string;
    expertise?: string[];
    yearsOfExperience?: number;
    hourlyRate?: number;
    dailyRate?: number;
    rating?: number;
    totalReviews?: number;
    user?: IUser;
    _id?: IUser | string;
    // availability?: any[];
}


export const verifyRequiredFieldsForGuide = ["firstName", "email", "profileImage", "bio",
    "phone", "address", "country", "occupation", "city", "expertise", "yearsOfExperience",
    "hourlyRate", "dailyRate"]
