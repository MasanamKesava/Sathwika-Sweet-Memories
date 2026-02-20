import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const healthCards = [
  {
    emoji: "💊",
    title: "Take Your Medicines",
    content: "Please don't skip your medicines, Sathwika. Even when you feel okay, consistency is what makes you stronger. Your health is the most important thing in the world. 🌸",
    color: "hsl(var(--primary))",
    bg: "hsl(340 50% 97%)",
  },
  {
    emoji: "💧",
    title: "Stay Hydrated",
    content: "Drink enough water every day! At least 8 glasses. Your skin, your energy, your brain — they all depend on it. Chai is not water, okay? 😄 Stay hydrated, beautiful!",
    color: "hsl(var(--lavender))",
    bg: "hsl(270 40% 97%)",
  },
  {
    emoji: "🌙",
    title: "Sleep Well",
    content: "Please sleep on time and get at least 7-8 hours of rest. Your brain heals when you sleep. And you need to be well-rested to conquer the world, Dr. Psycho! 😄💕",
    color: "hsl(var(--primary))",
    bg: "hsl(340 50% 97%)",
  },
  {
    emoji: "🥗",
    title: "Eat Properly",
    content: "Three proper meals a day — no skipping! You're a psychology student who knows how nutrition affects mental health, so practice what you preach 😉 Eat well, feel well!",
    color: "hsl(var(--lavender))",
    bg: "hsl(270 40% 97%)",
  },
  {
    emoji: "🧘",
    title: "Take Breaks",
    content: "When life feels heavy, pause. Breathe. Step outside for a bit of fresh air. As someone studying mental health, you know the importance of self-care — so don't forget to apply it to yourself too. 🌺",
    color: "hsl(var(--primary))",
    bg: "hsl(340 50% 97%)",
  },
  {
    emoji: "📋",
    title: "Doctor's Visits",
    content: "Don't postpone your checkups. Whatever your health condition requires — follow through with it. Your body is precious. You are precious. Please take good care of yourself 💖",
    color: "hsl(var(--lavender))",
    bg: "hsl(270 40% 97%)",
  },
  {
    emoji: "🌸",
    title: "Mental Health Matters",
    content: "You study psychology — but even the helpers need help sometimes. It's okay to feel overwhelmed. Talk to someone, journal your feelings, and remember: your emotional health matters just as much as your physical health. 💕",
    color: "hsl(var(--primary))",
    bg: "hsl(340 50% 97%)",
  },
  {
    emoji: "🦋",
    title: "You Are Loved",
    content: "Whatever you're going through — you don't face it alone. Someone out there is thinking of you, rooting for you, and sending you strength every single day. That someone is me. Take care of yourself, for me. 💝",
    color: "hsl(var(--lavender))",
    bg: "hsl(270 40% 97%)",
  },
];

const HealthCard = ({ card, index }: { card: typeof healthCards[0]; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="glass-card rounded-3xl p-6 relative overflow-hidden"
      style={{ borderTop: `3px solid ${card.color}` }}
    >
      {/* Background tint */}
      <div
        className="absolute inset-0 opacity-40 rounded-3xl"
        style={{ background: card.bg }}
      />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">{card.emoji}</span>
          <h3 className="font-playfair font-bold text-xl" style={{ color: card.color }}>
            {card.title}
          </h3>
        </div>
        <p className="font-dancing text-lg leading-relaxed text-foreground/80">
          {card.content}
        </p>
      </div>
    </motion.div>
  );
};

const HealthPage = () => {
  return (
    <div className="pt-24 pb-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="font-dancing text-xl" style={{ color: "hsl(var(--primary))" }}>
          Because you matter
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
          Take Care 💊
        </h1>
        <p className="mt-4 text-muted-foreground font-dancing text-lg max-w-xl mx-auto">
          A little corner of love, reminding Sathwika to take care of herself every single day 🌸
        </p>

        {/* Love note box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-3xl p-6 max-w-lg mx-auto mt-8 relative overflow-hidden"
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "var(--gradient-primary)" }}
          />
          <div className="relative">
            <div className="text-4xl mb-3">💌</div>
            <p className="font-dancing text-xl leading-relaxed" style={{ color: "hsl(var(--primary))" }}>
              "Dear Sathwika, your health is non-negotiable. Please take care of yourself — not just for the people who love you, but for YOU. You deserve to feel well and wonderful every day."
            </p>
            <p className="font-dancing text-muted-foreground mt-3">— Kesava 💕</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Health cards grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
        {healthCards.map((card, i) => (
          <HealthCard key={i} card={card} index={i} />
        ))}
      </div>

      {/* Bottom reminder */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mt-16 space-y-3"
      >
        <div className="text-5xl">🌺</div>
        <p className="font-dancing text-2xl" style={{ color: "hsl(var(--primary))" }}>
          A healthy Sathwika = a happy world 💖
        </p>
        <p className="text-muted-foreground font-dancing text-lg">
          Please take your medicines. Drink water. Sleep well. Eat properly. 🌸
        </p>
      </motion.div>
    </div>
  );
};

export default HealthPage;
