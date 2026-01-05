// import { useEffect, useRef } from "react";
// import ProductCard from "./ProductCard";
// import "./FeaturedProducts.css";

// const products = [
//     { id: 1, name: "Beautiful Quality Black Classy Heel", price: "#21,500", reviews: 165, rating: 5, badge: "READY", images: ["/shoes/2a.jpeg"] },
//     { id: 2, name: "Beautiful Quality Gold Classy Heel", price: "#21,500", reviews: 7, rating: 4, badge: "READY", images: ["/shoes/2.jpeg"] },
//     { id: 3, name: "Beautiful Quality Loafer for Men", price: "#25,000", reviews: 154, rating: 5, badge: "READY", images: ["/shoes/3.jpg"] },
//     { id: 4, name: "Beautiful Quality Footwear", price: "#15,000", reviews: 3, rating: 4, badge: "READY", images: ["/shoes/4.jpeg"] },
//     { id: 5, name: "Handcrafted Elegance Leather Shoe", price: "#35,000", reviews: 3, rating: 4, badge: "READY", images: ["/shoes/5.jpeg"] },
//     { id: 6, name: "Handcrafted Men Fashion Leather Shoe", price: "#35,000", reviews: 3, rating: 4, badge: "READY", images: ["/shoes/6.jpeg"] },
//     { id: 7, name: "The Bespoke Loafer", price: "#40,000", reviews: 3, rating: 4, badge: "READY", images: ["/shoes/7.jpeg"] },
//     { id: 8, name: "Quality Deelux Leather Slipper", price: "#17,000", reviews: 3, rating: 4, badge: "READY", images: ["/shoes/8.jpeg"] },
//     { id: 9, name: "Beautiful Quality Black Shoe", price: "#60,000", reviews: 3, rating: 4, badge: "READY", images: ["/shoes/9.jpeg"] },
//     { id: 10, name: "New Men Casual Shoe", price: "#45,000", reviews: 3, rating: 4, badge: "READY", images: ["/shoes/10.jpeg"] },
// ];

// const loopProducts = [...products, ...products];

// const FeaturedProducts = () => {
//     const sliderRef = useRef(null);
//     const isDragging = useRef(false);
//     const startX = useRef(0);
//     const scrollStart = useRef(0);

//     /* ================= AUTO SCROLL ================= */
//     useEffect(() => {
//         const slider = sliderRef.current;
//         let raf;
//         const speed = 0.5; // adjust scrolling speed

//         const autoScroll = () => {
//             if (!isDragging.current) {
//                 slider.scrollLeft += speed;

//                 // loop seamlessly
//                 if (slider.scrollLeft >= slider.scrollWidth / 2) {
//                     slider.scrollLeft -= slider.scrollWidth / 2;
//                 }
//             }
//             raf = requestAnimationFrame(autoScroll);
//         };

//         raf = requestAnimationFrame(autoScroll);

//         return () => cancelAnimationFrame(raf);
//     }, []);

//     /* ================= DRAG ================= */
//     const startDrag = (e) => {
//         isDragging.current = true;
//         sliderRef.current.classList.add("dragging");
//         startX.current = e.pageX || e.touches[0].pageX;
//         scrollStart.current = sliderRef.current.scrollLeft;
//     };

//     const onDrag = (e) => {
//         if (!isDragging.current) return;
//         const x = e.pageX || e.touches[0].pageX;
//         sliderRef.current.scrollLeft = scrollStart.current + (startX.current - x);
//     };

//     const stopDrag = () => {
//         isDragging.current = false;
//         sliderRef.current.classList.remove("dragging");
//     };

//     return (
//         <section className="container-fluid my-5 featured-section">
//             <div className="d-flex justify-content-between align-items-center mb-4">
//                 <button className="nav-arrow">‹</button>
//                 <h5 className="fw-semibold">BEST SELLERS</h5>
//                 <button className="nav-arrow">›</button>
//             </div>

