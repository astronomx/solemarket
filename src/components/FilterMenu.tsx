
import { useState } from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

async function getProducts() {
    const supabase = createServerComponentClient({
        cookies,
    });

    const { data, error } = await supabase
        .from("shoes")
        .select("*")

    if (error) {
        throw error;
    }

    return data;
}


export default async function FilterMenu() {

    return(
        <>
          <div className="flex flex-col">
            <div className="flex flex-row items-center space-x-3">
              <input type="checkbox" name="nike" value={"NIKE"} />
              <label htmlFor="nike">Nike</label>
            </div>

            <div className="flex flex-row items-center space-x-3">
              <input type="checkbox" name="adidas" value={"ADIDAS"} />
              <label htmlFor="adidas">Adidas</label>
            </div>

            <div className="flex flex-row items-center space-x-3">
              <input type="checkbox" name="jordan" value={"JORDAN"} />
              <label htmlFor="jordan">Jordan</label>
            </div>

          </div>
        </>
    )
}
