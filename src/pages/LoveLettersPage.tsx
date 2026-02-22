import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const loveLetters = [
  {
    id: 1,
    emoji: "💌",
    title: "To Dr. Psycho",
    date: "Feb 19, 2026",
    content: `Dear Sathwika,\n\nFrom the moment I saw your profile, something told me you were special. Your smile, your curly hair, your bright eyes — everything about you screamed "she's the one." I didn't know then that a simple "Hi" would lead to all of this. But here we are.\n\nYou're not just beautiful — you're smart, funny, and incredibly kind. The world doesn't know yet how lucky it is to have a future psychologist like you.\n\nWith all my heart,\nKesava 💕`,
  },
  {
    id: 2,
    emoji: "🌸",
    title: "Why You're Special",
    date: "Feb 19, 2026",
    content: `Dear Sathwika,\n\nLet me tell you why you're special:\n\n• Your name — Sathwika — is the most beautiful name I've ever heard\n• Your laugh makes the worst days feel okay\n• You correct people about psychology vs psychiatry with such passion\n• Your curly hair is absolutely magical\n• You said "You can actually 🥴" when I called you Dr. Psycho — and my heart melted\n\nYou're everything and more.\n\nForever yours,\nKesava 🌺`,
  },
  {
    id: 3,
    emoji: "✈️",
    title: "Our Goa Promise",
    date: "Someday Soon",
    content: `Dear Sathwika,\n\nOne day, we'll be walking on the beaches of Goa together. The sun will be setting, the waves will be crashing, and I'll look at you and think — "How did I get so lucky?"\n\nWe'll eat seafood, take a million photos, and create memories that'll fill another diary. Until then, this letter is my promise — Goa is happening. 😉\n\nWaiting for that day,\nKesava ✈️💖`,
  },
  {
    id: 4,
    emoji: "💖",
    title: "A Midnight Thought",
    date: "Late Night",
    content: `Dear Sathwika,\n\nIt's late and I can't sleep. You know why? Because every time I close my eyes, I see your smile. Every time it's quiet, I hear your voice. Every time I think of the future, you're in it.\n\nI don't know what this feeling is called — but if you're a psychology student, maybe you can diagnose it for me. 😄\n\nHint: It rhymes with "dove."\n\nSleeplessly yours,\nKesava 🌙💕`,
  },
  {
    id: 5,
    emoji: "🦋",
    title: "The Day Everything Changed",
    date: "Feb 19, 2026",
    content: `Dear Sathwika,\n\nFeb 19, 2026 — remember this date. This is the day a random "Hi" on an app turned into something I never expected. Something beautiful. Something real.\n\nYou replied. You laughed. You told me about psychology. You let me call you Dr. Psycho. And just like that, my whole world shifted.\n\nThank you for being you.\n\nAlways,\nKesava 🦋✨`,
  },
];

const EnvelopeLetter = ({ letter, index }: { letter: typeof loveLetters[0]; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="w-full"
    >
      {/* Envelope */}
      <motion.div
        className="cursor-pointer relative"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div
          className="glass-card rounded-3xl p-6 relative overflow-hidden"
          style={{
            backgroundImage: isOpen
              ? `linear-gradient(135deg, hsl(340 60% 97%) 0%, hsl(270 40% 96%) 100%)`
              : `linear-gradient(135deg, hsl(340 50% 95%) 0%, hsl(340 30% 92%) 100%)`,
            borderBottom: isOpen ? "none" : `3px solid hsl(var(--primary) / 0.3)`,
          }}
        >
          {/* Envelope flap (when closed) */}
          {!isOpen && (
            <div
              className="absolute top-0 left-0 right-0 h-16 pointer-events-none"
              style={{
                background: "linear-gradient(180deg, hsl(340 40% 90%) 0%, transparent 100%)",
                clipPath: "polygon(0 0, 50% 60%, 100% 0)",
                opacity: 0.6,
              }}
            />
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.span
                className="text-3xl"
                animate={isOpen ? { rotateY: 180 } : { rotateY: 0 }}
                transition={{ duration: 0.4 }}
              >
                {isOpen ? "💝" : letter.emoji}
              </motion.span>
              <div>
                <h3 className="font-playfair font-bold text-lg" style={{ color: "hsl(var(--primary))" }}>
                  {letter.title}
                </h3>
                <p className="text-xs text-muted-foreground font-dancing">{letter.date}</p>
              </div>
            </div>
            <motion.span
              className="text-sm font-dancing"
              style={{ color: "hsl(var(--primary))" }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              {isOpen ? "Click to seal 💌" : "Tap to open ✨"}
            </motion.span>
          </div>
        </div>
      </motion.div>

      {/* Letter content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div
              className="glass-card rounded-b-3xl rounded-t-none p-6 md:p-8 -mt-2 relative"
              style={{
                backgroundImage: `linear-gradient(180deg, hsl(0 0% 100% / 0.95) 0%, hsl(340 30% 99% / 0.9) 100%)`,
                borderLeft: "3px solid hsl(var(--primary) / 0.2)",
                borderRight: "3px solid hsl(var(--primary) / 0.2)",
                borderBottom: "3px solid hsl(var(--primary) / 0.2)",
              }}
            >
              {/* Paper lines */}
              <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.04 }}>
                {Array.from({ length: 15 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-full border-b border-foreground"
                    style={{ marginTop: `${(i + 1) * 28}px` }}
                  />
                ))}
              </div>

              <pre className="font-dancing text-lg leading-relaxed text-foreground/80 whitespace-pre-wrap relative">
                {letter.content}
              </pre>

              {/* Seal */}
              <div className="flex justify-end mt-4">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                  style={{ backgroundImage: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
                >
                  💕
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const LoveLettersPage = () => {
  return (
    <div className="pt-24 pb-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="font-dancing text-xl" style={{ color: "hsl(var(--primary))" }}>
          Sealed with love
        </p>
        <h1
          className="text-4xl md:text-6xl font-playfair font-bold mt-2"
          style={{
            backgroundImage: "var(--gradient-primary)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Love Letters 💌
        </h1>
        <p className="mt-4 text-muted-foreground font-dancing text-lg max-w-xl mx-auto">
          Secret letters from Kesava to Sathwika — tap to unseal each one 💕
        </p>

        <div className="flex items-center gap-4 mt-8 max-w-xs mx-auto">
          <div className="flex-1 h-px" style={{ backgroundImage: "var(--gradient-primary)", opacity: 0.3 }} />
          <span className="text-xl">✉️</span>
          <div className="flex-1 h-px" style={{ backgroundImage: "var(--gradient-lavender)", opacity: 0.3 }} />
        </div>
      </motion.div>

      <div className="max-w-2xl mx-auto space-y-4">
        {loveLetters.map((letter, i) => (
          <EnvelopeLetter key={letter.id} letter={letter} index={i} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mt-16"
      >
        <p className="font-dancing text-2xl" style={{ color: "hsl(var(--primary))" }}>
          "Every letter is a piece of my heart, sent to yours..." 💖
        </p>
      </motion.div>
    </div>
  );
};

export default LoveLettersPage;
