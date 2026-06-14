import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form'
import { useAuth } from "../hooks/useAuth";

export default function Register() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { loading, handleRegister } = useAuth()

  const onSubmit = async (data) => {
    try {
      // Basic validation
      if (data.password !== data.confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      await handleRegister(data)
      navigate("/login");
    } catch (error) {
      setError(error)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="max-w-md w-full bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-800">
        <h2 className="text-3xl font-bold text-indigo-400 text-center mb-6">
          Create an Account
        </h2>

        {error && (
          <div className="bg-red-600 text-white px-4 py-2 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm mb-1" htmlFor="name">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Your Username"
              className="w-full px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              {...register('username', { required: 'Username is required' })}
            />
            {errors.username && (<p className="text-red-500 text-sm mt-1">{errors.username.message}</p>)}
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              {...register('email', { required: "Email is required" })}
            />
            {errors.email && (<p className="text-red-500 text-sm mt-1">{errors.email.message}</p>)}
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              {...register('password', { required: "Password is required" })}
            />
            {errors.password && (<p className="text-red-500 text-sm mt-1">{errors.password.message}</p>)}
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-1" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              className="w-full px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              {...register('confirmPassword', { required: "Confirm password is required" })}
            />
            {errors.confirmPassword && (<p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>)}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white font-semibold transition 
            ${loading ? 'opacity-50 cursor-not-allowed' : 'transition cursor-pointer'}`}
          >
            {loading ? "Registering User..." : "Register"}
          </button>
        </form>

        <p className="text-gray-400 text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}