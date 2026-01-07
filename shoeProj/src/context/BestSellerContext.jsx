import { createContext, useContext, useState } from "react";

const BestSellerContext = createContext();

export const BestSellerProvider = ({ children }) => {
    const [showBestSellers, setShowBestSellers] = useState(true);

    return (
        <BestSellerContext.Provider value={{ showBestSellers, setShowBestSellers }}>
            {children}
        </BestSellerContext.Provider>
    );
};

export const useBestSeller = () => {
    return useContext(BestSellerContext);
};
