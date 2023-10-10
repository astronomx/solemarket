import React from 'react';
import Hero from '@/components/Hero';
import Featured from '@/components/Featured';
import Brands from '@/components/Brands';
export default function Home() {
  return (
    <>
      <div>
        <Hero/>
        <Featured/>
        <Brands/>
      </div>
    </>
  )
}
