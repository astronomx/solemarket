import React from 'react';
import Hero from '@/components/Hero';
import ProductList from '@/components/NewArrivals';
import BrandSelect from '@/components/Brands';
export default function Home() {
  return (
    <>
      <div>
        <Hero/>
        <ProductList/>
        <BrandSelect/>
      </div>
    </>
  )
}
