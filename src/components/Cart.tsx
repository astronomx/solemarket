// Cart.tsx

"use client";

import React from "react";

interface CartProps {
  cartItems: any[];
}

const Cart: React.FC<CartProps> = ({ cartItems }) => {
  return (
    <div className="fixed top-0 right-0 bg-white p-4 shadow-lg">
      <h2 className="text-lg font-bold mb-2">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;

