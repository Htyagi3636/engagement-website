import React, { useState, useEffect } from 'react';
import { siteConfig } from '../data';
import { BirdGraphic } from './BirdsOverlay';

interface LoveLetterSectionProps {
  onLetterOpenChange?: (isOpen: boolean) => void;
}

export const LoveLetterSection: React.FC<LoveLetterSectionProps> = ({ onLetterOpenChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [sealBroken, setSealBroken] = useState<boolean>(false);
  const [envelopeBirds, setEnvelopeBirds] = useState<boolean>(false);
  const [displayedParagraphs, setDisplayedParagraphs] = useState<string[]>([]);

  const handleBreakSeal = () => {
    if (isOpen) {
      // Close letter
      setIsOpen(false);
      onLetterOpenChange?.(false);
      return;
    }

    setSealBroken(true);
    setEnvelopeBirds(true);

    setTimeout(() => {
      setIsOpen(true);
      onLetterOpenChange?.(true);
    }, 450);

    // Turn off burst birds after animation
    setTimeout(() => {
      setEnvelopeBirds(false);
    }, 2800);
  };

  // Typewriter effect for paragraphs when letter opens
  useEffect(() => {
    if (!isOpen) {
      setDisplayedParagraphs([]);
      return;
    }

    const fullParagraphs = siteConfig.loveLetter.paragraphs;
    let pIdx = 0;

    const interval = setInterval(() => {
      if (pIdx < fullParagraphs.length) {
        setDisplayedParagraphs((prev) => [...prev, fullParagraphs[pIdx]]);
        pIdx++;
      } else {
        clearInterval(interval);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [isOpen]);

  return (
    <section id="letter" className="relative py-20 px-4 max-w-3xl mx-auto text-center">
      {/* SECTION HEADER */}
      <div className="mb-10">
        <div className="font-courier text-xs tracking-[0.28em] text-[#7f5700] uppercase font-bold mb-1">
          CONFIDENTIAL DISPATCH
        </div>
        <h2 className="font-bodoni text-3xl sm:text-4xl font-bold text-[#4e051a] tracking-tight">
          {siteConfig.loveLetter.heading}
        </h2>
        <p className="font-newsreader italic text-[#544244] text-base mt-1">
          {siteConfig.loveLetter.subheading}
        </p>
      </div>

      {/* BIRDS FLYING OUT OF THE ENVELOPE UPON BREAKING SEAL */}
      {envelopeBirds && (
        <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute left-1/2 bottom-1/2 will-change-transform"
              style={{
                animation: `flyOutOfEnvelope 2.4s ease-out ${i * 0.25}s forwards`,
              }}
            >
              <BirdGraphic isDove={true} size={28 + i * 4} />
            </div>
          ))}
        </div>
      )}

      {/* VINTAGE ENVELOPE CARD */}
      <div className="relative mx-auto max-w-lg bg-[#ffe9e2] rounded-md border-2 border-[#d49b35]/60 p-6 sm:p-8 retro-shadow-lg overflow-hidden transition-all duration-500">
        {/* Postmark Stamp */}
        <div className="absolute top-4 right-4 w-18 h-18 sm:w-20 sm:h-20 rounded-full border border-dashed border-[#544244]/60 flex flex-col items-center justify-center text-center rotate-12 pointer-events-none opacity-85">
          <span className="font-courier text-[9px] uppercase tracking-wider text-[#544244] font-bold">
            {siteConfig.loveLetter.postmark.split(' ')[0]}
          </span>
          <span className="font-bodoni text-sm font-bold text-[#4e051a]">
            1974
          </span>
          <span className="font-courier text-[8px] uppercase tracking-wider text-[#544244]">
            BOMBAY
          </span>
        </div>

        {/* Envelope Address */}
        <div className="text-left font-courier text-xs sm:text-sm text-[#2a170f] border-b border-[#2a170f]/15 pb-4 mb-6 pr-20">
          <div className="text-[10px] tracking-widest text-[#7f5700] uppercase font-bold">
            TO: {siteConfig.loveLetter.envelopeTo}
          </div>
          <div className="font-semibold mt-1">
            {siteConfig.loveLetter.envelopeAddress}
          </div>
        </div>

        {/* WAX SEAL MEDALLION BUTTON */}
        {!isOpen ? (
          <div className="my-6">
            <button
              onClick={handleBreakSeal}
              className={`relative inline-flex flex-col items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#4e051a] border-4 border-[#fcbf55] text-[#fff8f6] retro-shadow-seal transition-transform hover:scale-105 active:scale-95 group ${
                sealBroken ? 'scale-110 rotate-6 opacity-80' : ''
              }`}
              aria-label="Break Wax Seal"
            >
              <span className="font-bodoni text-xl sm:text-2xl font-bold tracking-widest text-[#fcbf55] group-hover:drop-shadow-md">
                {siteConfig.loveLetter.sealText}
              </span>
              <span className="font-courier text-[9px] uppercase tracking-wider text-[#ffd9dd] mt-0.5">
                {siteConfig.loveLetter.sealSubtext}
              </span>

              {/* Wax Seal Organic Rim Effect */}
              <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none" />
            </button>

            <p className="font-newsreader italic text-xs text-[#7f5700] mt-3">
              (Tap the crimson seal to open)
            </p>
          </div>
        ) : (
          /* SLID OUT HANDWRITTEN LETTER */
          <div className="relative bg-[#fff8f6] rounded border border-[#d49b35]/40 p-6 sm:p-8 text-left retro-shadow-sm animate-fade-in my-2">
            {/* Airmail top accent */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#6b1d2f] via-[#fcbf55] to-[#4a7c7a] rounded-t mb-5" />

            {/* Letter Body */}
            <div className="space-y-4 font-newsreader text-base sm:text-lg text-[#2a170f] leading-relaxed">
              {displayedParagraphs.map((para, i) => (
                <p key={i} className={i === displayedParagraphs.length - 1 ? 'font-bodoni font-bold text-[#4e051a]' : ''}>
                  {para}
                </p>
              ))}
            </div>

            {/* Close Button */}
            <div className="mt-8 pt-4 border-t border-[#2a170f]/15 text-center">
              <button
                onClick={handleBreakSeal}
                className="px-4 py-2 rounded bg-[#ffe9e2] hover:bg-[#ffdbce] text-[#4e051a] font-courier text-xs uppercase tracking-widest border border-[#d49b35] transition-colors"
              >
                ✉ Fold & Return to Envelope
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes flyOutOfEnvelope {
          0% {
            transform: translate(-50%, 0) scale(0.3);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          50% {
            transform: translate(calc(-50% + 60px), -180px) scale(0.9);
          }
          100% {
            transform: translate(calc(-50% + 140px), -360px) scale(1.2);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};
