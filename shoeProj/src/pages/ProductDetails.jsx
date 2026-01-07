// import { useParams, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { useCart } from "../context/CartContext";
// import products from "../data/products";


// const ProductDetails = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const { addToCart } = useCart();

//     const product = products.find(p => p.id === Number(id));

//     const [size, setSize] = useState("");
//     const [qty, setQty] = useState(1);

//     if (!product) return null;

//     const price = Number(product.price.replace(/[^\d]/g, ""));

//     return (
//         <div className="container mt-5">
//             <button className="btn btn-link mb-3" onClick={() => navigate(-1)}>
//                 ← Back
//             </button>

//             <div className="row">
//                 <div className="col-md-6">
//                     <img
//                         src={product.images[0]}
//                         className="img-fluid"
//                         onClick={() => window.open(product.images[0], "_blank")}
//                     />
//                 </div>

//                 <div className="col-md-6">
//                     <h3>{product.name}</h3>
//                     <small>SKU: 000{product.id}</small>

//                     <h4 className="my-3">₦{price.toLocaleString()}</h4>

//                     <label className="fw-semibold">Size *</label>
//                     <select
//                         className="form-select mb-3"
//                         value={size}
//                         onChange={e => setSize(e.target.value)}
//                     >
//                         <option value="">Select</option>
//                         {[38, 39, 40, 41, 42, 43, 44, 45, 46,].map(s => (
//                             <option key={s} value={s}>{s}</option>
//                         ))}
//                     </select>

//                     <label className="fw-semibold">Quantity *</label>
//                     <div className="d-flex gap-3 mb-4">
//                         <button className="btn btn-outline-dark" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
//                         <span>{qty}</span>
//                         <button className="btn btn-outline-dark" onClick={() => setQty(q => q + 1)}>+</button>
//                     </div>

//                     <button
//                         className="btn btn-dark w-100"
//                         disabled={!size}
//                         onClick={() =>
//                             addToCart({
//                                 ...product,
//                                 price,
//                                 size,
//                                 quantity: qty,
//                             })
//                         }
//                     >
//                         Add to Cart
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductDetails;

