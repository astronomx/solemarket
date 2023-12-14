// CartPage.tsx

import React, { useState } from "react";
import Cart from "@/components/Cart"; // Adjust the path based on your project structure

const CartPage: React.FC = () => {
  const [cart, setCart] = useState<any[]>([]); // You can initialize the cart state based on your requirements

  return (
    <div>
      <h1>Your Cart</h1>
      <Cart cartItems={cart} />
      {/* Add other cart-related functionality here */}
    </div>
  );
};

export default CartPage;
