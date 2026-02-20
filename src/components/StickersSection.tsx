import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X } from "lucide-react";

interface Sticker {
  id: string;
  src: string;
  name: string;
}

export const StickersSection = () => {
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [enlarged, setEnlarged] = useState<Sticker | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setStickers((prev) => [
          ...prev,
          { id: Date.now() + file.name, src: ev.target?.result as string, name: file.name },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const defaultStickers = ["🥰", "💕", "😘", "🌸", "💖", "✨", "🦋", "💝", "🌺", "💗", "🌷", "💫"];

  return (
    <section className="py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <p className="font-dancing text-xl" style={{ color: "hsl(var(--primary))" }}>
          Our Little
        </p>
        <h2
          className="text-4xl md:text-5xl font-playfair font-bold mt-2"
          style={{
            backgroundImage: "var(--gradient-primary)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Stickers 🥰
        </h2>
        <p className="mt-3 text-muted-foreground font-dancing text-lg">
          Cute little things that make us smile
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto">
        {/* Default emoji stickers */}
        <div className="flex flex-wrap gap-4 justify-center mb-10">
          {defaultStickers.map((emoji, i) => (
            <motion.div
              key={i}
              className="cursor-pointer select-none"
              whileHover={{ scale: 1.3, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                y: { repeat: Infinity, duration: 2 + i * 0.1, ease: "easeInOut" },
              }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-soft hover:shadow-glow transition-shadow"
                style={{ background: "hsl(var(--blush))" }}
              >
                {emoji}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom stickers */}
        {stickers.length > 0 && (
          <div className="mb-8">
            <p
              className="text-center font-dancing text-xl mb-6"
              style={{ color: "hsl(var(--primary))" }}
            >
              Your Custom Stickers ✨
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              {stickers.map((sticker, i) => (
                <motion.div
                  key={sticker.id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="cursor-pointer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setEnlarged(sticker)}
                >
                  <img
                    src={sticker.src}
                    alt={sticker.name}
                    className="w-20 h-20 object-contain rounded-2xl shadow-soft hover:shadow-glow transition-shadow"
                    style={{ background: "hsl(var(--blush))", padding: "4px" }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Upload */}
        <div className="flex justify-center">
          <button
            onClick={() => fileRef.current?.click()}
            className="btn-romantic flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            Upload Custom Stickers
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleUpload}
          />
        </div>
      </div>

      {/* Enlarge modal */}
      <AnimatePresence>
        {enlarged && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-8"
            style={{ background: "hsl(340 30% 5% / 0.8)", backdropFilter: "blur(10px)" }}
            onClick={() => setEnlarged(null)}
          >
            <motion.img
              src={enlarged.src}
              alt=""
              initial={{ scale: 0.5 }}
              animate={{ scale: 1, rotate: [0, -5, 5, -5, 0] }}
              exit={{ scale: 0.5 }}
              className="max-w-xs max-h-xs object-contain rounded-3xl shadow-glow"
            />
            <button
              className="absolute top-4 right-4 text-white"
              onClick={() => setEnlarged(null)}
            >
              <X className="w-8 h-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
