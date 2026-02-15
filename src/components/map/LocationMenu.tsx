import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ChevronUp, Globe } from "lucide-react";

const DEFAULT_CENTER = { lat: 52, lng: -96, zoom: 4 };

interface LocationZoom {
  name: string;
  emoji: string;
  lat: number;
  lng: number;
  zoom: number;
}

const LOCATIONS: LocationZoom[] = [
  { name: "Edmonton", emoji: "🏔️", lat: 53.52, lng: -113.55, zoom: 11 },
  { name: "Calgary", emoji: "🤠", lat: 51.05, lng: -114.45, zoom: 10 },
  { name: "Toronto", emoji: "🏙️", lat: 43.65, lng: -79.38, zoom: 11 },
  { name: "Mexico", emoji: "🌴", lat: 21.12, lng: -87.19, zoom: 10 },
];

interface LocationMenuProps {
  onZoomTo: (lat: number, lng: number, zoom: number) => void;
  visible: boolean;
}

export function LocationMenu({ onZoomTo, visible }: LocationMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="absolute bottom-[120px] left-1/2 -translate-x-1/2 z-[500]"
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="flex gap-2 mb-2 justify-center flex-wrap"
          >
            {LOCATIONS.map((loc) => (
              <motion.button
                key={loc.name}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  onZoomTo(loc.lat, loc.lng, loc.zoom);
                  setIsOpen(false);
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-amber-950/10 backdrop-blur-xl border border-amber-900/10 text-amber-900/80 text-xs font-medium hover:bg-amber-950/15 transition-colors cursor-pointer"
                style={{
                  fontFamily: "'Cormorant', serif",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 16px rgba(139,109,71,0.15)",
                }}
              >
                <span className="text-sm">{loc.emoji}</span>
                {loc.name}
              </motion.button>
            ))}
            <motion.button
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                onZoomTo(DEFAULT_CENTER.lat, DEFAULT_CENTER.lng, DEFAULT_CENTER.zoom);
                setIsOpen(false);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-amber-950/15 backdrop-blur-xl border border-amber-900/15 text-amber-900/80 text-xs font-medium hover:bg-amber-950/20 transition-colors cursor-pointer"
              style={{
                fontFamily: "'Cormorant', serif",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 16px rgba(139,109,71,0.15)",
              }}
            >
              <Globe className="w-3.5 h-3.5" />
              Overview
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-950/10 backdrop-blur-xl border border-amber-900/10 text-amber-900/70 text-xs font-medium hover:bg-amber-950/15 transition-colors cursor-pointer"
          style={{
            fontFamily: "'Cormorant', serif",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 24px rgba(139,109,71,0.15)",
          }}
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>Fly to a City</span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronUp className="w-3.5 h-3.5" />
          </motion.span>
        </motion.button>
      </div>
    </motion.div>
  );
}
