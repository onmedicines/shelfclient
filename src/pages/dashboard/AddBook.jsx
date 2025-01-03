import React, { useContext, useState } from "react";
import StatusContext from "../../context/Context";
import { Book, PlusCircle, SquareChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";

export default function AddBook() {
  const navigate = useNavigate();
  const { setStatus } = useContext(StatusContext);
  const token = localStorage.getItem("token");
  const [book, setBook] = useState({
    name: "",
    pages: "",
    author: "",
    genre: [],
    rating: "",
    review: "",
  });

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      if (!book.name || !book.pages || !book.author || book.genre.length === 0 || !book.rating || !book.review) throw new Error("All details are required");

      setStatus({ error: "", success: "", isLoading: true });
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/books`, {
        method: "put",
        headers: {
          Authorization: `BEARER ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      });
      const data = await response.json();
      setStatus({ error: "", success: "", isLoading: false });

      if (!response.ok) throw new Error(data.message);
      setStatus({ error: "", success: "Book added to SHELF", isLoading: false });
      setBook({
        name: "",
        pages: "",
        author: "",
        genre: [],
        rating: "",
        review: "",
      });
    } catch (error) {
      setStatus({ error: error.message, success: "", isLoading: false });
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-6">
      <button onClick={() => navigate(-1)}>
        <SquareChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-500 transition-colors duration-200 hover:text-emerald-700" />
      </button>
      <div className="flex items-center mb-6">
        <div className="flex-1">
          <h2 className="text-md font-bold text-gray-800">Add to Your Shelf</h2>
          <p className="text-gray-600 text-sm">Fill in the details of your new book</p>
        </div>
        <div className="p-2 bg-emerald-50 rounded-full">
          <Book className="w-5 h-5 text-emerald-500" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
        <form onSubmit={submitForm} className="p-6 space-y-4" autoComplete="on">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="name">
                Book Name
              </label>
              <input type="text" id="name" value={book.name} onChange={(e) => setBook((prev) => ({ ...prev, name: e.target.value }))} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="author">
                Author
              </label>
              <input type="text" id="author" value={book.author} onChange={(e) => setBook((prev) => ({ ...prev, author: e.target.value }))} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="pages">
                Pages
              </label>
              <input type="number" id="pages" value={book.pages} onChange={(e) => setBook((prev) => ({ ...prev, pages: e.target.value }))} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="rating">
                Rating
              </label>
              <input type="number" id="rating" value={book.rating} onChange={(e) => setBook((prev) => ({ ...prev, rating: e.target.value }))} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" min="1" max="5" step="0.1" />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="genre">
              Genre (comma-separated)
            </label>
            <input type="text" id="genre" value={book.genre} onChange={(e) => setBook((prev) => ({ ...prev, genre: e.target.value.split(",").map((g) => g.trim()) }))} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            {book.genre.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {book.genre.map((g, i) => (
                  <span key={i} className="px-2 py-1 bg-emerald-50 text-emerald-600 text-sm rounded-full">
                    {g}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="review">
              Review
            </label>
            <textarea id="review" value={book.review} onChange={(e) => setBook((prev) => ({ ...prev, review: e.target.value }))} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-32" />
          </div>
        </form>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <button onClick={submitForm} className="w-full bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 transition-colors duration-200 font-medium flex items-center justify-center">
            <PlusCircle className="w-4 h-4 mr-2" />
            Add to Shelf
          </button>
        </div>
      </div>
    </main>
  );
}
