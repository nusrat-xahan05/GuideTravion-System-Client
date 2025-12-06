/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import jwt, { JwtPayload } from "jsonwebtoken";


export const verifyToken = async(token: string, secret: string) => {
    try {
        const verifiedTokenInfo = jwt.verify(token, secret) as JwtPayload;

        return {
            success: true,
            payload: verifiedTokenInfo,
        };
    } catch (error: any) {
        console.log('verifiedToken Function: ', error)
        return {
            success: false,
            payload: null,
        };
    }
};
