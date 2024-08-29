// hooks/authHooks.js

import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { baseUrl } from '../utils/baseUrl';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const register = async (email, password, role) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const body = JSON.stringify({ email, password, role });
      const res = await axios.post(`${baseUrl}/api/users/register`, body, config);

      toast.success('User registered successfully!');
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    } catch (err) {
      toast.error(`Registration error: ${err.response.data.message}`);
      console.error('Registration error:', err.response.data);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const body = JSON.stringify({ email, password });
      const res = await axios.post(`${baseUrl}/api/users/login`, body, config);

      toast.success('Login successful!');
      setTimeout(() => {
        localStorage.setItem('role', res.data.user.role);
        localStorage.setItem('email', res.data.user.email);
        localStorage.setItem('token', res.data.token);
        router.push('/dashboard');
      }, 2000);
    } catch (err) {
      toast.error(`Login error: ${err.response.data.message}`);
      console.error('Login error:', err.response.data);
    } finally {
      setLoading(false);
    }
  };

  return { register, login, loading };
};
