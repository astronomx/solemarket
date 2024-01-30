"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import supabase from "@/config/supabaseClient";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";
import GetUserReviews from "@/components/GetUserReviews";
import AddReview from "@/components/AddReview";

export default function ShoeDetails() {
  const { slug } = useParams();
  const router = useRouter();
  const [shoeData, setShoeData] = useState<any>({});
  const [sizes, setSizes] = useState<any>([]);
  const [availableSizes, setAvailableSizes] = useState<any>([]);
  const [cart, setCart] = useLocalStorage<{ shoeData: any }[]>("cart", []);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [userReview, setUserReview] = useState({
    naam: "",
    rating: 0,
    review: "",
    title: "",
  });

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
          const { name, brand, gender, category, price, items_left, imageURL, slug, id } = data;
          setShoeData({ name, brand, gender, category, price, items_left, imageURL, slug, id });
          console.log("shoeData:", shoeData);
        }
      } catch (error) {
        console.error("Error fetching shoe details:", error);
      }
    };

    getShoeDetails();
    generateShoeSizes();
  }, [slug, router]);

  const updateCart = () => {
    setCart([...cart, shoeData]);
    setIsAddedToCart(true);

    setTimeout(() => {
      setIsAddedToCart(false);
    }, 3000);
  };

  function generateShoeSizes(): void {
    const allSizes: number[] = [];
    for (let size = 3.5; size <= 18; size += 0.5) {
      allSizes.push(size);
    }

    const randomlyAvailableSizes = allSizes.filter(() => Math.random() < 0.5);

    setAvailableSizes(randomlyAvailableSizes);
    setSizes(allSizes);
  }

  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const submitReview = async () => {
    console.log("Submitting review:", userReview);

    try {
      const { data, error }: { data: any, error: any } = await supabase
        .from("user-reviews")
        .insert([
          {
            shoe_id: shoeData.id,
            naam: userReview.naam,
            rating: userReview.rating,
            review: userReview.review,
            titel: userReview.title,
          },
        ]);

      console.log("Insert Data:", data);
      console.log("Insert Error:", error);

      if (error) {
        console.error("Error submitting review:", error);
        alert(`Error submitting review: ${error.message}`);
      } else {
        console.log("Review submitted successfully!");
        alert("Review submitted successfully!");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert(`Error submitting review: ${(error as any).message}`);
    }
  };


  return (
    <div className="h-full">
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
                    <button
                      className={`text-xl px-36 py-5 mb-5 rounded-sm duration-300 ease-in-out ${isAddedToCart ? 'w-full bg-neutral-300 text-black' : 'w-full bg-[#098C4C] hover:bg-[#246948] text-white'
                        }`}
                      onClick={updateCart}
                    >
                      {isAddedToCart ? 'Added to cart!' : 'Add to cart'}
                    </button>
                  </div>

                  <div>
                    <div className="flex justify-center w-[25vw] border-b-[1.5px] border-gray-500/20">
                      <h1>Available sizes</h1>
                    </div>
                    <div className="flex justify-center">
                      <div className="flex flex-wrap gap-5 w-[25vw] mt-5 ml-6">
                        {sizes.map((size: number) => {
                          const isAvailable = availableSizes.includes(size);
                          return (
                            <div key={size}>
                              <div>
                                {isAvailable ? (
                                  <button className="text-lg w-14 h-14 rounded-lg ease-in-out duration-300 hover:border-[#098C4C] border-2 border-gray-500/20">
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
                    <th>Price</th>
                    <th>Items left</th>
                    <th>Brand</th>
                    <th>Gender</th>
                    <th>Category</th>
                    <th>Slug</th>
                  </tr>
                  <tr>
                    <td>{shoeData.name}</td>
                    <td>€{shoeData.price}</td>
                    <td>{shoeData.items_left}</td>
                    <td>{shoeData.brand}</td>
                    <td>{shoeData.gender}</td>
                    <td>{shoeData.category}</td>
                    <td>{shoeData.slug}</td>
                  </tr>
                </tbody>
              </table>
              <div className="flex justify-between items-center">
                <h1 className="text-2xl mt-3">Reviews</h1>
              </div>

              <div>
              <GetUserReviews shoeId={shoeData.id}/>
              </div>
            </div>
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
