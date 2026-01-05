/* eslint-disable @typescript-eslint/no-explicit-any */
import CTASection from '@/components/modules/Home/CTASection';
import DivisionSection from '@/components/modules/Home/DivisionSection';
import RecentlyAddedTours from '@/components/modules/Home/RecentlyAddedTours';
import Hero from '@/components/modules/Home/Hero';
import TopToursSection from '@/components/modules/Home/TopTour/TopToursSection';
import WhyChooseUs from '@/components/modules/Home/WhyChooseUs';
import { getDiviosnStats, getNewTours, getTopTours } from '@/services/user/tour.services';
import { getMyWishlist } from '@/services/user/wishlist.service';
import { getUserRole } from '@/services/auth/getUserRole';


const HomePage = async () => {
    const wishlistIds = await getMyWishlist();
    const user = await getUserRole();
    const result = await getTopTours();
    const topTours = result?.data || [];

    const newTours = await getNewTours();

    const divisionStats = await getDiviosnStats();
    const divisionCounts = divisionStats.data.reduce((acc: any, cur: any) => {
        acc[cur.division] = cur.totalTours;
        return acc;
    }, {} as Record<string, number>);

    return (
        <div>
            <Hero></Hero>
            <WhyChooseUs></WhyChooseUs>
            <TopToursSection topTours={topTours} wishlistIds={wishlistIds} user={user} />
            <CTASection></CTASection>
            <RecentlyAddedTours newTours={newTours.data} wishlistIds={wishlistIds} user={user}></RecentlyAddedTours>
            <DivisionSection divisionCounts={divisionCounts} />
        </div>
    );
};

export default HomePage;