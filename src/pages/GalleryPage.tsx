import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

/* Cloudinary Hosted Images */
const GALLERY_IMAGES: { src: string; caption: string }[] = [
  { src: "https://res.cloudinary.com/dswrgvg3c/image/upload/v1771622338/photo1_fu8a0e.jpg", caption: "Memory 1 💕" },
  { src: "https://res.cloudinary.com/dswrgvg3c/image/upload/v1771622339/photo2_jzjet9.webp", caption: "Memory 2 🌸" },
  { src: "https://res.cloudinary.com/dswrgvg3c/image/upload/v1771622339/photo3_haa3x2.webp", caption: "Memory 3 ✨" },
  { src: "https://res.cloudinary.com/dswrgvg3c/image/upload/v1771622339/photo4_b17i1d.webp", caption: "Memory 4 🦋" },
  { src: "https://res.cloudinary.com/dswrgvg3c/image/upload/v1771622343/photo5_axgnjf.webp", caption: "Memory 5 💖" },
  { src: "https://res.cloudinary.com/dswrgvg3c/image/upload/v1771622343/photo6_m4gywq.webp", caption: "Memory 6 🌷" },
  { src: "https://res.cloudinary.com/dswrgvg3c/image/upload/v1771622344/photo7_c2hags.webp", caption: "Memory 7 💝" },
  { src: "https://res.cloudinary.com/dswrgvg3c/image/upload/v1771622344/photo8_fyjl1k.webp", caption: "Memory 8 🌺" },
  { src: "https://res.cloudinary.com/dswrgvg3c/image/upload/v1771622344/photo9_nznju2.webp", caption: "Memory 9 💫" },
  { src: "https://res.cloudinary.com/dswrgvg3c/image/upload/v1771622344/photo10_mvg84g.webp", caption: "Memory 10 💕" },
  { src: "https://res.cloudinary.com/dswrgvg3c/image/upload/v1771622344/photo11_ona3sz.webp", caption: "Memory 11 🌸" },
  { src: "https://res.cloudinary.com/dswrgvg3c/image/upload/v1771622348/photo12_untg4q.webp", caption: "Memory 12 ✨" },
  { src: "https://res.cloudinary.com/dswrgvg3c/image/upload/v1771622355/photo13_oeprnl.webp", caption: "Memory 13 🦋" },
  { src: "https://res.cloudinary.com/dswrgvg3c/image/upload/v1771622355/photo14_ug37rj.webp", caption: "Memory 14 💖" },
  { src: "https://res.cloudinary.com/dswrgvg3c/image/upload/v1771622355/photo15_wgskig.webp", caption: "Memory 15 🌷" },
  { src: "https://res.cloudinary.com/dswrgvg3c/image/upload/v1771622356/photo16_mae886.webp", caption: "Memory 16 💝" },
  { src: "https://res.cloudinary.com/dswrgvg3c/image/upload/v1771622356/photo17_s2w0ya.webp", caption: "Memory 17 🌺" },
  { src: "https://res.cloudinary.com/dswrgvg3c/image/upload/v1771622356/photo18_kv7g5f.webp", caption: "Memory 18 💫" },
  { src: "https://res.cloudinary.com/dswrgvg3c/image/upload/v1771622363/photo19_a6zrwu.webp", caption: "Memory 19 💕" },
  { src: "https://res.cloudinary.com/dswrgvg3c/image/upload/v1771622362/photo20_n7fz0i.webp", caption: "Memory 20 🌸" },
  { src: "https://res.cloudinary.com/dswrgvg3c/image/upload/v1771622362/photo21_t9rgfo.webp", caption: "Memory 21 ✨" },
  { src: "https://res.cloudinary.com/dswrgvg3c/image/upload/v1771622363/photo22_kmsuki.webp", caption: "Memory 22 🦋" },
  { src: "https://res.cloudinary.com/dswrgvg3c/image/upload/v1771622364/photo23_bwac13.webp", caption: "Memory 23 💖" },
  { src: "https://res.cloudinary.com/dswrgvg3c/image/upload/v1771622370/photo24_cud6qx.webp", caption: "Memory 24 🌷" },
  { src: "https://res.cloudinary.com/dswrgvg3c/image/upload/v1771622371/photo25_q4glxa.webp", caption: "Memory 25 💝" },
  { src: "https://res.cloudinary.com/dswrgvg3c/image/upload/v1771622371/photo26_td0bkm.webp", caption: "Memory 26 🌺" },
  { src: "https://res.cloudinary.com/dswrgvg3c/image/upload/v1771622372/photo27_fegzeo.webp", caption: "Memory 27 💫" },
  { src: "https://res.cloudinary.com/dswrgvg3c/image/upload/v1771622373/photo28_pacenz.jpg", caption: "Memory 28 💕" },
  { src: "https://res.cloudinary.com/dswrgvg3c/image/upload/v1771622377/photo28_ztq0zf.webp", caption: "Memory 29 🌸" },
];

export const GalleryPage = () => {
  const [selected, setSelected] = useState<number | null>(null);

  const prev = () =>
    setSelected((s) => (s !== null ? Math.max(0, s - 1) : null));

  const next = () =>
    setSelected((s) =>
      s !== null ? Math.min(GALLERY_IMAGES.length - 1, s + 1) : null
    );

  return (
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {GALLERY_IMAGES.map((img, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="aspect-square rounded-2xl overflow-hidden cursor-pointer"
            onClick={() => setSelected(i)}
          >
            <img
              src={img.src}
              alt={img.caption}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="relative max-w-4xl w-full px-4"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={GALLERY_IMAGES[selected].src}
                alt={GALLERY_IMAGES[selected].caption}
                className="w-full max-h-[80vh] object-contain rounded-2xl"
              />
              <p className="text-center text-white mt-4 text-lg">
                {GALLERY_IMAGES[selected].caption}
              </p>
            </motion.div>

            {selected > 0 && (
              <button
                className="absolute left-6 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
              >
                <ChevronLeft size={40} />
              </button>
            )}

            {selected < GALLERY_IMAGES.length - 1 && (
              <button
                className="absolute right-6 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
              >
                <ChevronRight size={40} />
              </button>
            )}

            <button
              className="absolute top-6 right-6 text-white"
              onClick={() => setSelected(null)}
            >
              <X size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;
