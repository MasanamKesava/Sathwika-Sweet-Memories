import { motion, Variants, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { LoveCounter } from "./LoveCounter";
import { LiveClock } from "./LiveClock";
import { Link } from "react-router-dom";

/* ---------------- Animation Variants ---------------- */

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

/* ---------------- Categorized Quotes ---------------- */

const categorizedQuotes = {
  cute: [
    "\"Actually you're so cute in the photo\" 💕",
    "Have a great day andi 🌸",
    "Intha podhhunne lechinav endhi 🌅",
    "🥹🥹🥹 so soothing to hear abboooooo",
    "Future Dr. Sathwika ki preparation phase anukundam 😜",
    "Abbo chala mandhey le but mostly",
    "cause you're damn gorgeous man...",
  ],
  teasing: [
    "Nee emojis ardam cheskovadam rombha kastam guru 😅",
    "Mana meet 8 ki kada? ⏰",
    "Butterfly next ekkadi egoripotundi mari...? 🦋",
    "Nuv ala walking chestu vunte akkada couples ki godava aidi emo 😄",
    "Ardam kanattu act chedham 🤣",
    "Areyyyyyy nen charge petti padkunna 8 paina cheyna? Bayataki velthuna!",
    "Noice ra telidhu nen epud instant ga plan eskoni ekkestha 🤣",
    "Antha ledh le nuv musko 😌",
    "Nuv ante thop le ra",
  ],
  emotional: [
    "But manku antu oka emotion supplier kavalali 😌",
    "Again hard to say bye andi... 😏",
    "Life long therapy teeskuntava 😢 anni baadhal em unnai",
    "🥹🥹🥹🥹 tels andi kanpisthundi",
    "oka vishyam cheppana manam ela vunn sare self love anedi vundli",
    "Still suffering but aapesna expect chesudu",    
    "Dhanni set cheskundam ani twaraga padkotam twaraga levatam",
  ],
  philosophical: [
    "Oka person gurinchi poorthiga telusukovalante journey is the best option i think so...",
    "Oka goppa manishi apply chesi pettadu ✨",
    "By birth de Brahma Devudu tho kadupulo vunnapude coaching teeskunna 😁😅",
    "Manchi kattubatlu 👀",
    "Who knows 😉",
    "Malla ma kukkalki food petti adantha clean cheskovali",
  ],
};

/* ---------------- Mood Glow Styles ---------------- */

const moodGlow: Record<string, string> = {
  cute: "shadow-pink-300/50",
  teasing: "shadow-purple-400/50",
  emotional: "shadow-blue-400/50",
  philosophical: "shadow-amber-400/50",
};

/* ---------------- Typewriter Hook ---------------- */

const useTypewriter = (text: string, speed = 25) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let i = 0;

    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return displayed;
};

/* ---------------- Component ---------------- */

export const HeroSection = () => {
  const [quote, setQuote] = useState<{ text: string; mood: string }>({
    text: "",
    mood: "cute",
  });

  /* Smart Randomizer (no immediate repeat) */
  const getRandomQuote = (previousText: string) => {
    const moods = Object.keys(categorizedQuotes) as Array<
      keyof typeof categorizedQuotes
    >;

    let newQuote = "";
    let newMood: keyof typeof categorizedQuotes = "cute";

    while (!newQuote || newQuote === previousText) {
      newMood = moods[Math.floor(Math.random() * moods.length)];
      const moodQuotes = categorizedQuotes[newMood];
      newQuote =
        moodQuotes[Math.floor(Math.random() * moodQuotes.length)];
    }

    return { text: newQuote, mood: newMood };
  };

  useEffect(() => {
    const first = getRandomQuote("");
    setQuote(first);

    const interval = setInterval(() => {
      setQuote((prev) => getRandomQuote(prev.text));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const typedText = useTypewriter(quote.text, 20);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24 pb-20 relative">

      {/* Sparkles */}
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
        {/* Clock */}
        <motion.div variants={itemVariants} className="mb-10">
          <LiveClock />
        </motion.div>

        {/* Title */}
        <motion.div variants={itemVariants}>
          <p className="font-dancing text-xl md:text-2xl mb-3 text-primary">
            ✨ A Digital Diary of Moments ✨
          </p>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-playfair font-bold leading-tight mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Sathwika
          </h1>

          <h2 className="text-3xl md:text-5xl font-playfair font-bold italic text-purple-300">
            Special Moments 💕
          </h2>
        </motion.div>

        {/* Rotating Quote Card */}
        <motion.div
          variants={itemVariants}
          className={`mt-8 rounded-2xl px-6 py-6 max-w-lg mx-auto min-h-[100px] 
          flex items-center justify-center text-center
          backdrop-blur-md bg-white/10 border border-white/20
          shadow-xl transition-all duration-500
          ${moodGlow[quote.mood]}`}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={quote.text}
              className="font-dancing text-lg italic"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              {typedText}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Heart */}
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
          <p className="font-dancing text-2xl mb-6 text-primary">
            We've been talking for...
          </p>
          <LoveCounter />
        </motion.div>

        {/* Navigation */}
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
          className="mt-12 text-muted-foreground text-sm"
        >
          Made with love by Kesava 💕
        </motion.div>
      </motion.div>
    </section>
  );
};
