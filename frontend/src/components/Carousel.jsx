import Slider from 'react-slick';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Nossas setinhas!
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import slide1 from '../assets/carrosel1.jpg';
import slide2 from '../assets/carrosel2.jpg';
import slide3 from '../assets/carrosel3.jpg';

// 1. Criando a Seta da Esquerda customizada
const SetaEsquerda = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-[#39d639] text-white hover:text-black p-3 rounded-full backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100"
    >
      <ChevronLeft size={32} />
    </button>
  );
};

// 2. Criando a Seta da Direita customizada
const SetaDireita = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-[#39d639] text-white hover:text-black p-3 rounded-full backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100"
    >
      <ChevronRight size={32} />
    </button>
  );
};

export function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, 
    arrows: true,         
    prevArrow: <SetaEsquerda />, 
    nextArrow: <SetaDireita />,
  };

  const slides = [
    { id: 1, image: slide1, alt: 'Times Europeus 26/27' },
    { id: 2, image: slide2, alt: 'Camisetas Exclusivas' },
    { id: 3, image: slide3, alt: 'Novas Coleções' },
  ];

  return (
    // Colocamos o "group" aqui para fazer o efeito das setas aparecerem no hover
    <div className="carousel-container bg-black w-full overflow-hidden relative group">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="relative outline-none">
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-[450px] md:h-[600px] object-cover object-center"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}