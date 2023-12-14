"use client"
import React, { useState } from "react";

import ShoeCatalog from "@/components/ShoeCatalog";
import FilterMenu from "@/components/FilterMenu";

export default function Catalog() {

  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  const handleFilterChange = (filteredProducts: any[]) => {
    setFilteredProducts(filteredProducts);
  };
  

  return(
    <>
      <div className="flex justify-center mt-10">
        <div className="flex flex-row">
          <FilterMenu onFilterChange={handleFilterChange} />
          <ShoeCatalog filteredProducts={filteredProducts} />
        </div>
      </div>
    </>
  )
}

