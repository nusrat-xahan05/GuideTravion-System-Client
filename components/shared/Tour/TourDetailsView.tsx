/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import noImage from "@/assets/images/noImage.png";
import { MapPin, Clock, DollarSign, Users, Star, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import AvailabilityCard from "./AvailabilityCard";
import { ITour } from "@/types/tour.interface";
import { TUserRole } from "@/types/user.interface";
import { IReview } from "@/types/reviews.interface";
import ReviewsSection from "../Reviews/ReviewsSection";



interface TourDetailsViewProps {
    tour: ITour;
    user: TUserRole | null;
    reviews: IReview[] | null;
}

export default function TourDetailsView({ tour, user, reviews }: TourDetailsViewProps) {
    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            {/* HERO IMAGE */}
            <div className="relative h-[420px] rounded-2xl overflow-hidden shadow">
                <Image
                    src={tour.images?.[0] || noImage}
                    alt={tour.title}
                    fill
                    priority
                    className="object-cover"
                />
            </div>

            {/* CONTENT GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
                {/* LEFT CONTENT */}
                <div className="lg:col-span-2 space-y-10">
                    {/* TITLE + META */}
                    <section className="space-y-3">
                        <h1 className="text-3xl font-bold">{tour.title}</h1>

                        <div className="flex flex-wrap gap-5 text-muted-foreground">
                            <Meta icon={MapPin} text={`${tour.location}, ${tour.division}`} />
                            <Meta icon={Clock} text={`${tour.durationDays} Day(s)`} />
                            <Meta icon={Users} text={`Max ${tour.maxGroupSize} People`} />
                            <Meta
                                icon={DollarSign}
                                text={`${tour.pricePerPerson}৳ / person`}
                            />
                            {tour.averageRating !== undefined && (
                                <Meta
                                    icon={Star}
                                    text={`${tour.averageRating} (${tour.totalReviews} reviews)`}
                                    highlight
                                />
                            )}
                        </div>
                    </section>

                    {/* TOUR TYPES */}
                    <div className="flex flex-wrap gap-2">
                        {tour.tourType.map((type, i) => (
                            <span
                                key={i}
                                className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                            >
                                {type}
                            </span>
                        ))}
                    </div>

                    {/* ABOUT */}
                    <Section title="About This Tour">
                        <p className="text-muted-foreground leading-relaxed">
                            {tour.description}
                        </p>
                    </Section>

                    {/* HIGHLIGHTS */}
                    <Section title="Highlights">
                        <ul className="grid sm:grid-cols-2 gap-3 list-disc pl-5 text-muted-foreground">
                            {tour.highlights.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </Section>

                    {/* INCLUDED / EXCLUDED */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <InfoCard title="What's Included" items={tour.includes} />
                        <InfoCard title="What's Excluded" items={tour.excludes} />
                    </div>

                    {/* ITINERARY */}
                    {tour.itinerary?.length ? (
                        <Section title="Itinerary">
                            <div className="space-y-4">
                                {tour.itinerary.map((day, i) => (
                                    <Card key={i}>
                                        <CardContent className="p-5 space-y-2">
                                            <h4 className="font-semibold">
                                                Day {day.day}: {day.title}
                                            </h4>
                                            <p className="text-muted-foreground">
                                                {day.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </Section>
                    ) : null}

                    {/* REVIEWS */}
                    {reviews?.length ? (
                        <ReviewsSection
                            reviews={reviews}
                            averageRating={tour.averageRating}
                            totalReviews={tour.totalReviews}
                        />
                    ) : null}
                </div>

                {/* RIGHT SIDEBAR */}
                <div className="lg:sticky top-24 h-fit space-y-5">
                    <AvailabilityCard tour={tour} user={user} />

                    {/* GUIDE INFO */}
                    <div className="border rounded-xl p-5 space-y-4">
                        <h3 className="text-lg font-semibold">Tour Guide Information</h3>
                        <div className="flex gap-5 items-start">
                            <Image
                                src={tour.user?.profileImage || noImage}
                                alt={tour.user?.firstName || "Guide"}
                                width={80}
                                height={80}
                                className="rounded-full object-cover border border-amber-800"
                            />

                            <div className="space-y-2">
                                <h3 className="font-semibold text-lg flex items-center gap-2">
                                    <User className="w-5 h-5" />
                                    {tour.user?.firstName} {tour.user?.lastName}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {tour.guide?.occupation}
                                </p>
                                <p className="text-sm">
                                    📍 {tour.guide?.city}
                                </p>
                                <p className="text-sm">
                                    ⭐ {tour.guide?.rating} ({tour?.guide?.totalReviews} reviews)
                                </p>
                                <p className="text-sm">
                                    Experience: {tour?.guide?.yearsOfExperience} years
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ---------- Helper Components ---------- */

const Meta = ({ icon: Icon, text, highlight = false }: any) => (
    <div className={`flex items-center gap-2 ${highlight && "text-yellow-600"}`}>
        <Icon className="w-5 h-5" />
        <span>{text}</span>
    </div>
);

const Section = ({ title, children }: any) => (
    <section className="space-y-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        {children}
    </section>
);

const InfoCard = ({ title, items }: any) => (
    <Card>
        <CardContent className="p-5 space-y-3">
            <h3 className="font-semibold">{title}</h3>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                {items?.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                ))}
            </ul>
        </CardContent>
    </Card>
);

