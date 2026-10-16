import React from 'react';

export const CinemaTicketNav: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'home', label: 'HOME', icon: '🎬' },
    { id: 'our-story', label: 'OUR STORY', icon: '📖' },
    { id: 'gallery', label: 'GALLERY', icon: '🖼️' },
    { id: 'letter', label: 'LETTER', icon: '✉️' },
    { id: 'countdown', label: 'COUNTDOWN', icon: '⏳' },
  ];

  return (
    <nav
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 max-w-md w-[94vw] sm:w-auto select-none"
      aria-label="Cinema Ticket Navigation"
    >
      {/* VINTAGE CINEMA TICKET STUB */}
      <div className="relative bg-[#ffe9e2] border border-[#dac0c2] rounded-lg retro-shadow-sm px-2 py-2 flex items-center justify-around sm:gap-2 backdrop-blur-xs">
        {/* Left Ticket Notch */}
        <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#fff8f6] border-r border-[#dac0c2]" />
        
        {/* Right Ticket Notch */}
        <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#fff8f6] border-l border-[#dac0c2]" />

        {/* Navigation Items */}
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="flex flex-col items-center justify-center px-2 sm:px-3 py-1 rounded hover:bg-[#ffdbce] text-[#2a170f] transition-all group active:scale-95 cursor-pointer"
          >
            <span className="text-sm group-hover:scale-110 transition-transform">
              {item.icon}
            </span>
            <span className="font-courier text-[9px] sm:text-[10px] tracking-wider uppercase text-[#6b1d2f] font-semibold mt-0.5">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
};
