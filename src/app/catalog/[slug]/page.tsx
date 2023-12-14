// Import statements (use client, React, etc.)

"use client";

import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; // Change import statement to use "next/router"

import supabase from "@/config/supabaseClient";
import Cart from "@/components/Cart"; // Import the Cart component

export default function ShoeDetails() {
  const { slug } = useParams();
  const router = useRouter();

  const [shoeData, setShoeData] = useState<any>({});
  const [sizes, setSizes] = useState<any>([]);
  const [availableSizes, setAvailableSizes] = useState<any>([]);
  const [cart, setCart] = useState<any[]>([]); // Add cart state

  useEffect(() => {
    const getShoeDetails = async () => {
      try {
        const { data, error } = await supabase
          .from("shoes")
          .select("id, name, brand, gender, category, price, items_left, imageURL, slug")
          .eq("slug", slug)
          .single();

        if (error) {
          router.push("/404");
          return;
        }

        if (data) {
          const { name, brand, gender, category, price, items_left, imageURL, slug } = data;
          setShoeData({ name, brand, gender, category, price, items_left, imageURL, slug });
        }
      } catch (error) {
        console.error("Error fetching shoe details:", error);
      }
    };

    getShoeDetails();
    generateShoeSizes();
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };

  }, [slug, router]);

  function generateShoeSizes(): void {
    const allSizes: number[] = [];
    for (let size = 3.5; size <= 18; size += 0.5) {
      allSizes.push(size);
    }

    const randomlyAvailableSizes = allSizes.filter(() => Math.random() < 0.5);

    setAvailableSizes(randomlyAvailableSizes);
    setSizes(allSizes);
  }

  const addToCart = () => {
    setCart([...cart, shoeData]);
  };

  return (
    <div className="h-screen">
      {shoeData.name ? (
        <>
          <div className="flex justify-center items-center mt-10">
            <div className="flex flex-col justify-center">
              <div className="flex justify-center border-b-[1.5px] border-gray-500/20">
                <h1 className="font-bold text-3xl pb-3">{shoeData.name}</h1>
              </div>

              <div className="flex flex-row space-x-96 border-b-[1.5px] border-gray-500/20">
                <div className="flex flex-col">
                  <img
                    src={shoeData.imageURL}
                    className="w-auto h-[70vh]"
                    alt={shoeData.name}
                  />
                </div>

                <div className="flex flex-col justify-center items-center">
                  <div>
                    <button className="bg-[#098C4C] text-xl text-white px-36 py-5 mb-5 rounded-sm">{`Buy for €${shoeData.price}`}</button>
                  </div>

                  <div>
                    <div className="flex justify-center w-[25vw] border-b-[1.5px] border-gray-500/20">
                      <h1>Available in:</h1>
                    </div>
                    <div className="flex justify-center">
                      <div className="flex flex-wrap gap-5 w-[25vw] mt-5 ml-6">
                        {sizes.map((size: number) => {
                          const isAvailable = availableSizes.includes(size);
                          return (
                            <div key={size}>
                              <div>
                                {isAvailable ? (
                                  <button className="text-lg w-14 h-14 rounded-lg ease-in-out duration-300 hover:border-[#098C4C] focus:border-[#098C4C] focus:text-[#098C4C] border-2 border-gray-500/20">
                                    {size}
                                  </button>
                                ) : (
                                  <>
                                    <div className="relative">
                                      <button
                                        disabled
                                        className="text-lg w-14 h-14 rounded-lg border-2 border-gray-500/20 text-gray-500/20 relative"
                                      >
                                        {size}
                                      </button>
                                      {!isAvailable && (
                                        <XMarkIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-gray-500/40" />
                                      )}
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h1 className="text-2xl mt-3">Details</h1>

              <table>
                <tbody>
                  <tr className="text-[#098C4C] font-bold text-left">
                    <th>Name</th>
                    <th>Items left</th>
                    <th>Brand</th>
                    <th>Gender</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Slug</th>
                  </tr>
                  <tr>
                    <td>{shoeData.name}</td>
                    <td>{shoeData.items_left}</td>
                    <td>{shoeData.brand}</td>
                    <td>{shoeData.gender}</td>
                    <td>{shoeData.category}</td>
                    <td>{shoeData.price}</td>
                    <td>{shoeData.slug}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-center items-center mt-5">
            <button
              onClick={addToCart}
              className="bg-[#098C4C] text-xl text-white px-36 py-5 rounded-sm"
            >
              Add to Cart
            </button>
            <Cart cartItems={cart} /> {/* Display the cart component */}
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center space-x-5">
          <div className="text-3xl text-bold">Loading</div>
          <ArrowPathIcon className="animate-spin h-9 w-9" />
        </div>
      )}
    </div>
  );
}
