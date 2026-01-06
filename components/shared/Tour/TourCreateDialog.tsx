/* eslint-disable @typescript-eslint/no-explicit-any */


"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import InputFieldError from "@/components/shared/Form/InputFieldError";
import { ActionResponse } from "@/types/response.interface";
import { createTourAction } from "@/services/user/tour.services";
import { useActionState } from "react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { TTourType, TTourDifficultyLevel } from "@/types/tour.interface";
import { CircleMinus } from "lucide-react";

type ItineraryDay = {
    day: number;
    title: string;
    description: string;
    activities: string[];
    startTime?: string;
    endTime?: string;
};

interface TourCreateDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess?: () => void;
    initial?: Partial<any>;
}

export default function TourCreateDialog({
    open,
    onClose,
    onSuccess,
    initial,
}: TourCreateDialogProps) {
    const formRef = useRef<HTMLFormElement | null>(null);
    const imagesRef = useRef<HTMLInputElement | null>(null);

    // basic fields
    const [title, setTitle] = useState(initial?.title ?? "");
    const [description, setDescription] = useState(initial?.description ?? "");
    const [location, setLocation] = useState(initial?.location ?? "");
    const [division, setDivision] = useState(initial?.division ?? "");
    const [durationDays, setDurationDays] = useState<number>(initial?.durationDays ?? 1);
    const [pricePerPerson, setPricePerPerson] = useState<number>(initial?.pricePerPerson ?? 0);
    const [maxGroupSize, setMaxGroupSize] = useState<number>(initial?.maxGroupSize ?? 1);

    // tags CSV
    const [tagsCsv, setTagsCsv] = useState((initial?.tags && (initial.tags as string[]).join(", ")) ?? "");
    // arrays
    const [highlights, setHighlights] = useState<string[]>(initial?.highlights ?? []);
    const [includesArr, setIncludesArr] = useState<string[]>(initial?.includes ?? []);
    const [excludesArr, setExcludesArr] = useState<string[]>(initial?.excludes ?? []);
    const [pickupLocation, setPickupLocation] = useState(initial?.pickupLocation ?? "");
    const [dropoffLocation, setDropoffLocation] = useState(initial?.dropoffLocation ?? "");
    const [meetingTime, setMeetingTime] = useState(initial?.meetingTime ?? "");

    // TOUR TYPE: single select dropdown (you asked)
    const tourTypeValues = Object.values(TTourType);

    const [tourType, setTourType] = useState<string[]>([]);

    const toggleTourType = (value: string) => {
        setTourType(prev =>
            prev.includes(value)
                ? prev.filter(v => v !== value)
                : [...prev, value]
        );
    };

    // difficulty single select
    const [difficulty, setDifficulty] = useState<string>(initial?.difficultyLevel ?? "");

    // itinerary
    const [itinerary, setItinerary] = useState<ItineraryDay[]>(
        (initial?.itinerary as ItineraryDay[]) ?? []
    );

    // images: up to 3 files with preview urls
    const [imagesPreview, setImagesPreview] = useState<string[]>([]);
    const [rawImages, setRawImages] = useState<File[]>([]);

    // server action state
    const [state, formAction, pending] = useActionState<ActionResponse | null>(
        createTourAction as any,
        null
    );

    const handledSuccess = useRef(false);

    // --- handle result: toast + close + optional reset (reset scheduled to avoid sync setState in effect) ---
    useEffect(() => {
        if (!state) return;

        if (state.success) {
            if (handledSuccess.current) return; // ❌ prevents infinite toasts
            handledSuccess.current = true;      // mark as handled

            toast.success(state.message || "Tour created.");
            // close first (dialog controlled by parent)
            if (onSuccess) onSuccess();
            onClose();

            // schedule reset after closing to avoid synchronous cascading renders warning
            // this allows parent to unmount/mount or refresh without React warning.
            setTimeout(() => {
                handledSuccess.current = false;
                if (formRef.current) formRef.current.reset();
                setTitle("");
                setDescription("");
                setLocation("");
                setDivision("");
                setDurationDays(1);
                setPricePerPerson(0);
                setMaxGroupSize(1);
                setTagsCsv("");
                setHighlights([]);
                setIncludesArr([]);
                setExcludesArr([]);
                setItinerary([]);
                setImagesPreview([]);
                setRawImages([]);
                setTourType([]);
                setDifficulty("");
                setPickupLocation("");
                setDropoffLocation("");
                setMeetingTime("");
            }, 0);

        } else {
            toast.error(state.message || "Failed to create tour.");
            // Do NOT reset the form on error. field-level errors are shown via InputFieldError.
            // Keep previews and form values so user can fix errors.
        }
    }, [state]);

    /* ---------- itinerary helpers ---------- */
    const addDay = () =>
        setItinerary((p) => [
            ...p,
            { day: p.length + 1, title: "", description: "", activities: [""] },
        ]);

    const removeDay = (idx: number) =>
        setItinerary((p) => p.filter((_, i) => i !== idx).map((d, i) => ({ ...d, day: i + 1 })));

    const updateDayField = (idx: number, field: keyof ItineraryDay, value: any) =>
        setItinerary((p) => p.map((d, i) => (i === idx ? { ...d, [field]: value } : d)));

    const addActivity = (dayIdx: number) =>
        setItinerary((p) => p.map((d, i) => (i === dayIdx ? { ...d, activities: [...d.activities, ""] } : d)));

    const updateActivity = (dayIdx: number, actIdx: number, value: string) =>
        setItinerary((p) => p.map((d, i) => (i === dayIdx ? { ...d, activities: d.activities.map((a, j) => (j === actIdx ? value : a)) } : d)));

    const removeActivity = (dayIdx: number, actIdx: number) =>
        setItinerary((p) => p.map((d, i) => (i === dayIdx ? { ...d, activities: d.activities.filter((_, j) => j !== actIdx) } : d)));

    /* ---------- arrays helpers ---------- */
    const addArrayItem = (setter: React.Dispatch<React.SetStateAction<string[]>>) => setter((p) => [...p, ""]);
    const updateArrayItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, idx: number, value: string) =>
        setter((prev) => prev.map((v, i) => (i === idx ? value : v)));
    const removeArrayItemGeneric = (setter: React.Dispatch<React.SetStateAction<string[]>>, idx: number) =>
        setter((prev) => prev.filter((_, i) => i !== idx));


    /* ---------- images: allow max 3 ---------- */
    const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const combined = [...rawImages, ...files];

        // limit to 3 files
        const limited = combined.slice(0, 3);
        setRawImages(limited);

        // generate preview URLs and revoke old ones
        const urls = limited.map((f) => URL.createObjectURL(f));
        // revoke previous previews to avoid memory leaks
        imagesPreview.forEach((u) => URL.revokeObjectURL(u));
        setImagesPreview(urls);

        // if user tried to add more than 3, show toast
        if (combined.length > 3) {
            toast.error("Maximum 3 images allowed. Extra files were ignored.");
        }

        // also update the native file input to show selected files (works in some browsers)
        if (imagesRef.current) {
            const dt = new DataTransfer();
            limited.forEach((f) => dt.items.add(f));
            imagesRef.current.files = dt.files;
        }
    };

    const removeImageAt = (idx: number) => {
        setRawImages((prev) => {
            const next = prev.filter((_, i) => i !== idx);
            // update preview urls
            imagesPreview.forEach((u) => URL.revokeObjectURL(u));
            const urls = next.map((f) => URL.createObjectURL(f));
            setImagesPreview(urls);
            return next;
        });
        // also update file input
        if (imagesRef.current) {
            const dt = new DataTransfer();
            rawImages.filter((_, i) => i !== idx).forEach((f) => dt.items.add(f));
            imagesRef.current.files = dt.files;
        }
    };

    /* ---------- inject hidden JSON inputs for arrays + complex fields before submit ---------- */
    const injectHiddenInputs = (formEl: HTMLFormElement) => {
        // remove previously injected fields
        const existing = Array.from(formEl.querySelectorAll("input[data-generated='true']"));
        existing.forEach((el) => el.remove());

        const addHidden = (name: string, value: string) => {
            const inp = document.createElement("input");
            inp.type = "hidden";
            inp.name = name;
            inp.value = value;
            inp.setAttribute("data-generated", "true");
            formEl.appendChild(inp);
        };

        const tagsArr = tagsCsv
            .split(",")
            .map((s: any) => s.trim())
            .filter(Boolean);

        addHidden("tourType", JSON.stringify(tourType));
        addHidden("difficultyLevel", difficulty ?? "");
        addHidden("tags", JSON.stringify(tagsArr));
        addHidden("highlights", JSON.stringify(highlights || []));
        addHidden("includes", JSON.stringify(includesArr || []));
        addHidden("excludes", JSON.stringify(excludesArr || []));
        addHidden("itinerary", JSON.stringify(itinerary || []));
        addHidden("pickupLocation", pickupLocation);
        addHidden("dropoffLocation", dropoffLocation);
        addHidden("meetingTime", meetingTime);
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const formEl = e.currentTarget;
        injectHiddenInputs(formEl);
        // do not preventDefault — native form submit will pass FormData to the server action (formAction)
    };

    return (
        <Dialog open={open} onOpenChange={(val) => { if (!val) onClose(); }}>
            <DialogContent className="max-h-[90vh] w-[900px] p-0">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>Create Tour</DialogTitle>
                </DialogHeader>

                <form ref={formRef} action={formAction as any} onSubmit={onSubmit} className="flex flex-col">
                    <div className="p-6 space-y-4 overflow-auto max-h-[70vh]">
                        {/* Title */}
                        <Field>
                            <FieldLabel htmlFor="title">Title</FieldLabel>
                            <Input id="title" name="title" placeholder="Ahsan Manzil Museum Tour" value={title} onChange={(e) => setTitle(e.target.value)} required />
                            <InputFieldError field="title" state={state} />
                        </Field>

                        {/* Description */}
                        <Field>
                            <FieldLabel htmlFor="description">Short Description</FieldLabel>
                            <textarea id="description" name="description" placeholder="Discover the majestic ..." value={description} onChange={(e) => setDescription(e.target.value)} className="border rounded p-2 w-full min-h-[100px]" />
                            <InputFieldError field="description" state={state} />
                        </Field>

                        {/* TourType - SINGLE SELECT (dropdown) */}
                        <Field>
                            <FieldLabel>Tour Type</FieldLabel>

                            <div className="grid grid-cols-2 gap-2 mt-2">
                                {tourTypeValues.map((type) => (
                                    <label key={type} className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={tourType.includes(type)}
                                            onChange={() => toggleTourType(type)}
                                        />
                                        <span>{type}</span>
                                    </label>
                                ))}
                            </div>

                            <InputFieldError field="tourType" state={state} />
                        </Field>


                        {/* Difficulty (single select)  & Division*/}
                        <div className="grid md:grid-cols-2 gap-4">
                            <Field>
                                <FieldLabel>Difficulty</FieldLabel>
                                <Select onValueChange={(v) => setDifficulty(v)} value={difficulty}>
                                    <SelectTrigger><SelectValue placeholder="Choose difficulty" /></SelectTrigger>
                                    <SelectContent>
                                        {Object.values(TTourDifficultyLevel).map((d) => (
                                            <SelectItem key={d} value={d}>{d}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputFieldError field="difficultyLevel" state={state} />
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="division">Division</FieldLabel>
                                <Input id="division" name="division" placeholder="Dhaka" value={division} onChange={(e) => setDivision(e.target.value)} />
                                <InputFieldError field="division" state={state} />
                            </Field>
                        </div>


                        {/* Location & Meeting Time */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <Field>
                                <FieldLabel htmlFor="location">Location</FieldLabel>
                                <Input id="location" name="location" placeholder="Sadarghat, Dhaka" value={location} onChange={(e) => setLocation(e.target.value)} />
                                <InputFieldError field="location" state={state} />
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="meetingTime">Meeting Time</FieldLabel>
                                <Input
                                    id="meetingTime"
                                    name="meetingTime"
                                    type="time"
                                    value={meetingTime}
                                    onChange={(e) => setMeetingTime(e.target.value)}
                                />
                            </Field>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <Field>
                                <FieldLabel htmlFor="pickupLocation">Pickup Location</FieldLabel>
                                <Input
                                    id="pickupLocation"
                                    name="pickupLocation"
                                    value={pickupLocation}
                                    placeholder="TSC Center, DU"
                                    onChange={(e) => setPickupLocation(e.target.value)}
                                />
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="dropoffLocation">Dropoff Location</FieldLabel>
                                <Input
                                    id="dropoffLocation"
                                    name="dropoffLocation"
                                    value={dropoffLocation}
                                    placeholder="TSC Center, DU"
                                    onChange={(e) => setDropoffLocation(e.target.value)}
                                />
                            </Field>
                        </div>

                        {/* Duration, Price, Max group */}
                        <div className="grid md:grid-cols-3 gap-4">
                            <Field>
                                <FieldLabel htmlFor="durationDays">Duration (days)</FieldLabel>
                                <Input id="durationDays" name="durationDays" type="number" min={1} value={String(durationDays)} onChange={(e) => setDurationDays(Number(e.target.value || 1))} />
                                <InputFieldError field="durationDays" state={state} />
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="pricePerPerson">Price per person</FieldLabel>
                                <Input id="pricePerPerson" name="pricePerPerson" type="number" value={String(pricePerPerson)} onChange={(e) => setPricePerPerson(Number(e.target.value || 0))} />
                                <InputFieldError field="pricePerPerson" state={state} />
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="maxGroupSize">Max group size</FieldLabel>
                                <Input id="maxGroupSize" name="maxGroupSize" type="number" value={String(maxGroupSize)} onChange={(e) => setMaxGroupSize(Number(e.target.value || 1))} />
                                <InputFieldError field="maxGroupSize" state={state} />
                            </Field>
                        </div>

                        {/* Tags CSV */}
                        <Field>
                            <FieldLabel htmlFor="tags">Tags (comma separated)</FieldLabel>
                            <Input id="tags" name="tagsCsv" value={tagsCsv} onChange={(e) => setTagsCsv(e.target.value)} placeholder="beach, food, culture" />
                        </Field>

                        {/* Highlights / Includes / Excludes (simple add/remove) */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <FieldLabel>Highlights</FieldLabel>
                                {(highlights || []).map((h, i) => (
                                    <div key={i} className="flex gap-2 items-center mt-2">
                                        <Input value={h} onChange={(e) => updateArrayItem(setHighlights, i, e.target.value)} />
                                        <CircleMinus type="button" className="text-red-500" onClick={() => removeArrayItemGeneric(setHighlights, i)}></CircleMinus>
                                    </div>
                                ))}
                                <div className="mt-2"><button type="button" className="text-sm text-blue-600" onClick={() => addArrayItem(setHighlights)}>+ Add Highlight</button></div>
                                <InputFieldError field="highlights" state={state} />
                            </div>

                            <div>
                                <FieldLabel>Includes</FieldLabel>
                                {(includesArr || []).map((h, i) => (
                                    <div key={i} className="flex gap-2 items-center mt-2">
                                        <Input value={h} onChange={(e) => updateArrayItem(setIncludesArr, i, e.target.value)} />
                                        <CircleMinus type="button" className="text-red-500" onClick={() => removeArrayItemGeneric(setIncludesArr, i)}></CircleMinus>
                                    </div>
                                ))}
                                <div className="mt-2"><button type="button" className="text-sm text-blue-600" onClick={() => addArrayItem(setIncludesArr)}>+ Add Include</button></div>
                                <InputFieldError field="includes" state={state} />
                            </div>
                        </div>

                        <Field>
                            <FieldLabel>Excludes</FieldLabel>
                            {(excludesArr || []).map((h, i) => (
                                <div key={i} className="flex gap-2 items-center mt-2">
                                    <Input value={h} onChange={(e) => updateArrayItem(setExcludesArr, i, e.target.value)} />
                                    <CircleMinus type="button" className="text-red-500" onClick={() => removeArrayItemGeneric(setExcludesArr, i)}></CircleMinus>
                                </div>
                            ))}
                            <div className="mt-2"><button type="button" className="text-sm text-blue-600" onClick={() => addArrayItem(setExcludesArr)}>+ Add Exclude</button></div>
                            <InputFieldError field="excludes" state={state} />
                        </Field>

                        {/* Itinerary editor */}
                        <div>
                            <div className="flex items-center justify-between">
                                <FieldLabel>Itinerary (optional)</FieldLabel>
                                <button type="button" onClick={addDay} className="text-sm text-blue-600">+ Add Day</button>
                            </div>

                            {itinerary.length === 0 && <p className="text-sm text-muted-foreground mt-2">No itinerary added (optional)</p>}

                            {itinerary.map((day, idx) => (
                                <div key={idx} className="mt-4 border p-3 rounded">
                                    <div className="flex items-center justify-between">
                                        <div className="font-medium">Day {day.day}</div>
                                        <div className="flex gap-2">
                                            <CircleMinus type="button" onClick={() => removeDay(idx)} className="text-red-500"></CircleMinus>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-2 mt-3">
                                        <Input placeholder="Day title" value={day.title} onChange={(e) => updateDayField(idx, "title", e.target.value)} />
                                        <Input placeholder="Start time (optional)" value={day.startTime ?? ""} onChange={(e) => updateDayField(idx, "startTime", e.target.value)} />
                                        <textarea placeholder="Description" className="border rounded p-2 md:col-span-2" value={day.description} onChange={(e) => updateDayField(idx, "description", e.target.value)} />
                                    </div>

                                    <div className="mt-3">
                                        <div className="flex items-center justify-between">
                                            <div className="text-sm font-medium">Activities</div>
                                            <button type="button" onClick={() => addActivity(idx)} className="text-sm text-blue-600">+ Add Activity</button>
                                        </div>

                                        {(day.activities || []).map((act, aIdx) => (
                                            <div key={aIdx} className="flex gap-2 items-center mt-2">
                                                <Input value={act} onChange={(e) => updateActivity(idx, aIdx, e.target.value)} />
                                                <button type="button" onClick={() => removeActivity(idx, aIdx)} className="text-red-500">-</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Images (max 3) with preview */}
                        <Field>
                            <FieldLabel htmlFor="images">Images (max 3)</FieldLabel>
                            <input ref={imagesRef} id="images" name="images" type="file" accept="image/*" multiple onChange={handleImagesChange} />
                            <div className="flex gap-2 mt-2">
                                {imagesPreview.map((url, i) => (
                                    <div key={i} className="w-24 h-24 relative rounded overflow-hidden border">
                                        <Image src={url} alt={`preview-${i}`} fill style={{ objectFit: "cover" }} />
                                        <button type="button" onClick={() => removeImageAt(i)} className="absolute top-1 right-1 bg-white rounded p-1 text-red-600">x</button>
                                    </div>
                                ))}
                            </div>
                            <InputFieldError field="images" state={state} />
                        </Field>
                    </div>

                    {/* footer */}
                    <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50">
                        <Button className="cursor-pointer" variant="outline" type="button" onClick={onClose} disabled={pending}>Cancel</Button>
                        <Button className="cursor-pointer" type="submit" disabled={pending}>{pending ? "Creating..." : "Create Tour"}</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
