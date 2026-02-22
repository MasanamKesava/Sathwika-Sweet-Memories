import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Menu, X, Heart } from "lucide-react";

interface NavbarProps {
  muted: boolean;
  onToggleMute: () => void;
}

const links = [
  { to: "/", label: "Home", emoji: "🏠" },
  { to: "/diary", label: "Our Diary", emoji: "📖" },
  { to: "/love-letters", label: "Love Letters", emoji: "💌" },
  { to: "/gallery", label: "Gallery", emoji: "🖼️" },
  { to: "/voices", label: "Sweet Voices", emoji: "🎵" },
  { to: "/health", label: "Take Care", emoji: "💊" },
  { to: "/wishes", label: "Wishes", emoji: "🌟" },
];

export const Navbar = ({ muted, onToggleMute }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "hsl(0 0% 100% / 0.85)"
            : "hsl(0 0% 100% / 0.6)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: scrolled
            ? "1px solid hsl(var(--border))"
            : "1px solid transparent",
          boxShadow: scrolled ? "var(--shadow-soft)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2">
            <motion.span
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              className="text-2xl"
            >
              💖
            </motion.span>
            <span
              className="font-playfair font-bold text-xl hidden sm:block"
              style={{
                backgroundImage: "var(--gradient-primary)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Sathwika Special Moments
            </span>
            <span
              className="font-playfair font-bold text-lg sm:hidden"
              style={{
                backgroundImage: "var(--gradient-primary)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              SSM
            </span>
          </NavLink>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-white shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  }`
                }
                style={({ isActive }) =>
                  isActive
                    ? { backgroundImage: "var(--gradient-primary)", boxShadow: "var(--shadow-soft)" }
                    : {}
                }
              >
                <span className="text-xs">{link.emoji}</span>
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Mute toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onToggleMute}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
              style={{
                backgroundImage: muted ? undefined : "var(--gradient-primary)",
                background: muted ? "hsl(var(--muted))" : undefined,
                color: muted ? "hsl(var(--muted-foreground))" : "white",
              }}
              title={muted ? "Unmute background music" : "Mute background music"}
            >
              {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </motion.button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "hsl(var(--muted))" }}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden"
            style={{
              background: "hsl(0 0% 100% / 0.95)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid hsl(var(--border))",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div className="p-4 space-y-1">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                      isActive ? "text-white" : "text-foreground hover:bg-muted/60"
                    }`
                  }
                  style={({ isActive }) =>
                    isActive ? { backgroundImage: "var(--gradient-primary)" } : {}
                  }
                >
                  <span className="text-lg">{link.emoji}</span>
                  {link.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
