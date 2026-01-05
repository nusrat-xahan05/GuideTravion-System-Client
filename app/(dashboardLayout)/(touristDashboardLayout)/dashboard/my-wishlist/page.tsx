import TopTourCard from "@/components/modules/Home/TopTour/TopTourCard";
import WishlistHeader from "@/components/modules/Tourist/TouristWishlist/WishlistHeader";
import { Separator } from "@/components/ui/separator";
import { getUserRole } from "@/services/auth/getUserRole";
import { getMyAllWishlist, getMyWishlist } from "@/services/user/wishlist.service";
import { ITour } from "@/types/tour.interface";



const TouristMyWishlistPage = async () => {
    const wishlistIds = await getMyWishlist();
    const user = await getUserRole();
    const wishlistResult = await getMyAllWishlist();

    const wishlistTours: ITour[] = wishlistResult?.data?.wishlistTours;

    return (
        <div className="space-y-6">
            <WishlistHeader />

            <Separator></Separator>

            {
                wishlistTours.length ?
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 items-stretch">
                        {wishlistTours.map((tour, index) => (
                            <TopTourCard key={tour._id} tour={tour} wishlistIds={wishlistIds} user={user} index={index} />
                        ))}
                    </div>
                    :
                    <p>No Wishlist Found</p>
            }

        </div>
    );
};

export default TouristMyWishlistPage;
