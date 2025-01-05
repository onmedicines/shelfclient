import React, { useState } from "react";
import { Trash, Star, ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export default function BookCard({ book, onDelete, capitalizeSentence }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => <Star key={index} className={`w-4 h-4 ${index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />);
  };

  return (
    <div className="relative w-full h-[350px] perspective-1000">
      <div className={`w-full h-full transition-transform duration-700 transform-style-preserve-3d relative ${isFlipped ? "rotate-y-180" : ""}`}>
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden bg-white rounded-lg shadow-md overflow-hidden flex flex-col justify-between">
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800 mb-1">{capitalizeSentence(book.name) || "Untitled"}</h3>
                <p className="text-gray-600 mb-2">by {capitalizeSentence(book.author) || "Unknown Author"}</p>
              </div>
              <button onClick={() => onDelete(book._id)} className="p-2 bg-emerald-50 rounded-full">
                <Trash className="w-4 h-4 text-red-500 hover:text-red-700" />
              </button>
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

          <div className="flex justify-between px-6 py-3 bg-gray-50 border-t border-gray-100">
            <Link to={`/dashboard/edit-book/${book._id}`} className="text-emerald-500 hover:text-emerald-600 text-sm font-medium">
              Edit
            </Link>
            <button onClick={() => setIsFlipped(true)} className="text-emerald-500 hover:text-emerald-600 text-sm font-medium">
              Read review
            </button>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute w-full h-full backface-hidden bg-white rounded-lg shadow-md overflow-hidden flex flex-col rotate-y-180">
          <div className="p-6 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Review</h3>
              <button onClick={() => setIsFlipped(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ArrowLeft className="w-4 h-4 text-emerald-600" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2">
              <p className="text-gray-600">{book.review || "No review available"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
