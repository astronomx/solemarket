'use client'

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

// dit is een supabase client die we hebben aangemaakt in de config folder. zodat we de supabase functies kunnen gebruiken.
import supabase from "@/config/supabaseClient";

import { ArrowPathIcon } from "@heroicons/react/24/outline";


// export default function ShoeDetails() {

    
//     const { slug } = useParams();
//     const router = useRouter();
    
//     const [shoeName, setShoeName] = useState<string>("");
//     const [shoePrice, setShoePrice] = useState<number>(0);
//     const [shoeImageURL, setShoeImageURL] = useState<any>("");
//     const [shoeSlug, setShoeSlug] = useState<string>("");

//     const shoe = [shoeName, shoePrice, shoeImageURL, shoeSlug];
    
//     useEffect(() => {
//         const getShoeDetails = async () => {
//                 // Hier vergelijkem we de slug die we hebben meegegeven in de URL met de slug die in de database staat.
//                 const { data, error } = await supabase
//                 .from("shoes")
//                 .select("id, name, price, imageURL, slug")
//                 .eq("slug", slug)
//                 .single();

//                 // Geeft een error als er iets mis is gegaan met het ophalen van de data. En anders returnt het de data.
//                 if(error) {
//                     router.push("/404");
//                 }
            
//                 // Deze data wordt gapkt vanuit de database door de slug te vergelijken met de slug die we hebben meegegeven in de URL.
//                 if(data) {
//                   setShoeName(data.name);
//                   setShoePrice(data.price);
//                   setShoeImageURL(data.imageURL);
//                   setShoeImageURL(data.slug);
//                 }
//             }
            
//             getShoeDetails();
            
//     }, [slug, router])


//     return (
//         <div className="flex justify-center items-center h-screen">
//             {shoe  ? (
//                 <>
//                     <h1 className="font-bold">{shoe[0]}</h1>
//                     <p className="text-[#098C4C]">{shoe[1]}</p>
                    
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

export default function ShoeDetails() {
    const { slug } = useParams();
    const router = useRouter();

    // Define a default value for shoeData, which will be an empty object
    const [shoeData, setShoeData] = useState<any>({});

    useEffect(() => {
        const getShoeDetails = async () => {
            try {
                const { data, error } = await supabase
                    .from("shoes")
                    .select("id, name, price, imageURL, slug")
                    .eq("slug", slug)
                    .single();

                if (error) {
                    router.push("/404");
                    return;
                }

                if (data) {
                    // Destructure and set the shoeData state
                    const { name, price, imageURL, slug } = data;
                    setShoeData({ name, price, imageURL, slug });
                }
            } catch (error) {
                console.error("Error fetching shoe details:", error);
            }
        };

        getShoeDetails();
    }, [slug, router]);

    return (
        <div className="flex justify-center items-center h-screen">
            {shoeData.name ? (
                <>
                    <h1 className="font-bold">{shoeData.name}</h1>
                    <p className="text-[#098C4C]">{shoeData.price}</p>
                    <img src={shoeData.imageURL} className="w-auto h-[60vh] " alt="" />
                </>
            ) : (
                <div className="flex justify-center items-center">
                    <div className="text-3xl text-bold">Loading</div>
                    {/* ... (loading icon or message) */}
                </div>
            )}
        </div>
    );
}
