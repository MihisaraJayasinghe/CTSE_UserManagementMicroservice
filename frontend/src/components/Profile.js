import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    axios.get('http://localhost:4000/api/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      setUser(res.data);
    }).catch(err => {
      console.error('Error loading profile:', err);
      alert('Session expired or invalid token');
      localStorage.removeItem('token');
      navigate('/login');
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6">User Profile</h2>
      {user ? (
        <div>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button
            onClick={handleLogout}
            className="mt-4 w-full bg-red-600 text-white p-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}
