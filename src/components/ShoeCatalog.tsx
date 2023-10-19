"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import supabase from "@/config/supabaseClient";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export default function ShoeCatalog() {
  const maxPages = 7; // Stel het maximale aantal pagina's in
  const [page, setPage] = useState<number>(0);
  const [shoes, setShoes] = useState<Array<{ id: number; name: string; price: number; imageURL: string; slug: string }>>([]);

  const ITEM_PER_PAGE: number = 8; // Aantal items per pagina

  const getFromAndTo = (page: number): { from: number; to: number } => {
    const from: number = page * ITEM_PER_PAGE;
    const to: number = (page + 1) * ITEM_PER_PAGE;

    return { from, to };
  };

  const fetchData = async () => {
    const nextPage = page + 1;
    const newShoes = await getProducts(nextPage);
    setShoes(newShoes); // Vervang de bestaande schoenen door de nieuwe set
    setPage(nextPage);
  };

  const fetchPreviousPage = async () => {
    if (page > 0) {
      const previousPage = page - 1;
      const newShoes = await getProducts(previousPage);
      setShoes(newShoes); // Vervang de bestaande schoenen door de nieuwe set
      setPage(previousPage);
    }
  };

  const getProducts = async (page: number): Promise<Array<{ id: number; name: string; price: number; imageURL: string; slug: string }>> => {
    const { from, to } = getFromAndTo(page);
    const { data, error } = await supabase
      .from("shoes")
      .select("id, name, price, imageURL, slug")
      .range(from, to);

    if (error) {
      console.error("Error fetching products:", error);
    }

    return data || [];
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const initialShoes = await getProducts(page);
        setShoes(initialShoes);
      } catch (error) {
        console.error("Error fetching initial products:", error);
      }
    };

    fetchInitialData();
  }, []); // Lege afhankelijkheidsarray om ervoor te zorgen dat dit slechts één keer wordt uitgevoerd

  return (
    <div className="relative">
      <div className="flex flex-wrap justify-center gap-3 md:w-[900px]">
        {shoes.map((shoe) => (
          <div key={shoe.id} className="relative">
            <Link href={`/catalog/${shoe.slug}`}>
              <div className="flex flex-col justify-center border-4 xl:border-2 p-4 rounded-md w-[180px] md:w-[230px] h-[250px] ease-in-out duration-300 hover:border-[#098C4C] hover:w-[240px] hover:h-[260px]">
                <img src={shoe.imageURL} className="w-32 self-center h-auto" width={128} height={128} alt="picture" loading="lazy" />
                <div className="flex flex-col mt-2">
                  <p className="font-bold text-sm md:text-lg">{shoe.name}</p>
                </div>
                <div className="absolute top-4 left-4 z-0">
                  <p className="text-base md:text-xl text-[#098C4C]">€{shoe.price}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="flex justify-center my-4">
        <button
          className={`p-2 rounded mx-2 ${page === 0 ? 'bg-gray-200 text-white' : 'bg-[#098C4C] text-white'}`}
          onClick={fetchPreviousPage}
          disabled={page === 0}
        >
          <ArrowLeftIcon className="h-6 w-6 text-white" />
        </button>
        <button
          className={`p-2 rounded mx-2 ${page >= maxPages - 1 ? 'bg-gray-200 text-white' : 'bg-[#098C4C] text-white'}`}
          onClick={fetchData}
          disabled={page >= maxPages - 1}
        >
          <ArrowRightIcon className="h-6 w-6 text-white" />
        </button>
      </div>
    </div>
  );
}
