import React, { useState, useEffect, useRef } from 'react';
import { storyMilestones, StoryMilestone } from '../data';
import { useCustomPhotos } from '../utils/photoStore';

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export const MilestonesSection: React.FC = () => {
  const { getPhoto } = useCustomPhotos();
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [developedCards, setDevelopedCards] = useState<Record<number, boolean>>({});
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // IntersectionObserver to "develop" polaroids as they scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            if (!isNaN(index)) {
              setDevelopedCards((prev) => ({ ...prev, [index]: true }));
            }
          }
        });
      },
      { threshold: 0.25 }
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Bubble burst generator for Act 1
  const triggerBubbleShower = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const colors = ['#ffffff', '#fcbf55', '#ffe9e2', '#b8ecea', '#ffd9dd'];
    const newBubbles: Bubble[] = Array.from({ length: 18 }).map((_, i) => ({
      id: Date.now() + i,
      x: clickX + (Math.random() * 80 - 40),
      y: clickY + (Math.random() * 80 - 40),
      size: 14 + Math.random() * 24,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setBubbles((prev) => [...prev, ...newBubbles]);

    setTimeout(() => {
      setBubbles((prev) => prev.filter((b) => !newBubbles.some((nb) => nb.id === b.id)));
    }, 1800);
  };

  return (
    <section id="our-story" className="relative py-16 px-4 max-w-2xl mx-auto">
      {/* SECTION HEADER */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#ffe9e2] text-[#6b1d2f] mb-2 shadow-2xs border border-[#dac0c2]">
          📌
        </div>
        <h2 className="font-bodoni text-3xl sm:text-4xl font-bold text-[#4e051a] tracking-tight">
          Archived Milestones
        </h2>
        <p className="font-newsreader italic text-[#544244] text-base mt-1">
          Pinned snapshots from our personal diary reel.
        </p>
      </div>

      {/* TIMELINE CARDS */}
      <div className="flex flex-col gap-14 sm:gap-16">
        {storyMilestones.map((milestone: StoryMilestone, index: number) => {
          const isDeveloped = developedCards[index];
          const tiltDeg = milestone.tilt ?? (index % 2 === 0 ? -1.2 : 1.2);

          return (
            <div
              key={index}
              ref={(el) => { cardRefs.current[index] = el; }}
              data-index={index}
              className="relative transition-transform duration-500 hover:rotate-0"
              style={{ transform: `rotate(${tiltDeg}deg)` }}
            >
              {/* WASHI TAPE PIN (Top of the polaroid) */}
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 washi-tape rounded-xs z-20 pointer-events-none"
                style={{ transform: `translateX(-50%) rotate(${index % 2 === 0 ? 1.5 : -1.8}deg)` }}
              />

              {/* SPECIAL MEMORY CARD (ACT IV: CHOLE KULCHE CHRONICLES) */}
              {milestone.isMemoryCard ? (
                <div className="bg-[#fff8f6] border-2 border-dashed border-[#d49b35]/70 rounded p-6 sm:p-8 retro-shadow text-center">
                  {/* Cutlery / Food Stamp Icon */}
                  <div className="w-14 h-14 mx-auto mb-4 rounded-md bg-[#fcbf55]/30 border border-[#d49b35] flex items-center justify-center text-2xl text-[#724d00] shadow-xs">
                    🍴
                  </div>

                  <h3 className="font-bodoni text-2xl sm:text-3xl font-bold tracking-wider text-[#4e051a]">
                    {milestone.cardTitle}
                  </h3>

                  <div className="font-courier text-[11px] uppercase tracking-[0.25em] text-[#7f5700] my-2 font-semibold">
                    {milestone.cardSubtitle}
                  </div>

                  <p className="font-newsreader italic text-base sm:text-lg text-[#544244] max-w-md mx-auto my-3">
                    {milestone.cardQuote}
                  </p>

                  <div className="w-16 h-0.5 bg-[#d49b35]/40 mx-auto my-4" />

                  <div className="font-courier text-xs uppercase tracking-[0.2em] text-[#4e051a] font-bold">
                    {milestone.act}
                  </div>
                  <p className="font-newsreader italic text-sm text-[#2a170f] mt-1">
                    {milestone.quote}
                  </p>
                </div>
              ) : (
                /* POLAROID PHOTO CARD */
                <div
                  onClick={milestone.badge === 'Bubble Shower' ? triggerBubbleShower : undefined}
                  className={`bg-[#fff8f6] border border-[#2a170f]/15 rounded p-3 sm:p-4 pb-6 retro-shadow transition-all duration-700 ${
                    milestone.badge === 'Bubble Shower' ? 'cursor-pointer group' : ''
                  }`}
                >
                  {/* PHOTO FRAME */}
                  <div className="relative aspect-[4/5] overflow-hidden rounded-xs bg-[#e2d5c8] border border-[#2a170f]/10">
                    {/* Badge Pill (e.g. "Bubble Shower") */}
                    {milestone.badge && (
                      <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded bg-[#2a170f]/80 backdrop-blur-xs text-[#fcbf55] font-courier text-[11px] font-semibold border border-[#d49b35]/60 flex items-center gap-1 shadow-xs">
                        <span>🫧</span>
                        <span>{milestone.badge}</span>
                      </div>
                    )}

                    {/* Developing Photo Image */}
                    <img
                      src={getPhoto(`milestone-${index + 1}`, milestone.photoUrl || '')}
                      alt={milestone.title}
                      loading="lazy"
                      className={`w-full h-full object-cover transition-all duration-1000 ${
                        isDeveloped
                          ? 'sepia-0 contrast-100 opacity-100 filter-none'
                          : 'sepia-[0.6] contrast-75 brightness-125 opacity-70 blur-[1px]'
                      }`}
                    />

                    {/* Gentle developing flash overlay */}
                    <div
                      className={`absolute inset-0 bg-[#fff8f6] pointer-events-none transition-opacity duration-1000 ${
                        isDeveloped ? 'opacity-0' : 'opacity-40'
                      }`}
                    />

                    {/* INTERACTIVE BUBBLES POPPING EFFECT (ACT 1) */}
                    {bubbles.map((b) => (
                      <div
                        key={b.id}
                        className="absolute rounded-full border border-white/80 pointer-events-none animate-bubble-float shadow-inner"
                        style={{
                          left: `${b.x}px`,
                          top: `${b.y}px`,
                          width: `${b.size}px`,
                          height: `${b.size}px`,
                          backgroundColor: `${b.color}40`,
                        }}
                      />
                    ))}
                  </div>

                  {/* CAPTIONS & STORY NOTE */}
                  <div className="pt-4 px-1 text-center">
                    <div className="font-courier text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#7f5700] font-bold">
                      {milestone.act}
                    </div>

                    <p className="font-newsreader italic text-base sm:text-lg text-[#2a170f] mt-1.5 leading-snug">
                      {milestone.quote}
                    </p>

                    {milestone.note && (
                      <div className="font-courier text-[11px] tracking-wider text-[#6b1d2f] mt-2 font-semibold animate-pulse">
                        {milestone.note}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes bubbleFloat {
          0% {
            transform: translate(0, 0) scale(0.6);
            opacity: 1;
          }
          100% {
            transform: translate(var(--tw-translate-x, -20px), -120px) scale(1.4);
            opacity: 0;
          }
        }
        .animate-bubble-float {
          animation: bubbleFloat 1.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};
