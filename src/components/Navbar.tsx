import Link from 'next/link';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";


const Navbar = () => {
  return (
    <nav className="flex justify-between items-center border-b border-black p-4">
      <div className="flex items-center">
        <button><Bars3Icon className="h-6 w-6 text-gray-500" /></button>
        <div className="w-6 h-6 bg-white"></div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="border rounded-full py-1 px-3 pr-10 focus:outline-none focus:border-green-700"
          />
          <div className="absolute top-0 right-0 mt-2 mr-3">
            <button><MagnifyingGlassIcon className="h-5 w-5 text-gray-800" /></button>
          </div>
        </div>
      </div>
      <div className="hidden md:flex space-x-20">
        <Link href="/about" passHref>
          <span className="font-bold text-lg hover:text-[#098C4C]">Home</span>
        </Link>
        <Link href="/about" passHref>
          <span className="font-bold text-lg hover:text-[#098C4C]">Brands</span>
        </Link>

        <Link href="/about" passHref>
          <span className="font-bold text-lg hover:text-[#098C4C]">New Arrivals</span>
        </Link>
        <Link href="/about" passHref>
          <span className="font-bold text-lg hover:text-[#098C4C]">All</span>
        </Link>
        <Link href="/about" passHref>
          <span className="font-bold text-lg hover:text-[#098C4C]">Trending</span>
        </Link>
      </div>

      <div className="hidden md:flex items-center space-x-4">
        <button className="font-bold text-[#098C4C] py-2 px-4">Login</button>
        <span className="font-bold text-gray-800">|</span>
        <button className="font-bold text-black py-2 px-4">Sign Up</button>
        <button><ShoppingCartIcon className="h-6 w-6 text-black" /></button>
      </div>
    </nav>
  );
};

export default Navbar;
