"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { RotateCcw } from "lucide-react";
import GameBoard from "@/components/GameBoard";
import PlayerTurn from "@/components/PlayerTurn";
import WinnerBanner from "@/components/WinnerBanner";
import PlayerNameDialog from "@/components/PlayerNameDialog";
import { useGameState } from "@/hooks/useGameState";

export default function MemoryGame() {
  const {
    cards,
    flippedIndices,
    matchedPairs,
    matchedByPlayer,
    currentPlayer,
    scores,
    gameOver,
    winner,
    playerNames,
    showNameDialog,
    handleCardClick,
    resetGame,
    updatePlayerNames,
  } = useGameState();

  const { toast } = useToast();

  // Show toast when a player makes a match
  useEffect(() => {
    if (matchedPairs.length > 0 && matchedPairs.length % 2 === 0) {
      const lastMatch = cards[matchedPairs[matchedPairs.length - 1]].emoji;
      toast({
        title: `${playerNames[currentPlayer - 1]} 匹配成功 ${lastMatch}！`,
        description: `${playerNames[currentPlayer - 1]} 获得额外回合。`,
        duration: 2000,
      });
    }
  }, [matchedPairs.length, cards, currentPlayer, playerNames, toast]);

  return (
    <>
      <PlayerNameDialog 
        isOpen={showNameDialog} 
        onSubmit={updatePlayerNames} 
      />
      
      <Card className="w-full shadow-2xl border-0 overflow-hidden relative backdrop-blur-sm bg-white/90">
        <div className="p-4 sm:p-6 md:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-rose-500 to-indigo-600 bg-clip-text text-transparent">
              记忆翻卡游戏
            </h1>
            <div className="flex items-center gap-3">
              <Badge 
                variant="outline" 
                className="text-sm px-3 py-1 bg-rose-50 border-rose-200 text-rose-700"
              >
                {playerNames[0]}: {scores[0]}
              </Badge>
              <Badge 
                variant="outline" 
                className="text-sm px-3 py-1 bg-indigo-50 border-indigo-200 text-indigo-700"
              >
                {playerNames[1]}: {scores[1]}
              </Badge>
            </div>
          </div>

          <PlayerTurn currentPlayer={currentPlayer} playerNames={playerNames} />

          <GameBoard
            cards={cards}
            flippedIndices={flippedIndices}
            matchedPairs={matchedPairs}
            matchedByPlayer={matchedByPlayer}
            handleCardClick={handleCardClick}
          />

          <div className="flex justify-center">
            <Button
              onClick={resetGame}
              variant="outline"
              className="px-6 gap-2 transition-all hover:scale-105 hover:shadow-md"
            >
              <RotateCcw className="w-4 h-4" />
              重新开始
            </Button>
          </div>
        </div>

        {gameOver && <WinnerBanner winner={winner} playerNames={playerNames} resetGame={resetGame} />}
      </Card>
    </>
  );
}