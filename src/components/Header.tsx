'use client';

import { FaHeart } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="w-full py-8 text-center">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-serif text-primary mb-2">Razvan & Adriana</h1>
        <div className="flex items-center justify-center text-secondary mb-4">
          <div className="w-16 h-px bg-secondary"></div>
          <FaHeart className="mx-4" />
          <div className="w-16 h-px bg-secondary"></div>
        </div>
        <p className="text-lg md:text-xl font-serif text-text">Ne căsătorim!</p>
        <p className="text-sm md:text-base mt-2">5 Septembrie, 2025</p>
      </div>
    </header>
  );
};

export default Header; 