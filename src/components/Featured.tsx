"use client";

import React, { useState } from 'react';

export default function Featured() {
  const products = [
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
    { id: 3, name: 'Product 3' },
    { id: 4, name: 'Product 4' },
    { id: 5, name: 'Product 5' },
    { id: 6, name: 'Product 6' },
    { id: 7, name: 'Product 7' },
    { id: 8, name: 'Product 8' },
    { id: 9, name: 'Product 9' },
    { id: 10, name: 'Product 10' },
    { id: 11, name: 'Product 11' },
    { id: 12, name: 'Product 12' },
    { id: 13, name: 'Product 13' },
    { id: 14, name: 'Product 14' },
    { id: 15, name: 'Product 15' },
    { id: 16, name: 'Product 16' },
    { id: 17, name: 'Product 17' },
    { id: 18, name: 'Product 18' },
  ];

  const [scrollX, setScrollX] = useState(0);

  const scrollLeft = () => {
    setScrollX(scrollX - 1);
  };

  const scrollRight = () => {
    setScrollX(scrollX + 1);
  };

  const visibleProducts = products.slice(scrollX, scrollX + 18); // Toon 4 producten tegelijk

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 ml-4" style={{ color: '#098C4C' }}>
        New Arrivals
      </h1>
      <div className="flex overflow-x-hidden whitespace-nowrap"> {/* Hier voeg je de CSS-klasse toe */}
        {visibleProducts.map((product) => (
          <div
            key={product.id}
            className="w-48 h-48 border border-gray-300 m-4 inline-flex items-center justify-center font-bold text-xl"
            style={{ minWidth: '170px' }}
          >
            {product.name}
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-4" style={{ marginRight: '100px' }}>
        <button
          className="text-black font-bold py-2 px-4 rounded-full mr-4"
          onClick={scrollLeft}
          disabled={scrollX === 0}
        >
          🡠
        </button>
        <button
          className="text-black font-bold py-2 px-4 rounded-full"
          onClick={scrollRight}
          disabled={scrollX + 4 >= products.length}
        >
          🡢
        </button>
      </div>
    </div>
  );
}
