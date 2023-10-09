// Maakt een server-side client aan zodat we de async functies kunnen gebruiken. createServerComponentClient zoekt naar de environment variabelen die we hebben aangemaakt in de .env file.
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

async function getProducts() {
    const supabase = createServerComponentClient({
      cookies,
    });

    // fetching data vanuit supabase, we gebruiken de select() methode om alle data op te halen.
    const { data, error } = await supabase
        .from("shoes")
        .select("id, name, price, imageURL, slug");

    // Geeft een error als er iets mis is gegaan met het ophalen van de data. En anders returnt het de data.
    if (error) {
      throw error;
    }

    return data;
}

export default async function ShoeCatalog() {

    // fetching data die we net hebben opgehaald vanuit supabase
    let shoes: { id: any, name: string, price: number, imageURL: any, slug: string }[] = [];

    try {
      shoes = await getProducts();
    } catch (error) {
      console.error("Error fetching products:", error);
    }

    return (
      <>
      <div className="flex justify-center">
        <div className="flex flex-wrap justify-center gap-3 md:w-[900px]">
          {/* Mappen over de data zodat we het kunnen displayen */}
          {shoes.map((shoe) => (
            <Link href={`/catalog/${shoe.slug}`} key={shoe.id}>
              <div className="flex relative flex-col justify-center border-4 xl:border-2 p-4 rounded-md w-[180px] md:w-[230px] h-[250px] ease-in-out duration-300 hover:border-[#098C4C] hover:w-[240px] hover:h-[260px]">
                <img src={shoe.imageURL} className="w-32 self-center h-auto" alt="picture" />
                <div className="flex flex-col mt-2">
                  <p className="font-bold text-sm md:text-lg">{shoe.name}</p>
                </div>
                <div className="absolute top-4 z-0">
                  <p className="text-base md:text-xl text-[#098C4C]">€{shoe.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      </>
    );
}

