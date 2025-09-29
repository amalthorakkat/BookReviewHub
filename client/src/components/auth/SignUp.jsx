import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/slices/authSlice";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // New state for username
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      console.error("Invalid email format");
      return;
    }
    if (password.length < 6) {
      console.error("Password must be at least 6 characters");
      return;
    }
    if (username.length < 3) {
      console.error("Username must be at least 3 characters");
      return;
    }
    console.log("Signup payload:", { email, password, username });
    try {
      const result = await dispatch(
        register({ email, password, username })
      ).unwrap();
      localStorage.setItem("token", result.token);
      navigate("/");
    } catch (err) {
      console.error("Signup error:", err.message || err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value.trim())}
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim().toLowerCase())}
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition disabled:bg-blue-300"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
