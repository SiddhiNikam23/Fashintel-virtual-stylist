import React from "react";
import { Link } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiSearch, FiUser } from "react-icons/fi";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-3 shadow-md sticky top-0 bg-white z-50">
      <Link to="/" className="text-2xl font-extrabold text-primary">MyStore</Link>

      <div className="flex-1 mx-6">
        <div className="relative max-w-xl mx-auto">
          <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for products, categories..."
            className="w-full border rounded-full py-2 pl-10 pr-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Link to="/wishlist" className="p-2 rounded-full hover:bg-gray-100"><FiHeart /></Link>
        <Link to="/cart" className="p-2 rounded-full hover:bg-gray-100"><FiShoppingCart /></Link>
        <Link to="/login" className="p-2 rounded-full hover:bg-gray-100"><FiUser /></Link>
      </div>
    </nav>
  );
}
