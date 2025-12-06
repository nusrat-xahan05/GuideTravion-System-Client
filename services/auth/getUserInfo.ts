/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { IUser, TUserRole } from "@/types/user.interface";


export const getUserInfo = async (): Promise<IUser> => {
    let userInfo: IUser;

    try {
        const response = await serverFetch.get("/auth/me", {
            cache: "force-cache",
            next: { tags: ["user-info"] }
        })

        const result = await response.json();
        if (result.success) {
            userInfo = result.data
        } else {
            userInfo = {
                _id: "",
                firstName: "Unknown User",
                email: "",
                role: TUserRole.TOURIST,
                country: "Bangladesh"
            };
        }

        return userInfo;
    } catch (error: any) {
        console.log(error);
        return {
            _id: "",
            firstName: "Unknown User",
            email: "",
            role: TUserRole.TOURIST,
            country: "Bangladesh"
        };
    }
}