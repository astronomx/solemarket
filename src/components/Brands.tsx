import React from 'react';


const BrandSelect = () => { 
    const brands = [
        { id: 1, label: '', image: '/images/nike.png' },
        { id: 2, label: '', image: '/images/adidas.png' },
        { id: 3, label: '', image: '/images/yeezy.png' },
        { id: 4, label: ' ', image: '/images/new_balance.png' },
        { id: 5, label: '', image: '/images/gap.png' },
        // ... Add more brands here
    ];

    return (
        <div className="flex justify-center overflow-x-auto whitespace-nowrap my-10">
            {brands.map((brand) => (
                <div key={brand.id} className="flex flex-col w-64 h-64 border border-gray-300 m-4 items-center justify-center font-bold text-xl mx-5">
                    
                    <img src={brand.image} alt={brand.label} className="w-64 h-64" /> {/* Adjust the size as needed */}
                    <div>{brand.label}</div>
                </div>
            ))}
        </div>
    );
};



export default BrandSelect;
