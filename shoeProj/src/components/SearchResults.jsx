import products from "../data/products";

const SearchResults = ({ searchTerm, close }) => {
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!searchTerm) return null;

    return (
        <div
            className="position-absolute bg-white shadow rounded mt-2 w-100"
            style={{ zIndex: 1055 }}
        >
            {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                    <div
                        key={product.id}
                        className="d-flex align-items-center gap-3 p-2 border-bottom search-item"
                        style={{ cursor: "pointer" }}
                        onClick={close}
                    >
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            width="40"
                            height="40"
                            className="rounded"
                        />
                        <div>
                            <div className="fw-semibold small">
                                {product.name}
                            </div>
                            <div className="text-muted small">
                                ${product.price}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="p-3 text-muted small">
                    No product found
                </div>
            )}
        </div>
    );
};

export default SearchResults;

