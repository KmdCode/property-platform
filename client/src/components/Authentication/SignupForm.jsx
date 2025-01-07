import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate()

  const handleSignup = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const baseUrl = process.env.REACT_APP_API_URL;

    try {
      const response = await axios.post(`${baseUrl}/auth/signup`, {
        name,
        email,
        password,
        confirmPassword,
        phoneNumber,
      });

      if (response.data.status === 'success') {
        setSuccessMessage('Signup successful! You can now log in.');
        setError('');
        navigate('/signin');

      } else {
        setError('Signup failed');
      }
    } catch (err) {
      setError('An error occurred during signup. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Sign Up</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
        <form className="space-y-6" onSubmit={handleSignup}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-cyan-500"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-cyan-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-600">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-cyan-500"
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-cyan-500"
              placeholder="Enter password"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-cyan-500"
              placeholder="Confirm password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-cyan-800 rounded-lg hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50"
          >
            Sign Up
          </button>
          <p className="text-sm text-center text-gray-600">
            Already have an account? <a href="/signin" className="font-medium text-cyan-800 hover:underline">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
