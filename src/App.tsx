import { useState, useEffect, useRef } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { PasswordProtect } from "@/components/PasswordProtect";
import { Navbar } from "@/components/Navbar";
import { FloatingHearts } from "@/components/FloatingHearts";
import { RomanticFooter } from "@/components/RomanticFooter";
import Index from "./pages/Index";
import DiaryPage from "./pages/DiaryPage";
import { GalleryPage } from "./pages/GalleryPage";
import VoicesPage from "./pages/VoicesPage";
import HealthPage from "./pages/HealthPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Background music — place a file at /public/audio/bg-music.mp3
const BG_MUSIC_SRC = "/audio/bg-music.mp3";

const AppInner = () => {
  const [unlocked, setUnlocked] = useState(false);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Init background music
  useEffect(() => {
    if (!unlocked) return;
    const audio = new Audio(BG_MUSIC_SRC);
    audio.loop = true;
    audio.volume = 0.25;
    audioRef.current = audio;

    // Try to autoplay
    const tryPlay = () => {
      audio.play().catch(() => {
        // Autoplay blocked — will play on first user interaction
        const playOnce = () => {
          audio.play().catch(() => {});
          document.removeEventListener("click", playOnce);
        };
        document.addEventListener("click", playOnce, { once: true });
      });
    };

    tryPlay();
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, [unlocked]);

  // Mute/unmute
  useEffect(() => {
    if (!audioRef.current) return;
    if (muted) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
  }, [muted]);

  return (
    <AnimatePresence mode="wait">
      {!unlocked ? (
        <motion.div
          key="lock"
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4 }}
        >
          <PasswordProtect onUnlock={() => setUnlocked(true)} />
        </motion.div>
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative min-h-screen"
        >
          {/* Floating hearts background */}
          <FloatingHearts density={12} />

          {/* Navigation */}
          <Navbar muted={muted} onToggleMute={() => setMuted((m) => !m)} />

          {/* Pages */}
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/diary" element={<DiaryPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/voices" element={<VoicesPage />} />
            <Route path="/health" element={<HealthPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          <RomanticFooter />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppInner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
