import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const LiveClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (d: Date) =>
    d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center"
    >
      <div
        className="font-mono text-2xl md:text-3xl font-bold tracking-widest animate-pulse-glow rounded-2xl px-6 py-3"
        style={{
          background: "hsl(var(--gradient-primary))",
          backgroundImage: "var(--gradient-primary)",
          color: "white",
          textShadow: "0 0 20px hsl(340 75% 65% / 0.5)",
        }}
      >
        {formatTime(time)}
      </div>
      <p className="mt-2 text-sm font-dancing text-muted-foreground tracking-wide">
        {formatDate(time)}
      </p>
    </motion.div>
  );
};
