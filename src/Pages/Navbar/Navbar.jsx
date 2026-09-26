import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Codeshack from "../../assets/CodeShack.png";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinkClasses = (path) =>
    `relative px-1 py-2 transition-all duration-300
     ${
       isActive(path)
         ? "text-white font-semibold after:w-full"
         : "text-gray-400 hover:text-white after:w-0"
     }
     after:absolute after:left-0 after:-bottom-1 after:h-[2px]
     after:bg-gradient-to-r after:from-orange-500 after:to-pink-500
     after:transition-all after:duration-300`;

  return (
    <nav className="fixed w-full top-0 left-0 z-50 backdrop-blur-md bg-black/70 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className=""
          >
            <img src={Codeshack} alt="CodeShack Logo" className="h-12" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-10">
            <Link to="/members" className={navLinkClasses("/members")}>
              Members
            </Link>

            {/* <Link to="/blogs" className={navLinkClasses("/blogs")}>
              Blogs
            </Link> */}

            <Link
              to="/register"
              className="px-4 py-2 rounded-full bg-orange-500 text-black font-semibold hover:bg-orange-600 transition"
            >
              Join Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X size={22} className="text-white" />
            ) : (
              <Menu size={22} className="text-white" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mt-3 space-y-2 rounded-2xl bg-black/90 p-4 border border-white/10">
            <Link
              to="/members"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-2 rounded-lg text-gray-300
                         hover:bg-white/10 hover:text-white transition"
            >
              Members
            </Link>

            <Link
              to="/blogs"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-2 rounded-lg text-gray-300
                         hover:bg-white/10 hover:text-white transition"
            >
              Blogs
            </Link>

            <Link
              to="/register"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-2 rounded-lg bg-orange-500 text-black font-semibold text-center
                         hover:bg-orange-600 transition"
            >
              Join Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
