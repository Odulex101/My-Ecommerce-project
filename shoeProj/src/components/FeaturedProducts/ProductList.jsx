import products from "../data/products";

const ProductList = ({ searchTerm }) => {
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mt-4">
            <div className="row">
                {filteredProducts.map(product => (
                    <div key={product.id} className="col-md-3 col-sm-6 mb-4">
                        <div className="card h-100">
                            <img
                                src={product.images[0]}
                                className="card-img-top"
                                alt={product.name}
                            />
                            <div className="card-body">
                                <h6>{product.name}</h6>
                                <p className="text-muted">{product.price}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;

