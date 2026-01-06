"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, Star, User, Briefcase, Globe, Languages } from "lucide-react";

import { getInitials, formatDateTime } from "@/lib/formatters";
import { IGuide } from "@/types/user.interface";
import InfoRow from "@/components/shared/Table/InoRow";

import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { updateGuideVerification } from "@/services/admin/userManagement";


interface IGuideVerifyDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    guide?: IGuide;
}

const GuideVerifyDialog = ({ open, onClose, onSuccess, guide }: IGuideVerifyDialogProps) => {
    const formRef = useRef<HTMLFormElement>(null);

    const [verificationRequest, setVerificationRequest] = useState(guide?.verificationRequest || "PENDING");

    const [state, formAction, pending] = useActionState(
        updateGuideVerification.bind(null, guide?._id as string),
        null
    );

    const handleClose = () => {
        formRef.current?.reset();
        onClose();
    };

    // on submit response handling
    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success(state.message);
            onSuccess();
            handleClose();
        } else {
            toast.error(state.message);
        }
    }, [state]);

    if (!guide) return null;
    // If API returns user: { ... }
    const user = guide.user || guide;

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="min-w-4xl max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-6 pt-6 pb-4 flex items-center justify-between">
                    <DialogTitle>Guide Details</DialogTitle>
                </DialogHeader>

                <form
                    ref={formRef}
                    action={formAction}
                    className="flex-1 overflow-y-auto px-6 pb-6 space-y-6"
                >
                    <Input type="hidden" name="verificationRequest" value={verificationRequest} />
                    <div className="flex-1 overflow-y-auto px-6 pb-6">
                        {/* ================= Profile Header ================= */}
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6
            bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-900
            rounded-lg mb-6"
                        >
                            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                                <AvatarImage src={user.profileImage || ""} alt={user.firstName} />
                                <AvatarFallback className="text-2xl">
                                    {getInitials(user.firstName)}
                                </AvatarFallback>
                            </Avatar>

                            <div className="flex-1 text-center sm:text-left">
                                <h2 className="text-3xl font-bold mb-1">
                                    {user.firstName} {user.lastName}
                                </h2>

                                {user.email && (
                                    <p className="text-muted-foreground mb-2 flex items-center justify-center sm:justify-start gap-2">
                                        <Mail className="h-4 w-4" />
                                        {user.email}
                                    </p>
                                )}

                                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                                    <Badge variant={guide.verificationRequest ? "default" : "secondary"}>
                                        VERIFICATION STATUS: {guide.verificationRequest}
                                    </Badge>

                                    {guide.rating !== undefined && (
                                        <Badge variant="outline" className="flex items-center gap-1">
                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            {guide.rating.toFixed(1)}
                                        </Badge>
                                    )}
                                </div>
                            </div>

                            {/* ⭐ Editable Dropdown */}
                            <Field>
                                <FieldLabel>Verification Status</FieldLabel>
                                <Select
                                    value={verificationRequest}
                                    onValueChange={setVerificationRequest}
                                >
                                    <SelectTrigger className="w-48 bg-white/80 dark:bg-black/30">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="PENDING">Pending</SelectItem>
                                        <SelectItem value="APPROVED">Approved</SelectItem>
                                        <SelectItem value="REJECTED">Rejected</SelectItem>
                                    </SelectContent>
                                </Select>
                            </Field>
                        </div>

                        {/* ===================== Professional Info ===================== */}
                        <div className="space-y-6">
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <Briefcase className="h-5 w-5 text-blue-600" />
                                    <h3 className="font-semibold text-lg">Professional Information</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                    <InfoRow
                                        label="Occupation"
                                        value={guide.occupation || "Not specified"}
                                    />
                                    <InfoRow
                                        label="Years of Experience"
                                        value={
                                            guide.yearsOfExperience
                                                ? `${guide.yearsOfExperience} years`
                                                : "Not specified"
                                        }
                                    />
                                    <InfoRow
                                        label="Hourly Rate"
                                        value={guide.hourlyRate ? `$${guide.hourlyRate}` : "Not specified"}
                                    />
                                    <InfoRow
                                        label="Daily Rate"
                                        value={guide.dailyRate ? `$${guide.dailyRate}` : "Not specified"}
                                    />
                                    <InfoRow
                                        label="City"
                                        value={guide.city || "Not specified"}
                                    />
                                </div>
                            </div>

                            <Separator />

                            {/* ===================== Expertise ===================== */}
                            {guide.expertise && guide.expertise.length > 0 && (
                                <>
                                    <div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <Globe className="h-5 w-5 text-green-600" />
                                            <h3 className="font-semibold text-lg">Expertise</h3>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {guide.expertise.map((exp, idx) => (
                                                <Badge key={idx} variant="outline" className="px-3 py-1 text-sm">
                                                    {exp}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                    <Separator />
                                </>
                            )}

                            {/* ===================== Contact Info ===================== */}
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <Phone className="h-5 w-5 text-purple-600" />
                                    <h3 className="font-semibold text-lg">Contact Information</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                    <InfoRow label="Phone" value={user.phone || "Not provided"} />
                                    <InfoRow label="Email" value={user.email || "Not provided"} />
                                    <div className="md:col-span-2">
                                        <InfoRow label="Address" value={user.address || "Not provided"} />
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* ===================== Personal Information ===================== */}
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <User className="h-5 w-5 text-orange-600" />
                                    <h3 className="font-semibold text-lg">Personal Information</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                    <InfoRow label="Country" value={user.country || "Not specified"} />

                                    <div className="flex items-start gap-3">
                                        <Languages className="h-4 w-4 mt-1 text-muted-foreground" />
                                        <InfoRow
                                            label="Languages"
                                            value={
                                                user.languages && user.languages.length > 0
                                                    ? user.languages.join(", ")
                                                    : "Not specified"
                                            }
                                        />
                                    </div>

                                    <InfoRow
                                        label="Joined On"
                                        value={formatDateTime(user.createdAt || "")}
                                    />
                                    <InfoRow
                                        label="Last Updated"
                                        value={formatDateTime(user.updatedAt || "")}
                                    />
                                </div>
                            </div>

                            <Separator />

                            {/* ===================== Bio Section ===================== */}
                            {user.bio && (
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Bio</h3>
                                    <p className="text-muted-foreground bg-muted/50 p-4 rounded-lg leading-relaxed">
                                        {user.bio}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* ================= Footer Actions ================= */}
                    <div className="flex justify-end gap-2 pt-4 border-t">
                        <Button
                            type="button"
                            className="cursor-pointer"
                            variant="outline"
                            disabled={pending}
                            onClick={onClose}
                        >
                            Cancel
                        </Button>

                        <Button className="cursor-pointer" type="submit" disabled={pending}>
                            {pending ? "Saving..." : "Update Status"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default GuideVerifyDialog;

