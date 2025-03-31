'use client';

import { useState, useEffect } from 'react';
import InvitationCard from './InvitationCard';
import { motion } from 'framer-motion';
import Image from 'next/image';

const PDFInvitation = () => {
  const [loading, setLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [pdfAvailable, setPdfAvailable] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  
  useEffect(() => {
    // Check if images and PDF exist
    const checkAvailability = async () => {
      try {
        // Check if PDF is available for download
        const pdfResponse = await fetch('/invitation.pdf', { method: 'HEAD' });
        setPdfAvailable(pdfResponse.ok);
        
        // Simulate checking for images (in a real app, you'd verify these exist)
        // For now we'll assume the images are there if you've added them
        setImagesLoaded(true);
        setLoading(false);
      } catch (error) {
        console.error('Error checking resources:', error);
        setLoading(false);
      }
    };
    
    checkAvailability();
  }, []);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  if (loading) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="w-full aspect-[3/4] flex items-center justify-center bg-white/50 rounded-lg border-2 border-dashed border-primary/30">
          <div className="text-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-primary">Se încarcă invitația...</p>
          </div>
        </div>
      </div>
    );
  }

  // If images aren't available, fall back to the original card
  if (!imagesLoaded) {
    return <InvitationCard />;
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div 
        className={`flip-card w-full h-auto aspect-[3/4] cursor-pointer ${isFlipped ? 'flipped' : ''}`}
        onClick={handleFlip}
      >
        <div className="flip-card-inner relative w-full h-full">
          <div className="flip-card-front absolute w-full h-full">
            <div className="relative w-full h-full shadow-lg rounded-lg overflow-hidden border-2 border-secondary">
              <div className="relative w-full h-full">
                <Image 
                  src="/images/invitation_1.png" 
                  alt="Invitație de Nuntă - Față"
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <p className="text-primary text-sm font-serif bg-white/80 inline-block px-4 py-1 rounded-full">
                  Atinge pentru a întoarce
                </p>
              </div>
            </div>
          </div>
          
          <div className="flip-card-back absolute w-full h-full">
            <div className="relative w-full h-full shadow-lg rounded-lg overflow-hidden border-2 border-secondary">
              <div className="relative w-full h-full">
                <Image 
                  src="/images/invitation_2.png" 
                  alt="Invitație de Nuntă - Spate"
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <p className="text-primary text-sm font-serif bg-white/80 inline-block px-4 py-1 rounded-full">
                  Atinge pentru a întoarce
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {pdfAvailable && (
        <div className="mt-6 text-center">
          <a
            href="/invitation.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition-colors"
          >
            Vizualizează Invitația PDF
          </a>
        </div>
      )}
    </div>
  );
};

export default PDFInvitation; 