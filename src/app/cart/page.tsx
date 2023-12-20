"use client";
import { useState, useEffect } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { XCircleIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

interface CartItem {
    imageURL: string;
    name: string;
    price: number;
    brand: string;
} 

export default function ShoppingCart() {
    const [cart, setCart] = useState<Array<CartItem>>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [checkOutStatus, setCheckOutStatus] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedCart = localStorage.getItem("cart");
            if (storedCart) {
                setCart(JSON.parse(storedCart));
            }
        }
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    const removeFromCart = (indexToRemove: number) => {
        setCart(prevCart => {
            const newCart = prevCart.filter((item, index) => index !== indexToRemove);
            if (typeof window !== "undefined") {
                localStorage.setItem('cart', JSON.stringify(newCart));
            }
            return newCart;
        });
    };

    const calculateTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price, 0);
    };

    return (
        <div className="flex flex-col items-center justify-center mt-4">
            <h1 className="text-3xl font-bold mb-8">Shopping cart</h1>
            {isLoading ? (
                <div className="flex justify-center items-center space-x-5">
                    <div className="text-3xl text-bold">Loading</div>
                    <ArrowPathIcon className="animate-spin h-9 w-9" />
                </div>
            ) : cart.length > 0 ? (
                <div className="w-full max-w-2xl">
                    <table className="table-auto text-left w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th className="px-10">Price</th>
                                <th>Brand</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item: CartItem, index: number) => (
                                <tr key={index} className="center mb-4">
                                    <td>
                                        <img
                                            src={item.imageURL}
                                            alt={`Image of shoe ` + item.name}
                                            className="w-12 h-12"
                                        />
                                    </td>
                                    <td>{item.name}</td>
                                    <td className="px-10">€{item.price}</td>
                                    <td>{item.brand}</td>
                                    <td>
                                        <button onClick={() => removeFromCart(index)}>
                                            <XCircleIcon className="w-6 h-6 text-red-500 hover:opacity-50" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex flex-col items-center justify-center" >
                        <p className="mt-4 text-xl font-bold mb-4">
                            Total Price: €{calculateTotalPrice().toFixed(2)}
                        </p>
                        <button className=" flex justify-center bg-[#098C4C] hover:bg-[#246948] text-white text-xl py-2 px-4 rounded-lg ">
                            <ShoppingCartIcon className="h-5  mr-4 mt-1"  />
                            Check out
                        </button>
                    </div>
                </div>
            ) : (
                <p>Cart empty.</p>
            )}
        </div>
    );
}
