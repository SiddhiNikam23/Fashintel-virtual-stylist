import React from "react";
import { FiHeart, FiShoppingBag } from "react-icons/fi";

export default function ProductCard({ item }) {
  return (
    <div className="mb-4 break-inside-avoid bg-white rounded-2xl shadow-md overflow-hidden relative group">
      <div className="relative">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-auto object-cover transition-transform transform group-hover:scale-105"
        />
        <div className="absolute right-3 top-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="bg-white p-2 rounded-full shadow hover:scale-105"><FiHeart /></button>
          <button className="bg-white p-2 rounded-full shadow hover:scale-105"><FiShoppingBag /></button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-sm font-semibold">{item.title}</h3>
        <p className="text-sm text-gray-500 mt-1">₹{item.price}</p>
      </div>
    </div>
  );
}
