// Maakt een server-side client aan zodat we de async functies kunnen gebruiken. createServerComponentClient zoekt naar de environment variabelen die we hebben aangemaakt in de .env file.
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

async function getProducts() {
    const supabase = createServerComponentClient({
      cookies,
    });

    // fetching data vanuit supabase, we gebruiken de select() methode om alle data op te halen.
    const { data, error } = await supabase
        .from("shoes")
        .select("id, name, price, imageURL");

    // Geeft een error als er iets mis is gegaan met het ophalen van de data. En anders returnt het de data.
    if (error) {
      throw error;
    }

    return data;
}

export default async function Catalog() {

    // fetching data die we net hebben opgehaald vanuit supabase
    let shoes: { id: number, name: string, price: number, imageURL: any }[] = [];

    try {
      shoes = await getProducts();
    } catch (error) {
      console.error("Error fetching products:", error);
    }

    return (
      <>
      <div className="flex justify-center">
        <div className="flex flex-wrap justify-center gap-3">
          {/* Mappen over de data zodat we het kunnen displayen */}
          {shoes.map((shoe) => (
            <div key={shoe.id} className="">
              <div className="border p-4 rounded-md w-[190px] h-[250px]">
                <img src={shoe.imageURL} className="w-32 h-32" alt="picture" />

                <div className="flex flex-col mt-2">
                  <p className="font-bold text-sm">{shoe.name}</p>
                </div>

                <div className="bottom-0">
                    <p className="text-xs text-[#098C4C]">€{shoe.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </>
    );
}
