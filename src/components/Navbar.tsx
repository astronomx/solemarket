"use client";

import React, { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from 'next/link';
import { GetSession, GetUserEmail, GetLogOut } from '@/components/GetSession'
import Searchbar from '@/components/Searchbar'
import Cart from "./Cart";

export default function Navbar() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleToggleOffcanvas = () => {
    setShowOffcanvas(!showOffcanvas);
  };

  const [cart, setCart] = useState<any[]>([]); // Add cart state

  return (
    <nav className="flex justify-between items-center border-b bg-white border-black p-4 top-0 sticky z-10">
      <div className="flex items-center">
        <button onClick={handleToggleOffcanvas}>
          <Bars3Icon className="h-10 w-10 text-gray-500" />
        </button>
        <Searchbar/>
      </div>

      <div className="hidden md:flex flex-row justify-between self-center">
        <div className="flex px-5">
          <Link href="/" passHref>
            <span className="font-bold text-lg hover:text-[#098C4C] ease-in-out duration-200">Home</span>
          </Link>
        </div>
        <div className="flex px-5">
          <Link href="/catalog" passHref>
            <span className="font-bold text-lg hover:text-[#098C4C] focus:text-[#098C4C] ease-in-out duration-200">Catalog</span>
          </Link>
        </div>
      </div>

      {GetSession() ? (
        <div className="flex self-end items-center ease-in-out duration-200">
          <p className="text-[#098C4C] text-sm md:text-base hover:text-black py-2 px-4 ease-in-out duration-200">{GetUserEmail()}</p>
          <span className="font-bold text-gray-800">|</span>
          <Link href="/">
            <button className="font-bold hover:text-[#098C4C] py-2 px-4 ease-in-out duration-200" onClick={() => GetLogOut()}>
              Logout
            </button>
          </Link>
          <Cart cartItems={cart} /> {/* Display the cart component */}
        </div>
      ) : (
        <div className="text-lg flex self-end items-center ease-in-out duration-200">
          <Link href="/login">
            <button className="font-bold hover:text-[#098C4C] py-2 px-4 ease-in-out duration-200">Login</button>
          </Link>
          <span className="font-bold text-gray-800">|</span>
          <Link href="/register" className="font-bold hover:text-[#098C4C] py-2 px-4 ease-in-out duration-200">Register</Link>
          <Cart cartItems={cart} /> {/* Display the cart component */}
        </div>
      )}

      {showOffcanvas && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 z-50">
          <div className="absolute inset-y-0 left-0 max-w-xs w-full shadow-xl bg-[#2C2C2C]">
            <div className="flex justify-end">
              <button onClick={handleToggleOffcanvas} className="p-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="py-4 px-8">
              <div className="mt-4">
                <Link href="/" passHref>
                  <span className="font-bold text-lg text-white hover:text-[#098C4C]">Home</span>
                </Link>
                <br />
                <Link href="/" passHref>
                  <span className="font-bold text-lg text-white hover:text-[#098C4C]">Brands</span>
                </Link>
                <br />
                <Link href="/" passHref>
                  <span className="font-bold text-lg text-white hover.text-[#098C4C]">New Arrivals</span>
                </Link>
                <br />
                <Link href="/catalog" passHref>
                  <span className="font-bold text-lg text-white hover:text-[#098C4C]">Catalogue</span>
                </Link>
                <br />
                <Link href="/" passHref>
                  <span className="font-bold text-lg text-white hover:text-[#098C4C]">Trending</span>
                </Link>
                <br />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
