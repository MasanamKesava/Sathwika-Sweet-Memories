import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// First message: 19 Feb 2026 at 3:12 PM
const FIRST_MET = new Date("2026-02-19T15:12:00");

interface TimeUnit {
  value: number;
  label: string;
  emoji: string;
}

export const LoveCounter = () => {
  const [units, setUnits] = useState<TimeUnit[]>([]);

  useEffect(() => {
    const compute = () => {
      const now = new Date();
      const diff = Math.max(0, now.getTime() - FIRST_MET.getTime());
      const totalSeconds = Math.floor(diff / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      setUnits([
        { value: days, label: "Days", emoji: "🌸" },
        { value: hours, label: "Hours", emoji: "💕" },
        { value: minutes, label: "Minutes", emoji: "✨" },
        { value: seconds, label: "Seconds", emoji: "💖" },
      ]);
    };
    compute();
    const interval = setInterval(compute, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {units.map((u, i) => (
        <motion.div
          key={u.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className="glass-card rounded-2xl p-4 md:p-6 text-center min-w-[80px] md:min-w-[100px]"
        >
          <div className="text-2xl mb-1">{u.emoji}</div>
          <div
            className="text-3xl md:text-4xl font-bold font-playfair"
            style={{ color: "hsl(var(--primary))" }}
          >
            {String(u.value).padStart(2, "0")}
          </div>
          <div className="text-xs text-muted-foreground mt-1 font-dancing tracking-wide">
            {u.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};
