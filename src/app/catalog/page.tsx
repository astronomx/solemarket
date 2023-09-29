// Maakt een server-side client aan zodat we de async functies kunnen gebruiken. createServerComponentClient zoekt naar de environment variabelen die we hebben aangemaakt in de .env file.
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'


async function getProducts() {
    const supabase = createServerComponentClient({
        cookies
    })

    // fetching data vanuit supabase, we gebruiken de select() methode om alle data op te halen.
    const { data, error } = await supabase.from('shoes').select('id, name, price, imageURL');

    // Geeft een error als er iets mis is gegaan met het ophalen van de data. En anders returnt het de data.
    if(error) {
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


    return(
        <>
            <div className="">
                <div className="">
                    {/* Hier map ik over de data zodat ik die kan laten zien op de pagina */}
                    {shoes.map((shoe) => (
                        <div key={shoe.id}>
                            <div>
                                <div>
                                    {/* <img src={shoe.imageURL} alt="picture" /> */}
                                    <div  />
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-bold text-md">{shoe.name}</p>
                                    <p className="text-sm text-[#098C4C]">€{shoe.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
