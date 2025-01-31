"use client";

import { useState } from "react";

interface AuthModalProps {
  type: "login" | "register";
  onClose: () => void;
}

const AuthModal = ({ type, onClose }: AuthModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    const endpoint =
      type === "login" ? "/api/auth/login" : "/api/auth/register";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Something went wrong");
      }

      if (type === "login") {
        onClose();
        setTimeout(() => window.location.reload(), 500);
      } else {
        alert("Registration successful! Please log in.");
        onClose();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md w-80">
        <h2 className="text-xl font-bold mb-4">
          {type === "login" ? "Login" : "Register"}
        </h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className={`w-full py-2 rounded ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white"
          }`}
          disabled={loading}
        >
          {loading ? "Processing..." : type === "login" ? "Login" : "Register"}
        </button>

        <button onClick={onClose} className="w-full mt-2 text-gray-500">
          Close
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
