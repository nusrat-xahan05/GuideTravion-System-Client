import FeaturedTours from '@/components/modules/Home/FeaturedTours';
import Hero from '@/components/modules/Home/Hero';
import TopDestinations from '@/components/modules/Home/TopDestinations';
import WhyChooseUs from '@/components/modules/Home/WhyChooseUs';

export default function HomePage() {
    return (
        <div>
            <Hero></Hero>
            <TopDestinations></TopDestinations>
            <FeaturedTours></FeaturedTours>
            <WhyChooseUs></WhyChooseUs>
        </div>
    );
};