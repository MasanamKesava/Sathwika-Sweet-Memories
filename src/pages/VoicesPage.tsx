import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  Music,
} from "lucide-react";

interface AudioTrack {
  id: string;
  name: string;
  src: string;
  duration: number;
}

const PRELOADED_TRACKS: Omit<AudioTrack, "duration">[] = [
  { id: "1", name: "Voice 1", src: "/audio/voice1.mp3" },
  { id: "2", name: "Voice 2", src: "/audio/voice2.mp3" },
  { id: "3", name: "Voice 3", src: "/audio/voice3.mp3" },
  { id: "4", name: "Voice 4", src: "/audio/voice4.mp3" },
  { id: "5", name: "Voice 5", src: "/audio/voice5.mp3" },
  { id: "6", name: "Voice 6", src: "/audio/voice6.mp3" },
  { id: "7", name: "Voice 7", src: "/audio/voice7.mp3" },
  { id: "8", name: "Voice 8", src: "/audio/voice8.mp3" },
  { id: "9", name: "Voice 9", src: "/audio/voice9.mp3" },
  { id: "10", name: "Voice 10", src: "/audio/voice10.mp3" },
  { id: "11", name: "Voice 11", src: "/audio/voice11.mp3" },
  { id: "12", name: "Voice 12", src: "/audio/voice12.mp3" },
  { id: "13", name: "Voice 13", src: "/audio/voice13.mp3" },
  { id: "14", name: "Voice 14", src: "/audio/voice14.mp3" },
  { id: "15", name: "Voice 15", src: "/audio/voice15.mp3" },
  { id: "16", name: "Voice 16", src: "/audio/voice16.mp3" },
  { id: "17", name: "Voice 17", src: "/audio/voice17.mp3" },
  { id: "18", name: "Voice 18", src: "/audio/voice18.mp3" },
];

const VoicesPage = () => {
  const [tracks, setTracks] = useState<AudioTrack[]>([]);
  const [current, setCurrent] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.8);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const loadTracks = async () => {
      const loaded: AudioTrack[] = [];

      for (const track of PRELOADED_TRACKS) {
        const audio = new Audio(track.src);

        await new Promise<void>((resolve) => {
          audio.onloadedmetadata = () => resolve();
        });

        loaded.push({
          ...track,
          duration: audio.duration || 0,
        });
      }

      setTracks(loaded);
    };

    loadTracks();
  }, []);

  const playTrack = (index: number) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(tracks[index].src);
    audio.volume = volume;
    audioRef.current = audio;

    audio.play();
    setCurrent(index);
    setPlaying(true);

    audio.ontimeupdate = () => {
      setProgress(
        audio.duration
          ? (audio.currentTime / audio.duration) * 100
          : 0
      );
    };

    audio.onended = () => {
      if (index < tracks.length - 1) {
        playTrack(index + 1);
      } else {
        setPlaying(false);
      }
    };
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <section className="py-20 px-4 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-4">
          
          <h2 className="text-4xl md:text-5xl font-playfair font-bold">
            Angel Voice 👼
          </h2>
        </div>
        <p className="mt-3 text-muted-foreground font-dancing text-lg">
          Voices that make my heart flutter
        </p>
      </motion.div>

      <div className="max-w-2xl mx-auto">

        {/* Player Card (UNCHANGED ANIMATIONS) */}
        <div className="glass-card rounded-3xl p-8 mb-8 text-center relative overflow-hidden">

          {playing && (
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(255,105,180,0.4), transparent 70%)",
                filter: "blur(60px)",
              }}
            />
          )}

          <div className="relative z-10">

            <div
              className={`w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl text-white ${
                playing ? "animate-spin-slow romantic-glow" : ""
              }`}
              style={{
                background:
                  "linear-gradient(135deg, #ff6ec4, #7873f5)",
              }}
            >
              🎵
            </div>

            {playing && (
              <div className="flex items-center justify-center gap-1 mb-4 h-8">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div
                    key={i}
                    className="sound-bar w-1.5 rounded-full"
                    style={{
                      height: "100%",
                      background:
                        "linear-gradient(to top, #ff6ec4, #7873f5)",
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>
            )}

            <p className="text-xl font-semibold mb-2">
              {current !== null
                ? tracks[current]?.name
                : "Nothing Playing"}
            </p>

            <div className="w-full bg-muted h-2 rounded-full mb-4 mt-4">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-center gap-4 mb-4">
              <button
                onClick={() =>
                  current !== null &&
                  current > 0 &&
                  playTrack(current - 1)
                }
              >
                <SkipBack />
              </button>

              <button
                onClick={togglePlay}
                disabled={current === null}
              >
                {playing ? <Pause /> : <Play />}
              </button>

              <button
                onClick={() =>
                  current !== null &&
                  current < tracks.length - 1 &&
                  playTrack(current + 1)
                }
              >
                <SkipForward />
              </button>
            </div>

            <div className="flex items-center justify-center gap-2">
              <Volume2 className="w-4 h-4" />
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) =>
                  setVolume(Number(e.target.value))
                }
                className="w-24"
              />
            </div>
          </div>
        </div>

        {/* Scrollable Audio List */}
        <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2 custom-scroll">
          {tracks.map((track, index) => (
            <div
              key={track.id}
              onClick={() => playTrack(index)}
              className={`glass-card p-4 rounded-xl cursor-pointer flex items-center gap-3 ${
                current === index
                  ? "ring-2 ring-pink-400"
                  : ""
              }`}
            >
              <Music className="w-4 h-4" />
              <div className="flex-1">
                <p className="font-medium">
                  {track.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatTime(track.duration)}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default VoicesPage;