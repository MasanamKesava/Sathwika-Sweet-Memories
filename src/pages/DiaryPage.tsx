import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const diaryEntries = [
  {
    date: "Feb 19, 2026 · 3:12 PM",
    emoji: "💌",
    title: "The Beginning",
    content: `It started with a simple "Hi" on an application platform. Kesava saw your profile and couldn't scroll past. Something about you — your curly hair, your bright eyes, your smile — made him stop everything and type those two little letters.`,
    color: "hsl(var(--primary))",
  },
  {
    date: "Feb 19, 2026 · 3:40 PM",
    emoji: "🌸",
    title: "First Compliment",
    content: `"Actually you're so cute in the photo." That was his first compliment — honest, simple, and straight from the heart. You laughed it off with a 🤣 but deep down, we both know it made you smile.`,
    color: "hsl(var(--lavender))",
  },
  {
    date: "Feb 19, 2026 · 4:14 PM",
    emoji: "✨",
    title: "The Name",
    content: `"Actually sathwika ane peru naku baga nachidi." — He said your name sounds beautiful. And he's right. Sathwika. It suits you perfectly — soft, elegant, and unforgettable. Just like you.`,
    color: "hsl(var(--primary))",
  },
  {
    date: "Feb 19, 2026 · 4:20 PM",
    emoji: "🧠",
    title: "Dr. Psycho 😄",
    content: `When Kesava jokingly said "Should I call you Dr. Psycho?" — you said "You can actually 🥴". A budding psychologist with a playful soul. Not a psychiatrist, you clarified! She knows the difference and she'll change lives one day.`,
    color: "hsl(var(--lavender))",
  },
  {
    date: "Feb 19, 2026 · 4:20 PM",
    emoji: "💫",
    title: "Cute & Hot",
    content: `"If u don't mind... Actually ur cute and hot." He meant every word. A CSE graduate who's also gorgeous AND pursuing psychology? You're basically a dream 💕`,
    color: "hsl(var(--primary))",
  },
  {
    date: "Always",
    emoji: "🌺",
    title: "Just the Beginning...",
    content: `This is Chapter One. There are countless more pages to be written — in Goa maybe 😉, or wherever life takes us. But every great story has to start somewhere. Ours started with a "Hi" and a flutter of hearts. 💖`,
    color: "hsl(var(--lavender))",
  },
];

const DiaryCard = ({ entry, index }: { entry: typeof diaryEntries[0]; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="relative"
    >
      {/* Diary page effect */}
      <div
        className="glass-card rounded-3xl p-6 md:p-8 relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, hsl(0 0% 100% / 0.9) 0%, hsl(340 30% 98% / 0.8) 100%)`,
          borderLeft: `4px solid ${entry.color}`,
        }}
      >
        {/* Paper lines effect */}
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.03 }}>
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="w-full border-b border-foreground"
              style={{ marginTop: `${(i + 1) * 32}px` }}
            />
          ))}
        </div>

        {/* Header */}
        <div className="flex items-start justify-between mb-4 relative">
          <div>
            <p className="text-xs text-muted-foreground font-dancing tracking-wide">{entry.date}</p>
            <h3
              className="text-xl md:text-2xl font-playfair font-bold mt-1"
              style={{ color: entry.color }}
            >
              {entry.emoji} {entry.title}
            </h3>
          </div>
          <span className="text-4xl opacity-20 font-playfair font-bold select-none">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Content */}
        <p className="font-dancing text-lg leading-relaxed text-foreground/80 relative">
          {entry.content}
        </p>

        {/* Corner decoration */}
        <div className="absolute bottom-4 right-4 text-2xl opacity-30">💕</div>
      </div>
    </motion.div>
  );
};

const DiaryPage = () => {
  return (
    <div className="pt-24 pb-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="font-dancing text-xl" style={{ color: "hsl(var(--primary))" }}>
          Written with love
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
          Our Diary 📖
        </h1>
        <p className="mt-4 text-muted-foreground font-dancing text-lg max-w-xl mx-auto">
          Every flirty message, every laugh, every moment — written in the stars and saved here forever 🌸
        </p>

        {/* Decorative line */}
        <div className="flex items-center gap-4 mt-8 max-w-xs mx-auto">
          <div className="flex-1 h-px" style={{ backgroundImage: "var(--gradient-primary)", opacity: 0.3 }} />
          <span className="text-xl">📝</span>
          <div className="flex-1 h-px" style={{ backgroundImage: "var(--gradient-lavender)", opacity: 0.3 }} />
        </div>
      </motion.div>

      {/* Diary entries */}
      <div className="max-w-2xl mx-auto space-y-6">
        {diaryEntries.map((entry, i) => (
          <DiaryCard key={i} entry={entry} index={i} />
        ))}
      </div>

      {/* Bottom quote */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mt-16"
      >
        <p className="font-dancing text-2xl" style={{ color: "hsl(var(--primary))" }}>
          "The best love story is the one we're still writing..." 💖
        </p>
      </motion.div>
    </div>
  );
};

export default DiaryPage;
