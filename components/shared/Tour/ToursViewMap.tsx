"use client";

import { ITour } from "@/types/tour.interface";
import TourCard from "./TourCard";
import { IUser } from "@/types/user.interface";


const ToursViewMap = ({ tours, userInfo }: { tours: ITour[], userInfo:IUser }) => {
    return (
        <div className="space-y-4">
            {tours.length === 0 ? (
                <p className="text-center text-gray-500">No Tours Exist</p>
            ) : (
                tours.map((tour: ITour) => (
                    <TourCard key={tour._id} tour={tour} userInfo={userInfo} />
                ))
            )}
        </div>
    );
};

export default ToursViewMap;
