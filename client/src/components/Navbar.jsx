// Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-green-500 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-white">
              Farm4Better
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-green-200">
              Home
            </Link>
            <Link to="/marketplace" className="hover:text-green-200">
              Marketplace
            </Link>
            <Link to="/contact" className="hover:text-green-200">
              Contact
            </Link>
            <Link to="/about" className="hover:text-green-200">
              About
            </Link>

            {/* Buttons */}
            <div className="flex space-x-2">
              <Link
                to="/become-farmer"
                className="px-3 py-2 rounded-md bg-white text-green-500 font-semibold hover:bg-green-100"
              >
                Become a Farmer
              </Link>
              <Link
                to="/auth"
                className="px-3 py-2 rounded-md border border-white hover:bg-white hover:text-green-500"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-green-500 text-white px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md hover:bg-green-400"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block px-3 py-2 rounded-md hover:bg-green-400"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            to="/marketplace"
            className="block px-3 py-2 rounded-md hover:bg-green-400"
            onClick={() => setIsOpen(false)}
          >
            Marketplace
          </Link>
          <Link
            to="/contact"
            className="block px-3 py-2 rounded-md hover:bg-green-400"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>

          {/* Mobile Buttons */}
          <Link
            to="/become-farmer"
            className="block px-3 py-2 rounded-md bg-white text-green-500 font-semibold hover:bg-green-100"
            onClick={() => setIsOpen(false)}
          >
            Become a Farmer
          </Link>
          <Link
            to="/login"
            className="block px-3 py-2 rounded-md border border-white hover:bg-white hover:text-green-500"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
