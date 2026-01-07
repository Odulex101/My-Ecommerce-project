import products from "../../data/products";
import ProductCard from "./ProductCard";
import { useSearch } from "../../context/SearchContext";



const BestSellers = () => {
    const { searchTerm } = useSearch();

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mt-5">
            <h5 className="text-center mb-4">BEST SELLERS</h5>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
                {filteredProducts.map(p => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </div>
    );
};

export default BestSellers;

