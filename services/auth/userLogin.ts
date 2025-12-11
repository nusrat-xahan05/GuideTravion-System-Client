/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"


import jwt, { JwtPayload } from "jsonwebtoken";
import { redirect } from "next/navigation";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidatorRequest } from "@/lib/zodValidateRequest";
import { userLoginSchema } from "@/zod/auth.validation";
import { parse } from "cookie";
import { setCookie } from "./tokenHandlers";
import { UserRole } from "@/types/user.interface";
import { getDefaultDashboardRoute, isValidRedirectForRole } from "@/lib/navbar-auth-routes";



export const userLogin = async (_currentState: any, formData: any): Promise<any> => {
    try {
        let accessTokenObject: null | any = null;
        let refreshTokenObject: null | any = null;


        // --------- LOGIN FORM DATA
        const redirectTo = formData.get('redirect') || null;
        const payload = {
            email: formData.get('email'),
            password: formData.get('password'),
        }


        // --------- FORM DATA ZOD VALIDATION
        if (zodValidatorRequest(payload, userLoginSchema).success === false) {
            return zodValidatorRequest(payload, userLoginSchema);
        }
        const validatedPayload = zodValidatorRequest(payload, userLoginSchema).data;


        // --------- DATA FETCH REQUEST & RESPONSE
        const res = await serverFetch.post("/auth/login", {
            body: JSON.stringify(validatedPayload),
            headers: {
                "Content-Type": "application/json",
            }
        });
        const result = await res.json();

        if (!result.success) {
            throw new Error(result.message || "Login failed");
        }


        // --------- GET THE COOKIES
        const userCookies = res.headers.getSetCookie();
        
        if (userCookies && userCookies.length > 0) {
            userCookies.forEach((cookie: string) => {
                const parsedCookie = parse(cookie);

                if (parsedCookie['accessToken']) {
                    accessTokenObject = parsedCookie;
                }
                if (parsedCookie['refreshToken']) {
                    refreshTokenObject = parsedCookie;
                }
            })
        } 
        // else {
        //     throw new Error("No Set-Cookie header found");
        // }
        if (!accessTokenObject) {
            throw new Error("Tokens not found in cookies");
        }
        if (!refreshTokenObject) {
            throw new Error("Tokens not found in cookies");
        }


        // --------- SET THE COOKIES
        await setCookie("accessToken", accessTokenObject.accessToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(accessTokenObject['Max-Age']) || 1000 * 60 * 60,
            path: accessTokenObject.Path || "/",
            sameSite: accessTokenObject['SameSite'] || "none",
        });

        await setCookie("refreshToken", refreshTokenObject.refreshToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(refreshTokenObject['Max-Age']) || 1000 * 60 * 60 * 24 * 90,
            path: refreshTokenObject.Path || "/",
            sameSite: refreshTokenObject['SameSite'] || "none",
        });


        // --------- VERIFY THE COOKIES
        const verifiedToken: JwtPayload | string = jwt.verify(accessTokenObject.accessToken, process.env.JWT_ACCESS_SECRET as string);
        if (typeof verifiedToken === "string") {
            throw new Error("Invalid token");
        }
        const userRole: UserRole = verifiedToken.role;


        // --------- REDIRECT THE USER TO ROUTE
        if (redirectTo) {
            const requestedPath = redirectTo.toString();
            if (isValidRedirectForRole(requestedPath, userRole)) {
                redirect(`${requestedPath}?loggedIn=true`);
            } else {
                redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
            }
        } else {
            redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
        }
    } catch (error: any) {
        // Re-throw NEXT_REDIRECT errors so Next.js can handle them
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.log(error);
        return { success: false, message: `${process.env.NODE_ENV === 'development' ? error.message : "Login Failed."}` };
    }
}