import React, { useState } from 'react';
import { siteConfig } from '../data';
import { BirdGraphic } from './BirdsOverlay';

interface LoveLetterSectionProps {
  onLetterOpenChange?: (isOpen: boolean) => void;
}

export const LoveLetterSection: React.FC<LoveLetterSectionProps> = ({ onLetterOpenChange }) => {
  const [isOpening, setIsOpening] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showBirds, setShowBirds] = useState<boolean>(false);

  const paragraphs = siteConfig.loveLetter.paragraphs;
  const greeting = paragraphs[0];
  const signature = paragraphs[paragraphs.length - 1];
  const closing = paragraphs[paragraphs.length - 2];
  const body = paragraphs.slice(1, paragraphs.length - 2);

  const openLetter = () => {
    if (isOpening || isOpen) return;
    setIsOpening(true);
    setShowBirds(true);
    setTimeout(() => {
      setIsOpen(true);
      onLetterOpenChange?.(true);
    }, 900);
    setTimeout(() => setShowBirds(false), 2800);
  };

  const closeLetter = () => {
    setIsOpen(false);
    setIsOpening(false);
    onLetterOpenChange?.(false);
    document.getElementById('letter')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="letter" className="relative py-20 px-4 max-w-3xl mx-auto text-center">
      {/* SECTION HEADER */}
      <div className="mb-10">
        <div className="font-courier text-xs tracking-[0.3em] text-[#7f5700] uppercase font-semibold mb-2">
          A Note For You
        </div>
        <h2 className="font-bodoni text-3xl sm:text-4xl font-bold text-[#4e051a] tracking-tight">
          {siteConfig.loveLetter.heading}
        </h2>
        <div className="flex items-center justify-center gap-3 mt-4" aria-hidden="true">
          <span className="h-px w-12 bg-[#d49b35]/60" />
          <span className="text-[#9a4152] text-sm">♥</span>
          <span className="h-px w-12 bg-[#d49b35]/60" />
        </div>
      </div>

      {/* DOVES FLYING OUT WHEN THE SEAL OPENS */}
      {showBirds && (
        <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 will-change-transform"
              style={{ animation: `letterDoves 2.4s ease-out ${i * 0.2}s forwards`, opacity: 0 }}
            >
              <BirdGraphic isDove={true} size={26 + i * 4} />
            </div>
          ))}
        </div>
      )}

      {!isOpen ? (
        /* ================= CLOSED ENVELOPE ================= */
        <div className="flex flex-col items-center">
          <button
            onClick={openLetter}
            aria-label="Open the letter"
            className="group relative w-full max-w-md aspect-[3/2] rounded-xl overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#d49b35]/50"
            style={{
              background: 'linear-gradient(160deg, #fbeee5 0%, #f3dccd 100%)',
              boxShadow: '0 18px 40px -18px rgba(78,5,26,0.45), 0 2px 6px rgba(78,5,26,0.08)',
              perspective: '900px',
            }}
          >
            {/* Lower pocket folds */}
            <div
              className="absolute inset-0"
              style={{ background: '#f1d6c5', clipPath: 'polygon(0 100%, 50% 48%, 100% 100%)' }}
            />
            <div
              className="absolute inset-0"
              style={{ background: '#f5e0d3', clipPath: 'polygon(0 0, 50% 52%, 0 100%)' }}
            />
            <div
              className="absolute inset-0"
              style={{ background: '#f5e0d3', clipPath: 'polygon(100% 0, 50% 52%, 100% 100%)' }}
            />

            {/* Top flap */}
            <div
              className="absolute inset-x-0 top-0 h-[58%] origin-top transition-transform duration-700 ease-in-out"
              style={{
                background: 'linear-gradient(180deg, #ecc9b6 0%, #e6bea9 100%)',
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                transform: isOpening ? 'rotateX(180deg)' : 'rotateX(0deg)',
                filter: 'drop-shadow(0 3px 3px rgba(78,5,26,0.12))',
                zIndex: 2,
              }}
            />

            {/* "For Shivani" */}
            <div className="absolute inset-x-0 bottom-[6%] z-[1] font-script text-2xl sm:text-4xl text-[#6b1d2f]/85">
              For {siteConfig.couple.bride}
            </div>

            {/* Wax seal */}
            <div
              className={`absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 z-[3] transition-all duration-500 ${
                isOpening ? 'scale-50 opacity-0' : 'group-hover:scale-105'
              }`}
            >
              <div
                className="w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-full flex items-center justify-center border-2 border-[#d49b35]"
                style={{
                  background: 'radial-gradient(circle at 35% 30%, #8b2a40 0%, #6b1d2f 45%, #4e051a 100%)',
                  boxShadow: '0 6px 14px rgba(78,5,26,0.45), inset 0 2px 4px rgba(255,255,255,0.15)',
                }}
              >
                <span className="font-bodoni text-xl sm:text-2xl font-bold text-[#fcbf55] tracking-wide">
                  {siteConfig.loveLetter.sealText}
                </span>
              </div>
            </div>
          </button>

          <p className="font-newsreader italic text-sm text-[#7f5700] mt-5">
            Tap the seal to open the letter
          </p>
        </div>
      ) : (
        /* ================= OPEN LETTER ================= */
        <article
          className="relative mx-auto max-w-xl text-left rounded-xl px-7 py-10 sm:px-12 sm:py-12 letter-paper-in"
          style={{
            background: 'linear-gradient(180deg, #fffaf6 0%, #fdf3ec 100%)',
            border: '1px solid rgba(212,155,53,0.35)',
            boxShadow: '0 22px 50px -24px rgba(78,5,26,0.45), 0 2px 6px rgba(78,5,26,0.06)',
          }}
        >
          {/* Small seal accent */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center border-2 border-[#d49b35]"
            style={{ background: 'radial-gradient(circle at 35% 30%, #8b2a40 0%, #6b1d2f 45%, #4e051a 100%)' }}
            aria-hidden="true"
          >
            <span className="text-[#fcbf55] text-lg">♥</span>
          </div>

          <p className="font-script text-4xl sm:text-5xl text-[#6b1d2f] mb-6 letter-line" style={{ animationDelay: '0.1s' }}>
            {greeting}
          </p>

          <div className="space-y-5 font-newsreader text-[17px] sm:text-lg leading-8 text-[#3b2a22]">
            {body.map((para, i) => (
              <p key={i} className="letter-line" style={{ animationDelay: `${0.35 + i * 0.3}s` }}>
                {para}
              </p>
            ))}
          </div>

          <div className="mt-10 text-right">
            <p
              className="font-newsreader italic text-base text-[#544244] letter-line"
              style={{ animationDelay: `${0.35 + body.length * 0.3}s` }}
            >
              {closing}
            </p>
            <p
              className="font-script text-4xl sm:text-5xl text-[#6b1d2f] mt-2 letter-line"
              style={{ animationDelay: `${0.6 + body.length * 0.3}s` }}
            >
              {signature}
            </p>
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={closeLetter}
              className="font-courier text-xs uppercase tracking-[0.25em] text-[#7f5700] hover:text-[#4e051a] border-b border-[#d49b35]/60 pb-1 transition-colors"
            >
              Close Letter
            </button>
          </div>
        </article>
      )}

      <style>{`
        @keyframes letterDoves {
          0% { transform: translate(-50%, 0) scale(0.3); opacity: 0; }
          15% { opacity: 1; }
          100% { transform: translate(calc(-50% + 140px), -320px) scale(1.1); opacity: 0; }
        }
        @keyframes letterPaperIn {
          0% { opacity: 0; transform: translateY(30px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes letterLineIn {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .letter-paper-in { animation: letterPaperIn 0.7s ease-out both; }
        .letter-line { opacity: 0; animation: letterLineIn 0.8s ease-out forwards; }
        @media (prefers-reduced-motion: reduce) {
          .letter-paper-in, .letter-line { animation: none; opacity: 1; }
        }
      `}</style>
    </section>
  );
};
