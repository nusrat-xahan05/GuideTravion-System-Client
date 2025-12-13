import FeaturedTours from '@/components/modules/Home/FeaturedTours';
import Hero from '@/components/modules/Home/Hero';
import TopDestinations from '@/components/modules/Home/TopDestinations';
import WhyChooseUs from '@/components/modules/Home/WhyChooseUs';
import { queryStringFormatter } from '@/lib/formatters';
import { getAllActiveApprovedTours } from '@/services/user/tour.services';


const HomePage = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);

    const result = await getAllActiveApprovedTours(queryString);
    const topTours = result?.data?.data || [];

    return (
        <div>
            <Hero></Hero>
            <TopDestinations topTours={topTours} />
            <FeaturedTours></FeaturedTours>
            <WhyChooseUs></WhyChooseUs>
        </div>
    );
};

export default HomePage;