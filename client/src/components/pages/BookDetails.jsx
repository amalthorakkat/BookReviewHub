import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookDetails } from "../../redux/slices/booksSlice";
import ReviewForm from "../pages/ReviewForm";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bookDetails, loading, error } = useSelector((state) => state.books);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchBookDetails(id));
  }, [dispatch, id]);

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-8">{error}</p>;
  if (!bookDetails) return null;

  const { book, reviews } = bookDetails;

  return (
    <div className="px-[15px] pb-10">
      <div className="flex items-center justify-center flex-col">
        <h1 className="font-medium text-[30px] text-center pt-20 px-6 pb-4">
          {book.title}
        </h1>
      </div>
      <div className="flex justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl w-full">
          {book.image ? (
            <img
              src={`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}${
                book.image
              }`}
              alt={book.title}
              className="w-full h-64 object-cover rounded-md mb-4"
            />
          ) : (
            <div className="w-full h-64 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
              <p>No Image</p>
            </div>
          )}
          <p className="text-gray-600">Author: {book.author}</p>
          <p className="text-gray-600">Genre: {book.genre}</p>
          <p className="text-gray-600">
            Average Rating: {book.averageRating.toFixed(1)} ({book.reviewCount}{" "}
            reviews)
          </p>
          <h2 className="text-xl font-semibold mt-6 mb-4">Reviews</h2>
          {reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            <ul className="space-y-4">
              {reviews.map((review) => (
                <li key={review._id} className="border-t pt-2">
                  <p className="text-gray-600">Rating: {review.rating}/5</p>
                  <p>{review.comment}</p>
                  <p className="text-sm text-gray-500">
                    By: {review.user.email}
                  </p>
                </li>
              ))}
            </ul>
          )}
          {user ? (
            <ReviewForm bookId={id} />
          ) : (
            <p className="mt-4 text-center">
              <a href="/signin" className="text-blue-500 hover:underline">
                Sign in to add a review
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
