"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const HamburgerMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative">
      {/* Hamburger Icon */}
      <button
        className="flex"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle Menu"
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Animated Dropdown Menu */}
      <nav
        className={`absolute top-10 right-0 bg-gray-700 text-white rounded-lg shadow-lg w-48 z-50 transition-all duration-300 transform ${
          menuOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col">
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-600">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-600">
              Live Scores
            </a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-600">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HamburgerMenu;
