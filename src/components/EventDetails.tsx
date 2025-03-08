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
      icon: <FaRing className="text-3xl text-primary" />,
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
      icon: <FaChurch className="text-3xl text-primary" />,
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
      icon: <FaGlassCheers className="text-3xl text-primary" />,
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
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-serif text-primary text-center mb-8">Detalii Eveniment</h2>
      
      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-white/50 rounded-full p-1 shadow-sm">
          {Object.keys(events).map((key) => (
            <button
              key={key}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === key 
                  ? 'bg-primary text-white' 
                  : 'text-primary hover:bg-primary/10'
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
        className="bg-white/70 rounded-lg shadow-lg p-6 md:p-8"
      >
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-16 h-16 flex items-center justify-center bg-primary/10 rounded-full shrink-0">
            {activeEvent.icon}
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-serif text-primary mb-2">{activeEvent.title}</h3>
            
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mb-4">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <HiOutlineCalendar className="text-primary" />
                <span>{activeEvent.date}, {activeEvent.time}</span>
              </div>
              
              <div className="flex items-center justify-center md:justify-start gap-2">
                <MdLocationOn className="text-primary" />
                <span>{activeEvent.location}</span>
              </div>
            </div>
            
            <p className="text-gray-700 mb-4">{activeEvent.address}</p>
            
            <div className="mt-6 flex flex-col md:flex-row gap-4 items-center md:items-start">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(activeEvent.location + ', ' + activeEvent.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
              >
                <MdLocationOn />
                <span>Vezi pe hartă</span>
              </a>
              
              <button
                onClick={() => handleAddToCalendar(activeEvent)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
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