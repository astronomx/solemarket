// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
// import { cookies } from "next/headers"

// import { ArrowPathIcon } from "@heroicons/react/24/outline";


// async function getShoeDetails() {
//     const supabase = createServerComponentClient({
//         cookies,
//     })

//     const { data, error } = await supabase
//         .from("shoes")
//         .select("id, name, price, imageURL, slug")
//         .single();

//     if (error) {
//         throw error
//     }

//     return data;

// }

// // export default async function ShoeDetails({ shoe }: { shoe: { id: number; name: string; price: number; imageURL: any, slug: string } }) {
// export default async function ShoeDetails() {
    
//     let shoe: { id: any, name: string, price: number, imageURL: any, slug: string }[] = [];

//     try {
//         shoe = await getShoeDetails();
//     } catch (error) {
//         console.error("Error fetching products:", error);
//     }

//     return (
//         <div className="flex justify-center items-center h-screen">
//             {shoe ? (
//                 <>
//                     {/* <h1 className="text-bold">{shoe.name}</h1>
//                     <p>ID: {shoe.id}</p>
//                     <p>Price: {shoe.price}</p> */}
//                 </>
//             ) : (
//                 <div className="flex justify-center items-center">
//                     <div className="text-3xl text-bold">Loading</div>
//                     <ArrowPathIcon className="h-6 w-6 text-balck animate-spin" />
//                 </div>
//             )}
//         </div>
//     );
// }
'use client'

import { useParams } from "next/navigation";

import { ArrowPathIcon } from "@heroicons/react/24/outline";


// export default async function ShoeDetails({ shoe }: { shoe: { id: number; name: string; price: number; imageURL: any, slug: string } }) {
export default function ShoeDetails() {

    const { slug } = useParams();
    
    let shoe: { id: any, name: string, price: number, imageURL: any, slug: string }[] = [];



    return (
        <div className="flex justify-center items-center h-screen">
            {shoe ? (
                <>
                    {/* <h1 className="text-bold">{shoe.name}</h1>
                    <p>ID: {shoe.id}</p>
                    <p>Price: {shoe.price}</p> */}
                    <h1>Param: {slug}</h1>
                </>
            ) : (
                <div className="flex justify-center items-center">
                    <div className="text-3xl text-bold">Loading</div>
                    <ArrowPathIcon className="h-6 w-6 text-balck animate-spin" />
                </div>
            )}
        </div>
    );
}

