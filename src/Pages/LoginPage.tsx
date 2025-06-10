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
    <div className="h-screen flex flex-col">
      <Navbar />

      {/* Body */}
      <div className="flex flex-1" style={{ backgroundColor: "#FFB749" }}>
        {/* Left - Rotating Dog Images */}
        <div className="w-1/2 flex justify-center items-center p-6">
          <img
            src={dogImages[currentImageIndex]}
            alt="Dog"
            className="rounded-xl shadow-xl w-full max-w-2xl h-auto object-cover"
          />
        </div>

        {/* Right - Login Form */}
        <div className="w-1/2 flex flex-col justify-center items-center px-10">
          <h2 className="text-4xl font-bold text-[#300D38] mb-8">Login Here!</h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 w-full max-w-md bg-[#300D38]/90 p-10 rounded-[40px] shadow-lg"
          >
            <label className="text-white block mb-1 text-lg">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="p-3 w-full rounded bg-[#FFB749] text-black"
            />

            <label className="text-white block mb-1 text-lg">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-3 w-full rounded bg-[#FFB749] text-black"
            />

            <button
              type="submit"
              className="mt-10 w-40 bg-[#890075] text-white px-6 py-3 rounded-[40px] hover:bg-[#ed63cf] hover:text-white transition-colors mx-auto block text-lg"
            >
              Log In
            </button>
          </form>
        </div>
      </div>

      {/* Footer with Rotating Quotes */}
      <div
        className="bg-[#300D38] flex items-center justify-center pt-4 pb-6 px-4"
        style={{ height: "calc(100vh - 80vh - 64px)" }}
      >
        <p className="text-white text-xl text-center max-w-4xl italic">
          "{dogQuotes[currentQuoteIndex]}"
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
