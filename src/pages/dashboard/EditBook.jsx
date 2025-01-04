import React, { useContext, useEffect, useState } from "react";
import StatusContext from "../../context/Context";
import { useNavigate, useParams } from "react-router";
import { Star, ArrowLeft } from "lucide-react";

export default function EditBook() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { setStatus } = useContext(StatusContext);
  const [book, setBook] = useState({
    name: "",
    pages: "",
    author: "",
    genre: [],
    username: "",
    rating: "",
    review: "",
  });
  const [formData, setFormData] = useState({
    rating: "",
    review: "",
  });

  useEffect(() => {
    (async () => {
      try {
        setStatus({ error: "", success: "", isLoading: true });
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/one-book/${bookId}`, {
          headers: {
            Authorization: `BEARER ${token}`,
          },
        });
        const data = await response.json();
        setStatus({ error: "", success: "", isLoading: false });

        if (!response.ok) throw new Error(data.message);
        setBook(data);
      } catch (error) {
        setStatus({ error: error.message, success: "", isLoading: false });
      }
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setStatus({ error: "", success: "", isLoading: true });
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/update-book/${book._id}`, {
        method: "put",
        headers: {
          Authorization: `BEARER ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setStatus({ error: "", success: "", isLoading: false });

      if (!response.ok) throw new Error(data.message);
      setStatus({ error: "", success: "Updated successfully", isLoading: false });
      setFormData({ rating: "", review: "" });
    } catch (error) {
      setStatus({ error: error.message, success: "", isLoading: false });
    }
  };

  const renderStarInput = () => {
    return (
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button key={star} type="button" onClick={() => setFormData((prev) => ({ ...prev, rating: star }))} className="focus:outline-none">
            <Star className={`w-6 h-6 xs:w-8 xs:h-8 ${star <= formData.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300 hover:text-yellow-200"} transition-colors`} />
          </button>
        ))}
      </div>
    );
  };

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

  return (
    <div className="min-h-full w-full p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <button onClick={() => navigate("/dashboard")} className="flex items-center text-emerald-600 hover:text-emerald-700 mb-4">
            <ArrowLeft className="w-5 h-5 mr-1" />
            Back to Dashboard
          </button>
          <h1 className="text-md font-bold text-gray-800 mb-2">Edit Book</h1>
          <div className="flex gap-2 text-gray-600">
            <h2 className="font-medium">{capitalizeSentence(book.name)}</h2>
            <span>by</span>
            <p>{capitalizeSentence(book.author)}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Rating</label>
              {renderStarInput()}
            </div>

            <div className="space-y-2">
              <label htmlFor="review" className="block text-sm font-medium text-gray-700">
                Review
              </label>
              <textarea id="review" rows={6} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="Write your thoughts about this book..." value={formData.review} onChange={(e) => setFormData((prev) => ({ ...prev, review: e.target.value }))} />
            </div>

            <div className="flex gap-4 pt-4">
              <button type="submit" className="text-md flex items-center justify-center px-2 py-1 xs:px-4 xs:py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors duration-200 basis-1/2">
                Save
              </button>
              <button type="button" onClick={() => navigate("/dashboard")} className="text-md flex items-center justify-center px-2 py-1xs:px-4 xs:py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200 basis-1/2">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
