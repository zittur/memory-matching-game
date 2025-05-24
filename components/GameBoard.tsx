"use client";

import { motion } from "framer-motion";
import MemoryCard from "@/components/MemoryCard";
import { Card } from "@/lib/types";

interface GameBoardProps {
  cards: Card[];
  flippedIndices: number[];
  matchedPairs: number[];
  matchedByPlayer: Record<number, number>;
  handleCardClick: (index: number) => void;
}

export default function GameBoard({
  cards,
  flippedIndices,
  matchedPairs,
  matchedByPlayer,
  handleCardClick,
}: GameBoardProps) {
  return (
    <div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-lg mx-auto">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: index * 0.03,
          }}
        >
          <MemoryCard
            emoji={card.emoji}
            isFlipped={
              flippedIndices.includes(index) || matchedPairs.includes(index)
            }
            isMatched={matchedPairs.includes(index)}
            matchedByPlayer={matchedByPlayer[index]}
            onClick={() => handleCardClick(index)}
          />
        </motion.div>
      ))}
    </div>
  );
}