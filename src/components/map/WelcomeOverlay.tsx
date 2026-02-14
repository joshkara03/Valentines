import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MapPin } from "lucide-react";

interface WelcomeOverlayProps {
  onEnter: () => void;
}

export function WelcomeOverlay({ onEnter }: WelcomeOverlayProps) {
  const [isExiting, setIsExiting] = useState(false);

  const floatingHearts = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 12 + Math.random() * 12,
        size: 14 + Math.random() * 20,
        opacity: 0.06 + Math.random() * 0.1,
        emoji: i % 4 === 0 ? '♥' : i % 4 === 1 ? '❤' : i % 4 === 2 ? '💕' : '♡',
      })),
    []
  );

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(onEnter, 800);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[2000] flex items-center justify-center"
          style={{ background: 'linear-gradient(180deg, #f5f0e8 0%, #ede4d4 50%, #f5f0e8 100%)' }}
        >
          {/* Soft floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: 4 + Math.random() * 8,
                  height: 4 + Math.random() * 8,
                  background: i % 3 === 0 
                    ? 'rgba(185, 130, 70, 0.15)' 
                    : i % 3 === 1 
                    ? 'rgba(200, 160, 90, 0.12)' 
                    : 'rgba(180, 60, 60, 0.08)',
                }}
                animate={{
                  opacity: [0.1, 0.5, 0.1],
                  scale: [0.5, 1.2, 0.5],
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Subtle decorative hearts scattered around */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={`heart-${i}`}
                className="absolute text-red-400/10"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                  fontSize: 20 + Math.random() * 40,
                }}
                animate={{
                  opacity: [0.05, 0.15, 0.05],
                  rotate: [-5, 5, -5],
                  scale: [0.9, 1.1, 0.9],
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              >
                ♥
              </motion.div>
            ))}
          </div>

          {/* Floating hearts rising from bottom */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {floatingHearts.map((heart) => (
              <motion.div
                key={`float-${heart.id}`}
                initial={{
                  x: `${heart.x}vw`,
                  y: "110vh",
                  opacity: 0,
                }}
                animate={{
                  y: "-10vh",
                  opacity: [0, heart.opacity, heart.opacity, 0],
                }}
                transition={{
                  duration: heart.duration,
                  repeat: Infinity,
                  delay: heart.delay,
                  ease: "linear",
                }}
                style={{
                  position: "absolute",
                  fontSize: heart.size,
                  color: 'rgba(192, 57, 43, 0.5)',
                }}
              >
                {heart.emoji}
              </motion.div>
            ))}
          </div>

          <div className="relative text-center space-y-8 px-6">
            {/* Animated heart */}
            <motion.div
              animate={{
                scale: [1, 1.12, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="flex justify-center"
            >
              <div className="relative">
                <Heart
                  className="w-20 h-20 text-red-500 fill-red-500"
                  strokeWidth={1}
                />
                <motion.div
                  animate={{
                    scale: [1, 1.5],
                    opacity: [0.4, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Heart
                    className="w-20 h-20 text-red-400"
                    strokeWidth={1}
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <h1 className="text-5xl md:text-7xl font-light text-amber-900 tracking-[0.04em] uppercase" style={{ fontFamily: "'Cormorant', serif" }}>
                Our Memory Map
              </h1>
              <div className="w-16 h-px mx-auto bg-gradient-to-r from-transparent via-amber-700/30 to-transparent" />
              <p className="text-amber-800/50 text-lg max-w-md mx-auto leading-relaxed tracking-wide italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Every pin holds a story. Every story holds a piece of us.
              </p>
            </motion.div>

            {/* Enter button - liquid glass style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                onClick={handleEnter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-10 py-4 rounded-full text-white font-medium text-lg overflow-hidden tracking-wider"
                style={{
                  background: 'linear-gradient(135deg, #c0392b, #a93226, #922b21)',
                  boxShadow: '0 8px 32px rgba(192, 57, 43, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
                  fontFamily: "'Cormorant', serif",
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Explore Our Memories
                </span>
                <motion.div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(135deg, #a93226, #c0392b, #e74c3c)' }}
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </motion.div>

            {/* Decorative text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-amber-700/20 text-sm"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              ✧ Click on the hearts to relive our moments ✧
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
