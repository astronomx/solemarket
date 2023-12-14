"use client";
import React, { useState, useEffect } from "react";
import supabase from "@/config/supabaseClient";


export interface FilterMenuProps {
  onFilterChange: (filteredProducts: any[]) => void;
}

const FilterMenu: React.FC<FilterMenuProps> = ({ onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({
    brands: [],
    genders: [],
  });

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    getFilteredProducts();
  }, [selectedFilters]);

  async function getFilteredProducts() {
    const { data, error } = await supabase.from("shoes").select("*");

    if (error) {
      throw error;
    }

    const filteredProducts = data.filter((product: any) =>
      (selectedFilters.brands.length === 0 || selectedFilters.brands.includes(product.brand)) &&
      (selectedFilters.genders.length === 0 || selectedFilters.genders.includes(product.gender))
    );

    setProducts(filteredProducts);
    onFilterChange(filteredProducts);
  }

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    filterType: string
  ) => {
    const value = event.target.value;
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (event.target.checked) {
        updatedFilters[filterType] = [...prevFilters[filterType], value];
      } else {
        updatedFilters[filterType] = prevFilters[filterType].filter((filter) => filter !== value);
      }
      return updatedFilters;
    });
  };

  return (
    <>
      <div className="flex flex-col">
        {/* Brands Filter */}
        <div className="flex flex-row m-5 md:text-lg space-x-4">
          <label>Brands:</label>
          <div>
            {/* Map over your dynamic list of brands */}
            {["NIKE", "ADIDAS", "JORDAN", "NEW BALANCE"].map((brand) => (
              <div key={brand} className="flex flex-row items-center space-x-2">
                <input
                  type="checkbox"
                  name={brand.toLowerCase()}
                  value={brand}
                  onChange={(e) => handleCheckboxChange(e, "brands")}
                />
                <label htmlFor={brand.toLowerCase()}>{brand}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Genders Filter */}
        <div className="flex flex-row m-5 md:text-lg space-x-4">
          <label>Genders:</label>
          <div>
            {/* Map over your dynamic list of genders */}
            {["MEN", "WOMEN", "KIDS"].map((gender) => (
              <div key={gender} className="flex flex-row items-center space-x-2">
                <input
                  type="checkbox"
                  name={gender.toLowerCase()}
                  value={gender}
                  onChange={(e) => handleCheckboxChange(e, "genders")}
                />
                <label htmlFor={gender.toLowerCase()}>{gender}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterMenu;