import { useSearch } from "../context/SearchContext";
import products from "../data/products";
import ProductCard from "./FeaturedProducts/ProductCard";

const SearchResultsDisplay = () => {
    const { searchTerm } = useSearch();

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!searchTerm) return null;

    return (
        <div className="container my-5">
            <h2>Search Results for "{searchTerm}"</h2>
            {filteredProducts.length > 0 ? (
                <div className="row">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="col-md-4 mb-4">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            ) : (
                <p>No products found.</p>
            )}
        </div>
    );
};

export default SearchResultsDisplay;