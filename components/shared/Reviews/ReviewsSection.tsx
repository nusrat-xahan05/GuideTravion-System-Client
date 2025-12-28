"use client";

import { IReview } from "@/types/reviews.interface";
import ReviewCard from "./ReviewCard";
import RatingStars from "./RatingStars";

interface ReviewsSectionProps {
    reviews: IReview[];
    averageRating?: number;
    totalReviews?: number;
}

export default function ReviewsSection({ reviews, averageRating = 0, totalReviews = 0 }: ReviewsSectionProps) {
    if (!reviews?.length) return null;

    return (
        <section className="mt-14 space-y-6">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-2xl font-semibold">
                    Why travelers love this
                </h2>

                <div className="flex items-center gap-2">
                    <RatingStars rating={averageRating} />
                    <span className="text-sm text-muted-foreground">
                        {averageRating.toFixed(1)} ({totalReviews} reviews)
                    </span>
                </div>
            </div>

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.map((review) => (
                    <ReviewCard key={review._id} review={review} />
                ))}
            </div>
        </section>
    );
}
