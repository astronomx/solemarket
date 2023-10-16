'use client';

import React, { useState } from 'react';

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

  return (
    <>
      <div className="relative">
        <div className="flex flex-row snap-x snap-mandatory overflow-scroll w-full h-[50vh]">
          {images.map((image, index) => (
            <div key={index} className={`flex items-center justify-center flex-shrink-0 snap-center w-screen transition-opacity duration-500 ${index === currentIndex ? 'opacity-100' : 'opacity-0 hidden'}`}>
              <img src={image} alt={`carousel-item-${index}`} className="rounded-lg drop-shadow-xl 2xl:w-[40vw] h-[45vh] sm:w-[350px] h-[200px] md:w-[70vw] h-[40vh] lg:w-[50vw] h-[30vh] xl:w-[50vw] h-[30vh]" />
            </div>
          ))}
        </div>
        <button onClick={prevImage} className="absolute top-1/2 left-4 transform -translate-y-1/2"><ArrowLeftCircleIcon className="w-9 h-9" /></button>
        <button onClick={nextImage} className="absolute top-1/2 right-4 transform -translate-y-1/2"><ArrowRightCircleIcon className="w-9 h-9" /></button>
      </div>
    </>
  );
}
