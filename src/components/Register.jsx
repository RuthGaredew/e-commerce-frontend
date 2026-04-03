import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState(""); // Standard in most APIs
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      alert("Passwords do not match!");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("https://your-api.com/api/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, passwordConfirm }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful! Please login.");
        // Pass credentials to login page to auto-fill
        navigate("/login", { state: { email, password } });
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      alert("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100 dark:from-slate-900 dark:to-slate-800 px-4 py-8">
      <form
        onSubmit={handleRegister}
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 max-w-md w-full border border-gray-200 dark:border-slate-700"
      >
        <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">
          Create Account
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 rounded-xl border dark:bg-slate-700 dark:text-white"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-xl border dark:bg-slate-700 dark:text-white"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-xl border dark:bg-slate-700 dark:text-white"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className="w-full p-4 rounded-xl border dark:bg-slate-700 dark:text-white"
            required
          />
        </div>

        <button
          disabled={isLoading}
          className="mt-10 w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all active:scale-95 bg-blue-600 hover:bg-blue-700 shadow-blue-200 dark:shadow-none"
        >
          {isLoading ? "Creating account..." : "Create Account"}
        </button>
      </form>
    </div>
  );
}

export default Register;
