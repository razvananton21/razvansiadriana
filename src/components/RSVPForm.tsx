'use client';

import { useState } from 'react';
import { FaTimes, FaCheck, FaUtensils, FaRegSadTear, FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { submitRSVP } from '@/lib/rsvp';

interface RSVPFormProps {
  onClose: () => void;
}

const RSVPForm = ({ onClose }: RSVPFormProps) => {
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    email: '',
    phone: '',
    attending: 'yes', // Default to yes
    vegetarianMenu: false, // Changed to boolean for checkbox, default unchecked
    bringingPlusOne: false, // Changed to boolean for checkbox
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [debugInfo, setDebugInfo] = useState<string | null>(null);
  const [submittedAttending, setSubmittedAttending] = useState<boolean>(true);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Handle checkbox separately using type assertion
    if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setDebugInfo(null);
    
    // Validate form
    if (!formData.lastName || !formData.firstName || !formData.email || !formData.phone || !formData.attending) {
      setError('Vă rugăm să completați toate câmpurile obligatorii.');
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Submit RSVP using the utility function
      const isAttending = formData.attending === 'yes';
      const data = {
        last_name: formData.lastName,
        first_name: formData.firstName,
        email: formData.email,
        phone: formData.phone,
        attending: isAttending,
        vegetarian_menu: formData.vegetarianMenu,
        bringing_plus_one: formData.bringingPlusOne,
        message: formData.message
      };
      
      setDebugInfo(`Submitting data: ${JSON.stringify(data)}`);
      
      await submitRSVP(data);
      
      // Store the attendance status and name in localStorage
      localStorage.setItem('rsvpStatus', isAttending ? 'attending' : 'not-attending');
      localStorage.setItem('rsvpName', formData.firstName);
      
      // Store the attendance status for the confirmation message
      setSubmittedAttending(isAttending);
      setIsSubmitted(true);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('A apărut o eroare. Vă rugăm să încercați din nou.');
      if (err instanceof Error) {
        setDebugInfo(`Error: ${err.message}`);
      } else {
        setDebugInfo(`Unknown error: ${JSON.stringify(err)}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="bg-[#f8f5eb] rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-[#5a6b46]/20"
    >
      <div className="p-6 relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-16 h-16 opacity-10">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 30C15 25 25 28 30 35C25 38 15 38 10 30Z" fill="#5a6b46"/>
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 w-16 h-16 opacity-10 transform rotate-180">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 30C15 25 25 28 30 35C25 38 15 38 10 30Z" fill="#5a6b46"/>
          </svg>
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif text-[#5a6b46] italic">
            {isSubmitted ? 'Mulțumim!' : 'Confirmare Participare'}
          </h2>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="text-[#5a6b46]/70 hover:text-[#5a6b46] transition-colors"
            aria-label="Închide"
          >
            <FaTimes />
          </motion.button>
        </div>
        
        {isSubmitted ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center py-6"
          >
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20,
                delay: 0.1 
              }}
              className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
                submittedAttending ? 'bg-[#5a6b46]/10' : 'bg-amber-100'
              }`}
            >
              {submittedAttending ? (
                <FaHeart className="text-3xl text-[#5a6b46]" />
              ) : (
                <FaRegSadTear className="text-3xl text-amber-600" />
              )}
            </motion.div>
            
            {submittedAttending ? (
              <div>
                <h3 className="text-xl font-serif text-[#5a6b46] mb-3 italic">Ne vedem la nuntă!</h3>
                <p className="text-[#5a6b46]/80 mb-6">
                  Răspunsul dumneavoastră a fost înregistrat. Abia așteptăm să sărbătorim împreună această zi specială!
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-serif text-amber-700 mb-3 italic">Ne pare rău că nu puteți veni</h3>
                <p className="text-[#5a6b46]/80 mb-6">
                  Vă mulțumim pentru răspuns!
                </p>
              </div>
            )}
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className={`px-6 py-2 text-[#f8f5eb] rounded-full hover:bg-opacity-90 transition-colors shadow-sm ${
                submittedAttending ? 'bg-[#5a6b46]' : 'bg-amber-600'
              }`}
            >
              Închide
            </motion.button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="relative">
            <div className="space-y-5 mb-6">
              <div className="group">
                <label htmlFor="lastName" className="block text-[#5a6b46] mb-1 font-medium">Nume *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-[#f8f5eb] border border-[#5a6b46]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a6b46]/50 focus:border-transparent transition-all group-hover:border-[#5a6b46]/50"
                  required
                />
              </div>
              
              <div className="group">
                <label htmlFor="firstName" className="block text-[#5a6b46] mb-1 font-medium">Prenume *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-[#f8f5eb] border border-[#5a6b46]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a6b46]/50 focus:border-transparent transition-all group-hover:border-[#5a6b46]/50"
                  required
                />
              </div>
              
              <div className="group">
                <label htmlFor="email" className="block text-[#5a6b46] mb-1 font-medium">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-[#f8f5eb] border border-[#5a6b46]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a6b46]/50 focus:border-transparent transition-all group-hover:border-[#5a6b46]/50"
                  required
                />
              </div>
              
              <div className="group">
                <label htmlFor="phone" className="block text-[#5a6b46] mb-1 font-medium">Telefon *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-[#f8f5eb] border border-[#5a6b46]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a6b46]/50 focus:border-transparent transition-all group-hover:border-[#5a6b46]/50"
                  required
                />
              </div>
              
              <div className="bg-[#5a6b46]/5 p-4 rounded-lg border border-[#5a6b46]/10 hover:border-[#5a6b46]/20 transition-colors">
                <label className="block text-[#5a6b46] mb-2 font-medium">Veți participa? *</label>
                <div className="flex gap-6 mt-1">
                  <label className="inline-flex items-center cursor-pointer hover:text-[#5a6b46] transition-colors">
                    <input
                      type="radio"
                      name="attending"
                      value="yes"
                      checked={formData.attending === 'yes'}
                      onChange={handleChange}
                      className="form-radio text-[#5a6b46] focus:ring-[#5a6b46] h-4 w-4"
                    />
                    <span className="ml-2 text-[#5a6b46]">Da</span>
                  </label>
                  <label className="inline-flex items-center cursor-pointer hover:text-[#5a6b46] transition-colors">
                    <input
                      type="radio"
                      name="attending"
                      value="no"
                      checked={formData.attending === 'no'}
                      onChange={handleChange}
                      className="form-radio text-[#5a6b46] focus:ring-[#5a6b46] h-4 w-4"
                    />
                    <span className="ml-2 text-[#5a6b46]">Nu</span>
                  </label>
                </div>
              </div>
              
              {formData.attending === 'yes' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#5a6b46]/5 p-4 rounded-lg border border-[#5a6b46]/10 hover:border-[#5a6b46]/20 transition-colors"
                >
                  <p className="text-[#5a6b46] mb-3 font-medium">Opțiuni suplimentare</p>
                  <div className="space-y-3">
                    <label className="flex items-center cursor-pointer hover:text-[#5a6b46] transition-colors">
                      <input
                        type="checkbox"
                        name="vegetarianMenu"
                        checked={formData.vegetarianMenu}
                        onChange={handleChange}
                        className="form-checkbox text-[#5a6b46] focus:ring-[#5a6b46] h-4 w-4 rounded"
                      />
                      <span className="ml-2 text-[#5a6b46]/90">Meniu vegetarian</span>
                    </label>
                    
                    <label className="flex items-center cursor-pointer hover:text-[#5a6b46] transition-colors">
                      <input
                        type="checkbox"
                        name="bringingPlusOne"
                        checked={formData.bringingPlusOne}
                        onChange={handleChange}
                        className="form-checkbox text-[#5a6b46] focus:ring-[#5a6b46] h-4 w-4 rounded"
                      />
                      <span className="ml-2 text-[#5a6b46]/90">Voi veni însoțit</span>
                    </label>
                  </div>
                </motion.div>
              )}
              
              <div className="group">
                <label htmlFor="message" className="block text-[#5a6b46] mb-1 font-medium">Mesaj (opțional)</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 bg-[#f8f5eb] border border-[#5a6b46]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a6b46]/50 focus:border-transparent transition-all group-hover:border-[#5a6b46]/50"
                  placeholder="Orice informații suplimentare doriți să ne transmiteți..."
                ></textarea>
              </div>
            </div>
            
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center gap-2 border border-red-100"
              >
                <FaTimes className="text-red-500 flex-shrink-0" />
                <p>{error}</p>
              </motion.div>
            )}
            
            <div className="flex justify-center mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 bg-[#5a6b46] text-[#f8f5eb] rounded-full hover:bg-[#5a6b46]/90 transition-colors flex items-center gap-2 shadow-sm ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Se trimite...' : 'Trimite răspunsul'}
                {!isSubmitting && <FaCheck />}
              </motion.button>
            </div>
            
            {/* Decorative divider */}
            <div className="flex items-center justify-center text-[#5a6b46]/30 my-6">
              <div className="w-16 h-px bg-[#5a6b46]/20"></div>
              <FaHeart className="mx-3 text-xs" />
              <div className="w-16 h-px bg-[#5a6b46]/20"></div>
            </div>
          </form>
        )}
      </div>
    </motion.div>
  );
};

export default RSVPForm; 