import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function RegisterForm() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, form);
      alert('Registration successful! Redirecting to login...');
      navigate('/login');
    } catch (err) {
      alert('Registration failed: ' + err.response?.data?.error || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6">Register</h2>
      <input
        name="username"
        className="w-full p-2 mb-4 border rounded"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
      />
      <input
        name="email"
        className="w-full p-2 mb-4 border rounded"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        className="w-full p-2 mb-4 border rounded"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />
      <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Register</button>
    </form>
  );
}
