// AuthPage.jsx
import React, { useState, useEffect } from 'react';
import { User, Lock, Mail } from 'lucide-react';

const images = [
  "https://images.unsplash.com/photo-1700503794627-6ea640996129?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1374", // farmer in field
  "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=crop&h=800&w=800", // keep second image
  "https://plus.unsplash.com/premium_photo-1661823013705-d58ac4788630?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470"  // farmer harvesting
];


const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '', agree: false });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted", loginForm);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!signupForm.agree) {
      alert("You must agree to Terms & Privacy Policy.");
      return;
    }
    console.log("Signup submitted", signupForm);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Image Section */}
      <div className="hidden md:flex w-1/2 relative">
        <img
          src={images[currentImage]}
          alt="Farmers"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white p-8">
          <h2 className="text-3xl font-bold mb-4">Empowering Local Farmers</h2>
          <p className="text-lg text-center max-w-sm">
            Connect directly with farmers and get fresh produce every day.
          </p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-tr from-green-50 to-green-100 px-6 py-12">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute -top-16 -right-16 w-40 h-40 bg-green-200 rounded-full opacity-50 animate-pulse"></div>
          <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-green-300 rounded-full opacity-50 animate-pulse"></div>

          {/* Tabs */}
          <div className="flex mb-8 bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 rounded-full font-semibold transition-colors ${
                isLogin ? "bg-green-600 text-white shadow-md" : "text-gray-700"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 rounded-full font-semibold transition-colors ${
                !isLogin ? "bg-green-600 text-white shadow-md" : "text-gray-700"
              }`}
            >
              Signup
            </button>
          </div>

          {/* Forms */}
          {isLogin ? (
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              <div className="relative">
                <Mail size={20} className="absolute left-3 top-3 text-green-500" />
                <input
                  type="email"
                  placeholder="Email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
                  required
                />
              </div>
              <div className="relative">
                <Lock size={20} className="absolute left-3 top-3 text-green-500" />
                <input
                  type="password"
                  placeholder="Password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
                  required
                />
              </div>

              <div className="flex justify-between items-center text-sm text-gray-500">
                <span
                  className="cursor-pointer hover:text-green-600 hover:underline"
                  onClick={() => alert("Redirect to Forgot Password page")}
                >
                  Forgot Password?
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-green-700 transition-all shadow-lg"
              >
                Login
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit} className="space-y-5">
              <div className="relative">
                <User size={20} className="absolute left-3 top-3 text-green-500" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={signupForm.name}
                  onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
                  required
                />
              </div>
              <div className="relative">
                <Mail size={20} className="absolute left-3 top-3 text-green-500" />
                <input
                  type="email"
                  placeholder="Email"
                  value={signupForm.email}
                  onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
                  required
                />
              </div>
              <div className="relative">
                <Lock size={20} className="absolute left-3 top-3 text-green-500" />
                <input
                  type="password"
                  placeholder="Password"
                  value={signupForm.password}
                  onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
                  required
                />
              </div>

              {/* Terms & Privacy */}
              <div className="flex items-center space-x-2 text-gray-600 text-sm">
                <input
                  type="checkbox"
                  checked={signupForm.agree}
                  onChange={(e) => setSignupForm({ ...signupForm, agree: e.target.checked })}
                  className="accent-green-500"
                  id="agree"
                  required
                />
                <label htmlFor="agree">
                  I agree to the{" "}
                  <span className="text-green-600 hover:underline cursor-pointer">
                    Terms & Privacy Policy
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-green-700 transition-all shadow-lg"
              >
                Signup
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
