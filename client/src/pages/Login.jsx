import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    try {
      await api.post("/login", { email, password });
      window.location.href = "/dashboard";
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      
      {/* LOGO */}
      <div className="absolute top-6 left-8 text-white text-xl font-bold">
        ⚡ auth
      </div>

      {/* CARD */}
      <div className="bg-[#0f172a]/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md text-white">
        
        <h2 className="text-2xl font-semibold text-center mb-2">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-400 mb-6 text-sm">
          Login to your account
        </p>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email Id"
          className="w-full mb-3 p-3 rounded-lg bg-[#1e293b] text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-2 p-3 rounded-lg bg-[#1e293b] text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* FORGOT */}
        <div className="text-right mb-4">
          <Link to="/forgot" className="text-sm text-purple-400 hover:underline">
            Forgot password?
          </Link>
        </div>

        {/* LOGIN BUTTON */}
        <button
          onClick={submit}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 font-semibold hover:opacity-90 transition"
        >
          Login
        </button>

        {/* GOOGLE */}
        <button
          onClick={() =>
            (window.location.href =
              "http://localhost:5000/api/auth/google")
          }
          className="w-full mt-3 flex items-center justify-center gap-2 bg-white text-black py-3 rounded-lg hover:bg-gray-200 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            width="20"
          />
          Continue with Google
        </button>

        {/* REGISTER */}
        <p className="text-center text-sm text-gray-400 mt-5">
          Don’t have an account?{" "}
          <Link to="/register" className="text-purple-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}