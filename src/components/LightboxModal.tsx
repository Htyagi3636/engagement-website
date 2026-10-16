import React, { useEffect, useCallback } from 'react';
import { GalleryPhoto } from '../data';
import { useCustomPhotos } from '../utils/photoStore';

interface LightboxModalProps {
  photos: GalleryPhoto[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  photos,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const { getPhoto } = useCustomPhotos();
  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < photos.length;
  const currentPhoto = isOpen ? photos[currentIndex] : null;

  const handleNext = useCallback(() => {
    if (currentIndex !== null) {
      onNavigate((currentIndex + 1) % photos.length);
    }
  }, [currentIndex, photos.length, onNavigate]);

  const handlePrev = useCallback(() => {
    if (currentIndex !== null) {
      onNavigate((currentIndex - 1 + photos.length) % photos.length);
    }
  }, [currentIndex, photos.length, onNavigate]);

  // Keyboard navigation: ArrowLeft, ArrowRight, Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handleNext, handlePrev]);

  // Touch swipe support for mobile
  const [touchStart, setTouchStart] = React.useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    // Minimum swipe threshold: 45px
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    setTouchStart(null);
  };

  if (!isOpen || !currentPhoto) return null;

  const activePhotoSrc = getPhoto(currentPhoto.id, currentPhoto.src);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a0a0e]/95 backdrop-blur-md p-4 animate-fade-in"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* CLOSE BUTTON */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-50 w-11 h-11 rounded-full bg-[#6b1d2f] hover:bg-[#8b233a] text-[#fcbf55] border border-[#d49b35] flex items-center justify-center font-bold text-lg shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer"
        aria-label="Close Lightbox"
      >
        ✕
      </button>

      {/* PREVIOUS BUTTON */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-[#2a170f]/80 hover:bg-[#4e051a] text-[#fcbf55] border border-[#d49b35]/60 flex items-center justify-center text-xl shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer"
        aria-label="Previous Photo"
      >
        ❮
      </button>

      {/* NEXT BUTTON */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-[#2a170f]/80 hover:bg-[#4e051a] text-[#fcbf55] border border-[#d49b35]/60 flex items-center justify-center text-xl shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer"
        aria-label="Next Photo"
      >
        ❯
      </button>

      {/* MODAL CARD CONTENT */}
      <div
        className="relative max-w-4xl max-h-[92vh] w-full bg-[#fff8f6] rounded border-2 border-[#d49b35] p-4 md:p-6 retro-shadow-lg flex flex-col items-center justify-center overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* TOP FILM TAG HEADER */}
        <div className="w-full flex items-center justify-between border-b border-[#2a170f]/15 pb-2 mb-3 font-courier text-xs text-[#7f5700]">
          <span className="font-bold tracking-widest uppercase">
            {currentPhoto.plateNumber}
          </span>
          <span className="text-[#544244]">
            {currentIndex + 1} of {photos.length}
          </span>
        </div>

        {/* IMAGE FRAME */}
        <div className="relative max-h-[62vh] rounded overflow-hidden bg-[#2a170f] flex items-center justify-center border border-[#2a170f]/20">
          <img
            src={activePhotoSrc}
            alt={currentPhoto.title}
            className="max-h-[62vh] max-w-full w-auto h-auto object-contain"
          />

          {currentPhoto.badge && (
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#4e051a]/90 text-[#fcbf55] font-courier text-xs border border-[#fcbf55]/50">
              {currentPhoto.badge}
            </div>
          )}
        </div>

        {/* CAPTION & TITLE */}
        <div className="w-full text-center pt-4">
          <h3 className="font-bodoni text-xl md:text-2xl font-bold text-[#4e051a]">
            {currentPhoto.title}
          </h3>
          <p className="font-newsreader italic text-[#2a170f] text-sm md:text-base mt-1 max-w-xl mx-auto">
            {currentPhoto.caption}
          </p>
        </div>

        {/* KEYBOARD SHORTCUTS HINT */}
        <div className="mt-3 text-[10px] font-courier text-[#544244]/70 hidden sm:block">
          Use ← / → arrow keys to navigate • Esc to close • Swipe on mobile
        </div>
      </div>
    </div>
  );
};
