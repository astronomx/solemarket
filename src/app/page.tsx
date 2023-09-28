import Image from 'next/image';
import Hero from '@/components/Hero';
import ProductList from '@/components/NewArrivals';

export default function Home() {
  return (
    <>
      <h1 className="flex justify-center text-lg">Hellojahms World</h1>
      <div>
        <Hero/>
        <ProductList/>
      </div>
    </>
  )
}
