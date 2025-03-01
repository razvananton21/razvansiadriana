'use client';

import { FaHeart } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-6 text-center bg-primary bg-opacity-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center text-secondary mb-2">
          <div className="w-12 h-px bg-secondary"></div>
          <FaHeart className="mx-3 text-sm" />
          <div className="w-12 h-px bg-secondary"></div>
        </div>
        <p className="text-sm text-text">
          Abia așteptăm să sărbătorim împreună cu voi!
        </p>
        <p className="text-xs text-text mt-4">
          &copy; {currentYear} Nunta Razvan & Adriana
        </p>
      </div>
    </footer>
  );
};

export default Footer; 