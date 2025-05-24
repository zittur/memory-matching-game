"use client";

import { useEffect } from "react";
import MemoryGame from "@/components/MemoryGame";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { Card } from "@/components/ui/card";

export default function Home() {
  // Force light theme for this game
  useEffect(() => {
    document.documentElement.classList.add("light");
    document.documentElement.classList.remove("dark");
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      forcedTheme="light"
    >
      <main className="min-h-screen bg-gradient-to-b from-rose-50 to-indigo-50 flex flex-col items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-3xl mx-auto space-y-8">
          {/* Game Introduction */}
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-500 to-indigo-600 bg-clip-text text-transparent">
                🎮 记忆翻卡游戏
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                一款精美的双人记忆力挑战游戏！两位玩家轮流翻开卡片，寻找匹配的表情符号对。
                考验你的记忆力，看谁能找到更多的配对！
              </p>
            </div>
          </Card>

          {/* Game Component */}
          <MemoryGame />

          {/* Game Features and Rules */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-rose-600">🎯 游戏玩法</h2>
              <ul className="space-y-2 text-gray-600">
                <li>• 两位玩家轮流进行游戏</li>
                <li>• 每回合可以翻开两张卡片</li>
                <li>• 如果两张卡片匹配，该玩家得分并继续</li>
                <li>• 如果不匹配，卡片翻回，轮到对方</li>
                <li>• 找到最多配对的玩家获胜</li>
              </ul>
            </Card>

            <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-indigo-600">✨ 游戏特色</h2>
              <ul className="space-y-2 text-gray-600">
                <li>• 🎨 精美的视觉设计和流畅动画</li>
                <li>• 👥 支持自定义玩家名称</li>
                <li>• 🏆 实时计分和获胜提示</li>
                <li>• 📱 响应式设计，支持各种设备</li>
                <li>• 🎵 丰富的交互反馈</li>
              </ul>
            </Card>
          </div>

          {/* SEO Content */}
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">为什么选择我们的记忆翻卡游戏？</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                这款记忆翻卡游戏不仅仅是娱乐，更是锻炼大脑的绝佳工具。通过双人对战模式，
                你可以与朋友、家人一起享受竞技的乐趣，同时提升记忆力、专注力和观察力。
                游戏采用现代化的设计理念，提供流畅的用户体验，让每一次游戏都充满乐趣。
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm">记忆力训练</span>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">双人对战</span>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">益智游戏</span>
                <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">免费游戏</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">在线游戏</span>
              </div>
            </div>
          </Card>
        </div>
      </main>
      <Toaster />
    </ThemeProvider>
  );
}