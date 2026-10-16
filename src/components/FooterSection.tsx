import React from 'react';
import { siteConfig } from '../data';
import { BirdGraphic } from './BirdsOverlay';

interface FooterSectionProps {
  onPlayMusic: () => void;
  isPlaying: boolean;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onPlayMusic, isPlaying }) => {
  return (
    <footer className="relative pt-16 pb-32 px-4 bg-[#fff8f6] border-t-2 border-[#2a170f]/15 text-center overflow-hidden">
      {/* Birds flying away into the distance */}
      <div className="relative max-w-sm mx-auto h-20 overflow-hidden pointer-events-none mb-4">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute will-change-transform"
            style={{
              left: `${30 + i * 22}%`,
              top: '40px',
              animation: `footerBirdsFlight 9s ease-out ${i * 0.8}s infinite`,
            }}
          >
            <BirdGraphic isDove={true} size={20 - i * 3} />
          </div>
        ))}
      </div>

      {/* CASSETTE / TAPE DECK GRAPHIC (Matching Stitch design) */}
      <div className="relative mx-auto max-w-xs bg-[#241c19] text-[#fcbf55] rounded-xl border-4 border-[#3d2c26] p-4 sm:p-5 retro-shadow mb-6">
        {/* Cassette Header */}
        <div className="flex justify-between items-center text-[10px] font-courier uppercase tracking-widest border-b border-white/10 pb-2 mb-3 text-[#ffdeae]">
          <span>70MM STEREOPHONIC</span>
          <span className="px-1.5 py-0.5 rounded bg-[#fcbf55] text-[#281900] font-bold">SIDE A</span>
        </div>

        {/* Cassette Reel Windows */}
        <div className="bg-[#150f0c] rounded-md p-3 flex items-center justify-around border border-white/15 my-2">
          {/* Left Reel */}
          <div className="relative w-9 h-9 rounded-full bg-[#3d2c26] border-2 border-[#fcbf55] flex items-center justify-center animate-[spin_6s_linear_infinite]">
            <div className="w-2.5 h-2.5 bg-[#150f0c] rounded-full" />
            <div className="absolute w-6 h-0.5 bg-[#fcbf55]/50" />
          </div>

          <div className="text-[10px] font-courier text-[#fcbf55] tracking-widest text-center">
            R.D. TEPE
          </div>

          {/* Right Reel */}
          <div className="relative w-9 h-9 rounded-full bg-[#3d2c26] border-2 border-[#fcbf55] flex items-center justify-center animate-[spin_6s_linear_infinite]">
            <div className="w-2.5 h-2.5 bg-[#150f0c] rounded-full" />
            <div className="absolute w-6 h-0.5 bg-[#fcbf55]/50" />
          </div>
        </div>

        {/* Cassette Title Label */}
        <div className="font-courier text-[11px] text-[#ffd9dd] tracking-wider mt-3 uppercase">
          "SHIVANI & HARSHVARDHAN • PREM SHOW"
        </div>
      </div>

      {/* PLAY/PAUSE MELODY BUTTON */}
      <button
        onClick={onPlayMusic}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#4e051a] hover:bg-[#6b1d2f] text-[#fff8f6] font-newsreader italic text-base border-2 border-[#d49b35] retro-shadow transition-transform hover:scale-105 active:scale-95 mb-8 cursor-pointer"
      >
        <span>{isPlaying ? '❚❚' : '▶'}</span>
        <span>{isPlaying ? 'Playing 1970s Melody / Chime' : 'Play 1970s Melody / Chime'}</span>
      </button>

      {/* THE END ... IS JUST THE BEGINNING */}
      <div className="max-w-md mx-auto space-y-2 mt-4">
        <h3 className="font-bodoni text-3xl sm:text-4xl font-bold tracking-widest text-[#4e051a]">
          THE END...
        </h3>
        <p className="font-newsreader italic text-lg sm:text-xl text-[#7f5700]">
          Is Just The Beginning of Our Forever.
        </p>

        {/* MONOGRAM BADGE */}
        <div className="pt-4">
          <div className="inline-block px-4 py-1.5 rounded-sm bg-[#fcbf55]/20 border border-[#d49b35]/60 text-[10px] sm:text-xs font-courier text-[#724d00] tracking-[0.2em] uppercase">
            {siteConfig.couple.stampCode}
          </div>
        </div>

        {/* COUPLE MONOGRAM STAMP */}
        <div className="pt-4 text-[#6b1d2f] text-2xl font-bodoni font-bold">
          {siteConfig.couple.monogram}
        </div>
      </div>

      <style>{`
        @keyframes footerBirdsFlight {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0.9;
          }
          100% {
            transform: translate(60px, -60px) scale(0.2);
            opacity: 0;
          }
        }
      `}</style>
    </footer>
  );
};
