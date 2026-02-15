import { useState, useEffect, useCallback } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
} from "react-leaflet";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import "leaflet/dist/leaflet.css";

import { memories, Memory } from "@/data/memories";
import { heartIcon } from "./HeartIcon";
import { MemoryModal } from "./MemoryModal";
import { WelcomeOverlay } from "./WelcomeOverlay";
import { FloatingHearts } from "./FloatingHearts";
import { YearSlider } from "./YearSlider";
import { LocationMenu } from "./LocationMenu";

const MIN_YEAR = 2018;
const MAX_YEAR = 2026;

function getYearFromDate(date?: string): number | null {
  if (!date) return null;
  const match = date.match(/\d{4}/);
  return match ? parseInt(match[0], 10) : null;
}

// Fix for default Leaflet marker icons
import L from "leaflet";
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Map bounds for Canada + Mexico
const BOUNDS: L.LatLngBoundsExpression = [
  [14, -140], // Southwest (Mexico south)
  [72, -50], // Northeast (Canada north)
];

const CENTER: L.LatLngExpression = [52, -96]; // Center of Canada

interface FlyToTarget {
  lat: number;
  lng: number;
  zoom: number;
}

function MapController({
  selectedMemory,
  flyToTarget,
  onFlyToComplete,
}: {
  selectedMemory: Memory | null;
  flyToTarget: FlyToTarget | null;
  onFlyToComplete: () => void;
}) {
  const map = useMap();

  useEffect(() => {
    if (selectedMemory) {
      map.flyTo([selectedMemory.lat, selectedMemory.lng], 8, {
        duration: 2,
        easeLinearity: 0.1,
      });
    }
  }, [selectedMemory, map]);

  useEffect(() => {
    if (flyToTarget) {
      map.flyTo([flyToTarget.lat, flyToTarget.lng], flyToTarget.zoom, {
        duration: 2,
        easeLinearity: 0.1,
      });
      onFlyToComplete();
    }
  }, [flyToTarget, map, onFlyToComplete]);

  return null;
}

