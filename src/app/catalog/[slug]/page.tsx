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

    // Hier maken we een state aan voor de shoeData. Deze state is een object met de volgende properties: name, price, imageURL, slug. De type is <any>
    // omdat we nog niet weten wat voor data we terug krijgen van de supabase query.
    const [shoeData, setShoeData] = useState<any>({});

    // Met de useEffect hook gaan we de data ophalen van de shoe die we willen laten zien. Dit doen we door de slug te gebruiken die we hebben meegegeven in de url.
    useEffect(() => {
        const getShoeDetails = async () => {
            // Met de .eq() functie kunnen we een waarde meegeven die we willen gebruiken om te filteren. In dit geval gebruiken we de slug om de juiste shoe op te halen.
            // De .single() functie zorgt ervoor dat we maar 1 resultaat terug krijgen. Als we dit niet doen krijgen we een array terug met 1 object.
            try {
                const { data, error } = await supabase
                    .from("shoes")
                    .select("id, name, price, imageURL, slug")
                    .eq("slug", slug)
                    .single();
                
                // Als er een error is dan sturen we de gebruiker naar de 404 pagina.
                if (error) {
                    router.push("/404");
                    return;
                }

                if (data) {
                    // Als er geen error is dan zetten we de data in de shoeData state.
                    const { name, price, imageURL, slug } = data;
                    setShoeData({ name, price, imageURL, slug });
                }
            } catch (error) {
                console.error("Error fetching shoe details:", error);
            }
        };

        getShoeDetails();
        // We voegen de slug en router toe aan de dependency array zodat de useEffect hook opnieuw wordt uitgevoerd als de slug of router veranderd.
    }, [slug, router]);

    return (
        <div className="flex justify-center items-center h-screen">
            {/* Hier renderen we de data van de shoeData state. Als de shoeData state leeg is dan laten we een loading icoon zien. */}
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
