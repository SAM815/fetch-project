import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../Store/authSlice";
import { login } from "../API/auth";
import Navbar from "../Components/Navbar";
import dogImage1 from "../Assets/dog1.png";
import dogImage2 from "../Assets/dog3.png";
import dogImage3 from "../Assets/dog6.png";

const dogQuotes = [
  "Dogs do speak, but only to those who know how to listen. – Orhan Pamuk",
  "The better I get to know men, the more I find myself loving dogs. – Charles de Gaulle",
  "Dogs are not our whole life, but they make our lives whole. – Roger Caras",
  "Happiness is a warm puppy. – Charles M. Schulz",
];

const dogImages = [dogImage1, dogImage2, dogImage3];

function LoginPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(name, email);
      dispatch(loginSuccess({ name, email }));
      navigate("/search");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your input.");
    }
  };

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % dogImages.length);
    }, 10000);
    const quoteInterval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % dogQuotes.length);
    }, 10000);

    return () => {
      clearInterval(imageInterval);
      clearInterval(quoteInterval);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-col md:flex-col lg:flex-row flex-1 bg-[#FFB749] px-4 sm:px-6 md:px-10 py-10 gap-10 items-center justify-center">
        {/* Left - Image */}
        <div className="w-full md:w-3/4 lg:w-1/2 flex justify-center">
          <img
            src={dogImages[currentImageIndex]}
            alt="Dog"
            className="rounded-xl shadow-xl w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl object-cover"
          />
        </div>

        {/* Right - Form */}
        <div className="w-full md:w-3/4 lg:w-1/2 flex flex-col justify-center items-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#300D38] mb-6 text-center">
            Login Here!
          </h2>

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-[#300D38]/90 p-6 sm:p-8 md:p-10 rounded-[40px] shadow-lg space-y-6"
          >
            <div>
              <label className="text-white block mb-2 text-base sm:text-lg">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="p-3 w-full rounded bg-[#FFB749] text-black"
              />
            </div>

            <div>
              <label className="text-white block mb-2 text-base sm:text-lg">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="p-3 w-full rounded bg-[#FFB749] text-black"
              />
            </div>

            <button
              type="submit"
              className="mt-6 w-full sm:w-40 bg-[#890075] text-white px-6 py-3 rounded-[40px] hover:bg-[#ed63cf] transition-colors mx-auto block text-base sm:text-lg"
            >
              Log In
            </button>
          </form>
        </div>
      </div>

      {/* Footer Quote */}
      <div className="bg-[#300D38] flex items-center justify-center py-6 px-4">
        <p className="text-white text-sm sm:text-base md:text-lg text-center italic max-w-3xl">
          "{dogQuotes[currentQuoteIndex]}"
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
