/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Camera, Loader2, CheckCircle, Star, Badge } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useActionState } from "react";
import { IUser, IGuide, ITourist, TUserRole, verifyRequiredFieldsForGuide, TVerificationReqStatus } from "@/types/user.interface";
import type { ActionResponse } from "@/types/response.interface";
import { sendGuideVerificationRequest, updateMyProfile } from "@/services/user/user.services";
import InputFieldError from "@/components/shared/Form/InputFieldError";
import { toast } from "sonner";


interface Props {
    userInfo: IUser | IGuide | ITourist;
}

export default function MyEditProfile({ userInfo }: Props) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    // useActionState expects server action directly
    const [state, formAction, isSubmitting] = useActionState<ActionResponse | null>(updateMyProfile as any, null);
    const [verifyState, verifyAction, isVerifying] = useActionState<ActionResponse | null>(sendGuideVerificationRequest as any, null);


    // Controlled form state
    const isGuide = userInfo.role === TUserRole.GUIDE;
    const isTourist = userInfo.role === TUserRole.TOURIST;

    const init = {
        firstName: userInfo.firstName || "",
        lastName: (userInfo as any).lastName || "",
        phone: userInfo.phone || "",
        bio: (userInfo as any).bio || "",
        country: userInfo.country || "",
        address: userInfo.address || "",
        profileImage: userInfo.profileImage || "",
        languages: userInfo.languages || [],

        travelInterests: (userInfo as ITourist).travelInterests || [],
        preferredStyles: (userInfo as ITourist).preferredStyles || [],

        occupation: (userInfo as IGuide).occupation || "",
        city: (userInfo as IGuide).city || "",
        expertise: (userInfo as IGuide).expertise || [],
        yearsOfExperience: (userInfo as IGuide).yearsOfExperience ?? "",
        hourlyRate: (userInfo as IGuide).hourlyRate ?? "",
        dailyRate: (userInfo as IGuide).dailyRate ?? "",
    };

    const [form, setForm] = useState(init);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const inputFileRef = useRef<HTMLInputElement | null>(null);

    // Show server success => refresh or show toast (here we refresh)
    useEffect(() => {
        if (!state) return;
        if (state.success) {
            toast.success(state.message || "Profile updated successfully!");

            // Refresh UI (important)
            router.refresh();
        } else {
            // Show error message
            toast.error(state.message || "Something went wrong!");
        }
    }, [state, router]);

    useEffect(() => {
        if (!verifyState) return;

        if (verifyState.success) {
            toast.success(verifyState.message || "Verification request sent!");
            router.refresh();
        } else {
            toast.error(verifyState.message || "Failed to send verification request.");
        }
    }, [verifyState, router]);

    // helpers
    const setField = (k: string, v: any) => setForm((p) => ({ ...p, [k]: v }));

    const addArrayItem = (key: keyof typeof form) => {
        setForm((p) => ({ ...p, [key]: [...(p as any)[key], ""] }));
    };
    const removeArrayItem = (key: keyof typeof form, idx: number) => {
        setForm((p) => {
            const arr = [...(p as any)[key]];
            arr.splice(idx, 1);
            return { ...p, [key]: arr };
        });
    };
    const setArrayItem = (key: keyof typeof form, idx: number, value: string) => {
        setForm((p) => {
            const arr = [...(p as any)[key]];
            arr[idx] = value;
            return { ...p, [key]: arr };
        });
    };

    // image preview - keep file in the native input (so form submission includes it)
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        // preview only
        const reader = new FileReader();
        reader.onloadend = () => setPreviewImage(reader.result as string);
        reader.readAsDataURL(file);
    };

    // check completeness using the server-provided userInfo (not the form).
    // This matches your backend behaviour: user must update profile (and backend will reflect)
    const isGuideProfileComplete = (u: any) => {
        if (!u) return false;

        // require each listed field
        for (const field of verifyRequiredFieldsForGuide) {
            const vInUser = (u as any)[field];

            // if field in base user model
            if (field === "firstName" || field === "email" || field === "profileImage" || field === "bio" ||
                field === "phone" || field === "address" || field === "country") {
                if (vInUser === undefined || vInUser === null) return false;
                const asStr = String(vInUser).trim();
                if (asStr === "") return false;
                continue;
            }

            // guide-specific fields
            if (field === "occupation" || field === "city") {
                const val = (u as any)[field];
                if (val === undefined || val === null || String(val).trim() === "") return false;
                continue;
            }

            if (field === "expertise") {
                const val = (u as any).expertise;
                if (!Array.isArray(val) || val.length === 0) return false;
                continue;
            }

            if (field === "yearsOfExperience" || field === "hourlyRate" || field === "dailyRate") {
                const val = (u as any)[field];
                // require a positive number (0 is not acceptable)
                if (val === undefined || val === null) return false;
                const n = Number(val);
                if (isNaN(n) || n <= 0) return false;
                continue;
            }
        }

        return true;
    };

    const guideIsVerifiedByAdmin = (userInfo as IGuide).isVerifiedByAdmin ?? false;
    const canSendVerification = isGuide && !guideIsVerifiedByAdmin && isGuideProfileComplete(userInfo);


    // CLIENT FORM: Submit via `formAction` (automatically injects FormData)
    // Include hidden JSON inputs for arrays and also include profileImage (URL) so backend can accept URL when no file provided
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">My Profile</h1>
                <p className="text-muted-foreground mt-1">Manage your personal information</p>
            </div>

            <form action={formAction} className="">
                <div className="grid gap-6 lg:grid-cols-3">
                    <Card className="lg:col-span-1 h-auto self-start">
                        <CardHeader>
                            <CardTitle>Profile Picture</CardTitle>
                        </CardHeader>

                        <CardContent className="flex flex-col items-center space-y-4">
                            <div className="relative">
                                <Avatar className="h-32 w-32">
                                    <AvatarImage
                                        src={
                                            previewImage
                                                ? previewImage // selected file preview
                                                : (form.profileImage || (userInfo as any).profileImage || "")
                                        }
                                        alt={form.firstName || userInfo.firstName}
                                    />
                                    <AvatarFallback className="text-3xl">
                                        {(form.firstName || userInfo.firstName || "")
                                            .split(" ")
                                            .map((s) => s[0])
                                            .slice(0, 2)
                                            .join("")}
                                    </AvatarFallback>
                                </Avatar>

                                <label htmlFor="file" className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer">
                                    <Camera className="h-4 w-4" />
                                    <input id="file" name="file" type="file" accept="image/*" className="hidden" ref={inputFileRef} onChange={handleImageChange} />
                                </label>
                            </div>

                            <div className="text-center w-full">
                                <p className="font-semibold text-lg">{form.firstName || userInfo.firstName}</p>

                                <div className="mt-1 flex items-center justify-center gap-3 text-sm text-muted-foreground">
                                    <span>{(userInfo as any).email}</span>
                                    <span className="px-1">|</span>
                                    <span className="capitalize">{userInfo.role}</span>
                                </div>

                                {/* small status row - rating, verification status, userStatus */}
                                <div className="mt-3 flex gap-2 items-center text-xs">
                                    <div className="flex items-center gap-1 px-2 py-1 rounded bg-gray-100">
                                        <Star className="h-3 w-3" />
                                        <span>{(userInfo as any).rating ?? 0}</span>
                                    </div>

                                    <div className="flex items-center gap-1 px-2 py-1 rounded bg-gray-100">
                                        <CheckCircle className="h-3 w-3" />
                                        <span>
                                            {
                                                (userInfo as IGuide).isVerifiedByAdmin
                                                    ? TVerificationReqStatus.APPROVED
                                                    : (userInfo as IGuide).verificationRequest
                                            }
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-1 px-2 py-1 rounded bg-gray-100">
                                        <Badge className="h-3 w-3" />
                                        <span>{(userInfo as any).userStatus ?? "UNKNOWN"}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            {state && state.success === false && state.message && (
                                <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-md text-sm">{state.message}</div>
                            )}

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">Full Name</Label>
                                    <Input id="firstName" name="firstName" value={form.firstName} onChange={(e) => setField("firstName", e.target.value)} />
                                    <InputFieldError field="firstName" state={state as any} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" name="lastName" value={form.lastName} onChange={(e) => setField("lastName", e.target.value)} />
                                    <InputFieldError field="lastName" state={state as any} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" name="email" value={(userInfo as any).email || ""} disabled className="bg-muted" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Contact Number</Label>
                                    <Input id="phone" name="phone" value={form.phone} onChange={(e) => setField("phone", e.target.value)} />
                                    <InputFieldError field="phone" state={state as any} />
                                </div>

                                {/* GUIDE FIELDS */}
                                {isGuide && (
                                    <>
                                        <div className="space-y-2">
                                            <Label htmlFor="city">City</Label>
                                            <Input id="city" name="city" value={form.city} onChange={(e) => setField("city", e.target.value)} />
                                            <InputFieldError field="city" state={state as any} />
                                        </div>
                                    </>
                                )}

                                <div className="space-y-2">
                                    <Label htmlFor="country">Country</Label>
                                    <Input id="country" name="country" value={form.country} onChange={(e) => setField("country", e.target.value)} />
                                    <InputFieldError field="country" state={state as any} />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="address">Full Address</Label>
                                    <Input id="address" name="address" value={form.address} onChange={(e) => setField("address", e.target.value)} />
                                    <InputFieldError field="address" state={state as any} />
                                </div>

                                {/* GUIDE FIELDS */}
                                {isGuide && (
                                    <>
                                        <div className="space-y-2">
                                            <Label htmlFor="occupation">Occupation</Label>
                                            <Input id="occupation" name="occupation" value={form.occupation} onChange={(e) => setField("occupation", e.target.value)} />
                                            <InputFieldError field="occupation" state={state as any} />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                                            <Input id="yearsOfExperience" name="yearsOfExperience" type="number" value={String(form.yearsOfExperience)} onChange={(e) => setField("yearsOfExperience", e.target.value)} />
                                            <InputFieldError field="yearsOfExperience" state={state as any} />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="hourlyRate">Hourly Rate (BDT)</Label>
                                            <Input id="hourlyRate" name="hourlyRate" type="number" value={String(form.hourlyRate)} onChange={(e) => setField("hourlyRate", e.target.value)} />
                                            <InputFieldError field="hourlyRate" state={state as any} />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="dailyRate">Daily Rate (BDT)</Label>
                                            <Input id="dailyRate" name="dailyRate" type="number" value={String(form.dailyRate)} onChange={(e) => setField("dailyRate", e.target.value)} />
                                            <InputFieldError field="dailyRate" state={state as any} />
                                        </div>
                                    </>
                                )}

                                {/* languages array */}
                                <div className="space-y-2">
                                    <Label>Languages</Label>
                                    {(form.languages || []).map((lang, i) => (
                                        <div key={i} className="flex gap-2 items-center">
                                            <Input name={`languages[${i}]`} value={lang} onChange={(e) => setArrayItem("languages", i, e.target.value)} />
                                            <button type="button" className="text-red-500" onClick={() => removeArrayItem("languages", i)}>-</button>
                                        </div>
                                    ))}
                                    <div><button type="button" className="text-sm text-blue-600" onClick={() => addArrayItem("languages")}>+ Add Language</button></div>
                                    <InputFieldError field="languages" state={state as any} />
                                </div>

                                {/* TOURIST */}
                                {isTourist && (
                                    <>
                                        <div className="space-y-2 md:col-span-2">
                                            <Label>Travel Interests</Label>
                                            {(form.travelInterests || []).map((v, i) => (
                                                <div key={i} className="flex gap-2 items-center">
                                                    <Input name={`travelInterests[${i}]`} value={v} onChange={(e) => setArrayItem("travelInterests", i, e.target.value)} />
                                                    <button type="button" className="text-red-500" onClick={() => removeArrayItem("travelInterests", i)}>-</button>
                                                </div>
                                            ))}
                                            <div><button type="button" className="text-sm text-blue-600" onClick={() => addArrayItem("travelInterests")}>+ Add</button></div>
                                            <InputFieldError field="travelInterests" state={state as any} />
                                        </div>

                                        <div className="space-y-2 md:col-span-2">
                                            <Label>Preferred Styles</Label>
                                            {(form.preferredStyles || []).map((v, i) => (
                                                <div key={i} className="flex gap-2 items-center">
                                                    <Input name={`preferredStyles[${i}]`} value={v} onChange={(e) => setArrayItem("preferredStyles", i, e.target.value)} />
                                                    <button type="button" className="text-red-500" onClick={() => removeArrayItem("preferredStyles", i)}>-</button>
                                                </div>
                                            ))}
                                            <div><button type="button" className="text-sm text-blue-600" onClick={() => addArrayItem("preferredStyles")}>+ Add</button></div>
                                            <InputFieldError field="preferredStyles" state={state as any} />
                                        </div>
                                    </>
                                )}

                                {/* GUIDE FIELDS */}
                                {isGuide && (
                                    <>
                                        <div className="space-y-2">
                                            <Label>Expertise</Label>
                                            {(form.expertise || []).map((v, i) => (
                                                <div key={i} className="flex gap-2 items-center">
                                                    <Input name={`expertise[${i}]`} value={v} onChange={(e) => setArrayItem("expertise", i, e.target.value)} />
                                                    <button type="button" className="text-red-500" onClick={() => removeArrayItem("expertise", i)}>-</button>
                                                </div>
                                            ))}
                                            <div><button type="button" className="text-sm text-blue-600" onClick={() => addArrayItem("expertise")}>+ Add</button></div>
                                            <InputFieldError field="expertise" state={state as any} />
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* BIO field (you asked to include this below all fields) */}
                            <div className="mt-4">
                                <Label htmlFor="bio">Bio</Label>
                                <textarea
                                    id="bio"
                                    name="bio"
                                    className="w-full border rounded p-2 min-h-[100px]"
                                    value={form.bio}
                                    onChange={(e) => setField("bio", e.target.value)}
                                />
                                <InputFieldError field="bio" state={state as any} />
                            </div>

                            {/* HIDDEN JSON fields so arrays are sent as form entries */}
                            <input type="hidden" name="languages" value={JSON.stringify(form.languages || [])} />
                            <input type="hidden" name="travelInterests" value={JSON.stringify(form.travelInterests || [])} />
                            <input type="hidden" name="preferredStyles" value={JSON.stringify(form.preferredStyles || [])} />
                            <input type="hidden" name="expertise" value={JSON.stringify(form.expertise || [])} />
                            {/* include profileImage (URL) so backend can use it if file not uploaded */}
                            <input type="hidden" name="profileImage" value={String(form.profileImage || userInfo.profileImage || "")} />
                            {/* also pass role and user id so server knows which schema to validate */}
                            <input type="hidden" name="role" value={String(userInfo.role)} />
                            <input type="hidden" name="userId" value={String((userInfo as any)._id || "")} />

                            <div className="flex items-center justify-between pt-4">
                                <div>
                                    {isGuide && !(userInfo as IGuide).isVerifiedByAdmin && (
                                        <>
                                            <Button
                                                formAction={verifyAction}
                                                type="submit"
                                                className="cursor-pointer"
                                                disabled={!canSendVerification || isVerifying || (userInfo as IGuide).verificationRequest === TVerificationReqStatus.APPROVED || (userInfo as IGuide).verificationRequest === TVerificationReqStatus.PENDING}
                                            >
                                                {isVerifying ? "Sending..." : "Send Verification Request"}
                                            </Button>


                                            {!canSendVerification && (
                                                <p className="text-sm text-muted-foreground mt-2">Fill all of your information &amp; send verification request.</p>
                                            )}
                                        </>
                                    )}
                                </div>

                                <div>
                                    <Button className="cursor-pointer" type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Updating...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="mr-2 h-4 w-4" />
                                                Save Changes
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </form>
        </div>
    );
}
