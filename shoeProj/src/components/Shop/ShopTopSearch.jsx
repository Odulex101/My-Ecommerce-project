import { FaSearch, FaUser } from "react-icons/fa";
import { useSearch } from "../../context/SearchContext";

const ShopTopSearch = () => {
    const { setSearchTerm } = useSearch();

    return (
        <div className="border-bottom py-2">
            <div className="container d-flex justify-content-between align-items-center">
                <div className="input-group w-50">
                    <span className="input-group-text bg-white">
                        <FaSearch />
                    </span>
                    <input
                        className="form-control"
                        placeholder="Search products..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <strong>FREE SHIPPING WORLDWIDE</strong>
                <FaUser />
            </div>
        </div>
    );
};

export default ShopTopSearch;
