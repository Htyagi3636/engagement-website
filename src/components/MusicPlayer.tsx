import React, { useEffect, useRef, useState, useCallback } from 'react';
import { musicPlaylist, SongTrack } from '../data';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

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
  shouldStartAudio,
}) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [playerReady, setPlayerReady] = useState<boolean>(false);

  const playerRef = useRef<any>(null);
  const currentSong: SongTrack = musicPlaylist[currentTrackIndex] || musicPlaylist[0];

  // Initialize YouTube IFrame Player API
  useEffect(() => {
    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return;

      playerRef.current = new window.YT.Player('youtube-audio-frame', {
        height: '0',
        width: '0',
        videoId: currentSong.youtubeId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
        },
        events: {
          onReady: (event: any) => {
            setPlayerReady(true);
            event.target.setVolume(0);
          },
          onStateChange: (event: any) => {
            // When track ends, advance to next track
            if (event.data === 0) {
              handleNextTrack();
            }
          },
        },
      });
    };

    if (!window.YT) {
      const existingScript = document.querySelector('script[src*="youtube.com/iframe_api"]');
      if (!existingScript) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);
      }
      const existingCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof existingCallback === 'function') {
          try {
            existingCallback();
          } catch {
            // ignore
          }
        }
        initPlayer();
      };
    } else {
      initPlayer();
    }

    return () => {
      try {
        if (playerRef.current?.destroy) {
          playerRef.current.destroy();
        }
      } catch {
        // cleanup ignore
      }
    };
  }, []);

  // Update track when index changes
  useEffect(() => {
    if (playerReady && playerRef.current?.loadVideoById) {
      playerRef.current.loadVideoById(currentSong.youtubeId);
      if (isPlaying) {
        playerRef.current.playVideo();
      }
    }
  }, [currentTrackIndex, playerReady]);

  // Handle play/pause
  useEffect(() => {
    if (!playerReady || !playerRef.current) return;

    if (isPlaying) {
      try {
        playerRef.current.playVideo();
      } catch (err) {
        console.warn('Playback error:', err);
      }
    } else {
      try {
        playerRef.current.pauseVideo();
      } catch (err) {
        console.warn('Pause error:', err);
      }
    }
  }, [isPlaying, playerReady]);

  // Volume fade-in when show starts & ducking during love letter
  useEffect(() => {
    if (!playerReady || !playerRef.current) return;

    const targetVolume = isMuted ? 0 : isLetterOpen ? 22 : 60;

    let currentVol = 0;
    try {
      currentVol = playerRef.current.getVolume() || 0;
    } catch {
      currentVol = 0;
    }

    // Smooth volume fade
    const step = targetVolume > currentVol ? 5 : -5;
    const interval = setInterval(() => {
      if (
        (step > 0 && currentVol >= targetVolume) ||
        (step < 0 && currentVol <= targetVolume) ||
        !playerRef.current?.setVolume
      ) {
        clearInterval(interval);
        return;
      }
      currentVol += step;
      try {
        playerRef.current.setVolume(Math.min(100, Math.max(0, currentVol)));
      } catch {
        clearInterval(interval);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [isPlaying, isMuted, isLetterOpen, playerReady]);

  // Next Track
  const handleNextTrack = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev + 1) % musicPlaylist.length);
  }, []);

  // Toggle Mute
  const handleToggleMute = () => {
    if (!playerRef.current) return;
    if (isMuted) {
      setIsMuted(false);
      try {
        playerRef.current.unMute();
        playerRef.current.setVolume(isLetterOpen ? 22 : 60);
      } catch {
        // ignore
      }
    } else {
      setIsMuted(true);
      try {
        playerRef.current.mute();
      } catch {
        // ignore
      }
    }
  };

  return (
    <>
      {/* Hidden YouTube IFrame */}
      <div className="hidden pointer-events-none" aria-hidden="true">
        <div id="youtube-audio-frame" />
      </div>

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
