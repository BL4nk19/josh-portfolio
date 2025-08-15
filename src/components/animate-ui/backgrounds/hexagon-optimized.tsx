"use client";

import { motion } from "framer-motion";
import { usePerformanceMode } from "@/hooks/use-performance-mode";

interface HexagonBackgroundProps {
  className?: string;
}

export function HexagonBackgroundOptimized({ className }: HexagonBackgroundProps) {
  const { performanceMode } = usePerformanceMode();

  // Adaptive animation based on performance mode
  const animationConfig = performanceMode 
    ? {
        // High performance mode: simpler animations
        duration: 8,
        repeat: Infinity,
        ease: "linear",
        scale: [1, 1.05, 1],
        opacity: [0.3, 0.4, 0.3]
      }
    : {
        // Normal mode: full animations
        duration: 12,
        repeat: Infinity,
        ease: "linear",
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.5, 0.3]
      };

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Performance-adaptive hexagon grid */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)
          `,
          backgroundSize: performanceMode ? '200px 200px' : '150px 150px',
        }}
        animate={animationConfig}
        transition={{
          duration: animationConfig.duration,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Simplified hexagon pattern in performance mode */}
      {!performanceMode && (
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                60deg,
                transparent,
                transparent 20px,
                rgba(59, 130, 246, 0.1) 20px,
                rgba(59, 130, 246, 0.1) 40px
              ),
              repeating-linear-gradient(
                -60deg,
                transparent,
                transparent 20px,
                rgba(147, 51, 234, 0.1) 20px,
                rgba(147, 51, 234, 0.1) 40px
              )
            `,
            backgroundSize: '40px 40px',
          }}
          animate={{
            x: [0, 20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      )}
    </div>
  );
}
