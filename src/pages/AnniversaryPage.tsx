import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Moment {
  id: string;
  category: string;
  title: string;
  description: string;
  emoji: string;
  date?: string;
  order_index: number;
}

const categories = [
  { id: "funny", label: "Funny Moments", emoji: "😂", color: "hsl(45 90% 60%)" },
  { id: "romantic", label: "Romantic Moments", emoji: "💕", color: "hsl(340 75% 65%)" },
  { id: "mistakes", label: "Oops Moments", emoji: "🙈", color: "hsl(25 85% 60%)" },
  { id: "surprise", label: "Surprise Moments", emoji: "🎉", color: "hsl(280 60% 65%)" },
  { id: "emotional", label: "Emotional Moments", emoji: "🥺", color: "hsl(200 60% 60%)" },
  { id: "games", label: "Game Moments", emoji: "🎮", color: "hsl(150 50% 55%)" },
];

const MomentCard = ({ moment, index }: { moment: Moment; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const category = categories.find((c) => c.id === moment.category);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="glass-card rounded-2xl p-5 relative overflow-hidden cursor-default"
      style={{
        borderLeft: `4px solid ${category?.color || "hsl(var(--primary))"}`,
      }}
    >
      <div className="flex items-start gap-3">
        <motion.span
          className="text-3xl flex-shrink-0"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 2, delay: index * 0.1 }}
        >
          {moment.emoji}
        </motion.span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4
              className="font-playfair font-bold text-base"
              style={{ color: category?.color }}
            >
              {moment.title}
            </h4>
            {moment.date && (
              <span className="text-xs text-muted-foreground font-dancing">
                {moment.date}
              </span>
            )}
          </div>
          <p className="text-sm text-foreground/75 leading-relaxed font-dancing">
            {moment.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const AnniversaryPage = () => {
  const [moments, setMoments] = useState<Moment[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoments = async () => {
      const { data, error } = await supabase
        .from("anniversary_moments")
        .select("*")
        .order("order_index", { ascending: true });

      if (!error && data) {
        setMoments(data as Moment[]);
      }
      setLoading(false);
    };

    fetchMoments();
  }, []);

  const filteredMoments =
    activeCategory === "all"
      ? moments
      : moments.filter((m) => m.category === activeCategory);

  const groupedMoments = categories.map((cat) => ({
    ...cat,
    moments: moments.filter((m) => m.category === cat.id),
  }));

  return (
    <div className="pt-24 pb-20 px-4 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 2, -2, 0],
          }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="inline-block text-8xl mb-4"
        >
          🎂
        </motion.div>

        <p className="font-dancing text-xl" style={{ color: "hsl(var(--primary))" }}>
          Celebrating Our First Week Together
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
          Happy Week Anniversary
        </h1>
        <p className="mt-4 text-muted-foreground font-dancing text-lg max-w-2xl mx-auto">
          7 days of laughter, love, and countless memories. Here's to many more weeks, months, and years together!
        </p>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
          className="mt-8 inline-flex items-center gap-2 glass-card px-6 py-3 rounded-full"
        >
          <span className="text-2xl">💖</span>
          <span className="font-playfair font-bold text-xl" style={{ color: "hsl(var(--primary))" }}>
            Feb 19 - Feb 26, 2026
          </span>
          <span className="text-2xl">💖</span>
        </motion.div>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-2 justify-center mb-10"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory("all")}
            className={`px-5 py-2 rounded-full font-dancing text-sm transition-all ${
              activeCategory === "all"
                ? "text-white shadow-md"
                : "glass-card text-foreground/70 hover:text-foreground"
            }`}
            style={
              activeCategory === "all"
                ? { backgroundImage: "var(--gradient-primary)" }
                : {}
            }
          >
            <span className="mr-2">🎂</span>
            All Moments ({moments.length})
          </motion.button>

          {categories.map((cat) => {
            const count = moments.filter((m) => m.category === cat.id).length;
            return (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 rounded-full font-dancing text-sm transition-all ${
                  activeCategory === cat.id
                    ? "text-white shadow-md"
                    : "glass-card text-foreground/70 hover:text-foreground"
                }`}
                style={
                  activeCategory === cat.id
                    ? { background: cat.color }
                    : {}
                }
              >
                <span className="mr-2">{cat.emoji}</span>
                {cat.label} ({count})
              </motion.button>
            );
          })}
        </motion.div>

        {loading ? (
          <div className="text-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="inline-block text-6xl"
            >
              🎂
            </motion.div>
            <p className="mt-4 font-dancing text-lg text-muted-foreground">
              Loading our sweet memories...
            </p>
          </div>
        ) : filteredMoments.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🍰</div>
            <h3 className="font-playfair text-2xl font-bold mb-2" style={{ color: "hsl(var(--primary))" }}>
              More Moments Coming Soon!
            </h3>
            <p className="font-dancing text-lg text-muted-foreground max-w-md mx-auto">
              {activeCategory === "all"
                ? "Kesava will add all our beautiful moments here soon. Every laugh, every conversation, every special second together."
                : `No ${categories.find((c) => c.id === activeCategory)?.label.toLowerCase()} yet, but they're on the way!`}
            </p>
            <p className="font-dancing text-sm text-muted-foreground mt-4">
              Check back soon for updates!
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMoments.map((moment, index) => (
              <MomentCard key={moment.id} moment={moment} index={index} />
            ))}
          </div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mt-16 space-y-4"
      >
        <div className="flex justify-center gap-3 text-4xl">
          {["🎂", "🎉", "💕", "🎈", "✨"].map((emoji, i) => (
            <motion.span
              key={i}
              animate={{
                y: [0, -10, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 2 + i * 0.2,
                delay: i * 0.1,
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </div>
        <p className="font-dancing text-2xl" style={{ color: "hsl(var(--primary))" }}>
          "One week down, forever to go..."
        </p>
        <p className="font-dancing text-lg text-muted-foreground">
          Here's to us, Sathwika. Every moment with you is a celebration.
        </p>
      </motion.div>

      <div
        className="fixed top-10 left-10 pointer-events-none opacity-20 text-9xl"
        style={{ zIndex: 0 }}
      >
        🎂
      </div>
      <div
        className="fixed bottom-20 right-10 pointer-events-none opacity-15 text-9xl"
        style={{ zIndex: 0 }}
      >
        🍰
      </div>
    </div>
  );
};

export default AnniversaryPage;
