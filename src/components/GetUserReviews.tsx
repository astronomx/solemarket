import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; 
import supabase from "@/config/supabaseClient";

export default function GetUserReviews() {
  const [userReviews, setUserReviews] = useState<any[]>([]);

  useEffect(() => {
    const getUserReviews = async () => {
      try {
        const { data, error } = await supabase.from("user-reviews").select('*');

        if (error) {
          console.error("Error fetching user reviews:", error);
          return;
        }

        if (data) {
          setUserReviews(data);
        }
      } catch (error) {
        console.error("Error fetching user reviews:", error);
      }
    };

    // Call the function when the component mounts
    getUserReviews();
  }, []); // Empty dependency array to run the effect once

  return (
    <>
      {userReviews.map((review, index) => (
        <tr key={index} className="text-[#098C4C] text-left">
          <td>{review.user_email}</td>
          <td>{review.rating}</td>
          <td>{review.review}</td>
        </tr>
      ))}
    </>
  );
}
