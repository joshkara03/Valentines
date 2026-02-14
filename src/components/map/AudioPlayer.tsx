import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

interface AudioPlayerProps {
  src?: string;
  title: string;
  autoPlay?: boolean;
  onStop?: () => void;
}

export function AudioPlayer({
  src,
  title,
  autoPlay = true,
  onStop,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!src || hasError) return;

    const audio = audioRef.current;
    if (!audio) return;

    if (autoPlay) {
      const playPromise = audio.play();
      if (playPromise) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
      onStop?.();
    };
  }, [src, autoPlay]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress(audio.currentTime);
    };

    const updateDuration = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", () => setIsPlaying(false));
    audio.addEventListener("error", () => setHasError(true));

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", () => setIsPlaying(false));
      audio.removeEventListener("error", () => setHasError(true));
    };
  }, []);

  if (!src || hasError) return null;

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audio.currentTime = percent * duration;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progressPercent = duration ? (progress / duration) * 100 : 0;

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-amber-200/40 backdrop-blur-sm" style={{ background: 'rgba(255,252,245,0.5)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5)' }}>
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Play/Pause Button */}
      <motion.button
        onClick={togglePlay}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-10 h-10 rounded-full bg-red-500/15 border border-red-400/25 flex items-center justify-center text-red-500 hover:bg-red-500/25 transition-colors flex-shrink-0"
      >
        {isPlaying ? (
          <Pause className="w-4 h-4" />
        ) : (
          <Play className="w-4 h-4 ml-0.5" />
        )}
      </motion.button>

      {/* Progress */}
      <div className="flex-1 min-w-0">
        <div className="text-xs text-amber-800/40 truncate mb-1.5" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          ♪ Now Playing
        </div>
        <div
          className="h-1.5 bg-amber-900/10 rounded-full cursor-pointer overflow-hidden"
          onClick={handleSeek}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ width: `${progressPercent}%`, background: 'linear-gradient(90deg, #c0392b, #e74c3c)' }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-amber-800/30">
            {formatTime(progress)}
          </span>
          <span className="text-[10px] text-amber-800/30">
            {duration ? formatTime(duration) : "--:--"}
          </span>
        </div>
      </div>

      {/* Volume indicator */}
      <div className="text-amber-800/30">
        {isPlaying ? (
          <Volume2 className="w-4 h-4" />
        ) : (
          <VolumeX className="w-4 h-4" />
        )}
      </div>
    </div>
  );
}
