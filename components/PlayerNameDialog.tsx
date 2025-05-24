"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";

interface PlayerNameDialogProps {
  isOpen: boolean;
  onSubmit: (names: string[]) => void;
}

export default function PlayerNameDialog({ isOpen, onSubmit }: PlayerNameDialogProps) {
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");

  const handleSubmit = () => {
    const names = [
      player1Name.trim() || "Player 1",
      player2Name.trim() || "Player 2"
    ];
    onSubmit(names);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="sm:max-w-md border-0 shadow-2xl">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 15, stiffness: 300 }}
          className="flex flex-col items-center text-center p-4"
        >
          <div className="text-6xl mb-4">🎮</div>
          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-rose-500 to-indigo-600 bg-clip-text text-transparent">
            设置玩家名称
          </h2>
          <p className="text-muted-foreground mb-6">
            请输入两位玩家的名称，开始记忆翻卡游戏！
          </p>
          
          <div className="w-full space-y-4 mb-6">
            <div className="space-y-2">
              <Label htmlFor="player1" className="text-left block text-rose-700 font-medium">
                玩家 1 名称
              </Label>
              <Input
                id="player1"
                placeholder="输入玩家 1 的名称"
                value={player1Name}
                onChange={(e) => setPlayer1Name(e.target.value)}
                onKeyPress={handleKeyPress}
                className="border-rose-200 focus:border-rose-400 focus:ring-rose-400"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="player2" className="text-left block text-indigo-700 font-medium">
                玩家 2 名称
              </Label>
              <Input
                id="player2"
                placeholder="输入玩家 2 的名称"
                value={player2Name}
                onChange={(e) => setPlayer2Name(e.target.value)}
                onKeyPress={handleKeyPress}
                className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400"
              />
            </div>
          </div>
          
          <Button
            onClick={handleSubmit}
            size="lg"
            className="px-8 transition-all hover:scale-105 bg-gradient-to-r from-rose-500 to-indigo-600 hover:from-rose-600 hover:to-indigo-700"
          >
            开始游戏
          </Button>
        </motion.div>
      </AlertDialogContent>
    </AlertDialog>
  );
} 