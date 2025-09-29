import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../../redux/slices/booksSlice';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-8">{error}</p>;

  return (
    <div className="px-[15px] pb-10">
      <div className="flex items-center justify-center flex-col">
        <h1 className="font-medium text-[30px] text-center pt-20 px-6 pb-4">
          Explore by Genre
        </h1>
        <p className="text-center max-w-[500px] pb-8 mx-auto text-gray-600">
          Discover your next favorite book by browsing through a variety of genres tailored to your interests.
        </p>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {books.map((book) => (
            <div
              key={book._id}
              onClick={() => navigate(`/book-details/${book._id}`)}
              className="cursor-pointer border w-[160px] h-[240px] sm:w-[200px] sm:h-[280px] rounded-lg shadow-sm overflow-hidden transform transition duration-300 hover:-translate-y-2 hover:shadow-lg hover:scale-105 active:scale-95 active:shadow-inner"
            >
              <div className="bg-[#c2c2c2]">
                {book.image ? (
                  <img
                    src={`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}${book.image}`}
                    alt={book.title}
                    className="w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] object-cover"
                  />
                ) : (
                  <img
                    src={`https://picsum.photos/200/200?random=${book._id}`}
                    alt={book.title}
                    className="w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] object-cover"
                  />
                )}
              </div>
              <div className="text-center p-2 sm:p-3">
                <h1 className="font-medium text-sm sm:text-base">{book.title}</h1>
                <p className="text-[#6c6c6c] text-xs sm:text-[13px]">{book.author}</p>
                <p className="text-[#6c6c6c] text-xs sm:text-[13px]">{book.genre}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;