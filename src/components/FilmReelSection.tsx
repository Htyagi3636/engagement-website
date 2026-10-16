import React, { useRef, useEffect, useState } from 'react';
import { filmReelItems, FilmReelItem } from '../data';
import { useCustomPhotos } from '../utils/photoStore';

export const FilmReelSection: React.FC<{ onSelectPhoto?: (src: string, title: string) => void }> = ({
  onSelectPhoto,
}) => {
  const { getPhoto } = useCustomPhotos();
  const stripRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Slow continuous auto-scroll + scroll wheel assistance
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    let animId: number;
    let scrollPos = strip.scrollLeft;

    const step = () => {
      if (!isPaused && strip) {
        scrollPos += 0.8;
        if (scrollPos >= strip.scrollWidth / 2) {
          scrollPos = 0;
        }
        strip.scrollLeft = scrollPos;
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animId);
  }, [isPaused]);

  // Duplicate items for seamless continuous looping reel
  const loopItems = [...filmReelItems, ...filmReelItems, ...filmReelItems];

  return (
    <section className="relative py-14 bg-[#032120] text-[#fff8f6] overflow-hidden border-y-4 border-[#d49b35]">
      {/* HEADER BAR */}
      <div className="max-w-6xl mx-auto px-4 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🎞️</span>
            <h2 className="font-bodoni text-2xl sm:text-3xl font-bold text-[#f9bc53] tracking-wide">
              35mm Celluloid Reel
            </h2>
          </div>
          <p className="font-courier text-[10px] sm:text-xs tracking-[0.22em] text-[#7aadaa] uppercase mt-1">
            EASTMANCOLOR NEGATIVE • EXPANDED REEL #101-106
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-courier text-xs tracking-widest text-[#fcbf55] animate-pulse">
            SWIPE STRIP →
          </span>
          <button
            onClick={() => setIsPaused((prev) => !prev)}
            className="px-2.5 py-1 text-[11px] font-courier border border-[#7aadaa]/40 rounded hover:bg-[#054140] transition-colors"
          >
            {isPaused ? '▶ Resume Reel' : '❚❚ Pause Reel'}
          </button>
        </div>
      </div>

      {/* HORIZONTAL FILMSTRIP CONTAINER */}
      <div
        ref={stripRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        className="flex overflow-x-auto no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing select-none py-2"
        style={{ scrollBehavior: 'auto' }}
      >
        <div className="flex gap-4 sm:gap-6 px-4">
          {loopItems.map((item: FilmReelItem, index: number) => (
            <div
              key={`${item.id}-${index}`}
              onClick={() => onSelectPhoto?.(item.src, item.title)}
              className="relative flex-shrink-0 w-64 sm:w-72 bg-[#091716] border-y-8 border-[#0d1a19] rounded-xs shadow-2xl p-3 flex flex-col justify-between group transition-transform duration-300 hover:scale-[1.02]"
            >
              {/* TOP SPROCKET HOLES ROW */}
              <div className="flex justify-between items-center mb-2 px-1">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="sprocket-hole" />
                ))}
              </div>

              {/* FILM CELL STILL PHOTO */}
              <div className="relative aspect-[4/3] rounded-xs overflow-hidden bg-black/60 border border-white/10">
                {(() => {
                  const plateMatch = item.src.match(/(plate-\d+)/);
                  const reelPhotoSrc = plateMatch ? getPhoto(plateMatch[1], item.src) : getPhoto(item.id, item.src);
                  return (
                    <img
                      src={reelPhotoSrc}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover sepia-[0.3] group-hover:sepia-0 group-hover:scale-105 transition-all duration-500"
                    />
                  );
                })()}

                {/* Film still badge */}
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-xs bg-black/70 text-[9px] font-courier uppercase tracking-wider text-[#fcbf55]">
                  {item.title}
                </div>
              </div>

              {/* BOTTOM METADATA & SPROCKETS */}
              <div className="mt-2">
                <div className="flex justify-between items-center text-[10px] font-courier text-[#fcbf55] px-1 mb-2">
                  <span>{item.tag}</span>
                  <span className="text-[#7aadaa]">SAFE HARBOR</span>
                </div>

                {/* BOTTOM SPROCKET HOLES ROW */}
                <div className="flex justify-between items-center px-1">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="sprocket-hole" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
