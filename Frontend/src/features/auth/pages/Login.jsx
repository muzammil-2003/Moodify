import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useForm } from 'react-hook-form'

export default function Login() {

  const navigate = useNavigate();
  const { loading, handleLogin } = useAuth()

  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    try {
      await handleLogin(data)
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="max-w-md w-full bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-800">
        <h2 className="text-3xl font-bold text-indigo-400 text-center mb-6">
          Login to MoodAI
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-gray-300 text-sm mb-1">
              Email/Username
            </label>
            <input
              id="identifier"
              type="text"
              placeholder="Enter your username or email"
              className="w-full px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              {...register("identifier", { required: "Username or Email is required" })}
            />
            {errors.username && (<p className="text-red-500 text-sm mt-1">{errors.username.message}</p>)}
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
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && (<p className="text-red-500 text-sm mt-1">{errors.password.message}</p>)}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white font-semibold 
            ${loading ? 'opacity-50 cursor-not-allowed' : 'transition cursor-pointer'}`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-gray-400 text-sm mt-4 text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}