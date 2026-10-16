import React, { useEffect, useState, memo } from 'react';

interface Bird {
  id: number;
  top: number;       // percentage (5 to 80)
  size: number;      // scale factor (0.6 to 1.3)
  speed: number;     // duration in seconds (10 to 22)
  direction: 'ltr' | 'rtl';
  delay: number;     // start delay
  isDove: boolean;
  waveOffset: number;// for gentle wave motion
}

export const BirdGraphic: React.FC<{ isDove?: boolean; size?: number; className?: string }> = ({
  isDove = false,
  size = 28,
  className = ''
}) => {
  return (
    <div
      className={`relative inline-block ${className}`}
      style={{ width: size, height: size * 0.7 }}
    >
      <svg
        viewBox="0 0 100 70"
        className="w-full h-full overflow-visible drop-shadow-sm"
        fill={isDove ? '#fff8f6' : '#4a121e'}
        stroke={isDove ? 'rgba(78,5,26,0.3)' : 'none'}
        strokeWidth={isDove ? '1' : '0'}
      >
        {/* Left Wing */}
        <g className="wing-left">
          <path d="M 50,35 C 40,20 25,5 5,12 C 18,22 35,32 50,35 Z" />
        </g>
        {/* Right Wing */}
        <g className="wing-right">
          <path d="M 50,35 C 60,20 75,5 95,12 C 82,22 65,32 50,35 Z" />
        </g>
        {/* Body and Tail */}
        <path d="M 46,28 C 47,20 53,20 54,28 C 55,36 53,46 56,58 C 50,54 48,54 44,58 C 47,46 45,36 46,28 Z" />
        {/* Beak */}
        <polygon points="50,18 47,24 53,24" fill={isDove ? '#d49b35' : '#fcbf55'} />
      </svg>
    </div>
  );
};

export const BirdsOverlay: React.FC = memo(() => {
  const [birds, setBirds] = useState<Bird[]>([]);

  useEffect(() => {
    // Generate initial small flock
    const initialBirds: Bird[] = [
      { id: 1, top: 18, size: 0.9, speed: 14, direction: 'ltr', delay: 0, isDove: true, waveOffset: 12 },
      { id: 2, top: 22, size: 0.75, speed: 13, direction: 'ltr', delay: 0.4, isDove: false, waveOffset: 10 },
      { id: 3, top: 15, size: 1.1, speed: 15, direction: 'ltr', delay: 0.8, isDove: true, waveOffset: 14 },
    ];
    setBirds(initialBirds);

    // Spawn a new small flock every 7 to 10 seconds
    const interval = setInterval(() => {
      const direction: 'ltr' | 'rtl' = Math.random() > 0.3 ? 'ltr' : 'rtl';
      const baseTop = 10 + Math.random() * 65;
      const count = Math.floor(Math.random() * 3) + 2; // 2 to 4 birds in a flock
      const newFlock: Bird[] = Array.from({ length: count }).map((_, i) => ({
        id: Date.now() + i + Math.random(),
        top: Math.max(5, Math.min(85, baseTop + (Math.random() * 12 - 6))),
        size: 0.65 + Math.random() * 0.55,
        speed: 12 + Math.random() * 9,
        direction,
        delay: i * 0.35 + Math.random() * 0.2,
        isDove: Math.random() > 0.4,
        waveOffset: 8 + Math.random() * 12
      }));

      setBirds((prev) => [...prev.slice(-12), ...newFlock]);
    }, 8500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden"
      aria-hidden="true"
    >
      {birds.map((bird) => {
        const isLtr = bird.direction === 'ltr';
        return (
          <div
            key={bird.id}
            className="absolute transition-transform will-change-transform"
            style={{
              top: `${bird.top}%`,
              left: isLtr ? '-80px' : 'calc(100% + 80px)',
              transform: isLtr ? 'none' : 'scaleX(-1)',
              animation: `${isLtr ? 'flyAcrossLTR' : 'flyAcrossRTL'} ${bird.speed}s linear ${bird.delay}s forwards`,
              opacity: 0.85,
            }}
          >
            <BirdGraphic isDove={bird.isDove} size={30 * bird.size} />
          </div>
        );
      })}

      <style>{`
        @keyframes flyAcrossLTR {
          0% {
            transform: translateX(0vw) translateY(0px);
            opacity: 0;
          }
          5% {
            opacity: 0.9;
          }
          25% {
            transform: translateX(30vw) translateY(-14px);
          }
          50% {
            transform: translateX(60vw) translateY(8px);
          }
          75% {
            transform: translateX(90vw) translateY(-10px);
          }
          95% {
            opacity: 0.9;
          }
          100% {
            transform: translateX(120vw) translateY(0px);
            opacity: 0;
          }
        }

        @keyframes flyAcrossRTL {
          0% {
            transform: scaleX(-1) translateX(0vw) translateY(0px);
            opacity: 0;
          }
          5% {
            opacity: 0.9;
          }
          25% {
            transform: scaleX(-1) translateX(30vw) translateY(-12px);
          }
          50% {
            transform: scaleX(-1) translateX(60vw) translateY(10px);
          }
          75% {
            transform: scaleX(-1) translateX(90vw) translateY(-8px);
          }
          95% {
            opacity: 0.9;
          }
          100% {
            transform: scaleX(-1) translateX(120vw) translateY(0px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
});
