// src/components/Navbar.js
"use client"
import { motion } from 'framer-motion';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import { ModeToggle } from './toggle';
import { PiPulse } from 'react-icons/pi';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 60 }}
      className="fixed top-4  transform -translate-x-1/2 w-full max-w-xs sm:max-w-xl xl:max-w-7xl backdrop-blur-xl bg-gray-900/10 dark:bg-white/30 shadow-lg rounded-lg z-50 "
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="items-center space-x-4">
            <a href="#" className="text-gray-800 font-mono dark:text-gray-200 text-2xl hover:text-teal-400 dark:hover:text-teal-400 transition-colors font-bold duration-300">
              <PiPulse/>
              </a>
          </div>
          <div className="flex items-center">
            <ModeToggle />
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
