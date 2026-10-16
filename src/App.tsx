import React, { useState, useEffect } from 'react';
import { CurtainIntro } from './components/CurtainIntro';
import { HeroSection } from './components/HeroSection';
import { MilestonesSection } from './components/MilestonesSection';
import { FilmReelSection } from './components/FilmReelSection';
import { GallerySection } from './components/GallerySection';
import { QuoteSection } from './components/QuoteSection';
import { LoveLetterSection } from './components/LoveLetterSection';
import { FlipCountdownSection } from './components/FlipCountdownSection';
import { FooterSection } from './components/FooterSection';
import { BirdsOverlay } from './components/BirdsOverlay';
import { PetalsHearts } from './components/PetalsHearts';
import { MusicPlayer } from './components/MusicPlayer';
import { CinemaTicketNav } from './components/CinemaTicketNav';
import { PhotoManagerModal } from './components/PhotoManagerModal';

export default function App() {
  const [curtainsOpen, setCurtainsOpen] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLetterOpen, setIsLetterOpen] = useState<boolean>(false);
  const [isPhotoManagerOpen, setIsPhotoManagerOpen] = useState<boolean>(false);
  const [photoManagerSlotKey, setPhotoManagerSlotKey] = useState<string>('hero');

  // When user taps "Tap to Start the Show ♥"
  const handleStartShow = () => {
    setCurtainsOpen(true);
    setIsPlaying(true);
  };

  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleOpenPhotoManager = (slotKey?: string) => {
    setPhotoManagerSlotKey(slotKey || 'hero');
    setIsPhotoManagerOpen(true);
  };

  // Keyboard shortcut: space to play/pause music
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === 'Space') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#fff8f6] text-[#2a170f] selection:bg-[#6b1d2f] selection:text-[#fff8f6] overflow-x-hidden film-flicker">
      {/* FILM NOISE & GRAIN TEXTURE */}
      <div className="fixed inset-0 pointer-events-none z-30 film-grain" aria-hidden="true" />

      {/* FLYING BIRDS OVERLAY (Wing-flapping SVG doves & flocks) */}
      <BirdsOverlay />

      {/* DRIFTING ROSE PETALS & TINY PAPER HEARTS */}
      <PetalsHearts />

      {/* 1. INTRO COUNTDOWN & RED VELVET CURTAINS */}
      <CurtainIntro
        isOpen={curtainsOpen}
        onStartShow={handleStartShow}
      />

      {/* MAIN WEBSITE SECTIONS */}
      <main className="relative z-10 pb-16">
        {/* 2. HERO: Retro Bollywood Movie Poster with Typewriter Title */}
        <HeroSection
          onPlayMusic={handleTogglePlay}
          isPlaying={isPlaying}
          onOpenPhotoManager={handleOpenPhotoManager}
        />

        {/* 3. ARCHIVED MILESTONES: Tilted Polaroids & Chole Kulche Memory Card */}
        <MilestonesSection />

        {/* 4. 35MM CELLULOID REEL: Horizontal film strip with sprocket holes */}
        <FilmReelSection />

        {/* 5. ARCHIVAL GALLERY: Responsive Masonry Grid with 14 Plates & Fullscreen Lightbox */}
        <GallerySection
          onOpenPhotoManager={handleOpenPhotoManager}
        />

        {/* 6. QUOTE: Parallax R.D. Burman Lyric Card */}
        <QuoteSection />

        {/* 7. A HANDWRITTEN LETTER: Envelope with Wax Seal & Flying Birds */}
        <LoveLetterSection
          onLetterOpenChange={(open) => setIsLetterOpen(open)}
        />

        {/* 8. COUNTDOWN: Retro Mechanical Flip-Clock Countdown */}
        <FlipCountdownSection />

        {/* 9. FOOTER: Cassette Player, The End, Monogram, Flying Birds */}
        <FooterSection
          onPlayMusic={handleTogglePlay}
          isPlaying={isPlaying}
        />
      </main>

      {/* FLOATING VINTAGE CINEMA TICKET NAVIGATION DOCK */}
      <CinemaTicketNav
        onOpenPhotoManager={() => handleOpenPhotoManager('hero')}
      />

      {/* HIDDEN YOUTUBE IFRAME AUDIO & SPINNING VINYL CONTROLS */}
      <MusicPlayer
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        isLetterOpen={isLetterOpen}
        shouldStartAudio={curtainsOpen}
      />

      {/* PHOTO CUSTOMIZER / REPLACEMENT MODAL */}
      <PhotoManagerModal
        isOpen={isPhotoManagerOpen}
        onClose={() => setIsPhotoManagerOpen(false)}
        initialTargetKey={photoManagerSlotKey}
      />
    </div>
  );
}
