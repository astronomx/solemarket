'use client'

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

// dit is een supabase client die we hebben aangemaakt in de config folder. zodat we de supabase functies kunnen gebruiken.
import supabase from "@/config/supabaseClient";

import { ArrowPathIcon } from "@heroicons/react/24/outline";

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
                    <ArrowPathIcon className="animate-spin h-9 w-9" />
                </div>
            )}
        </div>
    );
}
