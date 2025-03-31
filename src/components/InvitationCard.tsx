'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const InvitationCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="max-w-md mx-auto my-8">
      <div 
        className={`flip-card ${isFlipped ? 'flipped' : ''}`}
        onClick={handleFlip}
      >
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-xl"
            >
              <Image
                src="/images/invitation-front.jpg"
                alt="Invitație de Nuntă - Față"
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <div className="text-center p-6 bg-white bg-opacity-90 rounded-lg shadow-lg max-w-xs">
                  <h1 className="text-3xl font-serif text-primary mb-2">Răzvan & Adriana</h1>
                  <p className="text-gray-700 mb-4">Vă invită la nunta lor</p>
                  <p className="text-xl text-primary">5 Septembrie 2025</p>
                  <div className="mt-4 text-sm text-gray-500">
                    Atinge pentru a întoarce
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="flip-card-back">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-xl"
            >
              <Image
                src="/images/invitation-back.jpg"
                alt="Invitație de Nuntă - Spate"
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <div className="text-center p-6 bg-white bg-opacity-90 rounded-lg shadow-lg max-w-xs">
                  <h2 className="text-2xl font-serif text-primary mb-4">Detalii Eveniment</h2>
                  <div className="space-y-4 text-gray-700">
                    <div>
                      <h3 className="font-medium">Cununia Civilă</h3>
                      <p>13:45 - Teatrul Maior Gheorghe Pastia</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Cununia Religioasă</h3>
                      <p>18:00 - Biserica Sf. Pantelimon</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Petrecere</h3>
                      <p>20:00 - Restaurant Hora Miresei</p>
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-gray-500">
                    Atinge pentru a întoarce
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitationCard; 