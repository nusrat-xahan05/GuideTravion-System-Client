import PublicTourCard from "./PublicTourCard";
import { ITour } from "@/types/tour.interface";

export default function PublicTourList({
    tours,
}: {
    tours: ITour[];
}) {
    if (!tours.length) {
        return <p>No tours found</p>;
    }

    return (
        <div className="space-y-6">
            {tours.map((tour) => (
                <PublicTourCard key={tour._id} tour={tour} />
            ))}
        </div>
    );
}
