import { useState, useEffect } from 'react';

const STORAGE_KEY = 'wedding_retro_custom_photos';

// Helper to get all custom photos from localStorage
export function getAllCustomPhotos(): Record<string, string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.warn('Could not read custom photos from localStorage', e);
    return {};
  }
}

// Helper to save custom photos
export function saveCustomPhoto(photoKey: string, dataUrlOrUrl: string) {
  try {
    const current = getAllCustomPhotos();
    current[photoKey] = dataUrlOrUrl;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    window.dispatchEvent(new CustomEvent('custom-photos-updated', { detail: { photoKey } }));
  } catch (e) {
    console.error('Failed to save photo to localStorage', e);
    alert('Storage limit reached. Try using an image URL or a smaller image file.');
  }
}

// Reset single photo
export function resetCustomPhoto(photoKey: string) {
  try {
    const current = getAllCustomPhotos();
    delete current[photoKey];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    window.dispatchEvent(new CustomEvent('custom-photos-updated', { detail: { photoKey } }));
  } catch (e) {
    console.error('Failed to reset photo', e);
  }
}

// Reset all photos
export function resetAllCustomPhotos() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('custom-photos-updated', { detail: {} }));
  } catch (e) {
    console.error('Failed to reset all photos', e);
  }
}

// React Hook to get reactive custom photos
export function useCustomPhotos() {
  const [customPhotos, setCustomPhotos] = useState<Record<string, string>>(() => getAllCustomPhotos());

  useEffect(() => {
    const handleUpdate = () => {
      setCustomPhotos(getAllCustomPhotos());
    };
    window.addEventListener('custom-photos-updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('custom-photos-updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const getPhoto = (key: string, fallback: string) => {
    return customPhotos[key] || fallback;
  };

  return { customPhotos, getPhoto, savePhoto: saveCustomPhoto, resetPhoto: resetCustomPhoto, resetAll: resetAllCustomPhotos };
}
