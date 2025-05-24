import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface PlayerTurnProps {
  currentPlayer: number;
  playerNames: string[];
}

export default function PlayerTurn({ currentPlayer, playerNames }: PlayerTurnProps) {
  return (
    <div className="relative h-12 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPlayer}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute"
        >
          <Badge
            variant="outline"
            className={`px-6 py-2 text-lg font-medium ${
              currentPlayer === 1
                ? "bg-rose-100 border-rose-200 text-rose-700"
                : "bg-indigo-100 border-indigo-200 text-indigo-700"
            }`}
          >
            👤 {playerNames[currentPlayer - 1]} 的回合
          </Badge>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}