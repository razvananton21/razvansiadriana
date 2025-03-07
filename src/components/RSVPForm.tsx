'use client';

import { useState } from 'react';
import { FaTimes, FaCheck, FaUtensils } from 'react-icons/fa';
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
      const data = {
        last_name: formData.lastName,
        first_name: formData.firstName,
        email: formData.email,
        phone: formData.phone,
        attending: formData.attending === 'yes',
        vegetarian_menu: formData.vegetarianMenu,
        bringing_plus_one: formData.bringingPlusOne,
        message: formData.message
      };
      
      setDebugInfo(`Submitting data: ${JSON.stringify(data)}`);
      
      await submitRSVP(data);
      
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
                <label htmlFor="lastName" className="block text-gray-700 mb-1">Nume *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="firstName" className="block text-gray-700 mb-1">Prenume *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
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
                <label htmlFor="phone" className="block text-gray-700 mb-1">Telefon *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1">Veți participa? *</label>
                <div className="flex gap-4 mt-1">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="attending"
                      value="yes"
                      checked={formData.attending === 'yes'}
                      onChange={handleChange}
                      className="form-radio text-primary focus:ring-primary h-4 w-4"
                    />
                    <span className="ml-2">Da</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="attending"
                      value="no"
                      checked={formData.attending === 'no'}
                      onChange={handleChange}
                      className="form-radio text-primary focus:ring-primary h-4 w-4"
                    />
                    <span className="ml-2">Nu</span>
                  </label>
                </div>
              </div>
              
              {formData.attending === 'yes' && (
                <>
                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="vegetarianMenu"
                        checked={formData.vegetarianMenu}
                        onChange={handleChange}
                        className="form-checkbox text-primary focus:ring-primary h-4 w-4"
                      />
                      <span className="ml-2">Meniu vegetarian</span>
                    </label>
                  </div>
                  
                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="bringingPlusOne"
                        checked={formData.bringingPlusOne}
                        onChange={handleChange}
                        className="form-checkbox text-primary focus:ring-primary h-4 w-4"
                      />
                      <span className="ml-2">Voi veni însoțit</span>
                    </label>
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
            
            {debugInfo && (
              <div className="mb-4 p-3 bg-gray-50 text-gray-700 rounded-lg text-xs font-mono overflow-auto">
                <p>{debugInfo}</p>
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