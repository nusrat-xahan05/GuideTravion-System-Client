import { Star } from "lucide-react";

export default function RatingStars({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-1 text-green-600">
            {[1, 2, 3, 4, 5].map((i) => (
                <Star
                    key={i}
                    className={`w-4 h-4 ${i <= rating ? "fill-green-600" : "text-gray-300"
                        }`}
                />
            ))}
        </div>
    );
}
