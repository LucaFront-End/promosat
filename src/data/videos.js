/* ──────────────────────────────────────────────
   Video CDN helper
   - Dev (localhost): serves from /public/videos/ via Vite
   - Production: serves from GitHub LFS via media.githubusercontent.com
   ────────────────────────────────────────────── */

const LFS_BASE = 'https://media.githubusercontent.com/media/LucaFront-End/promosat/main/public/videos';

const isDev = typeof window !== 'undefined' && window.location.hostname === 'localhost';

/**
 * Get the full URL for a video file.
 * @param {string} filename - e.g. "hero_reel.mp4"
 * @returns {string} Full URL (local or CDN)
 */
export function getVideoUrl(filename) {
  if (isDev) {
    return `/videos/${filename}`;
  }
  return `${LFS_BASE}/${filename}`;
}

// Pre-built URLs for convenience
export const HERO_VIDEO = getVideoUrl('hero_reel.mp4');

export const STATION_VIDEOS = {
  leon: getVideoUrl('PROMO_LEON.mp4'),
  'zona-tres': getVideoUrl('Video_IDENTIDAD_ZONA_TRES.mp4'),
  'radio-mujer': getVideoUrl('Video_Radio_Mujer.mp4'),
  'fiesta-mexicana': getVideoUrl('fiesta_mexicana.mp4'),
};
