import { motion } from "framer-motion";

interface SpotifyPlayerProps {
  trackId: string;
}

export function SpotifyPlayer({ trackId }: SpotifyPlayerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="rounded-xl overflow-hidden border border-amber-200/40"
      style={{
        background: "rgba(255,252,245,0.5)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.5)",
      }}
    >
      <iframe
        key={trackId}
        src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0&autoplay=1`}
        width="100%"
        height="80"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        style={{
          borderRadius: "12px",
          border: "none",
        }}
        title="Spotify Player"
      />
    </motion.div>
  );
}
