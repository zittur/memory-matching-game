import { useState, useCallback, useEffect } from "react";
import { shuffleArray } from "@/lib/utils";
import { Card } from "@/lib/types";

// 扩展的Emoji表情池 - 包含多种类别的表情符号
const emojiPool = [
  // 食物类
  "🍎", "🍌", "🍓", "🍇", "🍊", "🥝", "🍑", "🍒", "🥭", "🍍",
  "🥥", "🍅", "🥕", "🌽", "🥒", "🥬", "🥦", "🍞", "🧀", "🍖",
  "🍗", "🥓", "🍕", "🍔", "🌭", "🥪", "🌮", "🍜", "🍦", "🍰",
  
  // 动物类
  "🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯",
  "🦁", "🐮", "🐷", "🐸", "🐵", "🐔", "🐧", "🐦", "🦄", "🐺",
  "🦝", "🦔", "🐙", "🦀", "🐠", "🐡", "🦋", "🐝", "🐞", "🦗",
  
  // 物品类
  "⚽", "🏀", "🏈", "🎾", "🏐", "🎱", "🎮", "🎯", "🎲", "🎸",
  "🎹", "🎺", "🎻", "🥁", "📱", "💻", "⌚", "📷", "🎧", "🚗",
  "🚕", "🚙", "🚌", "🚎", "🏎️", "🚓", "🚑", "🚒", "✈️", "🚢",
  
  // 自然类
  "🌸", "🌺", "🌻", "🌷", "🌹", "🌙", "⭐", "☀️", "🌈", "⚡",
  "🔥", "💧", "❄️", "🌊", "🌍", "🌎", "🌏", "🌋", "🏔️", "⛰️",
  
  // 表情类
  "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇",
  "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚",
  "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🤩",
  
  // 符号类
  "💎", "💰", "🏆", "🎁", "🎈", "🎉", "🎊", "🎀", "🎗️", "🏅",
  "🔮", "💫", "⭐", "🌟", "✨", "🎯", "🎪", "🎭", "🎨", "🎬"
];

// 从表情池中随机选择指定数量的不重复表情
const getRandomEmojis = (count: number): string[] => {
  const shuffled = shuffleArray([...emojiPool]);
  return shuffled.slice(0, count);
};

// 音效播放函数
const playSound = (soundFile: string, volume: number = 0.4) => {
  try {
    const audio = new Audio(soundFile);
    audio.volume = volume;
    audio.play().catch((error) => {
      console.log(`音效播放失败 (${soundFile}):`, error);
      // 静默处理音效播放失败，不影响游戏体验
    });
  } catch (error) {
    console.log(`音效加载失败 (${soundFile}):`, error);
    // 静默处理音效加载失败
  }
};

export function useGameState() {
  // Initialize cards
  const [cards, setCards] = useState<Card[]>([]);
  
  // Game state
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [matchedByPlayer, setMatchedByPlayer] = useState<Record<number, number>>({});
  const [currentPlayer, setCurrentPlayer] = useState<number>(1);
  const [scores, setScores] = useState<number[]>([0, 0]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [winner, setWinner] = useState<number | null>(null);
  
  // Player names state
  const [playerNames, setPlayerNames] = useState<string[]>(["Player 1", "Player 2"]);
  const [showNameDialog, setShowNameDialog] = useState<boolean>(true);

  // Initialize game on first render
  useEffect(() => {
    initializeGame();
  }, []);

  // Initialize or reset the game
  const initializeGame = useCallback(() => {
    // 从表情池中随机选择8个不同的表情符号
    const selectedEmojis = getRandomEmojis(8);
    
    // Create paired emoji cards and shuffle
    const pairedEmojis = [...selectedEmojis, ...selectedEmojis];
    const shuffledEmojis = shuffleArray(pairedEmojis);
    const newCards = shuffledEmojis.map((emoji) => ({ emoji }));
    
    setCards(newCards);
    setFlippedIndices([]);
    setMatchedPairs([]);
    setMatchedByPlayer({});
    setCurrentPlayer(1);
    setScores([0, 0]);
    setGameOver(false);
    setWinner(null);
  }, []);

  // Handle card click
  const handleCardClick = useCallback(
    (index: number) => {
      // Prevent clicking if two cards are already flipped or the card is already matched
      if (flippedIndices.length === 2 || matchedPairs.includes(index)) {
        return;
      }

      // Prevent clicking on an already flipped card
      if (flippedIndices.includes(index)) {
        return;
      }

      // 播放翻卡音效
      playSound("/flipcard.mp3", 0.3);

      // Flip the card
      const newFlippedIndices = [...flippedIndices, index];
      setFlippedIndices(newFlippedIndices);

      // If this is the second card flipped, check for a match
      if (newFlippedIndices.length === 2) {
        const [firstIndex, secondIndex] = newFlippedIndices;

        // Check if the two flipped cards match
        if (cards[firstIndex].emoji === cards[secondIndex].emoji) {
          // Match found - 播放匹配成功音效
          playSound("/correct.mp3", 0.5);
          
          const newMatchedPairs = [...matchedPairs, firstIndex, secondIndex];
          const newMatchedByPlayer = { ...matchedByPlayer };
          newMatchedByPlayer[firstIndex] = currentPlayer;
          newMatchedByPlayer[secondIndex] = currentPlayer;
          
          // Update scores for the current player
          const newScores = [...scores];
          newScores[currentPlayer - 1] += 1;
          
          setTimeout(() => {
            setMatchedPairs(newMatchedPairs);
            setMatchedByPlayer(newMatchedByPlayer);
            setScores(newScores);
            setFlippedIndices([]);
            
            // Check if the game is over
            if (newMatchedPairs.length === cards.length) {
              setGameOver(true);
              
              // Determine the winner
              if (newScores[0] === newScores[1]) {
                setWinner(0); // Tie
              } else {
                setWinner(newScores[0] > newScores[1] ? 1 : 2);
              }
            }
          }, 500);
        } else {
          // No match, switch player after a delay
          setTimeout(() => {
            setFlippedIndices([]);
            setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
          }, 1000);
        }
      }
    },
    [cards, flippedIndices, matchedPairs, matchedByPlayer, currentPlayer, scores]
  );

  // Reset the game
  const resetGame = useCallback(() => {
    initializeGame();
  }, [initializeGame]);

  // Update player names
  const updatePlayerNames = useCallback((names: string[]) => {
    setPlayerNames(names);
    setShowNameDialog(false);
  }, []);

  return {
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
  };
}