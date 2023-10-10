"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

// dit is een supabase client die we hebben aangemaakt in de config folder. zodat we de supabase functies kunnen gebruiken.
import supabase from "@/config/supabaseClient";

import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function ShoeDetails() {
  const { slug } = useParams();
  const router = useRouter();

  // Hier maken we een state aan voor de shoeData. Deze state is een object met de volgende properties: name, price, imageURL, slug. De type is <any>
  // omdat we nog niet weten wat voor data we terug krijgen van de supabase query.
  const [shoeData, setShoeData] = useState<any>({});
  const [sizes, setSizes] = useState<any>([]);
  const [availableSizes, setAvailableSizes] = useState<any>([]);

  // Met de useEffect hook gaan we de data ophalen van de shoe die we willen laten zien. Dit doen we door de slug te gebruiken die we hebben meegegeven in de url.
  useEffect(() => {
    const getShoeDetails = async () => {
      // Met de .eq() functie kunnen we een waarde meegeven die we willen gebruiken om te filteren. In dit geval gebruiken we de slug om de juiste shoe op te halen.
      // De .single() functie zorgt ervoor dat we maar 1 resultaat terug krijgen. Als we dit niet doen krijgen we een array terug met 1 object.
      try {
        const { data, error } = await supabase
          .from("shoes")
          .select("id, name, brand, gender, category, price, imageURL, slug")
          .eq("slug", slug)
          .single();

        // Als er een error is dan sturen we de gebruiker naar de 404 pagina.
        if (error) {
          router.push("/404");
          return;
        }

        if (data) {
          // Als er geen error is dan zetten we de data in de shoeData state.
          const { name, brand, gender, category, price, imageURL, slug } = data;
          setShoeData({ name, brand, gender, category, price, imageURL, slug });
        }
      } catch (error) {
        console.error("Error fetching shoe details:", error);
      }
    };

    getShoeDetails();
    generateShoeSizes();

    // We voegen de slug en router toe aan de dependency array zodat de useEffect hook opnieuw wordt uitgevoerd als de slug of router veranderd.
  }, [slug, router]);

  // Deze functie genereert de schoenmaten die beschikbaar zijn voor de schoen.
  function generateShoeSizes(): void {
    const allSizes: number[] = [];
    for (let size = 3.5; size <= 18; size += 0.5) {
      allSizes.push(size);
    }

    // Randomized de schoenmaten
    const randomlyAvailableSizes = allSizes.filter(() => Math.random() < 0.5);

    // Update de state
    setAvailableSizes(randomlyAvailableSizes);
    setSizes(allSizes);
  }

  return (
    <div className="">
      {/* Hier renderen we de data van de shoeData state. Als de shoeData state leeg is dan laten we een loading icoon zien. */}
      {shoeData.name ? (
        <>
          <div className="flex justify-center items-center mt-10">
            <div className="flex flex-col justify-center">
              <div className="flex justify-center border-b-[1.5px] border-gray-500/20">
                <h1 className="font-bold text-3xl pb-3">{shoeData.name}</h1>
              </div>

              <div className="flex flex-row space-x-96 border-b-[1.5px] border-gray-500/20">
                <div className="flex flex-col">
                  <img
                    src={shoeData.imageURL}
                    className="w-auto h-[70vh]"
                    alt={shoeData.name}
                  />
                </div>

                <div className="flex flex-col justify-center items-center">
                  <div>
                    <button className="bg-[#098C4C] text-xl text-white px-36 py-5 mb-5 rounded-sm">{`Buy for €${shoeData.price}`}</button>
                  </div>

                  <div>
                    <div className="flex justify-center w-[25vw] border-b-[1.5px] border-gray-500/20">
                      <h1>Available in:</h1>
                    </div>
                    <div className="flex justify-center">
                      <div className="flex flex-wrap gap-5 w-[25vw] mt-5 ml-6">
                        {/* Hier mappen we over de schoeninfo heen en daarin checken we welke maten er beschikbaar zijn en welke niet */}
                        {sizes.map((size: number) => {
                          const isAvailable = availableSizes.includes(size);
                          return (
                            <div key={size}>
                              <div>
                                {isAvailable ? (
                                  <button className="text-lg w-14 h-14 rounded-lg ease-in-out duration-300 hover:border-[#098C4C] focus:border-[#098C4C] focus:text-[#098C4C] border-2 border-gray-500/20">
                                    {size}
                                  </button>
                                ) : (
                                  <>
                                    <div className="relative">
                                      <button
                                        disabled
                                        className="text-lg w-14 h-14 rounded-lg border-2 border-gray-500/20 text-gray-500/20 relative"
                                      >
                                        {size}
                                      </button>
                                      {!isAvailable && (
                                        <XMarkIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-gray-500/40" />
                                      )}
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h1 className="text-2xl mt-3">Details</h1>

              <table>
                <tbody>
                  <tr className="text-[#098C4C] font-bold text-left">
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Gender</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Slug</th>
                  </tr>
                  <tr>
                    <td>{shoeData.name}</td>
                    <td>{shoeData.brand}</td>
                    <td>{shoeData.gender}</td>
                    <td>{shoeData.category}</td>
                    <td>{shoeData.price}</td>
                    <td>{shoeData.slug}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center space-x-5">
          <div className="text-3xl text-bold">Loading</div>
          <ArrowPathIcon className="animate-spin h-9 w-9" />
        </div>
      )}
    </div>
  );
}
