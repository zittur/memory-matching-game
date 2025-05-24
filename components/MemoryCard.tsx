"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MemoryCardProps {
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
  matchedByPlayer?: number;
  onClick: () => void;
}

export default function MemoryCard({
  emoji,
  isFlipped,
  isMatched,
  matchedByPlayer,
  onClick,
}: MemoryCardProps) {
  const [flipped, setFlipped] = useState(isFlipped);

  useEffect(() => {
    setFlipped(isFlipped);
  }, [isFlipped]);

  // Get matched card styles based on which player matched it
  const getMatchedStyles = () => {
    if (!isMatched) return "border-gray-200";
    
    if (matchedByPlayer === 1) {
      return "border-rose-300 bg-rose-50";
    } else if (matchedByPlayer === 2) {
      return "border-indigo-300 bg-indigo-50";
    }
    
    // Fallback to original emerald style
    return "border-emerald-300 bg-emerald-50";
  };

  return (
    <div
      className={cn(
        "perspective-1000 relative aspect-square w-full cursor-pointer",
        isMatched && "pointer-events-none"
      )}
      onClick={!isFlipped && !isMatched ? onClick : undefined}
    >
      <div
        className={cn(
          "flip-card absolute w-full h-full transition-all duration-500 transform-style-3d",
          flipped && "rotate-y-180"
        )}
      >
        {/* Card Back */}
        <motion.div
          className={cn(
            "absolute w-full h-full bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl backface-hidden shadow-md flex items-center justify-center text-white text-3xl sm:text-4xl",
            isMatched && "opacity-0 pointer-events-none"
          )}
          whileHover={!isFlipped && !isMatched ? { scale: 1.05 } : {}}
          whileTap={!isFlipped && !isMatched ? { scale: 0.95 } : {}}
        >
          ⭐
        </motion.div>

        {/* Card Front */}
        <div
          className={cn(
            "absolute w-full h-full bg-white rounded-xl backface-hidden rotate-y-180 shadow-md border-2",
            getMatchedStyles(),
            "flex items-center justify-center text-4xl sm:text-5xl"
          )}
        >
          {emoji}
        </div>
      </div>
    </div>
  );
}