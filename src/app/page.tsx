'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import PDFInvitation from '@/components/PDFInvitation';
import EventDetails from '@/components/EventDetails';
import RSVPForm from '@/components/RSVPForm';
import Footer from '@/components/Footer';
import RSVPConfirmation from '@/components/RSVPConfirmation';
import { FaHeart } from 'react-icons/fa';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  const [isRSVPModalOpen, setIsRSVPModalOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 50) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="py-8 md:py-12"
        >
          <motion.div 
            variants={fadeInUp}
            className="container mx-auto px-4"
          >
            <PDFInvitation />
          </motion.div>
        </motion.section>
        
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="py-12 md:py-16 bg-[#f0ece0]/90 relative overflow-hidden"
        >
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
        </motion.section>
        
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="py-12 md:py-16 text-center relative overflow-hidden"
        >
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl mx-auto bg-[#f8f5eb]/80 rounded-lg p-8 shadow-sm border border-[#5a6b46]/10 relative"
              whileHover={{ boxShadow: "0 8px 24px rgba(90, 107, 70, 0.1)" }}
            >
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
              
              <motion.h2 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-3xl font-serif text-[#5a6b46] mb-6 italic"
              >
                Vă invităm să sărbătoriți alături de noi
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-lg max-w-2xl mx-auto mb-8 text-[#5a6b46]/90"
              >
                Am fi onorați sǎ vǎ avem alaturi. Vă rugǎm sǎ ne confirmați prezența în aceastǎ zi specialǎ pentru noi.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex items-center justify-center text-[#5a6b46] mb-6"
              >
                <div className="w-12 h-px bg-[#5a6b46]/30"></div>
                <div className="mx-3 bg-[#5a6b46]/10 w-8 h-8 rounded-full flex items-center justify-center">
                  <FaHeart className="text-[#5a6b46] text-sm" />
                </div>
                <div className="w-12 h-px bg-[#5a6b46]/30"></div>
              </motion.div>
              
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openRSVPModal}
                className="bg-[#5a6b46] text-[#f8f5eb] px-8 py-3 rounded-full hover:bg-[#5a6b46]/90 transition-colors text-lg shadow-sm flex items-center gap-2 mx-auto"
              >
                <span>Confirmă Participarea</span>
                <FaHeart className="text-sm" />
              </motion.button>
            </motion.div>
          </div>
        </motion.section>
        
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
      
      {/* Scroll to top button */}
      <AnimatePresence>
        {hasScrolled && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-[#5a6b46] text-[#f8f5eb] flex items-center justify-center shadow-md z-40"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
