import L from "leaflet";

// Create a heart-shaped SVG marker icon with warm red tones
const heartSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36">
  <defs>
    <filter id="glow">
      <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#c0392b"/>
      <stop offset="100%" style="stop-color:#e74c3c"/>
    </linearGradient>
  </defs>
  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
    fill="url(#heartGrad)" 
    stroke="#f5c6c2" 
    stroke-width="0.5"
    filter="url(#glow)"
  />
</svg>
`;

const heartIconUrl =
  "data:image/svg+xml;base64," + btoa(heartSvg);

export const heartIcon = new L.Icon({
  iconUrl: heartIconUrl,
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
});

// Hover/active state icon (larger, brighter)
const heartSvgActive = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="44" height="44">
  <defs>
    <filter id="glowActive">
      <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <linearGradient id="heartGradActive" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#e74c3c"/>
      <stop offset="100%" style="stop-color:#c0392b"/>
    </linearGradient>
  </defs>
  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
    fill="url(#heartGradActive)" 
    stroke="#fff" 
    stroke-width="0.8"
    filter="url(#glowActive)"
  />
</svg>
`;

const heartIconActiveUrl =
  "data:image/svg+xml;base64," + btoa(heartSvgActive);

export const heartIconActive = new L.Icon({
  iconUrl: heartIconActiveUrl,
  iconSize: [44, 44],
  iconAnchor: [22, 44],
  popupAnchor: [0, -44],
});
