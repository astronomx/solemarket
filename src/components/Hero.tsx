'use client';

import React, { useState, useEffect } from 'react';

import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/24/outline";

export default function Hero() {
  const images = [
    "images/carousel/banner.jpg",
    "images/carousel/urban-model.jpg",
    "images/carousel/air-max.jpg",
    "images/carousel/pixar-shoe.jpg",
    "images/carousel/shoe-and-star.jpg"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [currentIndex]);

  return (
    <>
      <div className="relative">
        <div className="flex flex-row snap-x snap-mandatory overflow-hidden w-full h-[55vh]">
          {images.map((image, index) => (
            <div
              key={index}
              className={`flex items-center justify-center flex-shrink-0 snap-center w-screen transition-opacity duration-1000 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0 hidden'
              }`}
            >
              <img
                src={image}
                alt={`carousel-item-${index}`}
                className="rounded-lg drop-shadow-xl object-contain"
              />
            </div>
          ))}
        </div>
        <button onClick={prevImage} className="absolute top-[95%] left-4 transform -translate-y-1/2"><ArrowLeftCircleIcon className="w-9 h-9 hover:text-[#098C4C] ease-in-out duration-200" /></button>
        <button onClick={nextImage} className="absolute top-[95%] right-4 transform -translate-y-1/2"><ArrowRightCircleIcon className="w-9 h-9 hover:text-[#098C4C] ease-in-out duration-200" /></button>
      </div>
    </>
  );
}