// GetUserReviews.js
import { useEffect, useState } from "react";
import EditReviewForm from "@/components/EditReview";
import supabase from "@/config/supabaseClient";
import { XCircleIcon, PencilIcon } from "@heroicons/react/24/solid";


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
  const [editingReviewId, setEditingReviewId] = useState<number | null>(null);
  const [newReview, setNewReview] = useState<Review>({
    id: 0,
    naam: "",
    rating: 0,
    review: "",
    titel: "",
  });

  useEffect(() => {
    const getUserReviews = async () => {
      try {
        const { data, error } = await supabase
          .from("user-reviews")
          .select("*")
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
  }, [shoeId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const addReview = async () => {
    try {
      const { data, error } = await supabase
        .from("user-reviews")
        .insert([
          {
            shoe_id: shoeId,
            naam: newReview.naam,
            rating: newReview.rating,
            review: newReview.review,
            titel: newReview.titel,
          },
        ]);

      if (error) {
        console.error("Error adding review:", error);
        alert(`Error adding review: ${error.message}`);
      } else {
        console.log("Review added successfully!");
        if (data && Array.isArray(data) && (data as any[]).length > 0) {
          setUserReviews((prevReviews) => [...prevReviews, data[0]]);
        }
        setNewReview({
          id: 0,
          naam: "",
          rating: 0,
          review: "",
          titel: "",
        });
        alert("Review added successfully!");
      }
    } catch (error) {
      console.error("Error adding review:", error);
      alert(`Error adding review: ${(error as any).message}`);
    }
  };

  const removeReview = async (reviewId: number) => {
    try {
      const { data, error } = await supabase
        .from("user-reviews")
        .delete()
        .eq("id", reviewId);

      if (error) {
        console.error("Error removing review:", error);
        alert(`Error removing review: ${error.message}`);
      } else {
        console.log("Review removed successfully!");
        setUserReviews((prevReviews) =>
          prevReviews.filter((review) => review.id !== reviewId)
        );
        alert("Review removed successfully!");
      }
    } catch (error) {
      console.error("Error removing review:", error);
      alert(`Error removing review: ${(error as any).message}`);
    }
  };

  const editReview = (reviewId: number) => {
    setEditingReviewId(reviewId);
  };

  const updateReview = async (updatedReview: Review) => {
    try {
      const { data, error } = await supabase
        .from("user-reviews")
        .update(updatedReview)
        .eq("id", updatedReview.id);

      if (error) {
        console.error("Error updating review:", error);
        alert(`Error updating review: ${error.message}`);
      } else {
        console.log("Review updated successfully!");
        setUserReviews((prevReviews) =>
          prevReviews.map((review) =>
            review.id === updatedReview.id ? updatedReview : review
          )
        );
        setEditingReviewId(null);
        alert("Review updated successfully!");
      }
    } catch (error) {
      console.error("Error updating review:", error);
      alert(`Error updating review: ${(error as any).message}`);
    }
  };

  return (
    <>
      <table className="w-full border-collapse">
        <tbody>
          {userReviews.map((review) => (
            <tr key={review.id} className="text-[#098C4C] text-left border-b border-gray-300">
              <td className="py-2 px-4">{review.naam}</td>
              <td className="py-2 px-4">{review.rating}</td>
              <td className="py-2 px-4">{review.review}</td>
              <td className="py-2 px-4">{review.titel}</td>
              <td className="py-2 px-4">
                <button onClick={() => removeReview(review.id)} className="text-red-500 hover:opacity-50">
                  <XCircleIcon className="w-6 h-6" />
                </button>
                <button onClick={() => editReview(review.id)} className="text-black hover:opacity-50 ml-2">
                  <PencilIcon className="w-6 h-6" />
                </button>
              </td>
              {editingReviewId === review.id && (
                <td colSpan={5}>
                  <EditReviewForm review={review} onUpdate={updateReview} />
                </td>
              )}
            </tr>
          ))}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl mt-3">Add Reviews</h1>
          </div>
          <tr>
            <td className="py-2 px-4">
              <input
                type="text"
                name="naam"
                value={newReview.naam}
                onChange={handleInputChange}
                placeholder="Name"
                className="w-full border border-gray-300 p-2"
              />
            </td>
            <td className="py-2 px-4">
              <input
                type="number"
                name="rating"
                value={newReview.rating}
                onChange={handleInputChange}
                placeholder="Rating"
                className="w-full border border-gray-300 p-2"
              />
            </td>
            <td className="py-2 px-4">
              <input
                name="review"
                value={newReview.review}
                onChange={handleInputChange}
                placeholder="Review"
                className="w-full border border-gray-300 p-2"
              />
            </td>
            <td className="py-2 px-4">
              <input
                type="text"
                name="titel"
                value={newReview.titel}
                onChange={handleInputChange}
                placeholder="Title"
                className="w-full border border-gray-300 p-2"
              />
            </td>
            <td className="py-2 px-4">
              <button onClick={addReview} className="bg-[#098C4C] text-white px-4 py-2 rounded">
                Add Review
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}