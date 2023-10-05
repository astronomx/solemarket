import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

async function getShoes() {
    const supabase = createServerComponentClient({
      cookies,
    });
  
    // fetching data vanuit supabase, we gebruiken de range() methode om de eerste 15 rows op te halen en displayen in de featured sectie.
    const { data, error } = await supabase
      .from("shoes")
      .select("id, name, price, imageURL")
      .range(0, 5);
  
    // Geeft een error als er iets mis is gegaan met het ophalen van de data. En anders returnt het de data.
    if (error) {
      throw error;
    }

    return data;
}

export default async function Featured() {

    let shoes: { id: number, name: string, price: number, imageURL: any }[] = [];

    try {
        shoes = await getShoes();
    } catch (error) {
        console.error("Error fetching products:", error);
    }

  return (
    <div>
      <h1 className="text-2x text-[#098C4C] font-bold mb-4 ml-4">
        Featured
      </h1>
      <div className="flex overflow-x-hidden whitespace-nowrap">

        {shoes.map((shoe) => (
            <div key={shoe.id}>

            </div>
        ))}

      </div>
      {/* <div className="flex justify-end mt-4" style={{ marginRight: "100px" }}>
        <button
          className="text-black font-bold py-2 px-4 rounded-full mr-4"
          onClick={scrollLeft}
          disabled={scrollX === 0}
        >
          🡠
        </button>
        <button
          className="text-black font-bold py-2 px-4 rounded-full"
          onClick={scrollRight}
          disabled={scrollX + 4 >= products.length}
        >
          🡢
        </button>
      </div> */}
    </div>
  );
}