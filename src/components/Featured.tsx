import Link from "next/link";
import supabase from "@/config/supabaseClient";

async function getShoes() {
  
    // fetching data vanuit supabase, we gebruiken de range() methode om de eerste 15 rows op te halen en displayen in de featured sectie.
    const { data, error } = await supabase
      .from("shoes")
      .select("id, name, price, imageURL, slug")
      .range(0, 5);
  
    // Geeft een error als er iets mis is gegaan met het ophalen van de data. En anders returnt het de data.
    if (error) {
      throw error;
    }

    return data;
}

export default async function Featured() {

    let shoes: { id: number, name: string, price: number, imageURL: any, slug: string }[] = [];

    try {
        shoes = await getShoes();
    } catch (error) {
        console.error("Error fetching products:", error);
    }

  return (
    <>
        <div className="flex justify-center">
            <div className="flex flex-col justify-center w-fit">
                <h1 className="text-2xl text-[#098C4C] font-bold mb-4 ml-4">Featured</h1>
                <div className="flex flex-wrap justify-center gap-3 w-full md:w-[900px] xl:w-full">
                  {shoes.map((shoe) => (
                      <Link href={`/catalog/${shoe.slug}`} key={shoe.id}>
                          <div className="flex relative flex-col justify-center border-4 xl:border-2 p-4 rounded-md w-[180px] md:w-[230px] h-[250px] ease-in-out duration-300 hover:border-[#098C4C] hover:w-[240px] hover:h-[260px]">
                            <div className="flex justify-center">
                              <img src={shoe.imageURL} className="w-32 self-center h-auto" alt="picture" />
                            </div>
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
        </div>
    </>
  );
}