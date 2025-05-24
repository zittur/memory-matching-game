import { motion } from "framer-motion";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import Confetti from "@/components/Confetti";

interface WinnerBannerProps {
  winner: number | null;
  playerNames: string[];
  resetGame: () => void;
}

// 音效播放函数
const playWinnerSound = (winner: number | null) => {
  try {
    let audioFile = "";
    
    if (winner === 1) {
      audioFile = "/winner.mp3";
    } else if (winner === 2) {
      audioFile = "/winner2.mp3";
    } else if (winner === 0) {
      audioFile = "/tie.mp3";
    }
    
    if (audioFile) {
      const audio = new Audio(audioFile);
      audio.volume = 0.6; // 设置音量为60%
      audio.play().catch((error) => {
        console.log("音效播放失败:", error);
        // 静默处理音效播放失败，不影响游戏体验
      });
    }
  } catch (error) {
    console.log("音效加载失败:", error);
    // 静默处理音效加载失败
  }
};

export default function WinnerBanner({ winner, playerNames, resetGame }: WinnerBannerProps) {
  // 当获胜者确定时播放音效
  useEffect(() => {
    if (winner !== null) {
      // 延迟一点播放音效，让动画先开始
      const timer = setTimeout(() => {
        playWinnerSound(winner);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [winner]);

  if (winner === null) return null;

  const getWinnerName = () => {
    if (winner === 0) return null; // Tie
    return playerNames[winner - 1];
  };

  return (
    <>
      <Confetti />
      <AlertDialog defaultOpen={true}>
        <AlertDialogContent className="sm:max-w-md border-0 shadow-2xl">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 15, stiffness: 300 }}
            className="flex flex-col items-center text-center p-4"
          >
            <div className="text-6xl mb-3">🏆</div>
            <h2 className="text-2xl font-bold mb-2">
              {winner === 0
                ? "平局！"
                : `${getWinnerName()} 获胜！`}
            </h2>
            <p className="text-muted-foreground mb-6">
              {winner === 0
                ? "精彩的游戏！两位玩家匹配了相同数量的卡片。"
                : `恭喜！${getWinnerName()} 找到了最多的匹配卡片。`}
            </p>
            <Button
              onClick={resetGame}
              size="lg"
              className="px-8 transition-all hover:scale-105"
            >
              再玩一局
            </Button>
          </motion.div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}