//             <div
//                 ref={sliderRef}
//                 className="featured-scroll"
//                 onMouseDown={startDrag}
//                 onMouseMove={onDrag}
//                 onMouseUp={stopDrag}
//                 onMouseLeave={stopDrag}
//                 onTouchStart={startDrag}
//                 onTouchMove={onDrag}
//                 onTouchEnd={stopDrag}
//             >
//                 {loopProducts.map((product, index) => (
//                     <ProductCard key={index} product={product} />
//                 ))}
//             </div>
//         </section>
//     );
// };

// export default FeaturedProducts;


import { useEffect, useRef } from "react";
import ProductCard from "./ProductCard";
import "./FeaturedProducts.css";

const products = [
    { id: 1, name: "Beautiful Quality Black Classy Heel", price: "#21,500", reviews: 165, rating: 5, badge: "READY", images: ["/shoes/2a.jpeg"] },
    { id: 2, name: "Beautiful Quality Gold Classy Heel", price: "#21,500", reviews: 7, rating: 4, badge: "READY", images: ["/shoes/2.jpeg"] },
    { id: 3, name: "Beautiful Quality Loafer for Men", price: "#25,000", reviews: 154, rating: 5, badge: "READY", images: ["/shoes/3.jpg"] },
    { id: 4, name: "Beautiful Quality Footwear", price: "#15,000", reviews: 3, rating: 4, badge: "READY", images: ["/shoes/4.jpeg"] },
    { id: 5, name: "Handcrafted Elegance Leather Shoe", price: "#35,000", reviews: 3, rating: 4, badge: "READY", images: ["/shoes/5.jpeg"] },
    { id: 6, name: "Handcrafted Men Fashion Leather Shoe", price: "#35,000", reviews: 3, rating: 4, badge: "READY", images: ["/shoes/6.jpeg"] },
    { id: 7, name: "The Bespoke Loafer", price: "#40,000", reviews: 3, rating: 4, badge: "READY", images: ["/shoes/7.jpeg"] },
    { id: 8, name: "Quality Deelux Leather Slipper", price: "#17,000", reviews: 3, rating: 4, badge: "READY", images: ["/shoes/8.jpeg"] },
    { id: 9, name: "Beautiful Quality Black Shoe", price: "#60,000", reviews: 3, rating: 4, badge: "READY", images: ["/shoes/9.jpeg"] },
    { id: 10, name: "New Men Casual Shoe", price: "#45,000", reviews: 3, rating: 4, badge: "READY", images: ["/shoes/10.jpeg"] },
];

const loopProducts = [...products, ...products];

const FeaturedProducts = () => {
    const sliderRef = useRef(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollStart = useRef(0);

    useEffect(() => {
        const slider = sliderRef.current;
        let raf;
        const speed = 0.5;

        const autoScroll = () => {
            if (!isDragging.current) {
                slider.scrollLeft += speed;
                if (slider.scrollLeft >= slider.scrollWidth / 2) {
                    slider.scrollLeft -= slider.scrollWidth / 2;
                }
            }
            raf = requestAnimationFrame(autoScroll);
        };

        raf = requestAnimationFrame(autoScroll);
        return () => cancelAnimationFrame(raf);
    }, []);

    const startDrag = (e) => {
        isDragging.current = true;
        startX.current = e.pageX || e.touches[0].pageX;
        scrollStart.current = sliderRef.current.scrollLeft;
    };

    const onDrag = (e) => {
        if (!isDragging.current) return;
        const x = e.pageX || e.touches[0].pageX;
        sliderRef.current.scrollLeft = scrollStart.current + (startX.current - x);
    };

    const stopDrag = () => {
        isDragging.current = false;
    };

    return (
        <section className="container-fluid my-5 featured-section">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <button className="nav-arrow">‹</button>
                <h5 className="fw-semibold">BEST SELLERS</h5>
                <button className="nav-arrow">›</button>
            </div>

            <div
                ref={sliderRef}
                className="featured-scroll"
                onMouseDown={startDrag}
                onMouseMove={onDrag}
                onMouseUp={stopDrag}
                onMouseLeave={stopDrag}
                onTouchStart={startDrag}
                onTouchMove={onDrag}
                onTouchEnd={stopDrag}
            >
                {loopProducts.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>
        </section>
    );
};

export default FeaturedProducts;








