import { useEffect, useCallback } from "react";
import { X, MapPin, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Memory } from "@/data/memories";
import { ImageCarousel } from "./ImageCarousel";
import { AudioPlayer } from "./AudioPlayer";
import { SpotifyPlayer } from "./SpotifyPlayer";
import { TypewriterText } from "./TypewriterText";

interface MemoryModalProps {
  memory: Memory | null;
  isOpen: boolean;
  onClose: () => void;
}

export function MemoryModal({ memory, isOpen, onClose }: MemoryModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && memory && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-amber-950/30 backdrop-blur-md z-[1000]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="fixed inset-0 z-[1001] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto pointer-events-auto rounded-2xl border border-white/50 shadow-2xl"
              style={{
                background: 'rgba(255, 252, 245, 0.75)',
                backdropFilter: 'blur(24px) saturate(1.5)',
                WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.7), 0 8px 40px rgba(139,109,71,0.12), 0 2px 8px rgba(139,109,71,0.08)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/50 backdrop-blur-sm border border-amber-200/50 flex items-center justify-center text-amber-800/50 hover:text-amber-900 hover:bg-white/70 transition-colors"
                style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6)' }}
              >
                <X className="w-4 h-4" />
              </motion.button>

              {/* Image Carousel */}
              <div className="p-3 pb-0">
                <ImageCarousel
                  images={memory.images}
                  title={memory.title}
                />
              </div>

              {/* Content */}
              <div className="p-5 space-y-4">
                {/* Title with heart animation */}
                <div className="space-y-1">
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl font-bold text-amber-900 flex items-center gap-2"
                    style={{ fontFamily: "'Cormorant', serif" }}
                  >
                    <motion.span
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "loop",
                      }}
                    >
                      💕
                    </motion.span>
                    {memory.title}
                  </motion.h2>

                  {/* Meta info */}
                  <div className="flex items-center gap-4 text-sm text-amber-800/40">
                    {memory.date && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center gap-1"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        {memory.date}
                      </motion.span>
                    )}
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center gap-1"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      {memory.lat.toFixed(2)}°, {memory.lng.toFixed(2)}°
                    </motion.span>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-amber-700/20 to-transparent" />

                {/* Typewriter text */}
                <TypewriterText
                  text={memory.text}
                  speed={25}
                  className="text-amber-900/70 leading-relaxed italic text-sm"
                />

                {/* Audio Player */}
                {memory.audio && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <AudioPlayer
                      src={memory.audio}
                      title={memory.title}
                      autoPlay={true}
                    />
                  </motion.div>
                )}

                {/* Spotify Player */}
                {memory.spotifyTrackId && (
                  <SpotifyPlayer trackId={memory.spotifyTrackId} />
                )}

                {/* Decorative bottom */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-center text-amber-700/20 text-xs pt-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  ✧ A memory worth keeping forever ✧
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
