import { useState, useEffect } from "react";

interface EditReviewFormProps {
  review: any;
  onUpdate: (review: any) => void;
}

const EditReviewForm: React.FC<EditReviewFormProps> = ({ review, onUpdate }) => {
  const [editedReview, setEditedReview] = useState(review);

  useEffect(() => {
    setEditedReview(review);
  }, [review]);

  const handleReviewChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "rating") {
      const ratingValue = parseInt(value, 10);
      if (ratingValue >= 1 && ratingValue <= 5) {
        setEditedReview((prevReview: typeof review) => ({
          ...prevReview,
          [name]: ratingValue,
        }));
      }
    }
    else if (name === "review") {
      if (value.length <= 100) {
        setEditedReview((prevReview: typeof review) => ({
          ...prevReview,
          [name]: value,
        }));
      }
    }
    else {
      setEditedReview((prevReview: typeof review) => ({
        ...prevReview,
        [name]: value,
      }));
    }
  };

  const saveChanges = () => {
    onUpdate(editedReview);
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Edit Your Review</h1>
      <div className="mb-4">
        <label htmlFor="rating" className="block text-sm font-semibold mb-1">
          Rating:
        </label>
        <input
          type="number"
          id="rating"
          name="rating"
          value={editedReview.rating}
          onChange={handleReviewChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-[#098C4C]"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="review" className="block text-sm font-semibold mb-1">
          Review:
        </label>
        <input
          id="text"
          name="review"
          value={editedReview.review}
          onChange={handleReviewChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-[#098C4C] resize-none"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="titel" className="block text-sm font-semibold mb-1">
          Title:
        </label>
        <input
          type="text"
          id="titel"
          name="titel"
          value={editedReview.titel}
          onChange={handleReviewChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-[#098C4C]"
        />
      </div>
      <button
        type="button"
        onClick={saveChanges}
        className="bg-[#098C4C] text-white py-2 px-4 rounded-md hover:bg-[#246948] focus:outline-none focus:ring focus:border-[#098C4C]"
      >
        Save Changes
      </button>
    </div>
  );
};

export default EditReviewForm;
