"use client";
import React, { useState, useEffect } from "react";
import supabase from "@/config/supabaseClient";

export default function FilterMenu() {
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
        {products.map((product: any) => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.price}</p>
            <img src={product.imageURL} alt={product.name} />
          </div>
        ))}
      </div>
    </>
  );
}
