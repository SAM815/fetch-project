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
    }, 10000); // Change every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      {/* Body */}
      <div className="flex flex-1" style={{ backgroundColor: '#FFB749' }}>
        {/* Left - Static Dog Image */}
        <div className="w-1/2 flex justify-center items-center p-6">
          <img
            src={require('../Assets/HomepageDog.png')}
            alt="Dog"
            className="rounded-xl shadow-xl w-full max-w-md h-auto object-cover"
          />
        </div>

        {/* Right - Website Info */}
        <div className="w-1/2 flex flex-col justify-center items-start px-10">
          <h1 className="text-5xl font-extrabold text-[#300D38] mb-6">Fetch Dog Finder</h1>
          <p className="text-lg text-gray-800 mb-8">
            Discover your perfect furry friend with Fetch Dog Finder. Search by breed, location, and more. Save your favorites, and even generate a match to find your best companion!
          </p>
          <Link to="/login">
            <button
              className="px-6 py-3 rounded-lg text-lg text-white"
              style={{ backgroundColor: '#300D38' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#890075')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#300D38')}
            >
              Get Started
            </button>
          </Link>
        </div>
      </div>

      {/* Footer with Rotating Quotes */}
      <div className="bg-[#300D38] flex items-center justify-center pt-4 pb-6 px-4" style={{ height: 'calc(100vh - 80vh - 64px)' }}>
        <p className="text-white text-xl text-center max-w-4xl italic">
          "{dogQuotes[currentQuoteIndex]}"
        </p>
      </div>
    </div>
  );
}

export default HomePage;