export function MemoryMap() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [selectedYear, setSelectedYear] = useState(MAX_YEAR);
  const [flyToTarget, setFlyToTarget] = useState<FlyToTarget | null>(null);

  const handleFlyToComplete = useCallback(() => {
    setFlyToTarget(null);
  }, []);

  const handleZoomToCity = useCallback((lat: number, lng: number, zoom: number) => {
    setFlyToTarget({ lat, lng, zoom });
  }, []);

  const filteredMemories = memories.filter((memory) => {
    const year = getYearFromDate(memory.date);
    if (year === null) return true; // show memories without dates
    return year <= selectedYear;
  });

  const handleMarkerClick = (memory: Memory) => {
    setSelectedMemory(memory);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedMemory(null), 300);
  };

  const handleEnter = () => {
    setShowWelcome(false);
    setTimeout(() => setMapReady(true), 100);
  };

  return (
    <div className="relative w-full h-screen bg-[#f5f0e8] overflow-hidden">
      {/* Custom CSS overrides for Leaflet warm theme */}
      <style>{`
        .leaflet-container {
          background: #e8e0d0 !important;
          font-family: 'Cormorant Garamond', Georgia, serif;
        }
        .leaflet-control-zoom {
          border: 1px solid rgba(139, 109, 71, 0.2) !important;
          border-radius: 16px !important;
          overflow: hidden;
          backdrop-filter: blur(16px) saturate(1.4);
          -webkit-backdrop-filter: blur(16px) saturate(1.4);
          box-shadow: 0 4px 24px rgba(139, 109, 71, 0.08), inset 0 1px 0 rgba(255,255,255,0.6) !important;
        }
        .leaflet-control-zoom a {
          background: rgba(255, 252, 245, 0.5) !important;
          color: rgba(101, 75, 47, 0.7) !important;
          border-color: rgba(139, 109, 71, 0.12) !important;
          width: 38px !important;
          height: 38px !important;
          line-height: 38px !important;
          font-size: 18px !important;
          font-family: 'Cormorant', serif !important;
        }
        .leaflet-control-zoom a:hover {
          background: rgba(255, 252, 245, 0.75) !important;
          color: rgba(101, 75, 47, 1) !important;
        }
        .leaflet-control-attribution {
          background: rgba(245, 240, 232, 0.6) !important;
          color: rgba(139, 109, 71, 0.35) !important;
          font-size: 10px !important;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-radius: 8px 0 0 0 !important;
          font-family: 'Cormorant Garamond', serif !important;
        }
        .leaflet-control-attribution a {
          color: rgba(185, 130, 70, 0.5) !important;
        }
        .leaflet-tooltip {
          background: rgba(255, 252, 245, 0.75) !important;
          border: 1px solid rgba(185, 130, 70, 0.25) !important;
          color: #5c4433 !important;
          border-radius: 12px !important;
          padding: 8px 14px !important;
          font-size: 13px !important;
          font-weight: 500 !important;
          font-family: 'Cormorant Garamond', serif !important;
          backdrop-filter: blur(16px) saturate(1.4) !important;
          -webkit-backdrop-filter: blur(16px) saturate(1.4) !important;
          box-shadow: 0 4px 24px rgba(139, 109, 71, 0.1), inset 0 1px 0 rgba(255,255,255,0.5) !important;
        }
        .leaflet-tooltip-top:before {
          border-top-color: rgba(185, 130, 70, 0.25) !important;
        }
        .leaflet-tooltip-bottom:before {
          border-bottom-color: rgba(185, 130, 70, 0.25) !important;
        }
        .leaflet-marker-icon {
          filter: drop-shadow(0 2px 6px rgba(185, 50, 50, 0.3));
          cursor: pointer !important;
          transition: filter 0.3s ease, transform 0.3s ease;
        }
        .leaflet-marker-icon:hover {
          filter: drop-shadow(0 4px 12px rgba(185, 50, 50, 0.5)) brightness(1.05);
        }
        .leaflet-tile-pane {
          filter: none !important;
        }
        .leaflet-zoom-anim .leaflet-zoom-animated {
          transition: transform 0.35s cubic-bezier(0.25, 0.1, 0.25, 1) !important;
        }
        .leaflet-fade-anim .leaflet-popup {
          transition: opacity 0.3s ease !important;
        }
        .leaflet-zoom-anim .leaflet-tile {
          transition: none !important;
        }
        /* Custom scrollbar for modal */
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(139, 109, 71, 0.05);
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(185, 130, 70, 0.3);
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(185, 130, 70, 0.5);
        }
      `}</style>

      {/* Welcome Overlay */}
      {showWelcome && <WelcomeOverlay onEnter={handleEnter} />}

      {/* Floating Hearts Background */}
      <FloatingHearts />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: showWelcome ? 0 : 1, y: showWelcome ? -20 : 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute top-0 left-0 right-0 z-[500] pointer-events-none"
      >
        <div className="flex items-center justify-center gap-3 py-4">
          <div className="flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-amber-950/10 backdrop-blur-xl border border-amber-900/10 shadow-lg shadow-amber-900/5" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 24px rgba(139,109,71,0.15)' }}>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span className="text-amber-900/80 text-sm font-medium tracking-wide" style={{ fontFamily: "'Cormorant', serif" }}>
              Our Memory Map
            </span>
            <span className="text-amber-800/30 text-xs" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              · {filteredMemories.length} memories
            </span>
          </div>
        </div>
      </motion.div>

      {/* Map */}
      <div className={`w-full h-full transition-opacity duration-1000 ${showWelcome ? "opacity-0" : "opacity-100"}`}>
        <MapContainer
          center={CENTER}
          zoom={4}
          minZoom={3}
          maxZoom={12}
          maxBounds={BOUNDS}
          maxBoundsViscosity={0.8}
          zoomControl={true}
          zoomSnap={0.25}
          zoomDelta={0.5}
          wheelPxPerZoomLevel={120}
          zoomAnimation={true}
          style={{ height: "100%", width: "100%" }}
          whenReady={() => setMapReady(true)}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={19}
          />

          <MapController
            selectedMemory={isModalOpen ? selectedMemory : null}
            flyToTarget={flyToTarget}
            onFlyToComplete={handleFlyToComplete}
          />

          {filteredMemories.map((memory) => (
            <Marker
              key={memory.id}
              position={[memory.lat, memory.lng]}
              icon={heartIcon}
              eventHandlers={{
                click: () => handleMarkerClick(memory),
              }}
            >
              <Tooltip direction="top" offset={[0, -40]}>
                <div className="flex items-center gap-1.5">
                  <span>💕</span>
                  <span>{memory.title}</span>
                  {memory.date && (
                    <span className="text-amber-800/40 text-[11px]">
                      · {memory.date}
                    </span>
                  )}
                </div>
              </Tooltip>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Memory count indicator */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: showWelcome ? 0 : 1, x: showWelcome ? -20 : 0 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-28 left-6 z-[500] pointer-events-none"
      >
        <div className="flex flex-col gap-1.5 px-4 py-3 rounded-2xl bg-amber-950/10 backdrop-blur-xl border border-amber-900/10" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 24px rgba(139,109,71,0.15)' }}>
          <span className="text-amber-800/50 text-xs uppercase tracking-wider" style={{ fontFamily: "'Cormorant', serif" }}>
            Memories
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-amber-800" style={{ fontFamily: "'Cormorant', serif" }}>
              {filteredMemories.length}
            </span>
            <span className="text-amber-800/30 text-xs" style={{ fontFamily: "'Cormorant Garamond', serif" }}>places</span>
          </div>
        </div>
      </motion.div>

      {/* Instruction hint */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showWelcome ? 0 : 0.6, y: showWelcome ? 20 : 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-28 right-6 z-[500] pointer-events-none"
      >
        <motion.div
          animate={{ opacity: [0.6, 0.3, 0.6] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="px-4 py-2 rounded-full bg-amber-950/10 backdrop-blur-xl border border-amber-900/10 text-amber-800/50 text-xs" style={{ fontFamily: "'Cormorant Garamond', serif", boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)' }}
        >
          Click a heart to open a memory 💗
        </motion.div>
      </motion.div>

      {/* Year Slider */}
      <YearSlider
        minYear={MIN_YEAR}
        maxYear={MAX_YEAR}
        value={selectedYear}
        onChange={setSelectedYear}
        visible={!showWelcome}
      />

      {/* Location Menu */}
      <LocationMenu onZoomTo={handleZoomToCity} visible={!showWelcome} />

      {/* Memory Modal */}
      <MemoryModal
        memory={selectedMemory}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
