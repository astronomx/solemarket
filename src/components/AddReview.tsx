import { useState } from "react";
import supabase from "@/config/supabaseClient";
import { GetSession } from "@/components/GetSession";

interface AddReviewProps {
  shoeId: number;
}

const AddReview: React.FC<AddReviewProps> = ({ shoeId }) => {
  const [newReview, setNewReview] = useState({
    rating: 0,
    review: "",
    titel: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "rating") {
      const ratingValue = parseInt(value, 10);
      if (ratingValue >= 1 && ratingValue <= 5) {
        setNewReview((prevReview) => ({
          ...prevReview,
          [name]: ratingValue,
        }));
      }
    }
    else if (name === "review") {
      if (value.length <= 100) {
        setNewReview((prevReview) => ({
          ...prevReview,
          [name]: value,
        }));
      }
    }
    else {
      setNewReview((prevReview) => ({
        ...prevReview,
        [name]: value,
      }));
    }
  };

  const addReview = async () => {
    const userSession = GetSession();
    if (!userSession) {
      alert("Please log in to submit a review.");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("user-reviews")
        .insert([
          {
            shoe_id: shoeId,
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
        setNewReview({
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
                <td className="py-2 px-4">
                  <input
                    type="number"
                    name="rating"
                    value={newReview.rating}
                    onChange={handleInputChange}
                    placeholder="Rating (1-5)"
                    className="w-full border border-gray-300 p-2"
                  />
                </td>
                <td className="py-2 px-4">
                  <input
                    name="review"
                    value={newReview.review}
                    onChange={handleInputChange}
                    placeholder="Review (max 100 characters)"
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
                  <button
                    onClick={addReview}
                    className="bg-[#098C4C] text-white px-4 py-2 rounded"
                  >
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
