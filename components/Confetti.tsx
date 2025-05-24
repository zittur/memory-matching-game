"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

export default function Confetti() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);

    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    
    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      
      const particleCount = 50 * (timeLeft / duration);
      
      // Since particles fall down, start a bit higher than random
      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 100,
        disableForReducedMotion: true,
        origin: {
          x: randomInRange(0.1, 0.3),
          y: Math.random() - 0.2
        }
      });
      
      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 100,
        disableForReducedMotion: true,
        origin: {
          x: randomInRange(0.7, 0.9),
          y: Math.random() - 0.2
        }
      });
    }, 250);
    
    return () => clearInterval(interval);
  }, []);

  return null;
}