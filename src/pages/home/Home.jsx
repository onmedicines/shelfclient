import React from "react";
import { BookOpen, Star, Clock, Filter } from "lucide-react";

export default function Home() {
  return (
    <div id="home" className="p-6 md:p-8 max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-bold text-emerald-600 mb-4">
          Your bookshelf,
          <br />
          <span className="text-emerald-500">digitally decluttered</span>
        </h1>
        <p className="text-emerald-700 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          <span className="font-bold text-emerald-600">SHELF</span> helps you track your reading journey with detailed book records, ratings, and personal reviews.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="bg-emerald-50 p-6 rounded-md border border-emerald-100">
          <BookOpen className="w-10 h-10 text-emerald-500 mb-4" />
          <h3 className="text-emerald-800 font-bold text-xl mb-2">Track Your Books</h3>
          <p className="text-emerald-600">Keep a detailed record of every book you've read, including titles, authors, and completion dates.</p>
        </div>

        <div className="bg-emerald-50 p-6 rounded-md border border-emerald-100">
          <Star className="w-10 h-10 text-emerald-500 mb-4" />
          <h3 className="text-emerald-800 font-bold text-xl mb-2">Rate & Review</h3>
          <p className="text-emerald-600">Share your thoughts and rate books to build your personal reading history.</p>
        </div>

        <div className="bg-emerald-50 p-6 rounded-md border border-emerald-100">
          <Clock className="w-10 h-10 text-emerald-500 mb-4" />
          <h3 className="text-emerald-800 font-bold text-xl mb-2">Reading Progress</h3>
          <p className="text-emerald-600">Monitor your reading habits and track progress through your reading list.</p>
        </div>

        <div className="bg-emerald-50 p-6 rounded-md border border-emerald-100">
          <Filter className="w-10 h-10 text-emerald-500 mb-4" />
          <h3 className="text-emerald-800 font-bold text-xl mb-2">Smart Organization</h3>
          <p className="text-emerald-600">Easily search and filter your collection to find exactly what you're looking for.</p>
        </div>
      </div>

      <div className="text-center bg-gradient-to-r from-emerald-500 to-emerald-600 p-8 rounded-md shadow-md">
        <h2 className="text-white font-bold text-xl md:text-3xl mb-4">Start Your Reading Journey Today</h2>
        <p className="text-emerald-50 mb-6">Join SHELF and never lose track of your reading adventures again.</p>
        <div className="flex gap-4 justify-center">
          <button className="text-sm bg-white text-emerald-600 px-6 py-2 rounded-sm font-bold hover:bg-emerald-50 transition-colors">Sign Up</button>
        </div>
      </div>
    </div>
  );
}
