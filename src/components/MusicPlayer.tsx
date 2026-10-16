import React, { useEffect, useRef, useState, useCallback } from 'react';
import { musicPlaylist, SongTrack } from '../data';

interface MusicPlayerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  isLetterOpen: boolean;
  shouldStartAudio?: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  isPlaying,
  onTogglePlay,
  isLetterOpen,
}) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentSong: SongTrack = musicPlaylist[currentTrackIndex] || musicPlaylist[0];

  // Next Track (loops back to the first song)
  const handleNextTrack = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev + 1) % musicPlaylist.length);
  }, []);

  // Load the song file when the track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong?.audioSrc) return;
    audio.src = currentSong.audioSrc;
    audio.load();
    if (isPlaying) {
      audio.play().catch((err) => console.warn('Playback error:', err));
    }
  }, [currentTrackIndex]);

  // Play / pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch((err) => console.warn('Playback error:', err));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // Smooth volume fade-in, and softer volume while the love letter is open
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const target = isMuted ? 0 : isLetterOpen ? 0.22 : 0.6;
    const interval = setInterval(() => {
      const diff = target - audio.volume;
      if (Math.abs(diff) < 0.03) {
        audio.volume = target;
        clearInterval(interval);
        return;
      }
      audio.volume = Math.min(1, Math.max(0, audio.volume + (diff > 0 ? 0.03 : -0.03)));
    }, 80);
    return () => clearInterval(interval);
  }, [isPlaying, isMuted, isLetterOpen]);

  const handleToggleMute = () => setIsMuted((prev) => !prev);

  return (
    <>
      {/* Hidden audio element that plays the song file */}
      <audio
        ref={audioRef}
        src={currentSong?.audioSrc}
        preload="auto"
        onEnded={() => {
          if (musicPlaylist.length > 1) {
            handleNextTrack();
          } else if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(() => {});
          }
        }}
        onLoadedMetadata={(e) => {
          e.currentTarget.volume = 0;
        }}
        className="hidden"
      />

      {/* FLOATING VINTAGE GRAMOPHONE / VINYL PLAYER */}
      <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 select-none">
        <div className="flex items-center gap-2">
          {/* EXPANDABLE RADIO DISPLAY TICKER */}
          {isExpanded && (
            <div className="bg-[#2a170f]/95 text-[#fcbf55] border-2 border-[#d49b35] rounded-md px-3.5 py-2 retro-shadow-sm flex flex-col gap-1.5 max-w-[240px] sm:max-w-xs animate-fade-in backdrop-blur-md">
              <div className="flex items-center justify-between text-[10px] font-courier text-[#ffd9dd] border-b border-[#fcbf55]/30 pb-1">
                <span className="flex items-center gap-1">
                  <span className={`inline-block w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-emerald-400 animate-ping' : 'bg-red-400'}`} />
                  {isPlaying ? 'NOW PLAYING' : 'PAUSED'}
                </span>
                <span className="text-[#fcbf55]">R.D. BURMAN</span>
              </div>

              {/* Marquee Song Title */}
              <div className="overflow-hidden whitespace-nowrap text-xs font-courier font-bold text-[#fff8f6]">
                <div className="inline-block animate-marquee">
                  ♪ {currentSong.title} — ({currentSong.film}, {currentSong.year}) &nbsp;&nbsp;&nbsp; ♪ {currentSong.title}
                </div>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center justify-between pt-1 border-t border-[#fcbf55]/20 font-courier text-xs">
                <button
                  onClick={onTogglePlay}
                  className="px-2 py-0.5 rounded bg-[#6b1d2f] hover:bg-[#8b233a] text-[#fff8f6] font-bold"
                >
                  {isPlaying ? '❚❚' : '▶'}
                </button>
                <button
                  onClick={handleNextTrack}
                  className="px-2 py-0.5 rounded bg-[#4e051a] hover:bg-[#6b1d2f] text-[#fcbf55]"
                  title="Next Track"
                >
                  ⏭
                </button>
                <button
                  onClick={handleToggleMute}
                  className="px-2 py-0.5 rounded bg-[#4e051a] hover:bg-[#6b1d2f] text-[#fcbf55]"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? '🔇' : '🔊'}
                </button>
              </div>
            </div>
          )}

          {/* SPINNING VINYL RECORD BUTTON */}
          <div className="relative group">
            <button
              onClick={() => {
                setIsExpanded((prev) => !prev);
              }}
              className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#111111] border-2 border-[#d49b35] retro-shadow-lg flex items-center justify-center p-1 cursor-pointer transition-transform hover:scale-105 active:scale-95 overflow-hidden"
              aria-label="Toggle Retro Gramophone Player"
              title="Click to toggle vintage radio controls"
            >
              {/* Spinning Vinyl Grooves */}
              <div
                className={`w-full h-full rounded-full border border-white/20 flex items-center justify-center ${
                  isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''
                }`}
                style={{
                  backgroundImage: `
                    repeating-radial-gradient(circle, #1a1a1a 0px, #0a0a0a 2px, #262626 4px, #111111 6px)
                  `,
                }}
              >
                {/* Center Vinyl Label */}
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#6b1d2f] border-2 border-[#fcbf55] flex items-center justify-center text-[9px] text-[#fcbf55] font-bold shadow-inner">
                  {isPlaying ? '♪' : '▶'}
                </div>
              </div>
            </button>

            {/* Quick Play/Pause Badge On Vinyl */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onTogglePlay();
              }}
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#d49b35] text-[#2a170f] font-bold text-[10px] flex items-center justify-center shadow-md border border-[#fff8f6] hover:scale-110"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? '❚❚' : '▶'}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-block;
          white-space: nowrap;
          animation: marquee 12s linear infinite;
        }
      `}</style>
    </>
  );
};
