"use client";
import React, { useEffect, useState } from 'react';

const Footer: React.FC = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className="text-black border-t border-black py-4 px-8">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Sneakers */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-semibold mb-4">Sneakers</h3>
            <ul>
              <li><a href="/">Nike</a></li>
              <li><a href="/">Air Jordan</a></li>
              <li><a href="/">Adidas</a></li>
              <li><a href="/">Yeezy</a></li>
              <li><a href="/">New Balance</a></li>
              <li><a href="/">All Sneakers</a></li>
            </ul>
          </div>

          {/* Frequently Asked Questions */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-semibold mb-4">FAQ</h3>
            <ul>
              <li><a href="/">Are all the sneakers new?</a></li>
              <li><a href="/">How can I buy a product?</a></li>
              <li><a href="/">What is the delivery time?</a></li>
              <li><a href="/">Exchange and returns</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-semibold mb-4">Customer Service</h3>
            <ul>
              <li><a href="/">Ask your question</a></li>
              <li><a href="/">Contact</a></li>
              <li><a href="/">About Us</a></li>
            </ul>
          </div>

          {/* My Account */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-semibold mb-4">My Account</h3>
            <ul>
              <li><a href="/">Log in</a></li>
              <li><a href="/">Register</a></li>
            </ul>
          </div>
        </div>

        {showScrollButton && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-4 right-4 p-2 bg-black text-white rounded-full w-10 h-10 cursor-pointer hover:bg-[#098C4C]"
          >
            🡩
          </button>
        )}

        <div className="mt-8 text-center">
          <div className="flex justify-between items-center">
            <div>
              <a href="/terms" className="mr-2">Terms</a>
              <a href="/privacy" className="ml-2">Privacy</a>
            </div>
            <div>
              &copy; {new Date().getFullYear()} Sole Market. All rights reserved.
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
