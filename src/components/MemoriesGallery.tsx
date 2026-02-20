import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Upload, Images } from "lucide-react";

interface MemoryImage {
  id: string;
  src: string;
  name: string;
}

export const MemoriesGallery = () => {
  const [images, setImages] = useState<MemoryImage[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remaining = 25 - images.length;
    files.slice(0, remaining).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImages((prev) => [
          ...prev,
          { id: Date.now() + file.name, src: ev.target?.result as string, name: file.name },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const prev = () => setSelected((s) => (s !== null ? Math.max(0, s - 1) : null));
  const next = () => setSelected((s) => (s !== null ? Math.min(images.length - 1, s + 1) : null));

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
          Our Precious
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
          Memories Gallery 🖼️
        </h2>
        <p className="mt-3 text-muted-foreground font-dancing text-lg">
          Every picture tells our story
        </p>
      </motion.div>

      {/* Upload button */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => fileRef.current?.click()}
          className="btn-romantic flex items-center gap-2"
          disabled={images.length >= 25}
        >
          <Upload className="w-4 h-4" />
          {images.length >= 25 ? "Gallery Full (25/25)" : `Add Photos (${images.length}/25)`}
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

      {/* Empty state */}
      {images.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="text-6xl mb-4">🌸</div>
          <p className="font-dancing text-xl text-muted-foreground">
            Upload your beautiful memories here...
          </p>
          <p className="text-sm text-muted-foreground mt-2">Up to 25 photos</p>
        </motion.div>
      )}

      {/* Gallery grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {images.map((img, i) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="gallery-item aspect-square rounded-2xl overflow-hidden cursor-pointer relative group"
            style={{ transition: "all 0.3s ease", boxShadow: "var(--shadow-soft)" }}
            onClick={() => setSelected(i)}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={img.src}
              alt={img.name}
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              style={{ background: "hsl(340 75% 65% / 0.3)" }}
            >
              <span className="text-3xl">💕</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "hsl(340 30% 5% / 0.9)", backdropFilter: "blur(10px)" }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[selected].src}
                alt=""
                className="w-full max-h-[80vh] object-contain rounded-3xl shadow-glow"
              />
              {/* Floating hearts on open */}
              {["💕", "💖", "🌸"].map((h, i) => (
                <motion.span
                  key={i}
                  className="absolute text-2xl pointer-events-none"
                  style={{ left: `${20 + i * 30}%`, bottom: 0 }}
                  animate={{ y: [-20, -80], opacity: [1, 0] }}
                  transition={{ duration: 1.5, delay: i * 0.2 }}
                >
                  {h}
                </motion.span>
              ))}
            </motion.div>

            {/* Controls */}
            <button
              className="absolute top-4 right-4 text-white text-3xl p-2 hover:scale-110 transition-transform"
              onClick={() => setSelected(null)}
            >
              <X />
            </button>
            {selected > 0 && (
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-3 glass-card rounded-full hover:scale-110 transition-transform"
                onClick={prev}
              >
                <ChevronLeft />
              </button>
            )}
            {selected < images.length - 1 && (
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-3 glass-card rounded-full hover:scale-110 transition-transform"
                onClick={next}
              >
                <ChevronRight />
              </button>
            )}

            <div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 font-dancing text-white"
              style={{ textShadow: "0 0 10px hsl(340 75% 65% / 0.8)" }}
            >
              {selected + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
