'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import PDFInvitation from '@/components/PDFInvitation';
import EventDetails from '@/components/EventDetails';
import RSVPForm from '@/components/RSVPForm';
import Footer from '@/components/Footer';
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
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <PDFInvitation />
          </div>
        </section>
        
        <section className="py-8 md:py-12 bg-primary bg-opacity-5">
          <div className="container mx-auto px-4">
            <EventDetails />
          </div>
        </section>
        
        <section className="py-12 md:py-16 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif text-primary mb-6">Vă invităm să sărbătoriți alături de noi</h2>
            <p className="text-lg max-w-2xl mx-auto mb-8">
              Am fi onorați sǎ vǎ avem alaturi. Vă rugǎm sǎ ne confirmați prezența în aceastǎ zi specialǎ pentru noi.
            </p>
            <button
              onClick={openRSVPModal}
              className="bg-primary text-white px-8 py-3 rounded-full hover:bg-opacity-90 transition-colors text-lg"
            >
              Confirmă Participarea
            </button>
          </div>
        </section>
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
