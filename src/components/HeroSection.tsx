import React, { useState, useEffect } from 'react';
import { siteConfig } from '../data';
import { BirdGraphic } from './BirdsOverlay';
import { useCustomPhotos } from '../utils/photoStore';

interface HeroSectionProps {
  onPlayMusic?: () => void;
  isPlaying?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onPlayMusic, isPlaying }) => {
  const { getPhoto } = useCustomPhotos();
  const heroPhotoSrc = getPhoto('hero', siteConfig.couple.heroImage);
  const [typedTitle, setTypedTitle] = useState<string>('');
  const fullTitle = `${siteConfig.couple.bride.toUpperCase()} & ${siteConfig.couple.groom.toUpperCase()}`;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullTitle.length) {
        setTypedTitle(fullTitle.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 70);

    return () => clearInterval(interval);
  }, [fullTitle]);

  return (
    <header id="home" className="relative pt-6 pb-16 px-4 max-w-4xl mx-auto text-center overflow-hidden">
      {/* Wave Flock of Birds flying directly across the Hero Title */}
      <div className="absolute top-12 left-0 right-0 pointer-events-none h-24 overflow-hidden z-20">
        <div className="relative w-full h-full">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute will-change-transform"
              style={{
                top: `${15 + i * 16}px`,
                animation: `heroWaveFlight 12s linear ${i * 0.4}s infinite`,
              }}
            >
              <BirdGraphic isDove={i % 2 === 0} size={22 + i * 3} />
            </div>
          ))}
        </div>
      </div>

      {/* TOP HEADER BAR (as seen in Stitch design) */}
      <div className="flex items-center justify-between border-b border-[#2a170f]/15 pb-3 mb-8 px-2 text-xs font-courier text-[#544244]">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#6b1d2f]" />
          <span className="font-bold tracking-wider text-[#2a170f]">Home</span>
        </div>
        <div className="hidden sm:block uppercase tracking-[0.2em] text-[#7f5700] text-[11px]">
          {siteConfig.couple.credits.year} • {siteConfig.couple.credits.premiereLabel}
        </div>
        <button
          onClick={onPlayMusic}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#ffe9e2] hover:bg-[#ffdbce] text-[#6b1d2f] transition-colors border border-[#dac0c2] cursor-pointer"
        >
          <span>♪</span>
          <span className="text-[11px] font-newsreader italic">
            {isPlaying ? 'Playing Melody' : 'Vintage Melody'}
          </span>
        </button>
      </div>

      {/* GRAND EASTMAN COLOR BADGE */}
      <div className="inline-flex items-center gap-3 px-4 py-1 rounded-sm bg-[#fcbf55]/30 border border-[#d49b35]/60 mb-4 shadow-2xs">
        <span className="text-[#7f5700] text-xs">✈</span>
        <span className="font-courier text-[11px] md:text-xs tracking-[0.25em] text-[#724d00] font-bold uppercase">
          GRAND EASTMAN COLOR
        </span>
        <span className="text-[#7f5700] text-xs">✈</span>
      </div>

      {/* PRODUCTION HOUSE */}
      <div className="font-courier text-xs tracking-[0.28em] text-[#544244] uppercase mb-3">
        {siteConfig.couple.productionHouse}
      </div>

      {/* BIG MAIN TITLE WITH TYPEWRITER EFFECT */}
      <h1 className="font-bodoni text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#4e051a] drop-shadow-[2px_2px_0px_rgba(212,155,53,0.4)] min-h-[1.3em]">
        {typedTitle}
        <span className="inline-block w-1 h-8 md:h-12 bg-[#6b1d2f] ml-1 animate-pulse align-middle" />
      </h1>

      {/* ROMANTIC TAGLINE */}
      <div className="flex items-center justify-center gap-3 my-4">
        <span className="text-[#c47b7b] text-base">♡</span>
        <p className="font-newsreader italic text-lg sm:text-xl text-[#2a170f]">
          "{siteConfig.couple.heroTagline}"
        </p>
        <span className="text-[#c47b7b] text-base">♡</span>
      </div>

      {/* VINTAGE RETRO BOLLYWOOD POSTER CARD */}
      <div className="relative mx-auto max-w-sm sm:max-w-md mt-6 p-3 sm:p-4 bg-[#ffe9e2] rounded-md border border-[#dac0c2] retro-shadow-lg transition-transform hover:scale-[1.01] duration-300">
        {/* CERTIFIED HIT 1970's SEAL */}
        <div className="absolute -top-3 -right-3 z-20 w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#4e051a] border-2 border-[#fcbf55] flex flex-col items-center justify-center text-center shadow-lg transform rotate-12">
          <span className="font-courier text-[8px] uppercase tracking-wider text-[#fcbf55] font-bold">
            CERTIFIED
          </span>
          <span className="font-bodoni text-sm sm:text-base font-bold text-[#fff8f6] leading-none">
            HIT
          </span>
          <span className="font-courier text-[8px] text-[#fcbf55]">
            1970's
          </span>
        </div>

        {/* POSTER INNER CONTAINER WITH SUNBURST & PHOTO */}
        <div className="relative rounded overflow-hidden border border-[#2a170f]/20 bg-[#f8d2c4] aspect-[3/4] flex items-center justify-center">
          {/* Sunburst radial beams */}
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: `repeating-conic-gradient(from 0deg, #d49b35 0deg 15deg, transparent 15deg 30deg)`,
            }}
          />

          {/* Real Retro Photo */}
          <img
            src={heroPhotoSrc}
            alt="Shivani and Harshvardhan Engagement"
            className="w-full h-full object-cover relative z-10 sepia-[0.15] contrast-105"
            loading="eager"
          />

          {/* Vignette Overlay on Photo */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#2a170f]/90 via-transparent to-black/20 pointer-events-none" />

          {/* Starring Together Foreground Banner */}
          <div className="absolute bottom-4 left-4 right-4 z-20 text-center text-[#fff8f6]">
            <p className="font-courier text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#fcbf55] font-semibold mb-1">
              STARRING TOGETHER FOREVER
            </p>
            <h2 className="font-bodoni text-xl sm:text-2xl font-bold tracking-wide drop-shadow-md">
              {siteConfig.couple.heroBanner}
            </h2>
          </div>
        </div>

        {/* BOTTOM CREDITS SECTION (R.D. BURMAN, DESTINY, TWO FAMILIES) */}
        <div className="grid grid-cols-3 gap-2 pt-4 px-1 text-center font-courier text-[10px] sm:text-xs text-[#544244] border-t border-[#2a170f]/15 mt-3">
          <div>
            <div className="text-[9px] uppercase tracking-wider text-[#7f5700]">MUSIC</div>
            <div className="font-semibold text-[#2a170f]">{siteConfig.couple.credits.music}</div>
          </div>
          <div>
            <div className="text-[9px] uppercase tracking-wider text-[#7f5700]">DIRECTED BY</div>
            <div className="font-semibold text-[#2a170f]">{siteConfig.couple.credits.directedBy}</div>
          </div>
          <div>
            <div className="text-[9px] uppercase tracking-wider text-[#7f5700]">PRODUCED BY</div>
            <div className="font-semibold text-[#2a170f]">{siteConfig.couple.credits.producedBy}</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes heroWaveFlight {
          0% {
            transform: translateX(-10vw) translateY(0px);
            opacity: 0;
          }
          10% {
            opacity: 0.85;
          }
          30% {
            transform: translateX(30vw) translateY(-18px);
          }
          60% {
            transform: translateX(65vw) translateY(12px);
          }
          90% {
            opacity: 0.85;
          }
          100% {
            transform: translateX(110vw) translateY(-8px);
            opacity: 0;
          }
        }
      `}</style>
    </header>
  );
};
