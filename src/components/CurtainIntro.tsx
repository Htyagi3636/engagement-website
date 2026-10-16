import React, { useState, useEffect } from 'react';

interface CurtainIntroProps {
  onStartShow: () => void;
  isOpen: boolean;
}

export const CurtainIntro: React.FC<CurtainIntroProps> = ({ onStartShow, isOpen }) => {
  const [count, setCount] = useState<number>(5);
  const [countdownFinished, setCountdownFinished] = useState<boolean>(false);
  const [curtainAnimationDone, setCurtainAnimationDone] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      // If already open, hide overlay
      const timer = setTimeout(() => setCurtainAnimationDone(true), 1200);
      return () => clearTimeout(timer);
    }

    if (count > 1) {
      const timer = setTimeout(() => {
        setCount((prev) => prev - 1);
      }, 750);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setCountdownFinished(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [count, isOpen]);

  const handleStart = () => {
    onStartShow();
    setTimeout(() => {
      setCurtainAnimationDone(true);
    }, 1400);
  };

  if (curtainAnimationDone && isOpen) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden flex items-center justify-center transition-opacity duration-700 ${
        isOpen ? 'pointer-events-none' : 'pointer-events-auto'
      }`}
    >
      {/* LEFT VELVET CURTAIN */}
      <div
        className={`absolute top-0 left-0 bottom-0 w-1/2 bg-[#4a121e] shadow-2xl transition-transform duration-1000 ease-in-out z-40 border-r-4 border-[#d49b35] ${
          isOpen ? '-translate-x-full' : 'translate-x-0'
        }`}
        style={{
          backgroundImage: `
            repeating-linear-gradient(90deg, #3d0c18 0px, #6b1d2f 30px, #4a121e 60px, #28060f 90px),
            radial-gradient(ellipse at 50% 50%, rgba(212,155,53,0.15) 0%, rgba(0,0,0,0.4) 100%)
          `,
        }}
      >
        {/* Golden Tassel & Fringe Along Rim */}
        <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-r from-transparent to-[#d49b35]/40 flex flex-col justify-around py-4 opacity-80">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="w-2.5 h-1.5 bg-[#fcbf55] rounded-l-sm shadow-xs" />
          ))}
        </div>
      </div>

      {/* RIGHT VELVET CURTAIN */}
      <div
        className={`absolute top-0 right-0 bottom-0 w-1/2 bg-[#4a121e] shadow-2xl transition-transform duration-1000 ease-in-out z-40 border-l-4 border-[#d49b35] ${
          isOpen ? 'translate-x-full' : 'translate-x-0'
        }`}
        style={{
          backgroundImage: `
            repeating-linear-gradient(90deg, #28060f 0px, #4a121e 30px, #6b1d2f 60px, #3d0c18 90px),
            radial-gradient(ellipse at 50% 50%, rgba(212,155,53,0.15) 0%, rgba(0,0,0,0.4) 100%)
          `,
        }}
      >
        {/* Golden Tassel & Fringe Along Rim */}
        <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-l from-transparent to-[#d49b35]/40 flex flex-col justify-around py-4 opacity-80">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="w-2.5 h-1.5 bg-[#fcbf55] rounded-r-sm shadow-xs self-start" />
          ))}
        </div>
      </div>

      {/* CENTER STAGE: VINTAGE PROJECTOR COUNTDOWN & START BUTTON */}
      <div
        className={`relative z-50 flex flex-col items-center justify-center p-6 text-center max-w-md transition-all duration-500 ${
          isOpen ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        {!countdownFinished ? (
          /* Old Film-Projector Countdown Circle */
          <div className="relative flex flex-col items-center">
            {/* Film Countdown Dial */}
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full border-4 border-[#d49b35] flex items-center justify-center bg-[#2a170f]/90 shadow-[0_0_30px_rgba(212,155,53,0.3)] overflow-hidden">
              {/* Rotating Projector Crosshairs */}
              <div className="absolute inset-0 flex items-center justify-center animate-[spin_1.5s_linear_infinite] opacity-35">
                <div className="w-full h-0.5 bg-[#fcbf55]" />
                <div className="absolute h-full w-0.5 bg-[#fcbf55]" />
              </div>

              {/* Inner concentric ring */}
              <div className="absolute w-36 h-36 md:w-44 md:h-44 rounded-full border border-[#fcbf55]/40" />
              <div className="absolute w-24 h-24 md:w-28 md:h-28 rounded-full border border-[#fcbf55]/30" />

              {/* Big Countdown Number */}
              <span className="font-bodoni text-7xl md:text-8xl font-bold text-[#fcbf55] drop-shadow-[0_2px_10px_rgba(212,155,53,0.6)] animate-pulse">
                {count}
              </span>

              {/* Film grain flicker inside circle */}
              <div className="absolute inset-0 bg-[#fcbf55]/10 mix-blend-overlay animate-[ping_0.5s_cubic-bezier(0,0,0.2,1)_infinite] opacity-20 pointer-events-none" />
            </div>

            <p className="font-courier text-[#fcbf55] text-xs uppercase tracking-[0.25em] mt-5">
              1970 35MM EASTMANCOLOR LEADER
            </p>
          </div>
        ) : (
          /* Ready Button: "Tap to Start the Show ♥" */
          <div className="bg-[#2a170f]/95 border-2 border-[#d49b35] rounded-xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.6)] max-w-sm animate-fade-in">
            <div className="w-10 h-10 mx-auto mb-3 rounded-full border border-[#d49b35]/60 flex items-center justify-center text-[#d49b35] text-sm">
              70mm
            </div>

            <h2 className="font-bodoni text-2xl md:text-3xl font-bold text-[#fff8f6] tracking-wide mb-1">
              Cinema Premiere
            </h2>
            <p className="font-newsreader italic text-[#fcbf55] text-base mb-6">
              "Shivani & Harshvardhan — Ek Prem Kahani"
            </p>

            <button
              onClick={handleStart}
              className="w-full py-3.5 px-6 rounded-md bg-[#6b1d2f] hover:bg-[#8b233a] active:translate-y-0.5 text-[#fff8f6] font-newsreader italic text-lg font-semibold tracking-wide border border-[#d49b35] shadow-[0_4px_15px_rgba(107,29,47,0.7)] transition-all flex items-center justify-center gap-2 group"
            >
              <span>Tap to Start the Show</span>
              <span className="text-[#fcbf55] group-hover:scale-125 transition-transform">♥</span>
            </button>

            <p className="font-courier text-[11px] text-[#ffdbce]/60 mt-4 tracking-wider uppercase">
              Curtains Open • Vintage Melody Plays
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
