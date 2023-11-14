"use client";

import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from 'next/navigation';

export default function Searchbar() {
    const [value, setValue] = useState('');
    const router = useRouter();

    function handleSearch() {
        router.push(`/results/${value}`);
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    return (
        <div className="relative ml-4">
            <input
                type="text"
                placeholder="Search"
                value={value}
                onChange={(e) => setValue(e.currentTarget.value)}
                onKeyDown={handleKeyDown}
                className="border rounded-full py-1 px-3 pr-10 focus:outline-none focus:border-green-700"
            />
            <div className="absolute top-0 right-0 mt-2 mr-3">
                <button onClick={handleSearch}><MagnifyingGlassIcon className="h-5 w-5 text-gray-800" /></button>
            </div>
        </div>
    )
}
