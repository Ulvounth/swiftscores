"use client";

import { useEffect, useState } from "react";
import AuthModal from "./AuthModal";

const Header = () => {
  const [modalType, setModalType] = useState<"login" | "register" | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" }); // ✅ Ensure fresh response
        const data = await res.json();
        setIsLoggedIn(data.loggedIn);
      } catch (error) {
        console.error("Error checking auth:", error);
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setIsLoggedIn(false); // ✅ Update state immediately
    window.location.reload(); // ✅ Refresh UI to remove JWT
  };

  return (
    <>
      <header className="bg-gray-800 text-white shadow-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <div className="text-2xl font-bold">Swiftscores</div>

          <div className="flex space-x-4">
            {isLoggedIn === null ? (
              <p>Loading...</p> // ✅ Prevents flicker
            ) : isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() => setModalType("login")}
                  className="bg-blue-500 px-3 py-1 rounded"
                >
                  Login
                </button>
                <button
                  onClick={() => setModalType("register")}
                  className="bg-green-500 px-3 py-1 rounded"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {modalType && (
        <AuthModal type={modalType} onClose={() => setModalType(null)} />
      )}
    </>
  );
};

export default Header;
