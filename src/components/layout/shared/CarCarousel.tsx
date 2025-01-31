import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Slide {
  image: string;
  title: string;
  description: string;
}

const slides: Slide[] = [
  {
    image: "src/assets/images/img13.jpeg",
    title: "Luxury Car",
    description: "Experience the ultimate luxury with our premium model Uniquely unleash pandemic markets via e-business applications. Collaboratively initiate interoperable technologies whereas bleeding-edge sources. .",
  },
  {
    image: "src/assets/images/img12.jpeg",
    title: "Sports Edition",
    description: "High-speed performance for the thrill-seekersUniquely unleash pandemic markets via e-business applications. Collaboratively initiate interoperable technologies whereas bleeding-edge sources. .",
  },
  {
    image: "src/assets/images/img11.avif",
    title: "SUV Model",
    description: "Spacious and comfortable for all your family adventuresUniquely unleash pandemic markets via e-business applications. Collaboratively initiate interoperable technologies whereas bleeding-edge sources. .",
  },
  {
    image: "src/assets/images/img10.avif",
    title: "Electric Car",
    description: "Eco-friendly driving with the latest technology Uniquely unleash pandemic markets via e-business applications. Collaboratively initiate interoperable technologies whereas bleeding-edge sources. .",
  },
  {
    image: "src/assets/images/img6.avif",
    title: "Convertible",
    description: "Feel the wind with our stylish convertible Uniquely unleash pandemic markets via e-business applications. Collaboratively initiate interoperable technologies whereas bleeding-edge sources.  collection.",
  },
];

export function CarCarousel() {
  const plugin = React.useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  return (
    <div className="flex flex-col items-center">
      {/* Centered Title */}
      <h2 className="text-3xl font-bold text-[#1677FF] text-center my-10 drop-shadow-lg">
        Get More Known About Us
      </h2>

      {/* Carousel Container */}
      <div className="w-full max-w-[1100px] flex justify-center">
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={index}>
                <Card className="overflow-hidden shadow-lg h-[600px] flex flex-col justify-between">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-[400px] object-cover rounded-lg"
                    />
                    <h3 className="text-xl font-bold mt-4">{slide.title}</h3>
                    <p className="text-gray-600">{slide.description}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
