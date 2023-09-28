import React from 'react';

const ProductList = () => {
  const products = [
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
    { id: 4, name: 'Product 3' },
    { id: 5, name: 'Product 4' },
    { id: 6, name: 'Product 5' },
    { id: 7, name: 'Product 6' },
    { id: 8, name: 'Product 7' },
    { id: 9, name: 'Product 8' },
    { id: 10, name: 'Product 9' },
    
  ];

  return (
    <div className="flex overflow-x-auto whitespace-nowrap">
      {products.map((product) => (
        <div key={product.id} className="w-48 h-48 border border-gray-300 m-4 inline-flex items-center justify-center font-bold text-xl">
          {product.name}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
