import React, { useContext, useEffect, useState } from "react";
import { PlusCircle, Star, Book } from "lucide-react";
import StateContext from "../../context/Context";
import { useNavigate } from "react-router";

export default function ViewBooks() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { setStatus } = useContext(StateContext);
  const [books, setBooks] = useState([
    {
      name: "",
      pages: "",
      author: "",
      genre: [],
      username: "",
      rating: "",
      review: "",
    },
  ]);

  useEffect(() => {
    (async () => {
      try {
        setStatus({ error: "", success: "", isLoading: true });
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/books`, {
          headers: {
            Authorization: `BEARER ${token}`,
          },
        });
        const data = await response.json();
        setStatus({ error: "", success: "", isLoading: false });

        if (!response.ok) throw new Error(data.message);
        setBooks(data);
      } catch (error) {
        setStatus({ error: error.message, success: "", isLoading: false });
      }
    })();
  }, []);

  const capitalizeWord = (word = "") => {
    let firstWord = word.split(" ")[0];
    let newWord = firstWord.substring(0, 1).toUpperCase() + firstWord.substring(1).toLowerCase();
    return newWord;
  };

  const capitalizeSentence = (sentence = "") => {
    let words = sentence.split(" ");
    let newWords = words.map((word) => capitalizeWord(word));
    return newWords.join(" ");
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => <Star key={index} className={`w-4 h-4 ${index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />);
  };

  return (
    <main className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-md font-bold text-gray-800">Your Shelf</h2>
          <p className="text-gray-600 text-sm">
            {books.length} {books.length == 1 ? "book" : "books"} in your collection
          </p>
        </div>
        <button
          onClick={() => {
            navigate("/dashboard/add-book");
          }}
          className="flex items-center px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors duration-200 text-sm">
          <PlusCircle className="w-4 h-4 xs:mr-2" />
          <span className="hidden xs:block">Add Book</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{capitalizeSentence(book.name) || "Untitled"}</h3>
                  <p className="text-gray-600 mb-2">by {capitalizeSentence(book.author) || "Unknown Author"}</p>
                </div>
                <div className="p-2 bg-emerald-50 rounded-full">
                  <Book className="w-5 h-5 text-emerald-500" />
                </div>
              </div>

              <div className="flex items-center mb-3">{renderStars(book.rating)}</div>

              {book.genre && book.genre.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {book.genre.map((g, i) => (
                    <span key={i} className="px-2 py-1 bg-emerald-50 text-emerald-600 text-sm rounded-full">
                      {g}
                    </span>
                  ))}
                </div>
              )}

              {book.review && <p className="text-gray-600 text-sm line-clamp-3">{book.review}</p>}

              {book.pages && <p className="text-sm text-gray-500 mt-3">{book.pages} pages</p>}
            </div>

            <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
              <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">Edit</button>
            </div>
          </div>
        ))}
      </div>

      {books.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Your shelf is empty</h3>
          <p className="text-gray-600 mb-4">Start building your collection by adding your first book</p>
          <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors duration-200">Add Your First Book</button>
        </div>
      )}
    </main>
  );
}
