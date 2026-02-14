import { motion } from "framer-motion";
import { useMemo } from "react";

export function FloatingHearts() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 10 + Math.random() * 15,
        size: 10 + Math.random() * 16,
        opacity: 0.04 + Math.random() * 0.08,
        emoji: i % 3 === 0 ? '♥' : i % 3 === 1 ? '❤' : '💕',
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
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
            color: 'rgba(192, 57, 43, 0.6)',
          }}
        >
          {heart.emoji}
        </motion.div>
      ))}
    </div>
  );
}
