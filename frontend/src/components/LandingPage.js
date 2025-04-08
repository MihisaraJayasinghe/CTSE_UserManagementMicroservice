import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="max-w-4xl mx-auto text-center mt-20 bg-gradient-to-br from-purple-200 via-indigo-200 to-blue-200 p-12 rounded-xl shadow-2xl">
      <h1 className="text-5xl font-bold mb-6 text-indigo-700">
        Welcome to <span className="text-purple-600">Apex Connect</span> 🌐
      </h1>
      <p className="text-gray-700 text-lg mb-4">
        Apex Connect is your innovative platform designed to seamlessly connect people, businesses, and ideas. Whether you’re collaborating on projects or managing your professional network, Apex Connect empowers your interactions securely and efficiently.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mt-8">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-2">Why Apex Connect?</h2>
          <p className="text-gray-600">
            Discover a smarter way to build connections. Apex Connect simplifies user management, offers secure login experiences, and provides an intuitive interface for seamless navigation.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-2">Features You’ll Love</h2>
          <p className="text-gray-600">
            From robust security protocols to personalized user experiences, Apex Connect ensures your data remains safe and accessible wherever you go.
          </p>
        </div>
      </div>
      <div className="mt-10 space-x-4">
        <Link
          to="/login"
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-full font-semibold shadow-md"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-transparent border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white py-3 px-6 rounded-full font-semibold shadow-md"
        >
          Sign Up
        </Link>
      </div>
      <p className="text-sm text-gray-600 mt-10 italic">
        ✨ Powered by cutting-edge tech: React, Node.js, and Tailwind CSS ✨
      </p>
    </div>
  );
}