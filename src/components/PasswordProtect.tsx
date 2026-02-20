import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Heart, Eye, EyeOff } from "lucide-react";

interface Props {
  onUnlock: () => void;
}

export const PasswordProtect = ({ onUnlock }: Props) => {
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  // Password: "drpsycho" — only Sathwika knows Kesava nicknamed her this 😄
  const CORRECT = "drpsycho";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase().trim() === CORRECT) {
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 600);
      setTimeout(() => setError(false), 3500);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Background petals */}
      {["💕", "🌸", "💖", "✨", "💗", "🌺", "🦋", "💝"].map((e, i) => (
        <span
          key={i}
          className="fixed text-4xl animate-float-up pointer-events-none select-none"
          style={{
            left: `${10 + i * 11}%`,
            bottom: 0,
            animationDuration: `${10 + i * 1.5}s`,
            animationDelay: `${i * 1.2}s`,
            opacity: 0.45,
          }}
        >
          {e}
        </span>
      ))}

      <motion.div
        animate={shake ? { x: [-8, 8, -8, 8, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-card rounded-3xl p-8 md:p-12 w-full max-w-md mx-4 text-center relative z-10"
      >
        {/* Lock icon with glow */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse-glow"
          style={{ backgroundImage: "var(--gradient-primary)" }}
        >
          <Lock className="w-9 h-9 text-white" />
        </motion.div>

        <h1
          className="text-3xl font-playfair font-bold mb-2"
          style={{ color: "hsl(var(--primary))" }}
        >
          Sathwika Special Moments
        </h1>
        <p className="font-dancing text-lg text-muted-foreground mb-2">
          This space is just for us 💕
        </p>
        <p className="font-dancing text-sm text-muted-foreground mb-8">
          Only Sathwika knows the secret... 🦋
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Enter the secret password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl text-center text-lg border-2 outline-none transition-all"
              style={{
                borderColor: error ? "hsl(var(--destructive))" : "hsl(var(--border))",
                background: "hsl(var(--muted))",
                color: "hsl(var(--foreground))",
              }}
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
            >
              {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-sm"
                style={{ color: "hsl(var(--destructive))" }}
              >
                Hmm, that's not right 🥺 Think about what Kesava called you...
              </motion.p>
            )}
          </AnimatePresence>

          <button type="submit" className="btn-romantic w-full flex items-center justify-center gap-2">
            <Heart className="w-4 h-4" />
            Enter Our World
          </button>
        </form>

        <div className="mt-6 space-y-1">
          <p className="text-xs text-muted-foreground font-dancing">
            Hint: What did Kesava want to call you? 😄
          </p>
          <p className="text-xs text-muted-foreground font-dancing opacity-60">
            (Think: Dr. _____ — the nickname from our very first chat 🧠💕)
          </p>
        </div>
      </motion.div>
    </div>
  );
};
