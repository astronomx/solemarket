"use client"

import React, { useEffect, useState } from "react";
import supabase from "@/config/supabaseClient";

export default function Catalog() {

    // setting the state for the shoes
    const [shoes, setShoes] = useState<String | null>("");

    useEffect(() => {
        getShoes();
    }, [])

    // function to get the shoes from the database
    async function getShoes() {
        
    }

  return (
    <>

    </>
  );
}
