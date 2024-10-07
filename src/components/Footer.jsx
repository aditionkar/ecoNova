import React from 'react';
import { FaInstagram, FaTwitter, FaFacebookF } from 'react-icons/fa'; // Import social media icons

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-white via-green-400 to-green-600 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
          {/* Company Name / Logo and Contact Info */}
          <div className="md:w-1/3">
            <h2 className="text-2xl font-bold text-black">ecoNova</h2>
            <p className="mt-2 text-gray-800">
              123 Green Street, Sustainability City, Earth
            </p>
            <p className="mt-1 text-gray-800">Phone: +1 (123) 456-7890</p>
            <p className="mt-1 text-gray-800">Email: info@econova.com</p>
          </div>

          {/* Social Media Links */}
          <div className="md:w-1/3 flex flex-col items-center">
            <span className="text-lg">Follow Us</span>
            <div className="flex space-x-6 mt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-all duration-300"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-all duration-300"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-all duration-300"
              >
                <FaFacebookF size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:w-1/3 text-center md:text-left">
            <h3 className="text-lg font-semibold text-black">Quick Links</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="#about" className="hover:text-white transition-all duration-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-all duration-300">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-all duration-300">
                  Projects
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-black transition-all duration-300">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Info */}
        <div className="mt-8 text-center text-gray-800 border-t border-gray-700 pt-4">
          &copy; {new Date().getFullYear()} ecoNova. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
