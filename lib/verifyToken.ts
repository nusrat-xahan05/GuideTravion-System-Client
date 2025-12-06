/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import jwt, { JwtPayload } from "jsonwebtoken";
import { toast } from "sonner";


export const verifyToken = async (token: string, secret: string) => {
    try {
        const verifiedTokenInfo = jwt.verify(token, secret) as JwtPayload;

        return {
            success: true,
            message: "Token is valid",
            payload: verifiedTokenInfo,
        };
    } catch (error: any) {
        console.log('verifiedToken Function: ', error)
        toast.error(error?.message);
        return {
            success: false,
            message: error?.message || "Invalid token"
        };
    }
};