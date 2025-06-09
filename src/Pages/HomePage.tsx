import React from 'react';
import { Link } from "react-router-dom";
import Navbar from '../Components/Navbar';

function HomePage() {
  return (
    <>
      <Navbar />
      <div className="h-screen flex flex-col justify-center items-center" style={{ backgroundColor: '#FFB749' }}>

        <h1 className="text-4xl font-bold text-gray-800 mb-8">Welcome to Fetch Dog Finder</h1>
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
    </>

  );
}
export default HomePage
