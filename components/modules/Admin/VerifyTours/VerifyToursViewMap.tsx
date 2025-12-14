"use client";

import { ITour } from "@/types/tour.interface";
import VerifyTourCard from "./VerifyTourCard";


const VerifyToursViewMap = ({ tours }: { tours: ITour[] }) => {
    return (
        <div className="space-y-4">
            {tours.length === 0 ? (
                <p className="text-center text-gray-500">No Tours Exist</p>
            ) : (
                tours.map((tour: ITour) => (
                    <VerifyTourCard key={tour._id} tour={tour} />
                ))
            )}
        </div>
    );
};

export default VerifyToursViewMap;
