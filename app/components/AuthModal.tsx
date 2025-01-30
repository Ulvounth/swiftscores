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

  const handleSubmit = async () => {
    setError("");
    const endpoint =
      type === "login" ? "/api/auth/login" : "/api/auth/register";

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) return setError(data.error);

    if (type === "login") {
      onClose(); // ✅ Close modal immediately after login
      window.location.reload(); // ✅ Refresh UI after login
    } else {
      alert("Registration successful! Please log in.");
      onClose();
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
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          {type === "login" ? "Login" : "Register"}
        </button>

        <button onClick={onClose} className="w-full mt-2 text-gray-500">
          Close
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
