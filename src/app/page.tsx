'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import PDFInvitation from '@/components/PDFInvitation';
import EventDetails from '@/components/EventDetails';
import RSVPForm from '@/components/RSVPForm';
import Footer from '@/components/Footer';
import RSVPConfirmation from '@/components/RSVPConfirmation';
import Image from 'next/image';
import InvitationCard from '@/components/InvitationCard';
import RSVP from '@/components/RSVP';
import { FaHeart } from 'react-icons/fa';

export default function Home() {
  const [isRSVPModalOpen, setIsRSVPModalOpen] = useState(false);

  const openRSVPModal = () => {
    setIsRSVPModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeRSVPModal = () => {
    setIsRSVPModalOpen(false);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f5eb]">
      <Header />
      
      <main className="flex-grow">
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <PDFInvitation />
          </div>
        </section>
        
        <section className="py-12 md:py-16 bg-[#f0ece0]/90 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full" style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100' height='100' fill='none'/%3E%3Cg opacity='0.1'%3E%3Cpath d='M20 20C25 15 35 18 40 25C35 28 25 28 20 20Z' fill='%235a6b46'/%3E%3Cpath d='M80 20C75 15 65 18 60 25C65 28 75 28 80 20Z' fill='%235a6b46'/%3E%3Cpath d='M20 80C25 85 35 82 40 75C35 72 25 72 20 80Z' fill='%235a6b46'/%3E%3Cpath d='M80 80C75 85 65 82 60 75C65 72 75 72 80 80Z' fill='%235a6b46'/%3E%3Ccircle cx='50' cy='50' r='2' fill='%235a6b46'/%3E%3Ccircle cx='20' cy='50' r='1.5' fill='%235a6b46'/%3E%3Ccircle cx='80' cy='50' r='1.5' fill='%235a6b46'/%3E%3Ccircle cx='50' cy='20' r='1.5' fill='%235a6b46'/%3E%3Ccircle cx='50' cy='80' r='1.5' fill='%235a6b46'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
              backgroundSize: '100px'
            }}></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <EventDetails />
          </div>
        </section>
        
        <section className="py-12 md:py-16 text-center relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto bg-[#f8f5eb]/80 rounded-lg p-8 shadow-sm border border-[#5a6b46]/10 relative">
              {/* Decorative elements */}
              <div className="absolute top-4 left-4 w-12 h-12 opacity-10">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 20C15 15 25 18 30 25C25 28 15 28 10 20Z" fill="#5a6b46"/>
                </svg>
              </div>
              <div className="absolute bottom-4 right-4 w-12 h-12 opacity-10 transform rotate-180">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 20C15 15 25 18 30 25C25 28 15 28 10 20Z" fill="#5a6b46"/>
                </svg>
              </div>
              
              <h2 className="text-3xl font-serif text-[#5a6b46] mb-6 italic">Vă invităm să sărbătoriți alături de noi</h2>
              <p className="text-lg max-w-2xl mx-auto mb-8 text-[#5a6b46]/90">
                Am fi onorați sǎ vǎ avem alaturi. Vă rugǎm sǎ ne confirmați prezența în aceastǎ zi specialǎ pentru noi.
              </p>
              
              <div className="flex items-center justify-center text-[#5a6b46] mb-6">
                <div className="w-12 h-px bg-[#5a6b46]/30"></div>
                <div className="mx-3 bg-[#5a6b46]/10 w-8 h-8 rounded-full flex items-center justify-center">
                  <FaHeart className="text-[#5a6b46] text-sm" />
                </div>
                <div className="w-12 h-px bg-[#5a6b46]/30"></div>
              </div>
              
              <button
                onClick={openRSVPModal}
                className="bg-[#5a6b46] text-[#f8f5eb] px-8 py-3 rounded-full hover:bg-[#5a6b46]/90 transition-colors text-lg shadow-sm flex items-center gap-2 mx-auto"
              >
                <span>Confirmă Participarea</span>
                <FaHeart className="text-sm" />
              </button>
            </div>
          </div>
        </section>
        
        <RSVPConfirmation className="mt-8 mb-4" />
      </main>
      
      <Footer />
      
      {/* RSVP Modal */}
      <AnimatePresence>
        {isRSVPModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeRSVPModal}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <RSVPForm onClose={closeRSVPModal} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
