'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaTimes, FaUtensils } from 'react-icons/fa';

const RSVP = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attending: '',
    guests: '0',
    dietaryRestrictions: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    // Validate form
    if (!formData.name || !formData.email || !formData.attending) {
      setError('Vă rugăm să completați toate câmpurile obligatorii.');
      setIsSubmitting(false);
      return;
    }
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitted(true);
    } catch (err) {
      setError('A apărut o eroare. Vă rugăm să încercați din nou.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto bg-white/80 p-8 rounded-lg shadow-lg text-center"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaCheck className="text-green-600 text-2xl" />
        </div>
        <h3 className="text-2xl font-serif text-primary mb-4">Mulțumim!</h3>
        <p className="text-gray-700 mb-6">
          Răspunsul dumneavoastră a fost înregistrat. Abia așteptăm să vă vedem la nunta noastră!
        </p>
        <button 
          onClick={() => setIsSubmitted(false)}
          className="text-primary underline"
        >
          Trimite alt răspuns
        </button>
      </motion.div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-serif text-primary text-center mb-8">Confirmare Participare</h2>
      
      <div className="bg-white/70 rounded-lg shadow-lg p-6 md:p-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-2">Nume și Prenume *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="attending" className="block text-gray-700 mb-2">Veți participa? *</label>
              <select
                id="attending"
                name="attending"
                value={formData.attending}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="">Selectați...</option>
                <option value="yes">Da, voi participa</option>
                <option value="no">Nu pot participa</option>
              </select>
            </div>
            
            {formData.attending === 'yes' && (
              <div>
                <label htmlFor="guests" className="block text-gray-700 mb-2">Număr de invitați</label>
                <select
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="0">Doar eu</option>
                  <option value="1">+1 invitat</option>
                  <option value="2">+2 invitați</option>
                  <option value="3">+3 invitați</option>
                  <option value="4">+4 invitați</option>
                </select>
              </div>
            )}
          </div>
          
          {formData.attending === 'yes' && (
            <div className="mb-6">
              <label htmlFor="dietaryRestrictions" className="block text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <FaUtensils className="text-primary" />
                  <span>Restricții alimentare sau alergii</span>
                </div>
              </label>
              <input
                type="text"
                id="dietaryRestrictions"
                name="dietaryRestrictions"
                value={formData.dietaryRestrictions}
                onChange={handleChange}
                placeholder="Vegetarian, alergii, etc."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          )}
          
          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-700 mb-2">Mesaj (opțional)</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Orice informații suplimentare doriți să ne transmiteți..."
            ></textarea>
          </div>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-2">
              <FaTimes className="text-red-500" />
              <p>{error}</p>
            </div>
          )}
          
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-8 py-3 bg-primary text-white rounded-full font-medium transition-colors ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary/90'
              }`}
            >
              {isSubmitting ? 'Se trimite...' : 'Trimite Răspuns'}
            </button>
          </div>
        </form>
      </div>
      
      <div className="mt-8 text-center text-gray-600">
        <p>Vă rugăm să confirmați participarea până la data de 1 August 2025</p>
      </div>
    </div>
  );
};

export default RSVP; 