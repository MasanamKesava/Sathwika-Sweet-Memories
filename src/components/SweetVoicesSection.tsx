import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Upload, Music, SkipForward, SkipBack, Volume2 } from "lucide-react";

interface AudioTrack {
  id: string;
  name: string;
  src: string;
  duration: number;
}

export const SweetVoicesSection = () => {
  const [tracks, setTracks] = useState<AudioTrack[]>([]);
  const [current, setCurrent] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const url = URL.createObjectURL(file);
      const audio = new Audio(url);
      audio.onloadedmetadata = () => {
        setTracks((prev) => [
          ...prev,
          { id: Date.now() + file.name, name: file.name.replace(/\.[^.]+$/, ""), src: url, duration: audio.duration },
        ]);
      };
    });
  };

  const play = (index: number) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setCurrent(index);
    setPlaying(true);
    setProgress(0);
  };

  useEffect(() => {
    if (current === null) return;
    const audio = new Audio(tracks[current]?.src);
    audioRef.current = audio;
    audio.volume = volume;
    if (playing) audio.play();

    audio.ontimeupdate = () => {
      setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
    };
    audio.onended = () => {
      if (current < tracks.length - 1) play(current + 1);
      else setPlaying(false);
    };

    return () => { audio.pause(); audio.src = ""; };
  }, [current]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (playing) audioRef.current.play();
    else audioRef.current.pause();
  }, [playing]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

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
          Listen to
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
          Sweet Voices 🎵
        </h2>
        <p className="mt-3 text-muted-foreground font-dancing text-lg">
          Voices that make my heart flutter
        </p>
      </motion.div>

      <div className="max-w-2xl mx-auto">
        {/* Now playing card */}
        <motion.div
          className="glass-card rounded-3xl p-8 mb-6 text-center relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          {/* Blurred bg */}
          <div
            className="absolute inset-0 opacity-20"
            style={{ backgroundImage: "var(--gradient-primary)", filter: "blur(40px)" }}
          />

          <div className="relative z-10">
            {/* Animated music icon */}
            <div
              className={`w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl ${
                playing ? "animate-spin-slow" : ""
              }`}
              style={{ backgroundImage: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
            >
              🎵
            </div>

            {/* Sound wave */}
            {playing && (
              <div className="flex items-center justify-center gap-1 mb-4 h-8">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div
                    key={i}
                    className="sound-bar w-1.5 rounded-full"
                    style={{
                      height: "100%",
                      backgroundImage: "var(--gradient-primary)",
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>
            )}

            <p
              className="font-playfair text-xl font-semibold mb-1"
              style={{ color: "hsl(var(--primary))" }}
            >
              {current !== null ? tracks[current]?.name : "Nothing playing yet"}
            </p>
            <p className="text-sm text-muted-foreground font-dancing mb-6">
              {current !== null ? "Now Playing 🎶" : "Upload audio to start"}
            </p>

            {/* Progress bar */}
            <div
              className="w-full rounded-full h-2 mb-4 cursor-pointer"
              style={{ background: "hsl(var(--muted))" }}
            >
              <div
                className="h-2 rounded-full transition-all"
                style={{ width: `${progress}%`, backgroundImage: "var(--gradient-primary)" }}
              />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <button
                className="p-2 rounded-full hover:scale-110 transition-transform"
                style={{ color: "hsl(var(--primary))" }}
                onClick={() => current !== null && current > 0 && play(current - 1)}
              >
                <SkipBack className="w-5 h-5" />
              </button>
              <button
                className="w-14 h-14 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                style={{ backgroundImage: "var(--gradient-primary)", boxShadow: "var(--shadow-soft)" }}
                onClick={() => current !== null && setPlaying(!playing)}
                disabled={current === null}
              >
                {playing ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
              </button>
              <button
                className="p-2 rounded-full hover:scale-110 transition-transform"
                style={{ color: "hsl(var(--primary))" }}
                onClick={() => current !== null && current < tracks.length - 1 && play(current + 1)}
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-2 justify-center">
              <Volume2 className="w-4 h-4 text-muted-foreground" />
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-24 accent-primary"
              />
            </div>
          </div>
        </motion.div>

        {/* Track list */}
        <div className="space-y-2 mb-6">
          {tracks.map((track, i) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`glass-card rounded-2xl p-4 flex items-center gap-3 cursor-pointer hover:shadow-hover transition-all ${
                current === i ? "ring-2" : ""
              }`}
              style={current === i ? { borderColor: "hsl(var(--primary))", outline: "2px solid hsl(var(--primary))" } : {}}
              onClick={() => play(i)}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white flex-shrink-0"
                style={{ backgroundImage: "var(--gradient-primary)" }}
              >
                {current === i && playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate text-foreground">{track.name}</p>
                <p className="text-xs text-muted-foreground font-dancing">{formatTime(track.duration)}</p>
              </div>
              <Music className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            </motion.div>
          ))}
        </div>

        {/* Upload */}
        <div className="flex justify-center">
          <button
            onClick={() => fileRef.current?.click()}
            className="btn-romantic flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            Upload Audio Files
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="audio/*"
            multiple
            className="hidden"
            onChange={handleUpload}
          />
        </div>

        {tracks.length === 0 && (
          <p className="text-center font-dancing text-muted-foreground mt-4">
            Upload voice notes, songs, or anything special 🎶
          </p>
        )}
      </div>
    </section>
  );
};
