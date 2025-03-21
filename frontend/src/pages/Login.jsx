import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import Lottie from "lottie-react";
import loginAnimation from "../assets/login_signup/login.json";
import backgroundImage from "../assets/login_signup/login.jpg";
import {Eye, EyeOff} from "lucide-react"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuthStore();
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login({ email, password });
    setEmail("");
    setPassword("");
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex bg-white shadow-lg rounded-lg p-8 w-full max-w-5xl">
        {/* Left Section - Lottie Animation */}
        <div className="w-1/2 flex items-center justify-center">
          <Lottie
            animationData={loginAnimation}
            loop={true}
            className="w-full h-auto"
          />
        </div>

        {/* Right Section - Login Form */}
        <div className="w-1/2 p-8">
          <h2 className="text-3xl font-bold text-center text-black mb-6">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium mb-1 text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="block w-full p-3 rounded-md bg-gray-100 text-gray-900 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="block w-full p-3 rounded-md bg-gray-100 text-gray-900 focus:outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 px-3 text-sm text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            <button
              className="bg-blue-700 text-white w-full px-4 py-3 rounded-md text-lg font-semibold hover:bg-blue-900 transition duration-300 ease-in-out shadow-md"
              type="submit"
            >
              Login
            </button>
          </form>
          <p className="text-center mt-4 text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-[#007bff] font-semibold">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;