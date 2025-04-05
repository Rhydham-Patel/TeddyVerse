"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const newsArticles = [
  {
    id: 1,
    title: "TeddyVerse : Step Towards New Era",
    image: "/TeddyVerse.png",
    url: "/",
  },
  {
    id: 2,
    title: "TeddyBot : Your AI Companion",
    image: "/TeddyChat.png",
    url: "/TeddyBot",
  },
  {
    id: 3,
    title: "TeddyGenerate : Create Your Own Teddy",
    image: "/TeddyImage.png",
    url: "/TeddyGenerate",
  },
];

const PremiumNewsSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = newsArticles.length;

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-5xl mx-auto overflow-hidden p-4">
      {/* Slider Wrapper */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {newsArticles.map((article) => (
          <div key={article.id} className="w-full h-[70vh] flex-shrink-0 px-2">
            <a href={article.url} className="block group h-full">
              <div className="relative w-full h-full rounded-lg shadow-lg overflow-hidden transition-transform duration-500 group-hover:scale-105">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-white font-semibold text-lg">
                    {article.title}
                  </p>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white text-white p-2 rounded-full shadow-md hover:bg-gray-300 hover:text-black transition"
        onClick={prevSlide}
      >
        <ChevronLeft size={20} className="text-black"/>
      </button>
      <button
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white text-white p-2 rounded-full shadow-md hover:bg-gray-300 hover:text-black transition"
        onClick={nextSlide}
      >
        <ChevronRight size={20} className="text-black"/>
      </button>

      {/* Dots Navigation */}
      <div className="flex gap-2 justify-center mt-4 p-2">
        {newsArticles.map((_, index) => (
          <div
            key={index}
            className={`w-5 h-5 rounded-full transition-all ${
              index === activeIndex ? "bg-white" : "bg-gray-200"
            }`}>
            <div
            key={index}
            className={`w-3 h-3 rounded-full m-auto mt-1 transition-all ${
              index === activeIndex ? "bg-black" : "bg-gray-400"
            }`}
          />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PremiumNewsSlider;
