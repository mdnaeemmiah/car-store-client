import Carousels from "@/components/layout/shared/Carousels";
import CustomerReviewBanner from "@/components/layout/shared/CustomerReviewBanner";
import HomeAccordion from "@/components/layout/shared/HomeAccordion";


const Home = () => {
    return (
        <div>
            <Carousels></Carousels>
            <CustomerReviewBanner></CustomerReviewBanner>
            <HomeAccordion></HomeAccordion>
        </div>
    );
};

export default Home;