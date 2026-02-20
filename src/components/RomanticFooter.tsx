import { motion } from "framer-motion";

export const RomanticFooter = () => {
  return (
    <footer className="py-12 px-4 text-center relative overflow-hidden mt-8">
      <div
        className="absolute inset-0 opacity-20"
        style={{ backgroundImage: "var(--gradient-hero)" }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10"
      >
        <div className="text-4xl mb-3 animate-heart-beat">💖</div>
        <h3
          className="text-2xl font-playfair font-bold mb-2"
          style={{
            backgroundImage: "var(--gradient-primary)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Sathwika Special Moments
        </h3>
        <p className="font-dancing text-lg text-muted-foreground mb-1">
          Made with 💕 by Kesava, for Sathwika
        </p>
        <p className="text-sm text-muted-foreground font-dancing">
          Since February 19, 2026 · 3:12 PM
        </p>
        <div className="mt-6 flex justify-center gap-3 text-xl">
          {["💕", "🌸", "✨", "💖", "🦋", "💝"].map((e, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -6, 0], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
            >
              {e}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </footer>
  );
};
