import { Carousel, Button } from "react-bootstrap";
import "./Hero.css";

const slides = [
    { image: "/images/image1.jpg", title: "BEHIND EVERY SHOES IS A STORY", subtitle: "In stock, ready to ship", cta: "SHOP NOW" },
    { image: "/images/image2.jpg", title: "ENGINEERED FOR LIFE", subtitle: "Limited release", cta: "DISCOVER" },
    { image: "/images/image3.jpg", title: "BUILT DIFFERENT", subtitle: "Crafted to age", cta: "VIEW COLLECTION" },
    { image: "/images/image4.jpg", title: "TIMELESS DESIGNS", subtitle: "Worldwide delivery", cta: "EXPLORE" },
];


const Hero = () => {
    return (
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
                            <h1 className="hero-title">
                                {slide.title}
                            </h1>
                            <Button
                                variant="outline-light"
                                className="hero-btn"
                            >
                                {slide.cta}
                            </Button>
                        </div>
                    </div>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default Hero;


