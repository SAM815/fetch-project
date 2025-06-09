import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../Store/authSlice";
import { login } from "../API/auth";
import { useState } from "react";
import Navbar from "../Components/Navbar";

function LoginPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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

  return (
    <>
      <Navbar />
      <div className="bg-[#FFB749] min-h-screen flex flex-col items-center">
        {/* Top-centered wrapper */}
        <div className="mt-16 flex flex-col items-center">
          <h2 className="text-3xl font-bold text-[#300D38] mb-6">Login Here!</h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 w-full max-w-xs h-[320px] bg-[#300D38]/90 p-8 rounded-[40px] shadow-lg"
          >
            <label className="text-white block mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="p-2 w-full rounded bg-[#FFB749] text-black"
            />

            <label className="text-white block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-2 w-full rounded bg-[#FFB749] text-black"
            />
            

            <button
              type="submit"
              className="mt-12 w-36 bg-[#FFB749] text-black px-4 py-2 rounded-[40px] hover:bg-[#890075] hover:text-white transition-colors mx-auto block"
            >
              Log In
            </button>

          </form>
        </div>
      </div>
    </>

  );
}

export default LoginPage;
