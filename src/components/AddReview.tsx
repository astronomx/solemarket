import { useState } from "react";
import supabase from "@/config/supabaseClient";
import { GetSession } from "@/components/GetSession";

interface Review {
  rating: number;
  review: string;
  titel: string;
  [key: string]: number | string;
}

interface AddReviewProps {
  shoeId: number;
}

const AddReview: React.FC<AddReviewProps> = ({ shoeId }) => {
  const [newReview, setNewReview] = useState<Review>({
    rating: 0,
    review: "",
    titel: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setNewReview((prevReview) => ({
      ...prevReview,
      [name]: name === "rating" ? Math.min(5, Math.max(1, parseInt(value, 10))) : value,
    }));
  };

  const addReview = async () => {
    const userSession = GetSession();

    if (!userSession) {
      alert("Please log in to submit a review.");
      return;
    }

    try {
      const { data, error } = await supabase.from("user-reviews").insert([
        {
          shoe_id: shoeId,
          ...newReview,
        },
      ]);

      if (error) {
        console.error("Error adding review:", error);
        alert(`Error adding review: ${error.message}`);
      } else {
        console.log("Review added successfully!");
        setNewReview({ rating: 0, review: "", titel: "" });
        alert("Review added successfully!");
      }
    } catch (error) {
      console.error("Error adding review:", error);
      alert(`Error adding review: ${(error as any).message}`);
    }
  };

  const userSession = GetSession();

  return (
    <>
      {userSession && (
        <div>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl mt-3">Add Reviews</h1>
          </div>
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                {["rating", "review", "titel"].map((field) => (
                  <td key={field} className="py-2 px-4">
                    <input
                      type={field === "rating" ? "number" : "text"}
                      name={field}
                      value={newReview[field]}
                      onChange={handleInputChange}
                      placeholder={
                        field === "rating" ? "Rating (1-5)" : field === "review" ? "Review (max 100 characters)" : "Title"
                      }
                      className="w-full border border-gray-300 p-2"
                    />
                  </td>
                ))}
                <td className="py-2 px-4">
                  <button onClick={addReview} className="bg-[#098C4C] text-white px-4 py-2 rounded">
                    Add Review
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default AddReview;
