'use client';

import { useState } from 'react';
import { FaTimes, FaCheck, FaUtensils } from 'react-icons/fa';

interface RSVPFormProps {
  onClose: () => void;
}

const RSVPForm = ({ onClose }: RSVPFormProps) => {
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
  
  return (
    <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif text-primary">
            {isSubmitted ? 'Mulțumim!' : 'Confirmare Participare'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Închide"
          >
            <FaTimes />
          </button>
        </div>
        
        {isSubmitted ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCheck className="text-green-600 text-2xl" />
            </div>
            <p className="text-gray-700 mb-6">
              Răspunsul dumneavoastră a fost înregistrat. Abia așteptăm să vă vedem la nunta noastră!
            </p>
            <button 
              onClick={onClose}
              className="px-6 py-2 bg-primary text-white rounded-full hover:bg-opacity-90 transition-colors"
            >
              Închide
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 mb-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-1">Nume și Prenume *</label>
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
                <label htmlFor="email" className="block text-gray-700 mb-1">Email *</label>
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
              
              <div>
                <label htmlFor="attending" className="block text-gray-700 mb-1">Veți participa? *</label>
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
                <>
                  <div>
                    <label htmlFor="guests" className="block text-gray-700 mb-1">Număr de invitați</label>
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
                  
                  <div>
                    <label htmlFor="dietaryRestrictions" className="block text-gray-700 mb-1">
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
                </>
              )}
              
              <div>
                <label htmlFor="message" className="block text-gray-700 mb-1">Mesaj (opțional)</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Orice informații suplimentare doriți să ne transmiteți..."
                ></textarea>
              </div>
            </div>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center gap-2">
                <FaTimes className="text-red-500 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 mr-2 hover:text-gray-800"
              >
                Anulează
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 bg-primary text-white rounded-full font-medium transition-colors ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary/90'
                }`}
              >
                {isSubmitting ? 'Se trimite...' : 'Trimite'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RSVPForm; 