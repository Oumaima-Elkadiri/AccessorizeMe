import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const SlideItem = styled.div`
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  position: relative;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 85vh;
  animation: ${fadeIn} 2s ease-in-out;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  z-index: 1;
`;

const Subtitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 300;
  max-width: 600px;
  text-align: center;
  z-index: 1;
`;

const Indicators = styled.div`
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
`;

const Indicator = styled.button`
  width: 12px;
  height: 12px;
  background-color: ${({ active }) => (active ? '#fff' : '#aaa')};
  border: none;
  border-radius: 50%;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #fff;
  }
`;

function Slider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    {
      image: "https://i.pinimg.com/564x/0f/26/a0/0f26a028b3bfcf4916f2f19590b0f58b.jpg",
      title: "Mode et Accessoires",
      subtitle: "Redécouvrez la mode. Styles tendance et intemporels pour tous les goûts !"
    },
    {
      image: "https://i.pinimg.com/564x/42/44/a8/4244a87156ce73a03a18f34f13915251.jpg",
      title: "Produits en Promotion",
      subtitle: "Ne ratez pas nos promotions ! -50% sur une sélection d'articles."
    },
    {
      image: "https://i.pinimg.com/564x/3d/a2/44/3da244a26f3946a6927becef1bdce41d.jpg",
      title: "Livraison Gratuite",
      subtitle: "Les meilleurs prix de la saison ! Saisissez-les avant qu’il ne soit trop tard."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000); 

    return () => clearInterval(interval); 
  }, [slides.length]);

  const handleIndicatorClick = (index) => {
    setActiveSlide(index);
  };

  return (
    <div id="carouselExampleAutoplaying" className="carousel slide position-relative">
      <div className="carousel-inner">
        {slides.map((slide, index) => (
          <div key={index} className={`carousel-item ${index === activeSlide ? "active" : ""}`}>
            <SlideItem image={slide.image}>
              <Overlay />
              <Title>{slide.title}</Title>
              <Subtitle>{slide.subtitle}</Subtitle>
            </SlideItem>
          </div>
        ))}
      </div>

      <Indicators>
        {slides.map((_, index) => (
          <Indicator
            key={index}
            active={index === activeSlide}
            onClick={() => handleIndicatorClick(index)}
          />
        ))}
      </Indicators>
    </div>
  );
}

export default Slider;
