import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Navbar from '../Components/Navbar';

const dogQuotes = [
  "Dogs do speak, but only to those who know how to listen. – Orhan Pamuk",
  "The better I get to know men, the more I find myself loving dogs. – Charles de Gaulle",
  "Dogs are not our whole life, but they make our lives whole. – Roger Caras",
  "Happiness is a warm puppy. – Charles M. Schulz",
];

function HomePage() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % dogQuotes.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Body */}
      <div className="flex flex-col md:flex-row flex-1 bg-[#FFB749] px-4 sm:px-6 md:px-10 py-8 md:py-12 lg:py-16 gap-6 md:gap-10">

        {/* Left - Image */}
        <div className="md:w-1/2 flex justify-center items-center mb-6 md:mb-0">
          <img
            src={require('../Assets/HomepageDog.png')}
            alt="Dog"
            className="rounded-xl shadow-xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md xl:max-w-lg h-auto object-cover"
          />

        </div>

        {/* Right - Info */}
        <div className="md:w-1/2 flex flex-col justify-center items-start md:items-center md:text-center px-2 md:px-6">

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#300D38] mb-4">
            Fetch Dog Finder
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-800 mb-6 leading-relaxed max-w-xl">
            Discover your perfect furry friend with Fetch Dog Finder...
          </p>

          <Link to="/login">
            <button
              className="px-5 py-3 rounded-lg text-base sm:text-lg text-white bg-[#300D38] hover:bg-[#890075] transition duration-300"
            >
              Get Started
            </button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#300D38] flex items-center justify-center py-6 px-4">
        <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl text-center italic max-w-3xl">
          "{dogQuotes[currentQuoteIndex]}"
        </p>
      </div>

    </div>
  );
}

export default HomePage;
