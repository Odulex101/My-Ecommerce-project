import { Carousel, Button } from "react-bootstrap";
import "./Hero.css";

const slides = [
    { image: "/images/image1.jpg", title: "BEHIND EVERY SHOES IS A STORY", subtitle: "In stock, ready to ship", cta: "" },
    { image: "/images/image2.jpg", title: "ENGINEERED FOR LIFE", subtitle: "Limited release", cta: "" },
    { image: "/images/image3.jpg", title: "BUILT DIFFERENT", subtitle: "Crafted to age", cta: "" },
    { image: "/images/image4.jpg", title: "TIMELESS DESIGNS", subtitle: "Worldwide delivery", cta: "EXPLORE" },
];

const Hero = () => {
    return (
        <>
            {/* ================== CAROUSEL ================== */}
            <Carousel
                fade
                controls={false}
                indicators
                interval={5000}
                pause={false}
                className="hero-carousel"
            >
                {slides.map((slide, index) => (
                    <Carousel.Item key={index}>
                        <div
                            className="hero-slide"
                            style={{
                                backgroundImage: `url(${slide.image})`,
                            }}
                        >
                            <div className="hero-overlay">
                                <small className="text-uppercase tracking">
                                    {slide.subtitle}
                                </small>
                                <h1 className="hero-title">{slide.title}</h1>
                                <Button variant="outline-light" className="hero-btn">
                                    {slide.cta}
                                </Button>
                            </div>
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>

            {/* ================== VIDEO SECTION ================== */}
            <div
                className="video-section my-5"
                style={{
                    backgroundColor: "#000",
                    position: "relative",
                    width: "100%",
                    paddingBottom: "56.25%",
                    overflow: "hidden",
                    borderRadius: "12px",
                }}
            >
                <video
                    src="public/videos/My-Video.mp4" 
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
            </div>
        </>
    );
};

export default Hero;






