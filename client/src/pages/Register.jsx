import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      return toast.error("Please fill all fields.");
    }

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    try {
      setLoading(true);

      const { data } = await api.post("/auth/register", {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      toast.success(
        data.message || "User Registered Successfully 🎉"
      );

      navigate("/");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex justify-center items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-8 rounded-xl w-full max-w-md space-y-5"
      >
        <h1 className="text-3xl text-center text-white font-bold">
          Create Account
        </h1>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="w-full p-3 rounded bg-slate-700 text-white outline-none"
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 rounded bg-slate-700 text-white outline-none"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-3 rounded bg-slate-700 text-white outline-none"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="w-full p-3 rounded bg-slate-700 text-white outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded font-semibold transition disabled:opacity-50"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

        <p className="text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-green-500 hover:text-green-400 font-semibold"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;