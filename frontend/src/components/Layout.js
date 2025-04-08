import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Layout({ children }) {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-gray-900 text-white p-4 shadow w-full">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-blue-400">Apex Connect</Link>
          <div className="space-x-4">
            {token ? (
              <>
                <Link to="/profile" className="hover:text-blue-300">Profile</Link>
                <button onClick={handleLogout} className="hover:text-red-400">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-300">Login</Link>
                <Link to="/register" className="hover:text-blue-300">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <main className="w-full max-w-6xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
