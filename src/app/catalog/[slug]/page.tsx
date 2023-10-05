import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

import { ArrowPathIcon } from "@heroicons/react/24/outline";


async function getShoeDetails({ params }: { params: { slug: string } }) {
    const supabase = createServerComponentClient({
        cookies,
    })

    const { data, error } = await supabase
        .from("shoes")
        .select("*")
        .eq("slug", params.slug)
        .single();

    if (error) {
        throw error
    }

    return {
        props: { shoe: data }
    }
}

export default function ShoeCDetails({ shoe }: { shoe?: { id?: number; name?: string; price?: number; imageURL?: any } }) {
// export default function ShoeCDetails() {
    
    return (
        <div className="flex justify-center items-center h-screen">
            {shoe ? (
                <>
                    <h1 className="text-bold">{shoe.name}</h1>
                    <p>ID: {shoe.id}</p>
                    <p>Price: {shoe.price}</p>
                    {/* Render other properties as needed */}
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