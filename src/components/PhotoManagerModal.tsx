import React, { useState, useRef } from 'react';
import { useCustomPhotos } from '../utils/photoStore';
import { siteConfig, storyMilestones, galleryPhotos } from '../data';

interface PhotoManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTargetKey?: string;
}

// Compress image helper to prevent localStorage quota issues
function compressImage(file: File, maxWidth = 1200, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export const PhotoManagerModal: React.FC<PhotoManagerModalProps> = ({
  isOpen,
  onClose,
  initialTargetKey = 'hero',
}) => {
  const { customPhotos, savePhoto, resetPhoto, resetAll } = useCustomPhotos();
  const [selectedKey, setSelectedKey] = useState<string>(initialTargetKey);
  const [urlInput, setUrlInput] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bulkFileInputRef = useRef<HTMLInputElement>(null);

  // Update selectedKey when initialTargetKey changes
  React.useEffect(() => {
    if (initialTargetKey) {
      setSelectedKey(initialTargetKey);
    }
  }, [initialTargetKey]);

  if (!isOpen) return null;

  // Catalog of all replaceable photo slots
  const photoSlots = [
    { key: 'hero', label: 'Hero Movie Poster', defaultSrc: siteConfig.couple.heroImage },
    ...storyMilestones
      .filter((m) => m.photoUrl)
      .map((m, idx) => ({
        key: `milestone-${idx + 1}`,
        label: `${m.title} (${m.act.split(':')[0]})`,
        defaultSrc: m.photoUrl!,
      })),
    ...galleryPhotos.map((p) => ({
      key: p.id,
      label: `${p.plateNumber}: ${p.title}`,
      defaultSrc: p.src,
    })),
  ];

  const currentSlot = photoSlots.find((s) => s.key === selectedKey) || photoSlots[0];
  const activePhotoSrc = customPhotos[currentSlot.key] || currentSlot.defaultSrc;
  const isCustomized = Boolean(customPhotos[currentSlot.key]);

  // Handle single file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsCompressing(true);
      const compressedDataUrl = await compressImage(file);
      savePhoto(currentSlot.key, compressedDataUrl);
      setSuccessMsg(`Photo replaced for "${currentSlot.label}"!`);
      setTimeout(() => setSuccessMsg(''), 3500);
    } catch (err) {
      console.error('Failed to process image', err);
      alert('Could not process this image. Please try another one.');
    } finally {
      setIsCompressing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Handle bulk file upload
  const handleBulkUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setIsCompressing(true);
      const fileList = Array.from(files);
      // Replace slots in order: hero, then milestones, then plates
      for (let i = 0; i < fileList.length && i < photoSlots.length; i++) {
        const slot = photoSlots[i];
        const compressed = await compressImage(fileList[i]);
        savePhoto(slot.key, compressed);
      }
      setSuccessMsg(`Successfully replaced ${Math.min(fileList.length, photoSlots.length)} photos!`);
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      console.error('Error during bulk upload', err);
      alert('Error uploading some photos.');
    } finally {
      setIsCompressing(false);
      if (bulkFileInputRef.current) bulkFileInputRef.current.value = '';
    }
  };

  // Handle URL submit
  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    savePhoto(currentSlot.key, urlInput.trim());
    setUrlInput('');
    setSuccessMsg(`Photo replaced for "${currentSlot.label}"!`);
    setTimeout(() => setSuccessMsg(''), 3500);
  };

  const handleResetCurrent = () => {
    resetPhoto(currentSlot.key);
    setSuccessMsg(`Reset "${currentSlot.label}" to original.`);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleResetAll = () => {
    if (window.confirm('Reset all photos to original defaults?')) {
      resetAll();
      setSuccessMsg('All photos reset to originals.');
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#fff8f6] border-2 border-[#6b1d2f] rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Retro Header */}
        <div className="bg-[#6b1d2f] text-[#fff8f6] px-5 py-3.5 flex items-center justify-between border-b-2 border-[#fcbf55]">
          <div className="flex items-center gap-2">
            <span className="text-xl">📷</span>
            <div>
              <h3 className="font-bodoni text-lg sm:text-xl font-bold tracking-wide">
                Replace Photographs
              </h3>
              <p className="font-courier text-[10px] sm:text-xs text-[#fcbf55] tracking-wider uppercase">
                Customize Any Photo On This Site
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#4e051a] hover:bg-[#85273d] text-[#fff8f6] flex items-center justify-center font-bold text-lg transition-colors border border-[#fcbf55]/50"
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-[#2a170f]">
          {successMsg && (
            <div className="p-3 bg-[#e8f5e9] border border-[#4caf50] text-[#2e7d32] rounded text-sm font-courier font-bold flex items-center gap-2 animate-in fade-in">
              <span>✓</span> {successMsg}
            </div>
          )}

          {/* Quick instructions banner */}
          <div className="p-3.5 rounded bg-[#fcbf55]/15 border border-[#d49b35]/40 text-xs sm:text-sm font-newsreader leading-relaxed">
            <span className="font-bold text-[#6b1d2f]">✨ How to change photos:</span>
            <ul className="list-disc list-inside mt-1 space-y-0.5 text-[#544244]">
              <li><b>Instant Preview:</b> Upload any picture from your device or paste a URL below. It instantly updates everywhere on the page!</li>
              <li><b>Bulk Upload:</b> Want all your pictures here? Click "Replace All Photos At Once" below to choose multiple pictures.</li>
              <li><b>Permanent:</b> Place files into <code className="bg-[#ffe9e2] px-1 py-0.5 rounded font-courier text-xs">public/photos/</code> or update <code className="bg-[#ffe9e2] px-1 py-0.5 rounded font-courier text-xs">src/data.ts</code>.</li>
            </ul>
          </div>

          {/* Select which photo slot to edit */}
          <div>
            <label className="block font-courier text-xs uppercase tracking-wider text-[#7f5700] font-bold mb-1.5">
              Select Photo to Replace:
            </label>
            <select
              value={selectedKey}
              onChange={(e) => setSelectedKey(e.target.value)}
              className="w-full px-3 py-2 bg-[#ffe9e2] border border-[#dac0c2] rounded font-newsreader text-sm sm:text-base focus:outline-hidden focus:border-[#6b1d2f]"
            >
              <optgroup label="Hero & Milestones">
                {photoSlots.slice(0, 5).map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label} {customPhotos[s.key] ? '★ (Customized)' : ''}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Archival Gallery Plates">
                {photoSlots.slice(5).map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label} {customPhotos[s.key] ? '★ (Customized)' : ''}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Live Preview & Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-[#fdf5f2] p-4 rounded-lg border border-[#dac0c2]">
            {/* Image Preview */}
            <div className="flex flex-col items-center">
              <div className="relative w-44 h-56 rounded border-2 border-[#6b1d2f] overflow-hidden bg-[#2a170f]/10 shadow-md">
                <img
                  src={activePhotoSrc}
                  alt={currentSlot.label}
                  className="w-full h-full object-cover"
                />
                {isCustomized && (
                  <span className="absolute top-2 right-2 px-2 py-0.5 bg-[#4caf50] text-white text-[10px] font-courier font-bold rounded shadow">
                    Active Custom
                  </span>
                )}
              </div>
              <span className="font-courier text-xs text-[#544244] mt-2 text-center">
                {currentSlot.label}
              </span>
            </div>

            {/* Upload & URL Buttons */}
            <div className="space-y-3">
              {/* Button: Choose File */}
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  disabled={isCompressing}
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-2.5 px-4 bg-[#6b1d2f] hover:bg-[#85273d] text-[#fff8f6] rounded font-courier text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors shadow flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span>📷</span>
                  <span>{isCompressing ? 'Processing Image...' : 'Upload Picture From Device'}</span>
                </button>
                <p className="text-[11px] font-newsreader text-[#7a6567] mt-1 text-center">
                  Supports JPG, PNG, WEBP from your phone or laptop.
                </p>
              </div>

              {/* Paste URL */}
              <form onSubmit={handleUrlSubmit} className="pt-2 border-t border-[#dac0c2]/60">
                <label className="block font-courier text-[11px] text-[#7f5700] uppercase font-bold mb-1">
                  Or Paste Photo Link / URL:
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://example.com/my-photo.jpg"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    className="flex-1 px-2.5 py-1.5 text-xs bg-[#ffe9e2] border border-[#dac0c2] rounded font-mono focus:outline-hidden focus:border-[#6b1d2f]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-[#4e051a] hover:bg-[#6b1d2f] text-[#fff8f6] text-xs font-courier font-bold rounded transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </form>

              {/* Reset this photo */}
              {isCustomized && (
                <button
                  type="button"
                  onClick={handleResetCurrent}
                  className="w-full py-1.5 px-3 bg-[#ffe9e2] hover:bg-[#ffdacf] text-[#6b1d2f] border border-[#dac0c2] rounded text-xs font-courier transition-colors"
                >
                  ↺ Reset This Photo to Original
                </button>
              )}
            </div>
          </div>

          {/* Bulk Upload Section */}
          <div className="p-4 rounded-lg bg-[#ffe9e2]/60 border border-[#dac0c2] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <h4 className="font-bodoni font-bold text-sm text-[#4e051a]">
                Want to replace all pictures at once?
              </h4>
              <p className="text-xs font-newsreader text-[#544244]">
                Select multiple photos together; they will automatically fill Hero, Milestones, and Plates 1–14.
              </p>
            </div>
            <div>
              <input
                type="file"
                ref={bulkFileInputRef}
                accept="image/*"
                multiple
                onChange={handleBulkUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => bulkFileInputRef.current?.click()}
                disabled={isCompressing}
                className="whitespace-nowrap px-4 py-2 bg-[#7f5700] hover:bg-[#a37000] text-white rounded font-courier text-xs font-bold uppercase tracking-wider transition-colors shadow cursor-pointer disabled:opacity-50"
              >
                Upload Multiple Photos
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-[#f8e6e0] border-t border-[#dac0c2] flex items-center justify-between">
          <button
            type="button"
            onClick={handleResetAll}
            className="text-xs font-courier text-[#9c27b0] hover:underline"
          >
            Reset All to Original Photos
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-[#6b1d2f] hover:bg-[#85273d] text-[#fff8f6] text-xs font-courier font-bold uppercase rounded transition-colors shadow"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
