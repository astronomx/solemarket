import React from 'react';

export default function Hero() {
  return (
    <>
      <div className="flex flex-row snap-x snap-mandatory overflow-scroll w-[100vw] h-[50vh]">
        <div className="flex items-center justify-center flex-shrink-0 snap-center w-screen ">
          <img src="images/carousel/banner.jpg" alt="carasoul-item" className="rounded-lg drop-shadow-xl w-[40vw] h-[45vh]" />
        </div>
        <div className="flex items-center justify-center flex-shrink-0 snap-center w-screen ">
          <img src="images/carousel/urban-model.jpg" alt="carasoul-item" className="rounded-lg drop-shadow-xl w-[40vw] h-[45vh]" />
        </div>
        <div className="flex items-center justify-center flex-shrink-0 snap-center w-screen ">
          <img src="images/carousel/air-max.jpg" alt="carasoul-item" className="rounded-lg drop-shadow-xl w-[40vw] h-[45vh]" />
        </div>
        <div className="flex items-center justify-center flex-shrink-0 snap-center w-screen ">
          <img src="images/carousel/pixar-shoe.jpg" alt="carasoul-item" className="rounded-lg drop-shadow-xl w-[40vw] h-[45vh]" />
        </div>
        <div className="flex items-center justify-center flex-shrink-0 snap-center w-screen ">
          <img src="images/carousel/shoe-and-star.jpg" alt="carasoul-item" className="rounded-lg drop-shadow-xl w-[40vw] h-[45vh]" />
        </div>
      </div>
    </>
  );
}
