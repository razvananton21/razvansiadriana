'use client';

import { useState, useEffect } from 'react';
import { getRSVPResponses } from '@/lib/rsvp';
import type { RSVPResponse } from '@/types/supabase';
import { FaCheck, FaTimes, FaUtensils, FaUserPlus } from 'react-icons/fa';

export default function AdminPage() {
  const [responses, setResponses] = useState<RSVPResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Simple password protection (not secure, just to prevent casual access)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Replace 'your-password' with your desired password
    if (password === 'wedding2025') {
      setIsAuthenticated(true);
      localStorage.setItem('rsvp_admin_auth', 'true');
    } else {
      setError('Parolă incorectă');
    }
  };
  
  useEffect(() => {
    // Check if already authenticated
    if (localStorage.getItem('rsvp_admin_auth') === 'true') {
      setIsAuthenticated(true);
    }
    
    if (isAuthenticated) {
      const fetchResponses = async () => {
        try {
          const data = await getRSVPResponses();
          setResponses(data);
        } catch (err) {
          setError('Eroare la încărcarea răspunsurilor');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      
      fetchResponses();
    }
  }, [isAuthenticated]);
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-2xl font-serif text-primary mb-6 text-center">Admin RSVP</h1>
          
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 mb-2">Parolă</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Autentificare
            </button>
          </form>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-serif text-primary">Răspunsuri RSVP</h1>
          <button
            onClick={() => {
              localStorage.removeItem('rsvp_admin_auth');
              setIsAuthenticated(false);
            }}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Deconectare
          </button>
        </div>
        
        {loading ? (
          <div className="text-center py-12">Se încarcă...</div>
        ) : responses.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p>Nu există răspunsuri încă.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nume
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Participă
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Opțiuni
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mesaj
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {responses.map((response) => (
                    <tr key={response.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{response.last_name} {response.first_name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{response.email}</div>
                        <div className="text-sm text-gray-500">{response.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {response.attending ? (
                          <span className="px-2 inline-flex items-center text-xs font-medium rounded-full bg-green-100 text-green-800">
                            <FaCheck className="mr-1" /> Da
                          </span>
                        ) : (
                          <span className="px-2 inline-flex items-center text-xs font-medium rounded-full bg-red-100 text-red-800">
                            <FaTimes className="mr-1" /> Nu
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {response.attending && (
                          <div className="space-y-1">
                            {response.vegetarian_menu && (
                              <span className="px-2 inline-flex items-center text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                                <FaUtensils className="mr-1" /> Vegetarian
                              </span>
                            )}
                            {response.bringing_plus_one && (
                              <div className="px-2 inline-flex items-center text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                                <FaUserPlus className="mr-1" /> Cu însoțitor
                              </div>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">
                          {response.message || '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {response.created_at ? new Date(response.created_at).toLocaleDateString('ro-RO') : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        <div className="mt-6">
          <h2 className="text-xl font-serif text-primary mb-4">Statistici</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-2xl font-bold text-primary">{responses.filter(r => r.attending).length}</div>
              <div className="text-gray-500">Participanți confirmați</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-2xl font-bold text-primary">{responses.filter(r => !r.attending).length}</div>
              <div className="text-gray-500">Nu pot participa</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-2xl font-bold text-primary">
                {responses.filter(r => r.attending && r.bringing_plus_one).length}
              </div>
              <div className="text-gray-500">Vin cu însoțitor</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 