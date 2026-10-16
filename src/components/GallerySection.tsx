import React, { useState } from 'react';
import { galleryPhotos, siteConfig, GalleryPhoto } from '../data';
import { LightboxModal } from './LightboxModal';
import { useCustomPhotos } from '../utils/photoStore';

interface GallerySectionProps {
  onOpenPhotoManager?: (slotKey?: string) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onOpenPhotoManager }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const { getPhoto } = useCustomPhotos();

  return (
    <section id="gallery" className="relative py-20 px-4 max-w-5xl mx-auto">
      {/* SECTION HEADER */}
      <div className="text-center mb-12">
        <div className="font-courier text-xs tracking-[0.28em] text-[#7f5700] uppercase font-bold mb-2">
          MASTER NEGATIVES
        </div>
        <h2 className="font-bodoni text-3xl sm:text-4xl md:text-5xl font-bold text-[#4e051a] tracking-tight">
          Archival Gallery
        </h2>

        {/* DATE & CHANGE PHOTOS BADGES */}
        <div className="flex flex-wrap items-center justify-center gap-3 my-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded bg-[#fcbf55]/30 border border-[#d49b35] text-[#724d00] font-courier text-xs uppercase tracking-widest shadow-2xs">
            <span>📅</span>
            <span>{siteConfig.wedding.displayDate}</span>
          </div>

          <button
            onClick={() => onOpenPhotoManager?.('plate-01')}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#ffe9e2] hover:bg-[#ffdacf] border border-[#dac0c2] text-[#6b1d2f] font-courier text-xs uppercase tracking-wider font-semibold transition-colors shadow-2xs cursor-pointer"
            title="Upload or change pictures in this gallery"
          >
            <span>📷</span>
            <span>Change Photos</span>
          </button>
        </div>

        <p className="font-newsreader italic text-[#544244] text-base max-w-md mx-auto">
          Tap any vintage still to open the cinema photo-slide viewer or replace pictures.
        </p>
      </div>

      {/* RESPONSIVE MASONRY GRID (works for 10 or 200 photos) */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {galleryPhotos.map((photo: GalleryPhoto, index: number) => {
          const tiltDeg = photo.tilt ?? (index % 2 === 0 ? -1.2 : 1.2);
          const photoSrc = getPhoto(photo.id, photo.src);

          return (
            <div
              key={photo.id}
              onClick={() => setSelectedPhotoIndex(index)}
              className="break-inside-avoid relative bg-[#fff8f6] border border-[#2a170f]/15 rounded p-3 pb-4 retro-shadow cursor-pointer transition-all duration-300 group hover:rotate-0 hover:scale-[1.02] hover:z-20 hover:border-[#6b1d2f]"
              style={{ transform: `rotate(${tiltDeg}deg)` }}
            >
              {/* PHOTO FRAME */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-xs bg-[#e2d5c8] border border-[#2a170f]/10 mb-3">
                {/* Optional Badge (e.g. "Bubbles") */}
                {photo.badge && (
                  <div className="absolute top-2 right-2 z-10 px-2 py-0.5 rounded bg-[#2a170f]/80 backdrop-blur-xs text-[#fcbf55] font-courier text-[10px] font-semibold border border-[#d49b35]/60 flex items-center gap-1 shadow-xs">
                    <span>🫧</span>
                    <span>{photo.badge}</span>
                  </div>
                )}

                {/* Photo Image: sepia by default, turns full color on hover */}
                <img
                  src={photoSrc}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover sepia-[0.38] contrast-95 group-hover:sepia-0 group-hover:contrast-105 transition-all duration-500"
                />

                {/* Quick edit button on hover */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenPhotoManager?.(photo.id);
                  }}
                  className="absolute bottom-2 right-2 z-15 px-2 py-1 rounded bg-[#2a170f]/85 hover:bg-[#6b1d2f] text-[#fff8f6] font-courier text-[10px] uppercase font-bold opacity-0 group-hover:opacity-100 transition-opacity border border-[#fcbf55]/60 flex items-center gap-1 shadow-md"
                  title="Replace this photo"
                >
                  <span>📷</span>
                  <span>Edit</span>
                </button>

                {/* Subtle vintage photo paper sheen */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity pointer-events-none" />
              </div>

              {/* RETRO PLATE STAMP LABEL */}
              <div className="flex items-center justify-between px-1 border-t border-[#2a170f]/10 pt-2 text-[#544244]">
                <span className="font-courier text-xs font-bold text-[#4e051a] tracking-wider uppercase">
                  {photo.plateNumber}
                </span>
                <span className="font-newsreader italic text-xs text-[#7f5700] truncate max-w-[140px]">
                  {photo.title}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* FULL-SCREEN LIGHTBOX MODAL */}
      <LightboxModal
        photos={galleryPhotos}
        currentIndex={selectedPhotoIndex}
        onClose={() => setSelectedPhotoIndex(null)}
        onNavigate={(newIdx) => setSelectedPhotoIndex(newIdx)}
        onOpenPhotoManager={onOpenPhotoManager}
      />
    </section>
  );
};
