import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-cyan-800 text-white py-6 mt-0">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-6">
            <a href="/" className="hover:underline">
              Home
            </a>
            <a href="/about" className="hover:underline">
              About Us
            </a> 
            <a href="/contact" className="hover:underline">
              Contact
            </a>
          </div>
        </div>

        <div className="text-center border-t border-gray-700 pt-4">
          <p className="text-sm">
            © {new Date().getFullYear()} Student Accommodations. All rights reserved.
          </p>
        </div>
      </div>
    </footer>//closed footer
  );
};

export default Footer;//Footer
