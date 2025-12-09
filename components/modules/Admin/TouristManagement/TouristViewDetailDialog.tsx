"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

import { ITourist } from "@/types/user.interface";
import { Mail, Phone, User, Languages, Globe, Heart, ListChecks, BookmarkCheck, } from "lucide-react";
import { getInitials, formatDateTime } from "@/lib/formatters";
import InfoRow from "@/components/shared/Table/InoRow";


interface TouristViewDetailDialogProps {
    open: boolean;
    onClose: () => void;
    tourist: ITourist | null;
}

const TouristViewDetailDialog = ({
    open,
    onClose,
    tourist,
}: TouristViewDetailDialogProps) => {
    if (!tourist) return null;
    const user = tourist.user || tourist;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="min-w-4xl max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>Tourist Details</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-6 pb-6">
                    {/* ================= Profile ================= */}
                    <div
                        className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6
                        bg-linear-to-br from-blue-50 to-indigo-50 
                        dark:from-blue-950 dark:to-indigo-900
                        rounded-lg mb-6"
                    >
                        <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                            <AvatarImage
                                src={user.profileImage || ""}
                                alt={user.firstName}
                            />
                            <AvatarFallback className="text-2xl">
                                {getInitials(user.firstName)}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 text-center sm:text-left">
                            <h2 className="text-3xl font-bold mb-1">
                                {user.firstName} {user.lastName}
                            </h2>

                            {user.email && (
                                <p className="text-muted-foreground flex items-center justify-center sm:justify-start gap-2">
                                    <Mail className="h-4 w-4" />
                                    {user.email}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* ================= Contact ================= */}
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

                        {/* ================= Personal ================= */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <User className="h-5 w-5 text-orange-600" />
                                <h3 className="font-semibold text-lg">Personal Information</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                <InfoRow label="Country" value={user.country} />

                                <div className="flex gap-3">
                                    <Languages className="h-4 w-4 mt-1 text-muted-foreground" />
                                    <InfoRow
                                        label="Languages"
                                        value={
                                            user.languages?.length
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

                        {/* ================= Tourist-Specific Fields ================= */}

                        {/* Travel Interests */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Globe className="h-5 w-5 text-blue-600" />
                                <h3 className="font-semibold text-lg">Travel Interests</h3>
                            </div>
                            <p className="bg-muted/50 p-4 rounded-lg">
                                {tourist.travelInterests?.length
                                    ? tourist.travelInterests.join(", ")
                                    : "Not specified"}
                            </p>
                        </div>

                        {/* Preferred Styles */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <ListChecks className="h-5 w-5 text-green-600" />
                                <h3 className="font-semibold text-lg">Preferred Travel Styles</h3>
                            </div>
                            <p className="bg-muted/50 p-4 rounded-lg">
                                {tourist.preferredStyles?.length
                                    ? tourist.preferredStyles.join(", ")
                                    : "Not specified"}
                            </p>
                        </div>

                        {/* Wishlist Tours */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <BookmarkCheck className="h-5 w-5 text-pink-600" />
                                <h3 className="font-semibold text-lg">Wishlist Tours</h3>
                            </div>
                            <p className="bg-muted/50 p-4 rounded-lg">
                                {tourist.wishlistTours?.length
                                    ? tourist.wishlistTours.length + " tours saved"
                                    : "No tours in wishlist"}
                            </p>
                        </div>

                        {/* Bookings */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Heart className="h-5 w-5 text-red-600" />
                                <h3 className="font-semibold text-lg">Bookings</h3>
                            </div>
                            <p className="bg-muted/50 p-4 rounded-lg">
                                {tourist.bookings?.length
                                    ? `${tourist.bookings.length} bookings`
                                    : "No bookings yet"}
                            </p>
                        </div>

                        <Separator />

                        {/* Bio */}
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
            </DialogContent>
        </Dialog>
    );
};

export default TouristViewDetailDialog;
