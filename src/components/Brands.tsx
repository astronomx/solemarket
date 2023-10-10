import React from 'react';

export default function Brands() { 
    const brands = [
        { id: 1, label: '', image: '/images/nike.png' },
        { id: 2, label: '', image: '/images/adidas.png' },
        { id: 3, label: '', image: '/images/yeezy.png' },
        { id: 4, label: '', image: '/images/new_balance.png' },
        { id: 5, label: '', image: '/images/gap.png' },
    ];

    return (
        <>
            <style>
                {`
                    .brand-container {
                        width: 100%;
                        margin: 8px;
                        max-width: 300px;
                    }

                    @media (min-width: 640px) {
                        .brand-container {
                            width: 50%;
                        }
                    }

                    @media (min-width: 1024px) {
                        .brand-container {
                            width: 25%;
                        }
                    }
                `}
            </style>

            <div className="flex flex-wrap justify-center overflow-x-auto whitespace-nowrap my-10">
                {brands.map((brand) => (
                    <div key={brand.id} className="brand-container flex flex-col m-4 items-center justify-center font-bold text-xl mx-5">
                        <button><img src={brand.image} alt={brand.label} className="w-full h-auto hover:brightness-10 hover:sepia cursor-pointer filter transition-all duration-300 rounded" /></button>
                        <div>{brand.label}</div>
                    </div>
                ))}
            </div>
        </>
    );
}
