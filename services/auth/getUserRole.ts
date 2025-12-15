"use server"

import { getCookie } from "./tokenHandlers";
import { TUserRole } from "@/types/user.interface";
import { verifyToken } from "@/lib/verifyToken";
import { JwtPayload } from "jsonwebtoken";

export const getUserRole = async (): Promise<TUserRole | null> => {
    const accessToken = await getCookie("accessToken");
    if (!accessToken) {
        return null;
    }

    const verifiedTokenInfo = await verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string) as JwtPayload;

    if (!verifiedTokenInfo.success || !verifiedTokenInfo.payload) {
        return null;
    }

    return verifiedTokenInfo.payload.role;
}