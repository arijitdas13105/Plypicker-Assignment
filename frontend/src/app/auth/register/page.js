
"use client";

import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../Hooks/authHooks';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'team_member',
  });

  const { email, password, role } = formData;
  const { register, loading } = useAuth(); 

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    register(email, password, role); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-8">
      <ToastContainer />
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-800">
          Register
        </h1>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="relative">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              required
              className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ease-in-out transform hover:scale-105"
              placeholder="Enter your email"
            />
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ease-in-out transform hover:scale-105"
              placeholder="Enter your password"
            />
          </div>
          <div className="relative">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Role:
            </label>
            <select
              name="role"
              value={role}
              onChange={onChange}
              className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ease-in-out transform hover:scale-105"
            >
              <option value="team_member">Team Member</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-3 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-500">
          Already have an account?{' '}
          <a
            href="/auth/login"
            className="text-indigo-500 hover:underline hover:text-indigo-700"
          >
            Sign in here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
