/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import InputFieldError from "@/components/shared/Form/InputFieldError";

import Image from "next/image";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { updateTourAction } from "@/services/user/tour.services";
import { ITour, TTourDifficultyLevel, TTourType } from "@/types/tour.interface";
import { CircleMinus } from "lucide-react";


interface Props {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    tour: Partial<ITour>;
}

export default function EditTourDialog({ open, onClose, onSuccess, tour }: Props) {
    const formRef = useRef<HTMLFormElement | null>(null);
    const imagesRef = useRef<HTMLInputElement | null>(null);

    // ======================= EDITABLE FIELDS =======================
    const [description, setDescription] = useState(tour.description || '');
    const [highlights, setHighlights] = useState<string[]>(tour.highlights || []);
    const [includesArr, setIncludesArr] = useState<string[]>(tour.includes || []);
    const [excludesArr, setExcludesArr] = useState<string[]>(tour.excludes || []);
    const [tagsCsv, setTagsCsv] = useState((tour?.tags && (tour.tags as string[]).join(", ")) ?? "");
    const [tourType, setTourType] = useState<string[]>(tour.tourType || []);
    const [difficulty, setDifficulty] = useState<string>(tour?.difficultyLevel || '');

    const [pickupLocation, setPickupLocation] = useState(tour.pickupLocation || '');
    const [dropoffLocation, setDropoffLocation] = useState(tour.dropoffLocation || '');

    const [imagesPreview, setImagesPreview] = useState<string[]>(tour.images || []);
    const [rawImages, setRawImages] = useState<File[]>([]);

    // ======================= SERVER ACTION =======================
    const [state, formAction, pending] = useActionState(
        updateTourAction.bind(null, tour.slug as string),
        null
    );

    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success("Tour updated successfully");
            onSuccess();
            onClose();
        } else {
            toast.error(state.message || "Update failed");
        }
    }, [state]);

    // ======================= ARRAY HELPERS =======================
    const addItem = (setter: any) => setter((p: string[]) => [...p, ""]);
    const updateItem = (setter: any, idx: number, val: string) =>
        setter((p: string[]) => p.map((v, i) => (i === idx ? val : v)));
    const removeItem = (setter: any, idx: number) =>
        setter((p: string[]) => p.filter((_, i) => i !== idx));

    // ======================= IMAGES =======================
    const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const selected = files.slice(0, 3);
        setRawImages(selected);

        const previews = selected.map((f) => URL.createObjectURL(f));
        setImagesPreview(previews);

        if (files.length > 3) toast.error("Max 3 images allowed.");
    };

    // ======================= FORM SUBMIT HELPERS =======================
    const injectHidden = (form: HTMLFormElement) => {
        const removeOld = Array.from(form.querySelectorAll("input[data-gen]"));
        removeOld.forEach((e) => e.remove());

        const add = (key: string, val: any) => {
            const i = document.createElement("input");
            i.type = "hidden";
            i.name = key;
            i.value = val;
            i.setAttribute("data-gen", "1");
            form.appendChild(i);
        };

        add("highlights", JSON.stringify(highlights));
        add("includes", JSON.stringify(includesArr));
        add("excludes", JSON.stringify(excludesArr));
        add("tags", JSON.stringify(tagsCsv.split(",").map((t) => t.trim()).filter(Boolean)));
        add("tourType", JSON.stringify(tourType));
        add("difficultyLevel", difficulty);
        add("pickupLocation", pickupLocation);
        add("dropoffLocation", dropoffLocation);
        add("tourId", tour._id); // Required for updating
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        injectHidden(e.currentTarget);
    };

    return (
        <Dialog open={open} onOpenChange={() => onClose()}>
            <DialogContent className="max-h-[90vh] w-[850px] p-0">
                <DialogHeader className="px-6 pt-6 pb-4 flex justify-between">
                    <DialogTitle>Edit Tour</DialogTitle>
                </DialogHeader>

                <form ref={formRef} action={formAction as any} onSubmit={handleSubmit}>
                    <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">

                        {/* ================= DESCRIPTION ================= */}
                        <Field>
                            <FieldLabel>Description</FieldLabel>
                            <textarea
                                name="description"
                                className="border rounded p-2 w-full min-h-[120px]"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <InputFieldError field="description" state={state} />
                        </Field>

                        {/* ================= TOUR TYPE ================= */}
                        <Field>
                            <FieldLabel>Tour Type</FieldLabel>
                            <div className="grid grid-cols-2 gap-2">
                                {Object.values(TTourType).map((t) => (
                                    <label key={t} className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={tourType.includes(t)}
                                            onChange={() =>
                                                setTourType((prev) =>
                                                    prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
                                                )
                                            }
                                        />
                                        <span>{t}</span>
                                    </label>
                                ))}
                            </div>
                        </Field>

                        {/* ================= DIFFICULTY ================= */}
                        <Field>
                            <FieldLabel>Difficulty Level</FieldLabel>
                            <Select value={difficulty} onValueChange={setDifficulty}>
                                <SelectTrigger><SelectValue placeholder="Select difficulty" /></SelectTrigger>
                                <SelectContent>
                                    {Object.values(TTourDifficultyLevel).map((d) => (
                                        <SelectItem key={d} value={d}>{d}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </Field>

                        {/* ================= PICKUP / DROPOFF ================= */}
                        <div className="grid grid-cols-2 gap-4">
                            <Field>
                                <FieldLabel>Pickup Location</FieldLabel>
                                <Input value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)} />
                            </Field>
                            <Field>
                                <FieldLabel>Dropoff Location</FieldLabel>
                                <Input value={dropoffLocation} onChange={(e) => setDropoffLocation(e.target.value)} />
                            </Field>
                        </div>

                        {/* ================= TAGS ================= */}
                        <Field>
                            <FieldLabel>Tags (comma separated)</FieldLabel>
                            <Input value={tagsCsv} onChange={(e) => setTagsCsv(e.target.value)} />
                        </Field>

                        {/* ================= HIGHLIGHTS ================= */}
                        <Field>
                            <FieldLabel>Highlights</FieldLabel>
                            {highlights.map((h, i) => (
                                <div key={i} className="flex gap-2 mt-2">
                                    <Input value={h} onChange={(e) => updateItem(setHighlights, i, e.target.value)} />
                                    <CircleMinus className="text-red-500 cursor-pointer" onClick={() => removeItem(setHighlights, i)} />
                                </div>
                            ))}
                            <button type="button" className="text-blue-600 text-sm mt-2" onClick={() => addItem(setHighlights)}>
                                + Add Highlight
                            </button>
                        </Field>

                        {/* ================= INCLUDES ================= */}
                        <Field>
                            <FieldLabel>Includes</FieldLabel>
                            {includesArr.map((h, i) => (
                                <div key={i} className="flex gap-2 mt-2">
                                    <Input value={h} onChange={(e) => updateItem(setIncludesArr, i, e.target.value)} />
                                    <CircleMinus className="text-red-500 cursor-pointer" onClick={() => removeItem(setIncludesArr, i)} />
                                </div>
                            ))}
                            <button type="button" className="text-blue-600 text-sm mt-2" onClick={() => addItem(setIncludesArr)}>
                                + Add Include
                            </button>
                        </Field>

                        {/* ================= EXCLUDES ================= */}
                        <Field>
                            <FieldLabel>Excludes</FieldLabel>
                            {excludesArr.map((h, i) => (
                                <div key={i} className="flex gap-2 mt-2">
                                    <Input value={h} onChange={(e) => updateItem(setExcludesArr, i, e.target.value)} />
                                    <CircleMinus className="text-red-500 cursor-pointer" onClick={() => removeItem(setExcludesArr, i)} />
                                </div>
                            ))}
                            <button type="button" className="text-blue-600 text-sm mt-2" onClick={() => addItem(setExcludesArr)}>
                                + Add Exclude
                            </button>
                        </Field>

                        {/* ================= IMAGES ================= */}
                        <Field>
                            <FieldLabel>Images (max 3)</FieldLabel>
                            <input
                                ref={imagesRef}
                                type="file"
                                name="images"
                                accept="image/*"
                                multiple
                                onChange={handleImagesChange}
                            />

                            <div className="flex gap-2 mt-2">
                                {imagesPreview.map((url, i) => (
                                    <div key={i} className="w-24 h-24 relative border rounded overflow-hidden">
                                        <Image src={url} alt="preview" fill style={{ objectFit: "cover" }} />
                                    </div>
                                ))}
                            </div>
                        </Field>

                    </div>
                    <input type="hidden" name="slug" value={tour.slug} />

                    {/* ================= FOOTER ================= */}
                    <div className="p-6 border-t bg-gray-50 flex justify-end gap-2">
                        <Button className="cursor-pointer" variant="outline" type="button" onClick={onClose} disabled={pending}>
                            Cancel
                        </Button>
                        <Button className="cursor-pointer" type="submit" disabled={pending}>
                            {pending ? "Updating..." : "Update Tour"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
