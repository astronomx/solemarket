// AddReview.tsx

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import supabase from "@/config/supabaseClient";

interface Review {
  id: number;
  naam: string;
  rating: number;
  review: string;
  titel: string;
}

interface GetUserReviewsProps {
  shoeId: number; // Pass the shoeId as a prop
}

export default function GetUserReviews({ shoeId }: GetUserReviewsProps) {
  const [userReviews, setUserReviews] = useState<Review[]>([]);

  useEffect(() => {
    const getUserReviews = async () => {
      try {
        const { data, error } = await supabase
          .from("user-reviews")
          .select('*')
          .eq("shoe_id", shoeId);

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

    getUserReviews();
  }, [shoeId]); // Dependency on shoeId


  return (
    <>
      {userReviews.map((review) => (
        <tr key={review.id} className="text-[#098C4C] text-left">
          <td>{review.naam}</td>
          <td>{review.rating}</td>
          <td>{review.review}</td>
          <td>{review.titel}</td>
        </tr>
      ))}
    </>
  );
}