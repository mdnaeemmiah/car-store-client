
import { CarCarousel } from "@/components/layout/shared/CarCarousel";
import Carousels from "@/components/layout/shared/Carousels";
import CustomerReviewBanner from "@/components/layout/shared/CustomerReviewBanner";
import Hero from "@/components/layout/shared/Hero";
import HomeAccordion from "@/components/layout/shared/HomeAccordion";


const Home = () => {
    return (
        <div>
            <Carousels></Carousels>
            <HomeAccordion></HomeAccordion>
           <CarCarousel></CarCarousel>
            <CustomerReviewBanner></CustomerReviewBanner>
            <Hero></Hero>
        </div>
    );
};

export default Home;