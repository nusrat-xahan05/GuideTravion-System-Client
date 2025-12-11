/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { IGuide, ITourist, IUser, TUserRole, TUserStatus } from "@/types/user.interface";


const defaultUser: IUser = {
    _id: "",
    firstName: "Unknown User",
    email: "",
    phone: "",
    country: "",
    profileImage: "",
    role: TUserRole.TOURIST,
    languages: [],
    isVerified: false,
    userStatus: TUserStatus.ACTIVE
};

export const getUserProfile = async (): Promise<IUser | ITourist | IGuide> => {
    try {
        const response = await serverFetch.get("/user/my-profile", {
            cache: "force-cache",
            next: { tags: ["user-info"] },
        });

        const result = await response.json();
        if (!result?.success || !result?.data) {
            return defaultUser;
        }

        let userProfileInfo = defaultUser;
        if (result.data.profile) {
            const { profile, ...restUser } = result.data;
            userProfileInfo = {
                ...restUser,
                ...profile
            };
        }
        if (result.data && !result.data.profile) {
            userProfileInfo = result.data;
        }

        return userProfileInfo;
    } catch (error: any) {
        console.error("getUserInfo error:", error);
        return defaultUser;
    }
};
