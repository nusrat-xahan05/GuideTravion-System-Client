"use client";

import { ITour } from "@/types/tour.interface";
import GuideTourCard from "./GuideTourCard";



const GuideToursView = ({ tours }: { tours: ITour[] }) => {


    return (
        <div className="space-y-4">
            {tours.length === 0 ? (
                <p className="text-center text-gray-500">No Tours Exist</p>
            ) : (
                tours.map((tour: ITour) => (
                    <GuideTourCard key={tour._id} tour={tour} />
                ))
            )}
        </div>
    );
};

export default GuideToursView;
