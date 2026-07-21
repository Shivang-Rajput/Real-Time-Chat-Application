import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", formData);

      login(res.data.user, res.data.token);

      toast.success("Login Successful 🎉");

      navigate("/chat");
    } catch (error) {
      console.error(error.response?.data || error.message);

      toast.error(
        error.response?.data?.message || "Login Failed ❌"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-8 rounded-xl w-[400px] space-y-5"
      >
        <h1 className="text-3xl text-center text-white font-bold">
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-700 text-white outline-none"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-700 text-white outline-none"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded font-semibold transition"
        >
          Login
        </button>

        <p className="text-center text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-green-500 hover:text-green-400 font-semibold"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;