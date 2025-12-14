import CTASection from '@/components/modules/Home/CTASection';
import FeaturedTours from '@/components/modules/Home/FeaturedTours';
import Hero from '@/components/modules/Home/Hero';
import TopToursSection from '@/components/modules/Home/TopTour/TopToursSection';
import WhyChooseUs from '@/components/modules/Home/WhyChooseUs';
import { queryStringFormatter } from '@/lib/formatters';
import { getTopTours } from '@/services/user/tour.services';


const HomePage = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);

    const result = await getTopTours();
    const topTours = result?.data || [];

    return (
        <div>
            <Hero></Hero>
            <WhyChooseUs></WhyChooseUs>
            <TopToursSection topTours={topTours} />
            <CTASection></CTASection>
            <FeaturedTours></FeaturedTours>
        </div>
    );
};

export default HomePage;