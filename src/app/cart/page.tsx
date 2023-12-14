"use client";
import { useState, useEffect } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { XCircleIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

export default function ShoppingCart() {
    const [cart, setCart] = useState<{}[]>([]);
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

        return () => clearTimeout(timer); // This will clear the timer when the component unmounts
    }, []); // Run only on initial mount

    const removeFromCart = (indexToRemove: number) => {
        setCart(prevCart => {
            const newCart = prevCart.filter((item, index) => index !== indexToRemove);
            if (typeof window !== "undefined") {
                localStorage.setItem('cart', JSON.stringify(newCart));
            }
            return newCart;
        });
    };

    return (
        <div>
            <h1 className="text-3xl font-bold">Shopping cart</h1>
            {isLoading ? (
                <div className="flex justify-center items-center space-x-5">
                    <div className="text-3xl text-bold">Loading</div>
                    <ArrowPathIcon className="animate-spin h-9 w-9" />
                </div>
            ) : cart.length > 0 ? (
                <div>
                    <table className='table-auto text-left'>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th className='px-10'>Price</th>
                            <th>Brand</th>
                            <th></th>
                        </tr>
                        {cart.map((item: any, index: number) => (
                            <tr key={index} className='center'>
                                <td><img
                                    src={item.imageURL}
                                    alt={`Image of shoe ` + item.name}
                                    className='w-12 h-12'
                                ></img></td>
                                <td>{item.name}</td>
                                <td className='px-10'>€{item.price}</td>
                                <td>{item.brand}</td>
                                <td>
                                    <button onClick={() => removeFromCart(index)}>
                                        <XCircleIcon className="w-6 h-6 text-red-500 hover:opacity-50" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        <button className='flex flex-row items-center bg-[#098C4C] hover:bg-[#246948] text-white text-xl py-2 px-4 rounded-lg'><ShoppingCartIcon className='h-5 w-5 mr-4' />Check out</button>
                    </table>
                </div>
            ) : (
                <>
                    <p>Cart empty.</p>
                </>
            )}
        </div>
    );
}
