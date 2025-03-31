'use client';

import { useState, useEffect } from 'react';
import { getTokensWithResponses, createInvitationToken } from '@/lib/tokens';
import { FaCheck, FaTimes, FaUtensils, FaUserPlus, FaCopy, FaEye, FaPlusCircle, FaSort, FaSortUp, FaSortDown, FaFilter, FaSearch } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

export default function AdminPage() {
  const [tokens, setTokens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Token generation state
  const [inviteeName, setInviteeName] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copying, setCopying] = useState<string | null>(null);
  
  // Custom message for invitation links
  const [customMessage, setCustomMessage] = useState('');
  
  // Sorting and filtering
  const [sortField, setSortField] = useState<string>('created_at');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
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
    
    // Load saved custom message from localStorage
    const savedMessage = localStorage.getItem('invitation_custom_message');
    if (savedMessage) {
      setCustomMessage(savedMessage);
    }
    
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);
  
  // Save custom message to localStorage when it changes
  useEffect(() => {
    if (customMessage) {
      localStorage.setItem('invitation_custom_message', customMessage);
    }
  }, [customMessage]);
  
  const loadData = async () => {
    setLoading(true);
    try {
      const tokensData = await getTokensWithResponses();
      setTokens(tokensData);
    } catch (err) {
      setError('Eroare la încărcarea datelor');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  // Generate a new invitation token
  const generateToken = async () => {
    if (!inviteeName.trim()) {
      alert('Vă rugăm să introduceți un nume pentru invitat');
      return;
    }
    
    try {
      setIsGenerating(true);
      const tokenValue = uuidv4();
      await createInvitationToken(inviteeName, tokenValue);
      
      // Refresh the token list
      await loadData();
      
      // Reset the form
      setInviteeName('');
    } catch (err) {
      console.error('Error generating token:', err);
      alert('A apărut o eroare la generarea token-ului');
    } finally {
      setIsGenerating(false);
    }
  };
  
  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString('ro-RO');
  };
  
  // Generate full invitation URL with token
  const getInvitationUrl = (token: string) => {
    const host = window.location.origin;
    return `${host}?token=${token}`;
  };
  
  // Copy invitation URL to clipboard with custom message
  const copyToClipboard = async (token: string) => {
    try {
      const url = getInvitationUrl(token);
      let textToCopy = url;
      
      // Add custom message if exists
      if (customMessage.trim()) {
        textToCopy = `${customMessage.trim()}\n\n${url}`;
      }
      
      await navigator.clipboard.writeText(textToCopy);
      setCopying(token);
      setTimeout(() => setCopying(null), 1500);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };
  
  // Handle sorting
  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Get sorted and filtered tokens
  const getFilteredAndSortedTokens = () => {
    let filtered = [...tokens];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(token => 
        token.invitee_name.toLowerCase().includes(query) || 
        token.response?.first_name?.toLowerCase().includes(query) || 
        token.response?.last_name?.toLowerCase().includes(query) ||
        token.response?.email?.toLowerCase().includes(query) ||
        token.response?.phone?.toLowerCase().includes(query)
      );
    }
    
    // Apply status filter
    if (filterStatus !== 'all') {
      switch (filterStatus) {
        case 'viewed':
          filtered = filtered.filter(token => token.is_viewed); // All viewed (including completed)
          break;
        case 'uncompleted':
          filtered = filtered.filter(token => !token.is_completed); // Not completed
          break;
        case 'completed':
          filtered = filtered.filter(token => token.is_completed);
          break;
        case 'unused':
          filtered = filtered.filter(token => !token.is_viewed);
          break;
        case 'attending':
          filtered = filtered.filter(token => token.is_completed && token.response?.attending);
          break;
        case 'not-attending':
          filtered = filtered.filter(token => token.is_completed && !token.response?.attending);
          break;
        case 'with-plus-one':
          filtered = filtered.filter(token => token.is_completed && token.response?.attending && token.response?.bringing_plus_one);
          break;
        case 'vegetarian-menus':
          filtered = filtered.filter(token => token.is_completed && token.response?.attending && token.response?.vegetarian_menu);
          break;
        case 'participants':
          filtered = filtered.filter(token => token.is_completed && token.response?.attending);
          break;
      }
    }
    
    // Apply sorting
    return filtered.sort((a, b) => {
      let valueA: any;
      let valueB: any;
      
      switch (sortField) {
        case 'invitee_name':
          valueA = a.invitee_name.toLowerCase();
          valueB = b.invitee_name.toLowerCase();
          break;
        case 'status':
          valueA = a.is_completed ? 2 : a.is_viewed ? 1 : 0;
          valueB = b.is_completed ? 2 : b.is_viewed ? 1 : 0;
          break;
        case 'viewed_at':
          valueA = a.viewed_at ? new Date(a.viewed_at).getTime() : 0;
          valueB = b.viewed_at ? new Date(b.viewed_at).getTime() : 0;
          break;
        case 'completed_at':
          valueA = a.completed_at ? new Date(a.completed_at).getTime() : 0;
          valueB = b.completed_at ? new Date(b.completed_at).getTime() : 0;
          break;
        case 'created_at':
          valueA = a.created_at ? new Date(a.created_at).getTime() : 0;
          valueB = b.created_at ? new Date(b.created_at).getTime() : 0;
          break;
        case 'attending':
          valueA = a.response?.attending ? 1 : 0;
          valueB = b.response?.attending ? 1 : 0;
          break;
        default:
          valueA = a[sortField];
          valueB = b[sortField];
      }
      
      if (valueA === valueB) return 0;
      
      const comparison = valueA > valueB ? 1 : -1;
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  };
  
  const sortedAndFilteredTokens = getFilteredAndSortedTokens();
  
  // Calculate statistics
  const statistics = {
    totalInvitations: tokens.length,
    viewedInvitations: tokens.filter(t => t.is_viewed).length,
    uncompletedInvitations: tokens.filter(t => !t.is_completed).length,
    completedInvitations: tokens.filter(t => t.is_completed).length,
    confirmedAttending: tokens.filter(t => t.is_completed && t.response?.attending).length,
    confirmedNotAttending: tokens.filter(t => t.is_completed && !t.response?.attending).length,
    withPlusOne: tokens.filter(t => t.is_completed && t.response?.attending && t.response?.bringing_plus_one).length,
    vegetarianMenus: tokens.filter(t => t.is_completed && t.response?.attending && t.response?.vegetarian_menu).length,
    totalParticipants: tokens
      .filter(t => t.is_completed && t.response?.attending)
      .reduce((sum, token) => sum + (token.response?.bringing_plus_one ? 2 : 1), 0)
  };
  
  const renderSortIcon = (field: string) => {
    if (sortField !== field) return <FaSort className="ml-1 text-gray-400" />;
    return sortDirection === 'asc' ? <FaSortUp className="ml-1 text-primary" /> : <FaSortDown className="ml-1 text-primary" />;
  };
  
  // Statistic box click handler
  const handleStatisticClick = (filterType: string) => {
    // Set the filter status based on the clicked statistic box
    setFilterStatus(filterType);
    
    // If we're already filtering by this type, reset to show all
    if (filterStatus === filterType) {
      setFilterStatus('all');
    }
  };
  
  // Function to determine if a statistic box is currently active
  const isStatisticActive = (filterType: string) => {
    return filterStatus === filterType;
  };
  
  // Create a styled statistic box component
  const StatisticBox = ({ 
    title, 
    value, 
    color = 'primary', 
    filterType,
    onClick 
  }: { 
    title: string; 
    value: number; 
    color?: string; 
    filterType: string;
    onClick: (filterType: string) => void 
  }) => {
    const isActive = isStatisticActive(filterType);
    const baseClasses = "bg-white rounded-lg shadow p-4 cursor-pointer transition-all";
    const activeClasses = isActive ? "ring-2 ring-offset-2 ring-primary shadow-lg" : "hover:shadow-md";
    
    return (
      <div 
        className={`${baseClasses} ${activeClasses}`} 
        onClick={() => onClick(filterType)}
      >
        <div className={`text-2xl font-bold text-${color}`}>{value}</div>
        <div className="text-gray-500 text-sm">{title}</div>
      </div>
    );
  };
  
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
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-serif text-primary">Admin Panel</h1>
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
        
        {/* Statistics Dashboard */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-6">
          <StatisticBox 
            title="Total invitații" 
            value={statistics.totalInvitations} 
            filterType="all" 
            onClick={handleStatisticClick} 
          />
          <StatisticBox 
            title="Invitații vizualizate" 
            value={statistics.viewedInvitations} 
            filterType="viewed" 
            onClick={handleStatisticClick} 
          />
          <StatisticBox 
            title="Invitații necompletate" 
            value={statistics.uncompletedInvitations} 
            filterType="uncompleted" 
            onClick={handleStatisticClick} 
          />
          <StatisticBox 
            title="Invitații completate" 
            value={statistics.completedInvitations} 
            filterType="completed" 
            onClick={handleStatisticClick} 
          />
          <StatisticBox 
            title="Confirmați participare" 
            value={statistics.confirmedAttending} 
            color="green-600" 
            filterType="attending" 
            onClick={handleStatisticClick} 
          />
          <StatisticBox 
            title="Nu pot participa" 
            value={statistics.confirmedNotAttending} 
            color="red-600" 
            filterType="not-attending" 
            onClick={handleStatisticClick} 
          />
          <StatisticBox 
            title="Vin cu însoțitor" 
            value={statistics.withPlusOne} 
            color="purple-600" 
            filterType="with-plus-one" 
            onClick={handleStatisticClick} 
          />
          <StatisticBox 
            title="Meniuri vegetariene" 
            value={statistics.vegetarianMenus} 
            color="blue-600" 
            filterType="vegetarian-menus" 
            onClick={handleStatisticClick} 
          />
          <StatisticBox 
            title="Total participanți" 
            value={statistics.totalParticipants} 
            filterType="participants" 
            onClick={handleStatisticClick} 
          />
        </div>
        
        {/* Custom Message for Links */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-serif text-primary mb-4">Mesaj Personalizat pentru Link-uri</h2>
          <div className="space-y-2">
            <label htmlFor="customMessage" className="block text-sm font-medium text-gray-700">
              Adaugă un mesaj care va fi inclus cu fiecare link de invitație copiat
            </label>
            <textarea
              id="customMessage"
              rows={3}
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Dragă invitat, te așteptăm cu drag la nunta noastră. Confirmă-ți participarea folosind link-ul de mai jos:"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            ></textarea>
            <p className="text-sm text-gray-500">
              Acest mesaj va fi adăugat automat înainte de link când folosești butonul "Copiază Link".
            </p>
          </div>
        </div>
        
        {/* Token Generation Form */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-serif text-primary mb-4">Generează Invitație Nouă</h2>
          <div className="flex items-end gap-4">
            <div className="flex-grow">
              <label htmlFor="inviteeName" className="block text-sm font-medium text-gray-700 mb-1">
                Nume invitat
              </label>
              <input
                type="text"
                id="inviteeName"
                value={inviteeName}
                onChange={(e) => setInviteeName(e.target.value)}
                placeholder="Ex: Familia Popescu"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              onClick={generateToken}
              disabled={isGenerating}
              className={`px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center ${
                isGenerating ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <FaPlusCircle className="mr-2" />
              {isGenerating ? 'Se generează...' : 'Generează Invitație'}
            </button>
          </div>
        </div>
        
        {/* Search and Filter Controls */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-grow">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Caută
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Caută după nume, email, telefon..."
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
            
            <div>
              <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-1">
                Filtrează după status {filterStatus !== 'all' && (
                  <span className="text-primary font-semibold">(Filtru activ)</span>
                )}
              </label>
              <div className="relative">
                <select
                  id="filter"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className={`w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none ${
                    filterStatus !== 'all' ? 'border-primary bg-primary/5' : 'border-gray-300'
                  }`}
                >
                  <option value="all">Toate</option>
                  <option value="unused">Nefolosite</option>
                  <option value="viewed">Vizualizate</option>
                  <option value="uncompleted">Necompletate</option>
                  <option value="completed">Completate</option>
                  <option value="attending">Participă</option>
                  <option value="not-attending">Nu participă</option>
                  <option value="with-plus-one">Cu însoțitor</option>
                  <option value="vegetarian-menus">Meniuri vegetariene</option>
                  <option value="participants">Total participanți</option>
                </select>
                <FaFilter className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="text-center py-12">Se încarcă...</div>
        ) : sortedAndFilteredTokens.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p>Nu există invitații conform filtrelor selectate.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('invitee_name')}>
                      <div className="flex items-center">
                        Invitat {renderSortIcon('invitee_name')}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('status')}>
                      <div className="flex items-center">
                        Status {renderSortIcon('status')}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('viewed_at')}>
                      <div className="flex items-center">
                        Vizualizat {renderSortIcon('viewed_at')}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('completed_at')}>
                      <div className="flex items-center">
                        Răspuns {renderSortIcon('completed_at')}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date contact
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Detalii Răspuns
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acțiuni
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedAndFilteredTokens.map((token) => (
                    <tr 
                      key={token.id} 
                      className={
                        token.is_completed 
                          ? token.response?.attending 
                            ? 'bg-green-50' 
                            : 'bg-red-50' 
                          : token.is_viewed 
                            ? 'bg-yellow-50' 
                            : 'bg-white'
                      }
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{token.invitee_name}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          Generat: {formatDate(token.created_at)}
                        </div>
                        {token.response && (
                          <div className="text-xs text-gray-500 mt-1">
                            Nume formular: {token.response.last_name} {token.response.first_name}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {token.is_completed ? (
                          token.response?.attending ? (
                            <span className="px-2 inline-flex items-center text-xs font-medium rounded-full bg-green-100 text-green-800">
                              <FaCheck className="mr-1" /> Confirmat - Participă
                            </span>
                          ) : (
                            <span className="px-2 inline-flex items-center text-xs font-medium rounded-full bg-red-100 text-red-800">
                              <FaTimes className="mr-1" /> Confirmat - Nu participă
                            </span>
                          )
                        ) : token.is_viewed ? (
                          <span className="px-2 inline-flex items-center text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                            <FaEye className="mr-1" /> Vizualizat
                          </span>
                        ) : (
                          <span className="px-2 inline-flex items-center text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                            Neaccesat
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {token.is_viewed ? formatDate(token.viewed_at) : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {token.is_completed ? formatDate(token.completed_at) : '-'}
                      </td>
                      <td className="px-6 py-4">
                        {token.response ? (
                          <div className="space-y-1 text-sm">
                            <div>
                              <span className="font-medium">Email:</span>{' '}
                              {token.response.email || '-'}
                            </div>
                            <div>
                              <span className="font-medium">Telefon:</span>{' '}
                              {token.response.phone || '-'}
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {token.response ? (
                          <div className="space-y-2">
                            <div className="text-sm">
                              <span className="font-medium">Participă:</span>{' '}
                              {token.response.attending ? (
                                <span className="text-green-600">Da</span>
                              ) : (
                                <span className="text-red-600">Nu</span>
                              )}
                            </div>
                            {token.response.attending && (
                              <div className="space-y-1">
                                {token.response.vegetarian_menu && (
                                  <span className="px-2 inline-flex items-center text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                                    <FaUtensils className="mr-1" /> Vegetarian
                                  </span>
                                )}
                                {token.response.bringing_plus_one && (
                                  <div className="px-2 inline-flex items-center text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                                    <FaUserPlus className="mr-1" /> Cu însoțitor
                                  </div>
                                )}
                              </div>
                            )}
                            {token.response.message && (
                              <div className="text-sm mt-2">
                                <span className="font-medium">Mesaj:</span>
                                <div className="bg-gray-50 p-2 rounded mt-1 italic">
                                  "{token.response.message}"
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">Nu există răspuns</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="relative group">
                          <button
                            onClick={() => copyToClipboard(token.token)}
                            className="text-blue-600 hover:text-blue-800 flex items-center"
                            title="Copiază link-ul cu mesajul personalizat"
                          >
                            <FaCopy className="mr-1" />
                            {copying === token.token ? 'Copiat!' : 'Copiază Link'}
                          </button>
                          {customMessage && (
                            <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded p-2 max-w-xs z-10">
                              <div className="truncate font-semibold mb-1">Se va copia:</div>
                              <div className="italic">{customMessage}</div>
                              <div className="mt-1 text-blue-300 truncate">{getInvitationUrl(token.token)}</div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 