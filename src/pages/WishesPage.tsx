import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const wishes = [
  {
    id: 1,
    emoji: "✈️",
    title: "Goa Trip Together",
    by: "Kesava",
    text: "Walking on the beach at sunset, eating seafood, taking a million photos — our Goa trip will be legendary! 🏖️",
    color: "hsl(340 60% 96%)",
  },
  {
    id: 2,
    emoji: "🎓",
    title: "Dr. Sathwika, Psychologist",
    by: "Kesava",
    text: "Watching you graduate and become the amazing psychologist I know you'll be. I'll be your loudest cheerleader! 🥳",
    color: "hsl(270 40% 96%)",
  },
  {
    id: 3,
    emoji: "🌙",
    title: "Midnight Conversations Forever",
    by: "Kesava",
    text: "I wish our late-night talks never end — the ones where we lose track of time and the world feels like just us. 💫",
    color: "hsl(200 50% 96%)",
  },
  {
    id: 4,
    emoji: "📸",
    title: "A Photo Album Full of Us",
    by: "Sathwika",
    text: "Filling an entire album with our silly faces, candid moments, and memories we'll laugh about forever. 🥰",
    color: "hsl(340 50% 96%)",
  },
  {
    id: 5,
    emoji: "🍕",
    title: "Our First Pizza Date",
    by: "Kesava",
    text: "Sitting across from you, sharing a pizza, laughing at your jokes — it's the simplest dream but it means everything. 🍕💖",
    color: "hsl(30 60% 96%)",
  },
  {
    id: 6,
    emoji: "🦋",
    title: "Growing Together",
    by: "Sathwika",
    text: "I dream of us growing wiser, kinder, and closer with every passing day — two butterflies on the same beautiful journey. 🦋",
    color: "hsl(180 40% 96%)",
  },
  {
    id: 7,
    emoji: "🎵",
    title: "Our Song",
    by: "Kesava",
    text: "Finding that one song that becomes 'ours' — the one we play every time we're together and it feels like magic. 🎶",
    color: "hsl(260 50% 96%)",
  },
  {
    id: 8,
    emoji: "🌅",
    title: "Watching a Sunrise Together",
    by: "Sathwika",
    text: "Staying up all night talking and then watching the sunrise together — no phones, just us and the sky. 🌅",
    color: "hsl(20 60% 96%)",
  },
];

const floatVariants = [
  { y: [0, -12, 0], rotate: [0, 2, -2, 0] },
  { y: [0, -8, 0], rotate: [0, -1.5, 1.5, 0] },
  { y: [0, -15, 0], rotate: [0, 1, -1, 0] },
];

const DreamCard = ({ wish, index }: { wish: typeof wishes[0]; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const float = floatVariants[index % floatVariants.length];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={
        inView
          ? { opacity: 1, y: 0, scale: 1 }
          : {}
      }
      transition={{ duration: 0.6, delay: index * 0.08 }}
    >
      <motion.div
        animate={float}
        transition={{ repeat: Infinity, duration: 5 + index * 0.5, ease: "easeInOut" }}
        className="glass-card rounded-3xl p-6 cursor-default h-full"
        style={{
          background: wish.color,
          border: "1px solid hsl(var(--primary) / 0.15)",
        }}
        whileHover={{ scale: 1.04, boxShadow: "var(--shadow-glow)" }}
      >
        <motion.span
          className="text-4xl block mb-3"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 2.5, delay: index * 0.3 }}
        >
          {wish.emoji}
        </motion.span>
        <h3
          className="font-playfair font-bold text-lg mb-1"
          style={{ color: "hsl(var(--primary))" }}
        >
          {wish.title}
        </h3>
        <p className="text-xs font-dancing mb-3 text-muted-foreground">
          — {wish.by}
        </p>
        <p className="text-sm text-foreground/75 leading-relaxed">
          {wish.text}
        </p>
      </motion.div>
    </motion.div>
  );
};

const WishesPage = () => (
  <div className="pt-24 pb-20 px-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <p className="font-dancing text-xl" style={{ color: "hsl(var(--primary))" }}>
        Together we dream
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
        Wishes & Dreams 🌟
      </h1>
      <p className="mt-4 text-muted-foreground font-dancing text-lg max-w-xl mx-auto">
        Little dreams we share — floating in our hearts, waiting to come true 💫
      </p>
      <div className="flex items-center gap-4 mt-8 max-w-xs mx-auto">
        <div className="flex-1 h-px" style={{ backgroundImage: "var(--gradient-primary)", opacity: 0.3 }} />
        <span className="text-xl">✨</span>
        <div className="flex-1 h-px" style={{ backgroundImage: "var(--gradient-lavender)", opacity: 0.3 }} />
      </div>
    </motion.div>

    <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {wishes.map((w, i) => (
        <DreamCard key={w.id} wish={w} index={i} />
      ))}
    </div>

    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="text-center mt-16"
    >
      <p className="font-dancing text-2xl" style={{ color: "hsl(var(--primary))" }}>
        "Every dream we share brings us one step closer..." 💖
      </p>
    </motion.div>
  </div>
);

export default WishesPage;
