import DashboardHeader from "../components/DashboardHeader";
import ShopTopSearch from "../components/Shop/ShopTopSearch";
import ShopNavBar from "../components/Shop/ShopNavBar";
import BestSellers from "../components/Shop/BestSellers";

import { ReviewProvider } from "../context/ReviewContext";
import { BestSellerProvider, useBestSeller } from "../context/BestSellerContext";

const ShopBody = () => {
    const { showBestSellers } = useBestSeller();
    if (!showBestSellers) return null;
    return <BestSellers />;
};

const Shop = () => {
    return (
        <BestSellerProvider>
            <ReviewProvider>
                <DashboardHeader />
                <ShopTopSearch />
                <ShopNavBar />
                <ShopBody />
            </ReviewProvider>
        </BestSellerProvider>
    );
};

export default Shop;










