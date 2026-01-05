import { TUserRole } from "@/types/user.interface";
import PublicTourCard from "./PublicTourCard";
import { ITour } from "@/types/tour.interface";


interface Props {
    tours: ITour[];
    wishlistIds: string[];
    user: TUserRole | null;
}

export default function PublicTourList({ tours, wishlistIds, user }: Props) {
    if (!tours.length) {
        return <p>No tours found</p>;
    }

    return (
        <div className="space-y-6">
            {tours.map((tour) => (
                <PublicTourCard key={tour._id} tour={tour} wishlistIds={wishlistIds} user={user} />
            ))}
        </div>
    );
}
