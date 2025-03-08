'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChurch, FaGlassCheers, FaRing } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { HiOutlineCalendar } from 'react-icons/hi';

const EventDetails = () => {
  const [activeTab, setActiveTab] = useState('civil');
  
  const events = {
    civil: {
      title: 'Cununia Civilă',
      time: '13:45',
      date: '5 Septembrie, 2025',
      location: 'Teatrul Maior Gh. Pastia',
      address: 'Strada Republicii 71, Focșani',
      icon: <FaRing className="text-3xl text-[#5a6b46]" />,
      dateTime: {
        start: '2025-09-05T13:45:00',
        end: '2025-09-05T14:30:00',
      }
    },
    ceremony: {
      title: 'Cununia Religioasă',
      time: '18:00',
      date: '5 Septembrie, 2025',
      location: 'Biserica Sf. Pantelimon',
      address: 'Strada Cuza Voda, Focșani (Curtea Spitalului Județean)',
      icon: <FaChurch className="text-3xl text-[#5a6b46]" />,
      dateTime: {
        start: '2025-09-05T18:00:00',
        end: '2025-09-05T19:30:00',
      }
    },
    reception: {
      title: 'Petrecere',
      time: '20:00',
      date: '5 Septembrie, 2025',
      location: 'Restaurant Hora Miresei',
      address: 'Hora Miresei, Vânători 627395',
      icon: <FaGlassCheers className="text-3xl text-[#5a6b46]" />,
      dateTime: {
        start: '2025-09-05T20:00:00',
        end: '2025-09-06T04:00:00',
      }
    },
  };
  
  const activeEvent = events[activeTab as keyof typeof events];

  const handleAddToCalendar = (event: typeof activeEvent) => {
    // Create iCal content
    const icalContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Nunta Razvan & Andreea//NONSGML v1.0//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `SUMMARY:${event.title} - Nuntă Razvan & Andreea`,
      `DTSTART;TZID=Europe/Bucharest:${event.dateTime.start.replace(/[-:]/g, '')}`,
      `DTEND;TZID=Europe/Bucharest:${event.dateTime.end.replace(/[-:]/g, '')}`,
      `LOCATION:${event.location}, ${event.address}`,
      `DESCRIPTION:Nuntă Razvan & Andreea - ${event.title}`,
      'BEGIN:VALARM',
      'ACTION:DISPLAY',
      'DESCRIPTION:Reminder',
      'TRIGGER:-PT1H',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');
    
    // Create a Blob with the iCal content
    const blob = new Blob([icalContent], { type: 'text/calendar;charset=utf-8' });
    
    // Create a link element
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Nunta-Razvan-Andreea-${event.title.replace(/\s+/g, '-')}.ics`;
    
    // Append to the document, click it, and remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="max-w-4xl mx-auto relative py-6">
      <h2 className="text-3xl font-serif text-[#5a6b46] text-center mb-8 italic">Detalii Eveniment</h2>
      
      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-[#f8f5eb] rounded-full p-1 shadow-md border border-[#5a6b46]/30">
          {Object.keys(events).map((key) => (
            <button
              key={key}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === key 
                  ? 'bg-[#5a6b46] text-[#f8f5eb] shadow-sm' 
                  : 'text-[#5a6b46] hover:bg-[#5a6b46]/10'
              }`}
              onClick={() => setActiveTab(key)}
            >
              {events[key as keyof typeof events].title}
            </button>
          ))}
        </div>
      </div>
      
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="bg-[#f8f5eb] rounded-lg shadow-lg p-6 md:p-8 border border-[#5a6b46]/30 relative overflow-hidden"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute top-0 left-0 w-full h-full opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100' height='100' fill='none'/%3E%3Cg opacity='0.1'%3E%3Cpath d='M20 20C25 15 35 18 40 25C35 28 25 28 20 20Z' fill='%235a6b46'/%3E%3Cpath d='M80 20C75 15 65 18 60 25C65 28 75 28 80 20Z' fill='%235a6b46'/%3E%3Cpath d='M20 80C25 85 35 82 40 75C35 72 25 72 20 80Z' fill='%235a6b46'/%3E%3Cpath d='M80 80C75 85 65 82 60 75C65 72 75 72 80 80Z' fill='%235a6b46'/%3E%3Ccircle cx='50' cy='50' r='2' fill='%235a6b46'/%3E%3Ccircle cx='20' cy='50' r='1.5' fill='%235a6b46'/%3E%3Ccircle cx='80' cy='50' r='1.5' fill='%235a6b46'/%3E%3Ccircle cx='50' cy='20' r='1.5' fill='%235a6b46'/%3E%3Ccircle cx='50' cy='80' r='1.5' fill='%235a6b46'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
              backgroundSize: '100px'
            }}
          ></div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">
          <div className="w-20 h-20 flex items-center justify-center bg-[#f8f5eb] rounded-full shrink-0 border-2 border-[#5a6b46]/20 shadow-sm">
            {activeEvent.icon}
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-serif text-[#5a6b46] mb-3 italic">{activeEvent.title}</h3>
            
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 mb-4">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <HiOutlineCalendar className="text-[#5a6b46]" />
                <span className="text-[#5a6b46]/90">{activeEvent.date}, {activeEvent.time}</span>
              </div>
              
              <div className="flex items-center justify-center md:justify-start gap-2">
                <MdLocationOn className="text-[#5a6b46]" />
                <span className="text-[#5a6b46]/90">{activeEvent.location}</span>
              </div>
            </div>
            
            <p className="text-[#5a6b46]/80 mb-4">{activeEvent.address}</p>
            
            <div className="mt-6 flex flex-col md:flex-row gap-4 items-center md:items-start">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(activeEvent.location + ', ' + activeEvent.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#5a6b46] hover:text-[#5a6b46]/80 transition-colors border border-[#5a6b46]/30 px-4 py-2 rounded-full hover:bg-[#5a6b46]/5"
              >
                <MdLocationOn />
                <span>Vezi pe hartă</span>
              </a>
              
              <button
                onClick={() => handleAddToCalendar(activeEvent)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#5a6b46] text-[#f8f5eb] rounded-full hover:bg-[#5a6b46]/90 transition-colors shadow-sm"
              >
                <HiOutlineCalendar />
                <span>Adaugă în calendar</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EventDetails; 