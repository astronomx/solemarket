import Image from 'next/image';
import Hero from '@/components/Hero';

export default function Home() {
  return (
    <>
      <h1 className="flex justify-center text-lg">Hellojahms World</h1>
      <div>
        <Hero/>
      </div>
    </>
  )
}
