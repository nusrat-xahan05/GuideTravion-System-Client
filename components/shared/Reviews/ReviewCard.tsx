import { IReview } from "@/types/reviews.interface";
import Image from "next/image";
import { useState } from "react";
import RatingStars from "./RatingStars";
import { reviewTruncate } from "@/lib/reviewTruncate";

export default function ReviewCard({ review }: { review: IReview }) {
    const [expanded, setExpanded] = useState(false);

    const reviewer = review.touristId;
    const initials =
        reviewer?.firstName?.charAt(0)?.toUpperCase() || "U";

    return (
        <div className="border rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition">
            {/* Header */}
            <div className="flex items-center gap-4 mb-3">
                {/* Avatar / Image */}
                {reviewer?.profileImage ? (
                    <Image
                        src={reviewer.profileImage}
                        alt={reviewer.firstName}
                        width={48}
                        height={48}
                        className="rounded-full object-cover"
                    />
                ) : (
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                        {initials}
                    </div>
                )}

                <div>
                    <h4 className="font-semibold">
                        {reviewer?.firstName || "Anonymous"}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                        Written {new Date(review?.createdAt as string).toDateString()}
                    </p>
                </div>
            </div>

            {/* Stars */}
            <RatingStars rating={review.rating} />

            {/* Review Text */}
            <p className="mt-3 text-muted-foreground leading-relaxed">
                {expanded ? review.review : reviewTruncate(review?.review as string, 120)}
            </p>

            {(review.review as string).length > 120 && (
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="mt-2 text-sm text-primary font-medium cursor-pointer"
                >
                    {expanded ? "Show less" : "Read more"}
                </button>
            )}
        </div>
    );
}
