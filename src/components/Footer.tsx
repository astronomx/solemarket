"use client";
import React, { useEffect, useState } from 'react';
import { ImFacebook2 } from "react-icons/im";
import { BsInstagram } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link"
import { GetSession, GetUserEmail, GetLogOut } from '@/components/GetSession'

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
    <footer className="text-black border-t border-black py-4 px-8 mt-10">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
            <h3 className="text-xl font-semibold mb-4">Policy</h3>
            <ul>
              <li><a href="/">Terms</a></li>
              <li><a href="/">Privacy</a></li>
              <li><a href="/">Contact</a></li>
              <li><a href="/">About Us</a></li>
            </ul>
          </div>

          {/* My Account */}
          {GetSession() ? (
            <div className="md:col-span-1">
              <h3 className="text-xl font-semibold mb-4">My Account</h3>
              <ul>
                <li><p className='text-[#098C4C] hover:text-black ease-in-out duration-200'>{GetUserEmail()}</p></li>
                <button className="hover:text-[#098C4C] ease-in-out duration-200" onClick={() => GetLogOut()}>
                  Logout
                </button>
              </ul>
            </div>
          ) : (
            <div className="md:col-span-1">
              <h3 className="text-xl font-semibold mb-4">My Account</h3>
              <ul>
                <li><Link href="/login">Log in</Link></li>
                <li><Link href="/register">Register</Link></li>
              </ul>
            </div>
          )}

          {/* Social icons */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-semibold mb-4">Social Media</h3>
            <div className="flex gap-6">
              <a href="/" className="text-blue-600 hover:text-blue-800">
                <ImFacebook2 className="text-2xl" />
              </a>
              <a href="/" className="text-pink-600 hover:text-pink-800">
                <BsInstagram className="text-2xl" />
              </a>
              <a href="/" className="text-black hover:text-gray-600">
                <FaXTwitter className="text-2xl" />
              </a>
            </div>
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
          <div>
            &copy; {new Date().getFullYear()} Sole Market. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
