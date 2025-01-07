import React, { useState, useEffect } from 'react';//Part of the layout
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    
    const token = localStorage.getItem('token'); 
    const role = localStorage.getItem('role'); 

    if (token) {
      setIsAuthenticated(true);
      setUserRole(role);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsAuthenticated(false);
    navigate('/signin');
  };

  return (
    <header className="bg-white shadow-md relative">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <a href = "/" className="flex items-center">
          <img
            src="/Logo 23.png"
            alt="App Logo"
            className="h-11 w-35 mr-2"
          />
          <a href="/" className="font-semibold text-xl text-gray-800">

          </a>
        </a>

        {/* Hamburger Icon for Mobile */}
        <button
          className="block lg:hidden text-gray-600 focus:outline-none"
          onClick={toggleMenu}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center space-x-6">
          <a href="/" className="text-gray-600 hover:text-gray-800">Home</a>
          <a href="/about" className="text-gray-600 hover:text-gray-800">About Us</a>

          {/* Conditional rendering based on user authentication and role */}
          {isAuthenticated ? (
            <>
              {userRole === 'tenant' && (
                <>
                </>
              )}
              {userRole === 'landlord' && (
                <>
                  <a href="/admin-dashboard" className="text-gray-600 hover:text-gray-800">Admin Dashboard</a>
                </>
              )}
              <a href="/signin" onClick={handleLogout} className="text-gray-600 hover:text-gray-800">Logout</a>
            </>
          ) : (
            <a href="/signin" className="text-gray-600 hover:text-gray-800">Login</a>
          )}
        </nav>

        {/* Mobile for Menu */}

        {isMenuOpen && (
          <nav className="lg:hidden fixed top-0 right-0 w-64 h-full bg-white shadow-md z-50 flex flex-col py-4 px-6 space-y-4">
            <button
              className="self-end text-gray-600 focus:outline-none"
              onClick={toggleMenu}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <a href="/" className="text-gray-600 hover:text-gray-800">Home</a>
            <a href="/about" className="text-gray-600 hover:text-gray-800">About Us</a>

            {isAuthenticated ? (
              <>
                {userRole === 'tenant' && (
                  <>
                    <a href="/tenant-dashboard" className="text-gray-600 hover:text-gray-800">Tenant Dashboard</a>
                    
                  </>
                )}
                {userRole === 'landlord' && (
                  <>
                    <a href="/admin-dashboard" className="text-gray-600 hover:text-gray-800">Admin Dashboard</a>
                  </>
                )}
                <a href="/signin" onClick={handleLogout} className="text-gray-600 hover:text-gray-800">Logout</a>
              </>
            ) : (
              <a href="/signin" className="text-gray-600 hover:text-gray-800">Login</a>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;//header
