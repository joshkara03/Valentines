import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

interface YearSliderProps {
  minYear: number;
  maxYear: number;
  value: number;
  onChange: (year: number) => void;
  visible: boolean;
}

export function YearSlider({
  minYear,
  maxYear,
  value,
  onChange,
  visible,
}: YearSliderProps) {
  const years = Array.from(
    { length: maxYear - minYear + 1 },
    (_, i) => minYear + i
  );

  const percentage = ((value - minYear) / (maxYear - minYear)) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 30 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[500] w-[90%] max-w-[600px]"
    >
      <div
        className="flex flex-col gap-2 px-6 py-4 rounded-2xl bg-white/50 backdrop-blur-xl border border-white/50"
        style={{
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.6), 0 4px 24px rgba(139,109,71,0.08)",
        }}
      >
        {/* Label row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-amber-700/50" />
            <span
              className="text-amber-800/50 text-xs uppercase tracking-wider"
              style={{ fontFamily: "'Cormorant', serif" }}
            >
              Timeline
            </span>
          </div>
          <span
            className="text-amber-800 text-sm font-semibold"
            style={{ fontFamily: "'Cormorant', serif" }}
          >
            Up to{" "}
            <span className="text-amber-700">{value}</span>
          </span>
        </div>

        {/* Slider */}
        <div className="relative w-full">
          {/* Track background */}
          <div className="relative h-2 w-full rounded-full bg-amber-100/60 overflow-hidden">
            {/* Active track */}
            <div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: `${percentage}%`,
                background:
                  "linear-gradient(90deg, rgba(185,130,70,0.3), rgba(185,130,70,0.6))",
              }}
            />
          </div>

          {/* Native range input styled transparent on top */}
          <input
            type="range"
            min={minYear}
            max={maxYear}
            step={1}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer"
            style={{ margin: 0, top: 0 }}
          />

          {/* Custom thumb */}
          <div
            className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              left: `${percentage}%`,
              transform: `translateX(-50%) translateY(-50%)`,
            }}
          >
            <div
              className="w-5 h-5 rounded-full bg-white border-2 border-amber-600/60 shadow-md"
              style={{
                boxShadow:
                  "0 2px 8px rgba(185,130,70,0.3), inset 0 1px 0 rgba(255,255,255,0.8)",
              }}
            />
          </div>
        </div>

        {/* Year labels */}
        <div className="flex justify-between px-0.5">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => onChange(year)}
              className={`text-[10px] transition-all duration-200 cursor-pointer hover:text-amber-700 ${
                year <= value
                  ? "text-amber-700/70 font-medium"
                  : "text-amber-800/25"
              } ${year === value ? "text-amber-700 font-bold scale-110" : ""}`}
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
