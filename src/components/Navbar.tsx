"use client";

import Link from 'next/link';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

const Navbar = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleToggleOffcanvas = () => {
    setShowOffcanvas(!showOffcanvas);
  };

  return (
    <nav className="flex justify-between items-center border-b border-black p-4">
      <div className="flex items-center">
        <button onClick={handleToggleOffcanvas}>
          <Bars3Icon className="h-6 w-6 text-gray-500" />
        </button>
        <div className="w-6 h-6 bg-white"></div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="border rounded-full py-1 px-3 pr-10 focus:outline-none focus:border-green-700"
          />
          <div className="absolute top-0 right-0 mt-2 mr-3">
            <button><MagnifyingGlassIcon className="h-5 w-5 text-gray-800" /></button>
          </div>
        </div>
      </div>
      <div className="hidden md:flex space-x-20">
        <Link href="/Home" passHref>
          <span className="font-bold text-lg hover:text-[#098C4C]">Home</span>
        </Link>
        <Link href="/Brands" passHref>
          <span className="font-bold text-lg hover:text-[#098C4C]">Brands</span>
        </Link>
        <Link href="/NewArrivals" passHref>
          <span className="font-bold text-lg hover:text-[#098C4C]">New Arrivals</span>
        </Link>
        <Link href="/All" passHref>
          <span className="font-bold text-lg hover:text-[#098C4C]">All</span>
        </Link>
        <Link href="/Trending" passHref>
          <span className="font-bold text-lg hover:text-[#098C4C]">Trending</span>
        </Link>
      </div>

      <div className="hidden md:flex items-center space-x-4">
        <button className="font-bold text-[#098C4C] py-2 px-4">Login</button>
        <span className="font-bold text-gray-800">|</span>
        <button className="font-bold text-black py-2 px-4">Register</button>
        <button><ShoppingCartIcon className="h-6 w-6 text-black" /></button>
      </div>

      {showOffcanvas && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 z-50">
          <div className="absolute inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl bg-[#2C2C2C]">
            <div className="flex justify-end">
              <button onClick={handleToggleOffcanvas} className="p-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="py-4 px-8">
              <p className="mt-4">
                <Link href="/Home" passHref>
                  <span className="font-bold text-lg text-white hover:text-[#098C4C]">Home</span>
                </Link>
                <br />
                <Link href="/Brands" passHref>
                  <span className="font-bold text-lg text-white hover:text-[#098C4C]">Brands</span>
                </Link>
                <br />
                <Link href="/All" passHref>
                  <span className="font-bold text-lg text-white hover:text-[#098C4C]">All</span>
                </Link>
                <br />
                <Link href="/Trending" passHref>
                  <span className="font-bold text-lg text-white hover:text-[#098C4C]">Trending</span>
                </Link>
                <br />
                <Link href="/New Arrival" passHref>
                  <span className="font-bold text-lg text-white hover:text-[#098C4C]">New Arrival</span>
                </Link>
                <br />
                <Link href="/Coming soon" passHref>
                  <span className="font-bold text-lg text-white hover:text-[#098C4C]">Coming soon</span>
                </Link>
                <br />
                <Link href="/Selling" passHref>
                  <span className="font-bold text-lg text-white hover:text-[#098C4C]">Selling</span>
                </Link>
                <br />
                <Link href="/Buying" passHref>
                  <span className="font-bold text-lg text-white hover:text-[#098C4C]">Buying</span>
                </Link>
              </p>
            </div>

            <div className="hidden md:flex items-center">
              <button className="font-bold text-lg text-[#098C4C] py-2 px-4">Login</button>
              <span className="font-bold text-white">|</span>
              <button className="font-bold text-lg text-white py-2 px-4">Register</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
