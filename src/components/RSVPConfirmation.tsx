'use client';

import { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';

interface RSVPConfirmationProps {
  className?: string;
  tokenData?: {
    name?: string;
    attending?: boolean;
  };
}

const RSVPConfirmation = ({ className = '', tokenData }: RSVPConfirmationProps) => {
  const [rsvpStatus, setRsvpStatus] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    // If we're viewing with a token (URL has token parameter)
    const hasTokenParam = new URLSearchParams(window.location.search).has('token');
    
    // If we have token data (from already completed RSVP), always use it and show
    if (tokenData) {
      setName(tokenData.name || null);
      setRsvpStatus(tokenData.attending ? 'attending' : 'not-attending');
      setShouldShow(true);
      return;
    }
    
    // If we're viewing with a token but don't have token data,
    // don't show anything (token hasn't been completed)
    if (hasTokenParam && !tokenData) {
      setShouldShow(false);
      return;
    }
    
    // Otherwise, for users without tokens, use localStorage if available
    const storedStatus = localStorage.getItem('rsvpStatus');
    const storedName = localStorage.getItem('rsvpName');
    
    if (storedStatus) {
      setRsvpStatus(storedStatus);
      setShouldShow(true);
    }
    
    if (storedName) {
      setName(storedName);
    }
  }, [tokenData]);

  if (!shouldShow || !rsvpStatus) {
    return null; // Don't show anything if conditions aren't met
  }

  return (
    <div className={`py-8 text-center ${className}`}>
      <div className="container mx-auto px-4 relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-12 h-12 opacity-10 transform -translate-y-1/2">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 20C15 15 25 18 30 25C25 28 15 28 10 20Z" fill="#5a6b46"/>
          </svg>
        </div>
        <div className="absolute top-0 right-1/4 w-12 h-12 opacity-10 transform -translate-y-1/2 scale-x-[-1]">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 20C15 15 25 18 30 25C25 28 15 28 10 20Z" fill="#5a6b46"/>
          </svg>
        </div>
        
        <div className="flex items-center justify-center text-[#5a6b46] mb-4">
          <div className="w-16 h-px bg-[#5a6b46]/30"></div>
          <div className="mx-4 bg-[#5a6b46]/10 w-10 h-10 rounded-full flex items-center justify-center">
            <FaHeart className="text-[#5a6b46]" />
          </div>
          <div className="w-16 h-px bg-[#5a6b46]/30"></div>
        </div>
        
        <div className="bg-[#f8f5eb] rounded-lg p-6 max-w-lg mx-auto shadow-sm border border-[#5a6b46]/10">
          {rsvpStatus === 'attending' ? (
            <p className="text-[#5a6b46] italic font-serif text-lg">
              Abia așteptăm să sărbătorim împreună cu {name ? `tine, ${name}` : 'voi'}!
            </p>
          ) : (
            <p className="text-[#5a6b46] italic font-serif text-lg">
              Ne pare rău că nu poți fi alături de noi, {name ? name : 'dar îți mulțumim pentru răspuns'}!
            </p>
          )}
        </div>
        
        <div className="text-[#5a6b46]/60 text-sm mt-4">
          © 2025 Nunta Rǎzvan & Adriana
        </div>
      </div>
    </div>
  );
};

export default RSVPConfirmation; 