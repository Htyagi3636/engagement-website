import React, { memo } from 'react';

export const PetalsHearts: React.FC = memo(() => {
  // 14 gentle drifting petals and paper hearts
  const items = [
    { id: 1, left: '5%', delay: '0s', duration: '14s', size: 14, type: 'petal', rotate: '45deg' },
    { id: 2, left: '15%', delay: '4s', duration: '18s', size: 11, type: 'heart', rotate: '-20deg' },
    { id: 3, left: '26%', delay: '8s', duration: '16s', size: 16, type: 'petal', rotate: '60deg' },
    { id: 4, left: '38%', delay: '2s', duration: '15s', size: 12, type: 'petal', rotate: '15deg' },
    { id: 5, left: '49%', delay: '9s', duration: '19s', size: 10, type: 'heart', rotate: '30deg' },
    { id: 6, left: '60%', delay: '1s', duration: '17s', size: 15, type: 'petal', rotate: '-45deg' },
    { id: 7, left: '72%', delay: '6s', duration: '13s', size: 13, type: 'petal', rotate: '80deg' },
    { id: 8, left: '84%', delay: '3s', duration: '18s', size: 11, type: 'heart', rotate: '-15deg' },
    { id: 9, left: '92%', delay: '7s', duration: '15s', size: 14, type: 'petal', rotate: '50deg' },
    { id: 10, left: '10%', delay: '11s', duration: '20s', size: 12, type: 'petal', rotate: '-30deg' },
    { id: 11, left: '55%', delay: '13s', duration: '16s', size: 9, type: 'heart', rotate: '25deg' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden" aria-hidden="true">
      {/* Drifting petals and paper hearts */}
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute opacity-75 will-change-transform"
          style={{
            left: item.left,
            top: '-40px',
            animation: `driftDown ${item.duration} linear ${item.delay} infinite`,
          }}
        >
          {item.type === 'petal' ? (
            <svg
              width={item.size}
              height={item.size * 1.4}
              viewBox="0 0 24 34"
              className="drop-shadow-xs"
              style={{ transform: `rotate(${item.rotate})` }}
            >
              {/* Organic rose petal shape */}
              <path
                d="M12 2 C18 6, 23 15, 20 25 C17 32, 12 34, 12 34 C12 34, 7 32, 4 25 C1 15, 6 6, 12 2 Z"
                fill="url(#roseGradient)"
                opacity="0.8"
              />
              <defs>
                <linearGradient id="roseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c47b7b" />
                  <stop offset="100%" stopColor="#6b1d2f" />
                </linearGradient>
              </defs>
            </svg>
          ) : (
            <svg
              width={item.size}
              height={item.size}
              viewBox="0 0 24 24"
              className="drop-shadow-xs"
              style={{ transform: `rotate(${item.rotate})` }}
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill="#d49b35"
                opacity="0.65"
              />
            </svg>
          )}
        </div>
      ))}

      {/* Subtle Warm Light Leaks */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] max-w-[600px] rounded-full bg-gradient-to-br from-[#fcbf55]/10 via-[#c47b7b]/10 to-transparent blur-3xl animate-light-leak pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[45vw] h-[45vw] max-w-[500px] rounded-full bg-gradient-to-tr from-[#9a4152]/10 via-[#fcbf55]/5 to-transparent blur-3xl animate-light-leak pointer-events-none" style={{ animationDelay: '-8s' }} />

      {/* Gentle Vignette */}
      <div className="fixed inset-0 pointer-events-none shadow-[inset_0_0_90px_rgba(42,23,15,0.08)] md:shadow-[inset_0_0_140px_rgba(42,23,15,0.12)] z-10" />

      {/* CSS Animation */}
      <style>{`
        @keyframes driftDown {
          0% {
            transform: translateY(-40px) translateX(0px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          50% {
            transform: translateY(50vh) translateX(35px) rotate(180deg);
          }
          90% {
            opacity: 0.75;
          }
          100% {
            transform: translateY(105vh) translateX(-20px) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
});
