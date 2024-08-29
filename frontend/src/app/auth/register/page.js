"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'team_member',
  });

  const { email, password, role } = formData;
  const router = useRouter();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const body = JSON.stringify({ email, password, role });
      const res = await axios.post(
        'http://localhost:5000/api/users/register',
        body,
        config
      );

      toast.success('User registered successfully!');
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    } catch (err) {
      toast.error(`Registration error: ${err.response.data.message}`);
      console.error('Registration error:', err.response.data);
    }
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
            className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-3 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            Register
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




// "use client";

// import React, { useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useRouter } from 'next/navigation';

// const Register = () => {
//     const [formData, setFormData] = useState({
//         email: '',
//         password: '',
//         role: 'team_member'
//     });
    
//     const { email, password, role } = formData;
//     const router = useRouter(); // Initialize useRouter hook

//     const onChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const onSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const config = {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             };
//             const body = JSON.stringify({ email, password, role });
//             const res = await axios.post('http://localhost:5000/api/users/register', body, config);
            
//             toast.success('User registered successfully!'); // Show success toast
//             setTimeout(() => {
//                 router.push('/auth/login'); // Redirect to login page after a delay
//             }, 2000); // 2-second delay before redirecting
            
//         } catch (err) {
//             toast.error(`Registration error: ${err.response.data.message}`); // Show error toast
//             console.error('Registration error:', err.response.data);
//         }
//     };

//     return (
//         <div className="max-w-md mx-auto mt-10 p-6 shadow-md">
//             <ToastContainer /> {/* Toast container for displaying toasts */}
//             <h1 className="text-2xl font-bold mb-5">Register</h1>
//             <form onSubmit={onSubmit} className="space-y-4">
//                 <div>
//                     <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
//                     <input 
//                         type="email" 
//                         id="email" 
//                         name="email" 
//                         value={email} 
//                         onChange={onChange} 
//                         required 
//                         className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
//                     <input 
//                         type="password" 
//                         id="password" 
//                         name="password" 
//                         value={password} 
//                         onChange={onChange} 
//                         required 
//                         className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role:</label>
//                     <select 
//                         name="role" 
//                         value={role} 
//                         onChange={onChange}
//                         className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                     >
//                         <option value="team_member">Team Member</option>
//                         <option value="admin">Admin</option>
//                     </select>
//                 </div>
//                 <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//                     Register
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default Register;
