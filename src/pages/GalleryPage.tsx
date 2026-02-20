import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Local gallery images (inside public/gallery/)
const GALLERY_IMAGES: { src: string; caption: string }[] = [
  { src: "/public/photo1.jpg", caption: "Memory 1 💕" },
  { src: "/public/photo2.webp", caption: "Memory 2 🌸" },
  { src: "/public/photo3.webp", caption: "Memory 3 ✨" },
  { src: "/public/photo4.webp", caption: "Memory 4 🦋" },
  { src: "/public/photo5.webp", caption: "Memory 5 💖" },
  { src: "/public/photo6.webp", caption: "Memory 6 🌷" },
  { src: "/public/photo7.webp", caption: "Memory 7 💝" },
  { src: "/public/photo8.webp", caption: "Memory 8 🌺" },
  { src: "/public/photo9.webp", caption: "Memory 9 💫" },
  { src: "/public/photo10.webp", caption: "Memory 10 💕" },
  { src: "/public/photo11.webp", caption: "Memory 11 🌸" },
  { src: "/public/photo12.webp", caption: "Memory 12 ✨" },
  { src: "/public/photo13.webp", caption: "Memory 13 🦋" },
  { src: "/public/photo14.webp", caption: "Memory 14 💖" },
  { src: "/public/photo15.webp", caption: "Memory 15 🌷" },
  { src: "/public/photo16.webp", caption: "Memory 16 💝" },
  { src: "/public/photo17.webp", caption: "Memory 17 🌺" },
  { src: "/public/photo18.webp", caption: "Memory 18 💫" },
  { src: "/public/photo19.webp", caption: "Memory 19 💕" },
  { src: "/public/photo20.webp", caption: "Memory 20 🌸" },
  { src: "/public/photo21.webp", caption: "Memory 21 ✨" },
  { src: "/public/photo22.webp", caption: "Memory 22 🦋" },
  { src: "/public/photo23.webp", caption: "Memory 23 💖" },
  { src: "/public/photo24.webp", caption: "Memory 24 🌷" },
  { src: "/public/photo25.webp", caption: "Memory 25 💝" },
  { src: "/public/photo26.webp", caption: "Memory 25 💝" },
  { src: "/public/photo27.webp", caption: "Memory 25 💝" },
  { src: "/public/photo28.webp", caption: "Memory 25 💝" },

];

// Placeholder when no images are loaded yet
const PLACEHOLDER_CAPTIONS = [
  "Coming soon... 💕",
  "A beautiful memory...",
  "Forever in my heart 🌸",
  "Our special moment ✨",
  "Just the two of us 💖",
  "A day to remember 🦋",
];

export const GalleryPage = () => {
  const [selected, setSelected] = useState<number | null>(null);

  const images = GALLERY_IMAGES;
  const isEmpty = images.length === 0;

  const prev = () =>
    setSelected((s) => (s !== null ? Math.max(0, s - 1) : null));

  const next = () =>
    setSelected((s) =>
      s !== null ? Math.min(images.length - 1, s + 1) : null
    );

  return (
    <div className="pt-24 pb-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <p className="font-dancing text-xl" style={{ color: "hsl(var(--primary))" }}>
          Our Precious
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
          Memories Gallery 🖼️
        </h1>
        <p className="mt-3 text-muted-foreground font-dancing text-lg">
          Every picture tells our story 💕
        </p>
      </motion.div>

      {/* Empty state */}
      {isEmpty && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="glass-card rounded-3xl p-8 max-w-md mx-auto">
            <div className="text-5xl mb-4">🌸</div>
            <p
              className="font-playfair text-xl font-semibold"
              style={{ color: "hsl(var(--primary))" }}
            >
              Photos coming soon...
            </p>
          </div>
        </motion.div>
      )}

      {/* Gallery grid */}
      {!isEmpty && (
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="gallery-item aspect-square rounded-2xl overflow-hidden cursor-pointer relative group"
              style={{ boxShadow: "var(--shadow-soft)" }}
              onClick={() => setSelected(i)}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={img.src}
                alt={img.caption}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2"
                style={{
                  background:
                    "linear-gradient(to top, hsl(340 50% 20% / 0.7), transparent)",
                }}
              >
                <p className="text-white text-xs font-dancing truncate">
                  {img.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && images[selected] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
              background: "hsl(340 30% 5% / 0.92)",
              backdropFilter: "blur(12px)",
            }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[selected].src}
                alt={images[selected].caption}
                className="w-full max-h-[75vh] object-contain rounded-3xl"
                style={{ boxShadow: "var(--shadow-glow)" }}
              />
              <p
                className="text-center mt-4 font-dancing text-xl text-white"
                style={{
                  textShadow: "0 0 20px hsl(340 75% 65% / 0.6)",
                }}
              >
                {images[selected].caption}
              </p>
            </motion.div>

            <button
              className="absolute top-4 right-4 text-white p-2 glass-card rounded-full hover:scale-110 transition-transform"
              onClick={() => setSelected(null)}
            >
              <X className="w-5 h-5" />
            </button>

            {selected > 0 && (
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-3 glass-card rounded-full hover:scale-110 transition-transform"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
              >
                <ChevronLeft />
              </button>
            )}

            {selected < images.length - 1 && (
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-3 glass-card rounded-full hover:scale-110 transition-transform"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
              >
                <ChevronRight />
              </button>
            )}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-dancing text-white/70 text-sm">
              {selected + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;