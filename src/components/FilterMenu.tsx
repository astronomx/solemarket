"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import supabase from "@/config/supabaseClient";

export interface FilterMenuProps {
  onFilterChange: (filteredProducts: any[]) => void;
}

const FilterMenu: React.FC<FilterMenuProps> = ({ onFilterChange }) => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    getFilteredProducts();
  }, [selectedBrands]);

  async function getFilteredProducts() {
    const { data, error } = await supabase.from("shoes").select("*");

    if (error) {
      throw error;
    }

    const filteredProducts = data.filter((product: any) =>
      selectedBrands.includes(product.brand)
    );

    setProducts(filteredProducts);
    onFilterChange(filteredProducts); 
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedBrands([...selectedBrands, event.target.value]);
    } else {
      setSelectedBrands(
        selectedBrands.filter((brand) => brand !== event.target.value)
      );
    }
  };

  return (
    <>
      <div className="flex flex-row m-5 md:text-lg">
        <div className="flex flex-row items-center space-x-2">
          <input
            type="checkbox"
            name="nike"
            value={"NIKE"}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="nike">Nike</label>
        </div>

        <div className="flex flex-row items-center space-x-2 mx-4">
          <input
            type="checkbox"
            name="adidas"
            value={"ADIDAS"}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="adidas">Adidas</label>
        </div>

        <div className="flex flex-row items-center space-x-2">
          <input
            type="checkbox"
            name="jordan"
            value={"JORDAN"}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="jordan">Jordan</label>
        </div>
      </div>

      <div>
        {/* {products.map((product: any) => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.price}</p>
            <img src={product.imageURL} alt={product.name} />
          </div>
        ))} */}
        <div className="flex flex-wrap justify-center gap-3 md:w-[900px]">
          {products.map((shoe) => (
            <div key={shoe.id} className="relative">
              <Link href={`/catalog/${shoe.slug}`}>
                <div className="flex flex-col justify-center border-4 xl:border-2 p-4 rounded-md w-[180px] md:w-[230px] h-[250px] ease-in-out duration-300 hover:border-[#098C4C] hover:w-[240px] hover:h-[260px]">
                  <img src={shoe.imageURL} className="w-32 self-center h-auto" width={128} height={128} alt="picture" loading="lazy"
                  />
                  <div className="flex flex-col mt-2">
                    <p className="font-bold text-sm md:text-lg">{shoe.name}</p>
                  </div>
                  <div className="absolute top-4 left-4 z-0">
                    <p className="text-base md:text-xl text-[#098C4C]">
                      €{shoe.price}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default FilterMenu; 
