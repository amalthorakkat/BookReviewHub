import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "../../redux/slices/reviewsSlice";
import { fetchBookDetails } from "../../redux/slices/booksSlice";

const ReviewForm = ({ bookId }) => {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.reviews);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addReview({ bookId, rating, comment })).unwrap();
      dispatch(fetchBookDetails(bookId)); // Refresh book details
      setRating(1);
      setComment("");
    } catch (err) {
      console.error("Review error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 bg-gray-50 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Add a Review</h3>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Rating (1-5)</label>
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          min="1"
          max="5"
          required
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        ></textarea>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition disabled:bg-blue-300"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
};

export default ReviewForm;
