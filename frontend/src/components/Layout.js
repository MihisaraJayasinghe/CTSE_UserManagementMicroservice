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
    <div>
      <nav className="bg-gray-900 text-white p-4 shadow">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-blue-400">UserAuth</Link>
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
      <main className="p-6 bg-gray-100 min-h-screen">{children}</main>
    </div>
  );
}
