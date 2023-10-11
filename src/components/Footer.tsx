import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-gray-400 border-t border-black">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    

          {/* Navigation */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-semibold mb-4">Navigation</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/Catalog">Catalog</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          {/* Sneakers */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-semibold mb-4">Sneakers</h3>
            <ul>
              <li><a href="/">Nike</a></li>
              <li><a href="/">Air Jordan</a></li>
              <li><a href="/">Adidas </a></li>
              <li><a href="/">Yeezy</a></li>
              <li><a href="/">New Balance</a></li>
              <li><a href="/">All Sneakers</a></li>
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

        </div>
        
        {/* Copyright Text */}
        <div className="mt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Sole Market. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
