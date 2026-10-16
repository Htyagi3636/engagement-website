import React, { useState, useEffect } from 'react';
import { siteConfig } from '../data';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const FlipCard: React.FC<{ value: number; label: string; isHighlighted?: boolean }> = ({
  value,
  label,
  isHighlighted = false,
}) => {
  const [prevValue, setPrevValue] = useState<number>(value);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);

  useEffect(() => {
    if (value !== prevValue) {
      setIsFlipping(true);
      const timer = setTimeout(() => {
        setPrevValue(value);
        setIsFlipping(false);
      }, 550);
      return () => clearTimeout(timer);
    }
  }, [value, prevValue]);

  const formattedValue = String(value).padStart(2, '0');
  const formattedPrev = String(prevValue).padStart(2, '0');

  return (
    <div className="flex flex-col items-center">
      {/* MECHANICAL SPLIT-FLAP CARD */}
      <div
        className={`relative w-18 h-24 sm:w-24 sm:h-32 md:w-28 md:h-36 rounded-md retro-shadow border-2 ${
          isHighlighted
            ? 'bg-[#d49b35] text-[#2a170f] border-[#fcbf55]'
            : 'bg-[#4e051a] text-[#fff8f6] border-[#380410]'
        } flex items-center justify-center font-bodoni text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight overflow-hidden perspective-1000 select-none`}
      >
        {/* Horizontal Split Line */}
        <div className="absolute inset-x-0 top-1/2 h-0.5 bg-black/40 z-30 shadow-xs" />

        {/* Side Split Hinges */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-3 bg-black/60 rounded-r-xs z-30" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-3 bg-black/60 rounded-l-xs z-30" />

        {/* Number Display */}
        <div className={`relative z-10 ${isFlipping ? 'animate-flip' : ''}`}>
          {isFlipping ? formattedPrev : formattedValue}
        </div>

        {/* Subtle split card gradient shading */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/30 pointer-events-none" />
      </div>

      {/* UNIT LABEL */}
      <span className="font-courier text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#7f5700] font-bold mt-3">
        {label}
      </span>
    </div>
  );
};

export const FlipCountdownSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(siteConfig.wedding.targetIsoDate).getTime();

    const calculate = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="countdown" className="relative py-20 px-4 max-w-4xl mx-auto text-center">
      {/* SECTION HEADER */}
      <div className="mb-10">
        <div className="font-courier text-xs tracking-[0.28em] text-[#7f5700] uppercase font-bold mb-1">
          {siteConfig.wedding.shubhMuhuratLabel}
        </div>
        <h2 className="font-bodoni text-3xl sm:text-4xl md:text-5xl font-bold text-[#4e051a] tracking-tight">
          Countdown To The Wedding
        </h2>

        {/* DATE BADGE */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded bg-[#fcbf55]/30 border border-[#d49b35] text-[#724d00] font-courier text-xs sm:text-sm uppercase tracking-widest my-3 shadow-2xs">
          <span>📅</span>
          <span>{siteConfig.wedding.displayDate}</span>
        </div>

        <p className="font-newsreader italic text-[#544244] text-base max-w-md mx-auto">
          {siteConfig.wedding.countdownSubtitle}
        </p>
      </div>

      {/* MECHANICAL FLIP CLOCK CONTAINER */}
      <div className="flex justify-center items-center gap-3 sm:gap-6 md:gap-8 my-8">
        <FlipCard value={timeLeft.days} label="DAYS" />
        <FlipCard value={timeLeft.hours} label="HOURS" />
        <FlipCard value={timeLeft.minutes} label="MINS" />
        <FlipCard value={timeLeft.seconds} label="SECS" isHighlighted={true} />
      </div>
    </section>
  );
};
