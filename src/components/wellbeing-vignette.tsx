"use client";

import { useWellbeing } from "@/lib/wellbeing-context";
import { motion } from "framer-motion";

export function WellbeingVignette() {
  const { wellbeing } = useWellbeing();
  
  // W ranges from 0 to 1. 0.7 is baseline.
  // When W < 0.7, we increase saturation/darkness or add a red tint.
  // When W > 0.7, we add a subtle glow or clarity.
  
  const intensity = Math.max(0, (0.7 - wellbeing.w) * 1.5); // 0 at baseline, higher as battery drops
  const highIntensity = Math.max(0, (wellbeing.w - 0.7) * 1.5); // 0 at baseline, higher as battery rises

  return (
    <>
      {/* Low Wellbeing: Dark Red Vignette & Grain */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden"
        animate={{
          boxShadow: `inset 0 0 ${intensity * 150}px rgba(220, 38, 38, ${intensity * 0.3})`,
        }}
        transition={{ duration: 1 }}
      />
      
      {/* High Wellbeing: Subtle Amber/Gold Glow */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden"
        animate={{
          boxShadow: `inset 0 0 ${highIntensity * 100}px rgba(245, 158, 11, ${highIntensity * 0.15})`,
        }}
        transition={{ duration: 1 }}
      />

      {/* Global Grain Filter that scales with "stress" (low battery) */}
      <div className="fixed inset-0 pointer-events-none z-[9997] opacity-[0.03] mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <filter id="wellbeingNoise">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency={0.6 + (intensity * 0.4)} 
              numOctaves="3" 
              stitchTiles="stitch" 
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#wellbeingNoise)" />
        </svg>
      </div>
    </>
  );
}
