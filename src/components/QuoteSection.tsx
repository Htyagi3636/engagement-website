import React from 'react';
import { siteConfig } from '../data';

export const QuoteSection: React.FC = () => {
  return (
    <section className="relative py-24 px-6 bg-[#3d0815] text-[#fff8f6] text-center overflow-hidden border-y-4 border-[#d49b35]">
      {/* Background Subtle Watermark Heart & Film Lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10 flex items-center justify-center"
        aria-hidden="true"
      >
        <svg viewBox="0 0 100 100" className="w-[80vw] max-w-[600px] h-auto fill-[#fcbf55]">
          <path d="M50 88.5 C25 65 5 45 5 25 C5 12 15 2 28 2 C37 2 45 8 50 15 C55 8 63 2 72 2 C85 2 95 12 95 25 C95 45 75 65 50 88.5 Z" />
        </svg>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* TOP EMBLEMS */}
        <div className="flex items-center justify-center gap-4 text-[#fcbf55] text-lg mb-6">
          <span>✈</span>
          <span>✿</span>
          <span>✈</span>
        </div>

        {/* FAMOUS R.D. BURMAN LYRIC QUOTE */}
        <blockquote className="space-y-3">
          {siteConfig.romanticQuote.verses.map((verse, index) => (
            <p
              key={index}
              className="font-newsreader italic text-2xl sm:text-3xl md:text-4xl text-[#ffe9e2] leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
            >
              "{verse}"
            </p>
          ))}
        </blockquote>

        {/* SEPARATOR RULE */}
        <div className="w-24 h-0.5 bg-[#d49b35] mx-auto my-8 opacity-80" />

        {/* REFLECTION NOTE */}
        <p className="font-courier text-xs sm:text-sm text-[#ffdbce]/90 max-w-xl mx-auto leading-relaxed uppercase tracking-wider">
          {siteConfig.romanticQuote.reflection}
        </p>

        {/* ATTRIBUTION */}
        <div className="font-courier text-xs tracking-[0.28em] text-[#fcbf55] font-bold uppercase mt-6">
          {siteConfig.romanticQuote.signoff}
        </div>
      </div>
    </section>
  );
};
