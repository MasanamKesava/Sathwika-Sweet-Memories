import { motion, Variants, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { LoveCounter } from "./LoveCounter";
import { LiveClock } from "./LiveClock";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

const flirtyLines = [
  "\"Actually you're so cute in the photo\" 💕",
  "\"Cute and hot\" — his exact words 🥰",
  "\"Sathwika ane peru naku baga nachidi\" ✨",
  "\"Ninnu chusaka 🤯\" — because how could he not 😄",
  "But manku antu oka emotion supplier kavalali 😌",
  "Nee emojis ardam cheskovadam rombha kastam guru 😅",
  "Mana meet 8 ki kada? ⏰",
  "Butterfly next ekkadi egoripotundi mari...? 🦋",
  "Who knows 😉",
  "Lechaka cheyamanna kada Dr. Marchipoyava? 😄",
  "Again hard to say bye andi... 😏",
  "🥹🥹🥹🥹 tels andi kanpisthundi",
  "Have a great day andi 🌸",
  "Achaa noice ra 😎",
  "Oka person gurinchi poorthiga telusukovalante journey is the best option i think so...",
  "Noice ra telidhu nen epud instant ga plan eskoni ekkestha 🤣",
  "Nuv ala walking chestu vunte akkada couples ki godava aidi emo 😄",
  "Antha ledh le nuv musko 😌",
  "By birth de Brahma Devudu tho kadupulo vunnapude coaching teeskunna 😁😅",
  "Manchi kattubatlu 👀",
  "Ardam kanattu act chedham 🤣",
  "Life long therapy teeskuntava 😢 anni baadhal em unnai",
  "Oka goppa manishi apply chesi pettadu ✨",
  "🥹🥹🥹 so soothing to hear abboooooo",
  "Future Dr. Sathwika ki preparation phase anukundam 😜",
  "Intha podhhunne lechinav endhi 🌅",
];

export const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Rotate quotes every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % flirtyLines.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24 pb-20 relative">
      
      {/* Sparkle Decorations */}
      {["✨", "🌸", "💫", "⭐", "✨"].map((s, i) => (
        <motion.span
          key={i}
          className="absolute text-2xl pointer-events-none select-none"
          style={{
            top: `${15 + i * 14}%`,
            left: i % 2 === 0 ? `${5 + i * 3}%` : `${75 + i * 3}%`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
            rotate: [0, 20, 0],
          }}
          transition={{
            duration: 2 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        >
          {s}
        </motion.span>
      ))}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto"
      >
        {/* Live Clock */}
        <motion.div variants={itemVariants} className="mb-10">
          <LiveClock />
        </motion.div>

        {/* Title Section */}
        <motion.div variants={itemVariants}>
          <p
            className="font-dancing text-xl md:text-2xl mb-3"
            style={{ color: "hsl(var(--primary))" }}
          >
            ✨ A Digital Diary of Moments ✨
          </p>

          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-playfair font-bold leading-tight mb-4"
            style={{
              backgroundImage: "var(--gradient-primary)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Sathwika
          </h1>

          <h2
            className="text-3xl md:text-5xl font-playfair font-bold italic"
            style={{ color: "hsl(var(--lavender))" }}
          >
            Special Moments 💕
          </h2>
        </motion.div>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-dancing"
        >
          A digital space of flirting, memories, midnight conversations, and a whole lot of love 💕
        </motion.p>

        {/* Rotating Flirty Quotes */}
        <motion.div
          variants={itemVariants}
          className="mt-6 glass-card rounded-2xl px-6 py-4 max-w-lg mx-auto min-h-[70px] flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={currentIndex}
              className="font-dancing text-lg italic"
              style={{ color: "hsl(var(--primary))" }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6 }}
            >
              {flirtyLines[currentIndex]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Heart Animation */}
        <motion.div
          variants={itemVariants}
          className="my-10 text-6xl"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          💖
        </motion.div>

        {/* Love Counter */}
        <motion.div variants={itemVariants}>
          <p
            className="font-dancing text-2xl mb-6"
            style={{ color: "hsl(var(--primary))" }}
          >
            We've been talking for...
          </p>
          <LoveCounter />
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-wrap gap-3 justify-center"
        >
          {[
            { to: "/diary", label: "Our Diary 📖" },
            { to: "/gallery", label: "Gallery 🖼️" },
            { to: "/voices", label: "Sweet Voices 🎵" },
            { to: "/health", label: "Take Care 💊" },
          ].map((btn) => (
            <Link
              key={btn.to}
              to={btn.to}
              className="btn-romantic flex items-center gap-2 text-sm"
            >
              {btn.label}
            </Link>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-col items-center gap-2 text-muted-foreground"
        >
          <p className="font-dancing text-sm">
            Made with love by Kesava 💕
          </p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            💕
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
