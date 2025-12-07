/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Camera, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useActionState } from "react";
import { IUser, IGuide, ITourist, TUserRole } from "@/types/user.interface";
import type { ActionResponse } from "@/types/response.interface";
import { sendGuideVerificationRequest, updateMyProfile } from "@/services/user/user.services";
import InputFieldError from "@/components/shared/Form/InputFieldError";

interface Props {
    userInfo: IUser | IGuide | ITourist;
}

export default function MyProfile({ userInfo }: Props) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    // useActionState expects server action directly
    const [state, formAction, isSubmitting] = useActionState<ActionResponse | null>(updateMyProfile as any, null);

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
    const [fileRef, setFileRef] = useState<File | null>(null);
    const inputFileRef = useRef<HTMLInputElement | null>(null);

    // Show server success => refresh or show toast (here we refresh)
    useEffect(() => {
        if (state && state.success) {
            router.refresh();
        }
    }, [state, router]);

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

    // image preview
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setFileRef(file);
        const reader = new FileReader();
        reader.onloadend = () => setPreviewImage(reader.result as string);
        reader.readAsDataURL(file);
    };

    const checkGuideCompleteness = (f: any) => {
        const required = ["occupation", "city", "expertise", "yearsOfExperience", "hourlyRate", "dailyRate"];
        return required.every((k) => {
            const val = f[k];
            if (Array.isArray(val)) return val.length > 0;
            return val !== undefined && val !== null && String(val).trim() !== "";
        });
    };

    const guideIsVerifiedByAdmin = (userInfo as IGuide).isVerifiedByAdmin ?? false;
    const canSendVerification = isGuide && !guideIsVerifiedByAdmin && checkGuideCompleteness(form);

    const handleSendVerification = async () => {
        if (!canSendVerification) return;
        // build formdata
        const fd = new FormData();
        fd.append("userId", (userInfo as any)._id || "");
        startTransition(async () => {
            await sendGuideVerificationRequest(null as any, fd);
            router.refresh();
        });
    };

    // CLIENT FORM: Submit via `formAction` (automatically injects FormData)
    // We must include hidden fields for arrays so they are included in the FormData
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
                                                : (form.profileImage || userInfo.profileImage || "") // server image
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

                            <div className="text-center">
                                <p className="font-semibold text-lg">{form.firstName || userInfo.firstName}</p>
                                <p className="text-sm text-muted-foreground">{(userInfo as any).email}</p>
                                <p className="text-xs text-muted-foreground mt-1 capitalize">{userInfo.role}</p>
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

                                <div className="space-y-2">
                                    <Label htmlFor="country">Country</Label>
                                    <Input id="country" name="country" value={form.country} onChange={(e) => setField("country", e.target.value)} />
                                    <InputFieldError field="country" state={state as any} />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input id="address" name="address" value={form.address} onChange={(e) => setField("address", e.target.value)} />
                                    <InputFieldError field="address" state={state as any} />
                                </div>

                                {/* languages array */}
                                <div className="space-y-2 md:col-span-2">
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
                                            <Label htmlFor="occupation">Occupation</Label>
                                            <Input id="occupation" name="occupation" value={form.occupation} onChange={(e) => setField("occupation", e.target.value)} />
                                            <InputFieldError field="occupation" state={state as any} />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="city">City</Label>
                                            <Input id="city" name="city" value={form.city} onChange={(e) => setField("city", e.target.value)} />
                                            <InputFieldError field="city" state={state as any} />
                                        </div>

                                        <div className="space-y-2 md:col-span-2">
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

                                        <div className="space-y-2">
                                            <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                                            <Input id="yearsOfExperience" name="yearsOfExperience" type="number" value={String(form.yearsOfExperience)} onChange={(e) => setField("yearsOfExperience", e.target.value)} />
                                            <InputFieldError field="yearsOfExperience" state={state as any} />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="hourlyRate">Hourly Rate</Label>
                                            <Input id="hourlyRate" name="hourlyRate" type="number" value={String(form.hourlyRate)} onChange={(e) => setField("hourlyRate", e.target.value)} />
                                            <InputFieldError field="hourlyRate" state={state as any} />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="dailyRate">Daily Rate</Label>
                                            <Input id="dailyRate" name="dailyRate" type="number" value={String(form.dailyRate)} onChange={(e) => setField("dailyRate", e.target.value)} />
                                            <InputFieldError field="dailyRate" state={state as any} />
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* HIDDEN JSON fields so arrays are sent as form entries */}
                            <input type="hidden" name="languages" value={JSON.stringify(form.languages || [])} />
                            <input type="hidden" name="travelInterests" value={JSON.stringify(form.travelInterests || [])} />
                            <input type="hidden" name="preferredStyles" value={JSON.stringify(form.preferredStyles || [])} />
                            <input type="hidden" name="expertise" value={JSON.stringify(form.expertise || [])} />
                            {/* also pass role and user id so server knows which schema to validate */}
                            <input type="hidden" name="role" value={String(userInfo.role)} />
                            <input type="hidden" name="userId" value={String((userInfo as any)._id || "")} />

                            <div className="flex items-center justify-between pt-4">
                                <div>
                                    {isGuide && !(userInfo as IGuide).isVerifiedByAdmin && (
                                        <>
                                            <Button type="button" disabled={!canSendVerification} onClick={handleSendVerification}>
                                                Send Verification Request
                                            </Button>
                                            {!canSendVerification && (
                                                <p className="text-sm text-muted-foreground mt-2">Fill all of your information &amp; send verification request.</p>
                                            )}
                                        </>
                                    )}
                                </div>

                                <div>
                                    <Button type="submit" disabled={isSubmitting}>
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
