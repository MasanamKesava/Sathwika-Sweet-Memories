import { useEffect, useState } from "react";

interface Heart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  emoji: string;
}

const EMOJIS = ["💕", "💗", "💖", "💝", "🌸", "✨", "💓", "💞"];

export const FloatingHearts = ({ density = 12 }: { density?: number }) => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const generated: Heart[] = Array.from({ length: density }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 16 + 10,
      duration: Math.random() * 8 + 10,
      delay: Math.random() * 10,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    }));
    setHearts(generated);
  }, [density]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="absolute animate-float-up select-none"
          style={{
            left: `${heart.x}%`,
            bottom: "-10%",
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
            opacity: 0.6,
          }}
        >
          {heart.emoji}
        </span>
      ))}
    </div>
  );
};
