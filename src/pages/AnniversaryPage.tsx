import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Cake, Heart, PartyPopper, Sparkles } from "lucide-react";

/* ── Cake-cut hero ── */
const cakeCandles = ["💖", "🎂", "✨", "🎉", "💕", "🎊", "🌟"];

/* ── Moment categories ── */
type Category = "funny" | "romantic" | "mistakes" | "surprise" | "emotion" | "game";

interface Moment {
  text: string;
  emoji: string;
  category: Category;
}

const categoryMeta: Record<Category, { label: string; emoji: string; color: string }> = {
  funny:    { label: "Funny 😂",    emoji: "😂", color: "hsl(40, 85%, 70%)" },
  romantic: { label: "Romantic 💕",  emoji: "💕", color: "hsl(340, 75%, 65%)" },
  mistakes: { label: "Mistakes 🙈", emoji: "🙈", color: "hsl(20, 70%, 65%)" },
  surprise: { label: "Surprise 🎉", emoji: "🎉", color: "hsl(270, 50%, 70%)" },
  emotion:  { label: "Emotion 🥹",  emoji: "🥹", color: "hsl(200, 60%, 65%)" },
  game:     { label: "Games 🎮",    emoji: "🎮", color: "hsl(150, 50%, 60%)" },
};

const moments: Moment[] = [
  // ───────── 19/02/26 ─ First Contact ─────────
  {
    text: "19/02/26 – 3:12 PM 💬 First message: “Hi… Sathwika.” The beginning of everything.",
    emoji: "👋",
    category: "emotion",
  },
  {
    text: "19/02/26 – 3:38 PM 😂 “Na number edakelli vachindi?” — “CSE student ela ina vastadi…🤪” Hacker-level entry.",
    emoji: "🤣",
    category: "funny",
  },

  // ───────── Compliment Phase ─────────
  {
    text: "19/02/26 – 3:40 PM 💕 “Actually you're so cute in the photo.” Courage unlocked.",
    emoji: "😍",
    category: "romantic",
  },
  {
    text: "19/02/26 – 3:41 PM 💖 Full admiration mode: curls, beautiful nose, pretty eyes… no filter appreciation.",
    emoji: "🥰",
    category: "romantic",
  },
  {
    text: "19/02/26 – 3:45 PM 🥹 Her soft reply: 'Saradha only 🥹' — subtle innocence.",
    emoji: "🤍",
    category: "emotion",
  },

  // ───────── Goa Teasing ─────────
  {
    text: "19/02/26 – 3:59 PM 🌴 “Avasaram ite Goa kuda vasta…” — Overconfident travel proposal.",
    emoji: "✈️",
    category: "funny",
  },
  {
    text: "19/02/26 – 4:01 PM 🤣 She laughed at Goa plan — reality check delivered.",
    emoji: "😂",
    category: "funny",
  },

  // ───────── Angel Dialogue ─────────
  {
    text: "19/02/26 – 4:04 PM 😇 “Mee lanti angels ki kakapothe evariki istaru seat lu…” Smooth compliment execution.",
    emoji: "✨",
    category: "romantic",
  },

  // ───────── Photo & Panic ─────────
  {
    text: "19/02/26 – 4:10 PM 😬 Deleted message panic: “Kompathesi police ki ivvavau kada..🤧”",
    emoji: "🙈",
    category: "mistakes",
  },
  {
    text: "19/02/26 – 4:11 PM 📸 “Passport size photo ne pampala?” Peak teasing moment.",
    emoji: "🤣",
    category: "funny",
  },

  // ───────── Name Appreciation ─────────
  {
    text: "19/02/26 – 4:14 PM 💗 “Sathwika ane peru naku baga nachindi… Enduku? Aa peru nuv pettukunav kabatti.”",
    emoji: "💘",
    category: "romantic",
  },

  // ───────── Dr Psycho Origin ─────────
  {
    text: "19/02/26 – 4:20 PM 🧠 “Psychologist… not psychiatrist.” Clarification given.",
    emoji: "🧠",
    category: "funny",
  },
  {
    text: "19/02/26 – 4:21 PM 🎉 “You can actually call me Dr. Psycho 🥴” — Official title granted.",
    emoji: "🎊",
    category: "surprise",
  },

  // ───────── Heart Registration ─────────
  {
    text: "19/02/26 – 4:22 PM ❤️ “Those are registered in my mind… actually heart.” Emotional escalation.",
    emoji: "💞",
    category: "romantic",
  },

  // ───────── Single Talk ─────────
  {
    text: "19/02/26 – 4:25 PM 😉 Both confirmed single. Mutual independence agreement.",
    emoji: "😌",
    category: "game",
  },

  // ───────── Angel Introduction ─────────
  {
    text: "19/02/26 – 4:54 PM 😏 “Vadi valla oka angel ni introduce ayinaduku…” Strategic flirting.",
    emoji: "😏",
    category: "romantic",
  },

  // ───────── Marriage Philosophy ─────────
  {
    text: "19/02/26 – 5:09 PM 🤝 “Not interested in marriage.” Same wavelength discovered.",
    emoji: "🫶",
    category: "emotion",
  },

  // ───────── Evening Return ─────────
  {
    text: "19/02/26 – 8:39 PM 🥹 She reached home safe. ‘Food first.’ Soft caring tone.",
    emoji: "🍽️",
    category: "emotion",
  },
  {
    text: "19/02/26 – 8:40 PM 😏 “Hard to say bye to you…” Attachment forming.",
    emoji: "🤍",
    category: "romantic",
  },

  // ───────── Poem Moment ─────────
  {
    text: `19/02/26 – 9:02 PM 📝 The Poem:
“Sathwika, your name feels soft on my tongue,
Like morning light where quiet dreams are sung…”`,
    emoji: "✨",
    category: "romantic",
  },

  // ───────── Health Talk ─────────
  {
    text: "19/02/26 – 9:14 PM 🫩 She spoke about insomnia and health getting affected. Real conversation began.",
    emoji: "💛",
    category: "emotion",
  },

  // ───────── Night Ending ─────────
  {
    text: "19/02/26 – 9:16 PM 🤧 “Again hard to say bye…” Second emotional repetition.",
    emoji: "🌙",
    category: "romantic",
  },
  {
    text: "19/02/26 – 9:17 PM 🌌 First ‘Good night :)’ exchanged.",
    emoji: "🌙",
    category: "emotion",
  },
  {
    text: "19/02/26 – 11:04 PM 😅 Late night ‘hi ra’ again… Couldn’t stay away.",
    emoji: "💫",
    category: "funny",
  },
];
const CakeCutHero = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
      className="relative text-center py-16 px-4 overflow-hidden"
    >
      {/* Floating confetti */}
      {[...Array(18)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-xl pointer-events-none select-none"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? {
            opacity: [0, 1, 0],
            y: [-(Math.random() * 60), 200 + Math.random() * 300],
            x: [0, (Math.random() - 0.5) * 120],
            rotate: [0, Math.random() * 360],
          } : {}}
          transition={{ duration: 3 + Math.random() * 2, delay: i * 0.15, repeat: Infinity, repeatDelay: 4 }}
          style={{ left: `${5 + Math.random() * 90}%`, top: `${Math.random() * 30}%` }}
        >
          {["🎉", "🎊", "✨", "💖", "🎂", "💕", "🌟", "🎈"][i % 8]}
        </motion.span>
      ))}

      {/* Cake */}
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={inView ? { scale: 1, rotate: 0 } : {}}
        transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
        className="relative inline-block mb-6"
      >
        <div className="text-8xl md:text-9xl">🎂</div>
        {/* Candle flames */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-2">
          {cakeCandles.map((c, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -6, 0], scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.15 }}
              className="text-lg"
            >
              {c}
            </motion.span>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <p className="font-dancing text-xl" style={{ color: "hsl(var(--primary))" }}>
          🎊 Celebrating Us 🎊
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
          Happy Week Anniversary! 🎉
        </h1>
        <p className="text-muted-foreground mt-4 max-w-xl mx-auto font-dancing text-lg">
          One week of knowing you feels like a lifetime of happiness. Here's to every moment we've shared — the laughs, the butterflies, and everything in between 💕
        </p>
      </motion.div>

      {/* Knife cutting animation */}
      <motion.div
        initial={{ opacity: 0, rotate: -45, x: 80 }}
        animate={inView ? { opacity: 1, rotate: 0, x: 0 } : {}}
        transition={{ delay: 1, duration: 0.8, type: "spring" }}
        className="mt-6 text-5xl"
      >
        🔪🍰
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1.5 }}
        className="font-dancing text-lg mt-2"
        style={{ color: "hsl(var(--primary))" }}
      >
        Cutting our first cake together... virtually! 🥂
      </motion.p>
    </motion.div>
  );
};

/* ── Moment Card ── */
const MomentCard = ({ moment, index }: { moment: Moment; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const meta = categoryMeta[moment.category];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6, scale: 1.03 }}
      className="glass-card rounded-2xl p-5 cursor-default relative overflow-hidden group"
    >
      <div
        className="absolute top-0 left-0 w-full h-1 rounded-t-2xl"
        style={{ background: meta.color }}
      />
      <div className="absolute -top-4 -right-4 text-6xl opacity-5 group-hover:opacity-10 transition-opacity">
        {moment.emoji}
      </div>
      <div className="flex items-start gap-3">
        <motion.span
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3, delay: index * 0.2 }}
          className="text-3xl shrink-0 mt-1"
        >
          {moment.emoji}
        </motion.span>
        <div>
          <span
            className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
            style={{ background: `${meta.color}22`, color: meta.color }}
          >
            {meta.label}
          </span>
          <p className="text-sm text-foreground/80 mt-2 leading-relaxed">{moment.text}</p>
        </div>
      </div>
    </motion.div>
  );
};
const moments_20_02_26: Moment[] = [

  // ───────── 20/02/26 – Early Morning Energy ─────────
  {
    text: "20/02/26 – 5:56 AM 🌅 First message of the day: “Good morning.” Consistency begins.",
    emoji: "☀️",
    category: "emotion",
  },
  {
    text: "20/02/26 – 6:07 AM 😌 Single life philosophy vs relationship sleep debate.",
    emoji: "🤣",
    category: "funny",
  },
  {
    text: "20/02/26 – 6:24 AM 💬 Morning calm vibe acknowledged: “Especially from you.”",
    emoji: "🌤️",
    category: "romantic",
  },

  // ───────── Motivation Phase ─────────
  {
    text: "20/02/26 – 6:36 AM 🎓 “Future Dr. Sathwika ki preparation phase anukundam.” Vision projection.",
    emoji: "✨",
    category: "romantic",
  },
  {
    text: "20/02/26 – 6:42 AM 📖 “Needhe front page. Special thanks ani.” Biography-level validation.",
    emoji: "📘",
    category: "surprise",
  },
  {
    text: "20/02/26 – 6:45 AM 🎯 “Free ante serious ga tiskuntunna… lifetime membership vastunda?”",
    emoji: "😏",
    category: "game",
  },

  // ───────── Playful Genius Arc ─────────
  {
    text: "20/02/26 – 6:50 AM 😌 “Selective genius.” Self-proclaimed confidence.",
    emoji: "😎",
    category: "funny",
  },
  {
    text: "20/02/26 – 6:58 AM 🥰 “Nee charming look neeku alavatu aipoyindi… kani naku adhi prati sari kotha feeling.”",
    emoji: "💖",
    category: "romantic",
  },
  {
    text: "20/02/26 – 6:58 AM 🤣 “Coding tho patu flirting bonus ga nerchkunava?” — Exposed.",
    emoji: "😂",
    category: "funny",
  },

  // ───────── Morning Walk + Voice Bond ─────────
  {
    text: "20/02/26 – 7:05 AM 👣 Early morning walk sync — ‘Hifi’ moment.",
    emoji: "🤝",
    category: "emotion",
  },
  {
    text: "20/02/26 – 7:07 AM 🎙️ Cuckoo bird replaced by her voice note. Nature upgraded.",
    emoji: "🎧",
    category: "romantic",
  },
  {
    text: "20/02/26 – 7:11 AM 💬 “Nuv silent ga unte kuda attention grab chesthav.”",
    emoji: "✨",
    category: "romantic",
  },
  {
    text: "20/02/26 – 7:21 AM 🗺️ “Journey is the best way to know a person.” Travel philosophy.",
    emoji: "🚗",
    category: "game",
  },

  // ───────── Afternoon Depth ─────────
  {
    text: "20/02/26 – 12:52 PM 🔥 Phoenix tattoo explained — ‘Bounce back after trauma.’",
    emoji: "🔥",
    category: "emotion",
  },
  {
    text: "20/02/26 – 12:53 PM 🦋 Butterfly tattoo — transformation and growth.",
    emoji: "🦋",
    category: "emotion",
  },
  {
    text: "20/02/26 – 1:05 PM 🙈 Half-expense teasing misfired. Immediate apology.",
    emoji: "😅",
    category: "mistakes",
  },

  // ───────── Evening Call Setup ─────────
  {
    text: "20/02/26 – 8:01 PM 📞 ‘Mana meet 8 tarvata.’ Call anticipation.",
    emoji: "📲",
    category: "emotion",
  },

  // ───────── Night Vulnerability ─────────
  {
    text: "20/02/26 – 9:50 PM 🫩 She opened up about panic attacks, health issues, insomnia. Real vulnerability.",
    emoji: "💛",
    category: "emotion",
  },
  {
    text: "20/02/26 – 9:53 PM 🤝 “We have to take care of ourselves.” Protective instinct activated.",
    emoji: "🫶",
    category: "emotion",
  },
  {
    text: "20/02/26 – 9:57 PM 💭 ‘Ee time lo kavalsindi oka person… bugunava ani adige.’ Emotional need acknowledged.",
    emoji: "🤍",
    category: "emotion",
  },

  // ───────── Instagram Phase ─────────
  {
    text: "20/02/26 – 10:06 PM 📸 Insta created just for her. Bold move.",
    emoji: "😌",
    category: "game",
  },
  {
    text: "20/02/26 – 10:19 PM 💫 “You have a very charming presence.”",
    emoji: "✨",
    category: "romantic",
  },
  {
    text: "20/02/26 – 10:42 PM 🥺 She admitted body dysmorphia & self-hate. Trust level increased.",
    emoji: "💛",
    category: "emotion",
  },
  {
    text: "20/02/26 – 10:43 PM 🌿 Self-love discussion. Mature emotional exchange.",
    emoji: "🌱",
    category: "emotion",
  },

  // ───────── Night Ending ─────────
  {
    text: "20/02/26 – 10:47 PM 🌙 Good night voice note exchange.",
    emoji: "🌌",
    category: "romantic",
  },
  {
    text: "20/02/26 – 11:30 PM 🙊 Accidental disturbance. Immediate sincere apology.",
    emoji: "😔",
    category: "mistakes",
  },
  {
    text: "20/02/26 – 11:53 PM 💌 “I think you drifted back to sleep…” Soft closing line.",
    emoji: "💤",
    category: "romantic",
  },
];


const moments_21_02_26: Moment[] = [

  // ───────── 21/02/26 – Early Morning Creativity ─────────
  {
    text: "21/02/26 – 6:24 AM 🌐 Sent her a surprise: custom memory website link. Bold creative move.",
    emoji: "💻",
    category: "surprise",
  },
  {
    text: "21/02/26 – 6:52 AM 📸 She flooded photos — ‘Bank lo stock antha oke sari pettesav.’",
    emoji: "🤣",
    category: "funny",
  },
  {
    text: "21/02/26 – 6:59 AM 💇‍♀️ Complimented her haircut — ‘It suits you.’",
    emoji: "✨",
    category: "romantic",
  },

  // ───────── Admission & Future Talk ─────────
  {
    text: "21/02/26 – 7:02 AM 🎓 ‘Mundhu admission raniy.’ Supportive confidence mode.",
    emoji: "🌟",
    category: "emotion",
  },
  {
    text: "21/02/26 – 7:08 AM 🥰 She replied softly. Mutual positive energy.",
    emoji: "🤍",
    category: "emotion",
  },

  // ───────── Validation Peak ─────────
  {
    text: "21/02/26 – 7:52 AM 🥹 ‘So fucking wholesome… literally cutest!’ — Strong emotional approval.",
    emoji: "💖",
    category: "surprise",
  },
  {
    text: "21/02/26 – 9:51 AM 🚀 Sent second project link — ‘Timeless Love Bloom.’ Creative escalation.",
    emoji: "🌸",
    category: "game",
  },
  {
    text: "21/02/26 – 10:00 AM 😌 ‘Sumperrrrr raaaa!’ — Mind successfully blown.",
    emoji: "🤯",
    category: "surprise",
  },
  {
    text: "21/02/26 – 10:08 AM 🧑‍💻 Shared official portfolio. Identity reveal.",
    emoji: "📂",
    category: "emotion",
  },

  // ───────── Midday Conflict (Sleep Cycle) ─────────
  {
    text: "21/02/26 – 12:19 PM ⚠️ Sleep-cycle discussion turned heated. Misunderstanding moment.",
    emoji: "🔥",
    category: "mistakes",
  },
  {
    text: "21/02/26 – 12:30 PM 🤝 You apologized clearly and respectfully. Damage control.",
    emoji: "🫶",
    category: "emotion",
  },
  {
    text: "21/02/26 – 12:35 PM 💛 She explained panic attacks, anxiety, hospital visit. Deep vulnerability.",
    emoji: "🥺",
    category: "emotion",
  },

  // ───────── Evening Gesture ─────────
  {
    text: "21/02/26 – 9:28 PM 🎁 Sent ‘presence.zip’ — another thoughtful digital gift.",
    emoji: "📦",
    category: "surprise",
  },
  {
    text: "21/02/26 – 9:44 PM 😅 She said half photos didn't look like her. Playful critique.",
    emoji: "😂",
    category: "funny",
  },

  // ───────── Night Emotional Balance ─────────
  {
    text: "21/02/26 – 10:06 PM 💬 ‘Neetho matladithe mood automatic ga change aipothundi.’ Honest admission.",
    emoji: "💞",
    category: "romantic",
  },
  {
    text: "21/02/26 – 10:13 PM 😌 Asked for marks for understanding. Light charm maintained.",
    emoji: "😉",
    category: "game",
  },

  // ───────── Mahesh Babu Arc ─────────
  {
    text: "21/02/26 – 10:23 PM 🎬 Discovered she's a die-hard Mahesh Babu fan since age 7.",
    emoji: "⭐",
    category: "funny",
  },
  {
    text: "21/02/26 – 10:29 PM 🍷 ‘You age like wine… every year better version release.’ Smooth analogy.",
    emoji: "✨",
    category: "romantic",
  },
  {
    text: "21/02/26 – 10:32 PM 😅 She admitted she doesn’t know how to react to your flirting.",
    emoji: "😳",
    category: "emotion",
  },
  {
    text: "21/02/26 – 10:36 PM 😌 ‘React avvalasina avasaram ledu… just smile cheste saripothundi.’ Gentle reassurance.",
    emoji: "🌙",
    category: "romantic",
  },

  // ───────── Closing ─────────
  {
    text: "21/02/26 – 10:39 PM 🌌 ‘Flirting syllabus lo part kaadu… it’s spontaneous.’ Signature line.",
    emoji: "💫",
    category: "game",
  },
  {
    text: "21/02/26 – 10:39 PM 🥰 ‘Goooddddd nightttt !!!!’ Warm ending.",
    emoji: "🌙",
    category: "emotion",
  },
];

const moments_22_02_26: Moment[] = [

  // ───────── Morning Routine Energy ─────────
  {
    text: "22/02/26 – 5:06 AM 🌅 Sent early good morning. Consistency maintained.",
    emoji: "☀️",
    category: "emotion",
  },
  {
    text: "22/02/26 – 6:47 AM 🌳 Both at walk (park vs road side). Light playful sync.",
    emoji: "🚶‍♂️",
    category: "funny",
  },
  {
    text: "22/02/26 – 6:50 AM 😁 ‘Road pakkana tirgutha vunta’ — self-teasing mode.",
    emoji: "😜",
    category: "game",
  },

  // ───────── Mid-Morning Transparency ─────────
  {
    text: "22/02/26 – 10:53 AM ⛪ She said church nundi ochi smoke chesthna. Honest disclosure.",
    emoji: "🚬",
    category: "emotion",
  },
  {
    text: "22/02/26 – 10:58 AM 🎬 Continued ‘Couple Friendly’ movie discussion.",
    emoji: "🎥",
    category: "funny",
  },

  // ───────── Website Enhancement Arc ─────────
  {
    text: "22/02/26 – 11:39 AM 💻 Announced website enhancement.",
    emoji: "✨",
    category: "surprise",
  },
  {
    text: "22/02/26 – 11:57 AM 💌 She noticed ‘Love Letters’ section update.",
    emoji: "📜",
    category: "romantic",
  },
  {
    text: "22/02/26 – 12:00 PM 🥹 ‘Goppa kalakaarude unnad neelo.’ Strong creative validation.",
    emoji: "🎨",
    category: "emotion",
  },

  // ───────── Rohee & Hair Compliment ─────────
  {
    text: "22/02/26 – 12:03 PM 🐶 Introduced Rohee. Personal life reveal.",
    emoji: "🐾",
    category: "emotion",
  },
  {
    text: "22/02/26 – 12:06 PM 💇‍♀️ Complimented her baby hairstyle again. Specific admiration.",
    emoji: "✨",
    category: "romantic",
  },

  // ───────── DP Flirt Arc ─────────
  {
    text: "22/02/26 – 2:33 PM 📸 ‘DP adiripoindi… kani blue shirt supporting role strong ga undi.’",
    emoji: "😏",
    category: "game",
  },
  {
    text: "22/02/26 – 2:43 PM 🎭 ‘Supporting roles important lekapothe movie story maripodii.’ Smart recovery.",
    emoji: "🎬",
    category: "funny",
  },

  // ───────── Hero Fan Bonding ─────────
  {
    text: "22/02/26 – 2:55 PM ⭐ Confirmed Prabhas fan since Mirchi.",
    emoji: "🔥",
    category: "funny",
  },
  {
    text: "22/02/26 – 3:05 PM 🎞 Shared nostalgia: Varsham, Pournami, CD arigipoindi.",
    emoji: "💿",
    category: "emotion",
  },

  // ───────── Domestic Signal ─────────
  {
    text: "22/02/26 – 3:10 PM 🍳 Cooked egg pulusu yourself. ‘Future ki alavatu cheskovali.’",
    emoji: "🍲",
    category: "emotion",
  },

  // ───────── Health Dip ─────────
  {
    text: "22/02/26 – 4:57 PM 🤕 She said cramps, nausea, headache. Irritated mood.",
    emoji: "⚠️",
    category: "emotion",
  },
  {
    text: "22/02/26 – 8:56 PM 📞 Offered call to help her feel better.",
    emoji: "📱",
    category: "emotion",
  },
  {
    text: "22/02/26 – 8:57 PM 🫠 She postponed call to tomorrow. Boundary respected.",
    emoji: "🤝",
    category: "emotion",
  },
  {
    text: "22/02/26 – 8:59 PM 💊 She took painkiller. Slight improvement.",
    emoji: "🌙",
    category: "emotion",
  },

  // ───────── Closing Tone ─────────
  {
    text: "22/02/26 – 9:00 PM 🌌 ‘Gud night ra.’ Calm, stable ending.",
    emoji: "🌙",
    category: "emotion",
  },
  {
    text: "22/02/26 – 9:01 PM 😜 ‘Nit dreams loki vastadi emo…’ Playful closing line.",
    emoji: "💫",
    category: "game",
  },
];

const moments_23_02_26: Moment[] = [

  // ───────── Morning Care Tone ─────────
  {
    text: "23/02/26 – 5:36 AM 🌅 Soft good morning + health check.",
    emoji: "☀️",
    category: "emotion",
  },
  {
    text: "23/02/26 – 9:26 AM 😢 She felt bad for missing park. Sluggish but playful.",
    emoji: "🥹",
    category: "emotion",
  },

  // ───────── Call Expectation Build-Up ─────────
  {
    text: "23/02/26 – 9:33 AM 📞 Asked directly for call. ‘Missed your voice too badly.’",
    emoji: "💬",
    category: "romantic",
  },
  {
    text: "23/02/26 – 2:03 PM 🍬 Compared her voice to post-lunch sweet. Emotional dependency signal.",
    emoji: "🍭",
    category: "emotion",
  },
  {
    text: "23/02/26 – 2:12 PM ⚠️ She said family questioned call. Mild social friction.",
    emoji: "🫩",
    category: "mistakes",
  },

  // ───────── Smoking Boundary Tension ─────────
  {
    text: "23/02/26 – 2:14 PM 🚬 She said she's smoking. You reacted frustrated.",
    emoji: "😪",
    category: "emotion",
  },
  {
    text: "23/02/26 – 2:39 PM ⚠️ She clearly stated it's her coping mechanism. Asked not to repeat advice.",
    emoji: "🚧",
    category: "mistakes",
  },
  {
    text: "23/02/26 – 4:43 PM 🤝 You apologized and stopped pushing. Boundary correction.",
    emoji: "✔️",
    category: "emotion",
  },

  // ───────── Voice Therapy Arc ─────────
  {
    text: "23/02/26 – 4:03 PM 🎧 ‘Call therapy, voice therapy, image therapy.’ Playful emotional need expression.",
    emoji: "🫠",
    category: "romantic",
  },
  {
    text: "23/02/26 – 2:38 PM 🎙 She sent multiple voice notes. Direct compliance.",
    emoji: "🎧",
    category: "emotion",
  },

  // ───────── Sexual Escalation Zone ─────────
  {
    text: "23/02/26 – 4:22 PM 🔥 Virgin tag discussion. You introduced deadline framing.",
    emoji: "😎",
    category: "game",
  },
  {
    text: "23/02/26 – 4:25 PM ⚠️ She said ‘We crossed that stage long back.’ Major reveal.",
    emoji: "🫩",
    category: "emotion",
  },
  {
    text: "23/02/26 – 4:27 PM 🕒 You set self-deadline before 25. Pressure framing moment.",
    emoji: "⏳",
    category: "mistakes",
  },

  // ───────── Emotional Confusion Arc ─────────
  {
    text: "23/02/26 – 4:31 PM 🤯 You questioned: ‘Am I sad or enjoying?’ Identity confusion state.",
    emoji: "🫠",
    category: "emotion",
  },
  {
    text: "23/02/26 – 4:32 PM 😂 She stayed playful, not emotionally triggered.",
    emoji: "😄",
    category: "funny",
  },

  // ───────── Evening Health Crisis ─────────
  {
    text: "23/02/26 – 8:30 PM 🚨 BP dropped to 90/60 at gym. Severe dizziness, nausea.",
    emoji: "🩺",
    category: "emotion",
  },
  {
    text: "23/02/26 – 8:35 PM 💛 You shifted fully to care mode. No flirting. Only concern.",
    emoji: "🤍",
    category: "emotion",
  },
  {
    text: "23/02/26 – 9:35 PM 😭 She cried. Emotional vulnerability peak.",
    emoji: "🥺",
    category: "emotion",
  },
  {
    text: "23/02/26 – 9:36 PM 🫶 ‘Don't cry ra nenu vunna ga.’ Strong protector energy.",
    emoji: "🛡️",
    category: "romantic",
  },
  {
    text: "23/02/26 – 9:46 PM 💬 ‘Means a lot andi !!!!’ Affirmation moment.",
    emoji: "💖",
    category: "emotion",
  },

  // ───────── Stable Close ─────────
  {
    text: "23/02/26 – 9:49 PM 🌙 Playful good night exchange restored light tone.",
    emoji: "🌌",
    category: "emotion",
  },
];

const moments_24_02_26: Moment[] = [

  // ───────── Morning Affection ─────────
  {
    text: "24/02/26 – 6:13 AM 🌅 Soft morning energy. Immediate warmth restored after yesterday’s health scare.",
    emoji: "🌤️",
    category: "emotion",
  },
  {
    text: "24/02/26 – 7:14 AM 🎧 Voice appreciation escalated into poetic praise. 'Heals me.'",
    emoji: "🎶",
    category: "romantic",
  },
  {
    text: "24/02/26 – 8:14 AM 😏 She replied ‘Stupid’ with stickers. Playful acceptance, not rejection.",
    emoji: "😄",
    category: "funny",
  },

  // ───────── Beauty Validation Arc ─────────
  {
    text: "24/02/26 – 9:46 AM 💄 You said lipstick optional; natural look better. Strong validation move.",
    emoji: "🌸",
    category: "romantic",
  },
  {
    text: "24/02/26 – 9:50 AM 📸 Called her photo the best art you’ve seen. Admiration overload phase.",
    emoji: "😍",
    category: "romantic",
  },
  {
    text: "24/02/26 – 9:55 AM 😂 She laughed repeatedly. She enjoyed praise but didn’t fully melt.",
    emoji: "🤣",
    category: "funny",
  },

  // ───────── Energy Sync Phase ─────────
  {
    text: "24/02/26 – 10:45 AM ⚡ Claimed her energy filled you. Emotional dependency signal again.",
    emoji: "✨",
    category: "emotion",
  },
  {
    text: "24/02/26 – 11:08 AM 🎮 Ludo invite. Playful bonding, low-pressure connection.",
    emoji: "🎲",
    category: "game",
  },

  // ───────── Attachment Indicators ─────────
  {
    text: "24/02/26 – 1:57 PM 🫠 ‘Bye cheppi bojjo vallante manasu oppukovatledu.’ Attachment display.",
    emoji: "💞",
    category: "emotion",
  },
  {
    text: "24/02/26 – 2:16 PM 🎭 Dramatic self-pity jokes. She stayed playful.",
    emoji: "🤹",
    category: "funny",
  },

  // ───────── Evening Mood Drop ─────────
  {
    text: "24/02/26 – 8:32 PM 🌧️ She said mood not good. No flirting tone. Genuine irritation.",
    emoji: "😔",
    category: "emotion",
  },
  {
    text: "24/02/26 – 8:48 PM ⚠️ ‘Masth chirak ga unna.’ Clear emotional overload signal.",
    emoji: "⚡",
    category: "emotion",
  },

  // ───────── Financial Stress Reveal ─────────
  {
    text: "24/02/26 – 8:52 PM 💸 Money conflict revealed (₹2500 pending + application 5k). Family stress + BP context.",
    emoji: "💰",
    category: "emotion",
  },
  {
    text: "24/02/26 – 8:52 PM 🧠 She vented fully without filter. High trust disclosure moment.",
    emoji: "🔓",
    category: "emotion",
  },
  {
    text: "24/02/26 – 8:53 PM 🤝 You responded calmly: ‘Chyagaliga chesav. Enough.’ Stabilizing tone.",
    emoji: "🫶",
    category: "romantic",
  },

];

const moments_25_02_26: Moment[] = [

  // ───────── Financial Offer Escalation ─────────
  {
    text: "25/02/26 – 1:24 AM 💳 Suggested covering remaining amount + Amazon Pay Later solution.",
    emoji: "💸",
    category: "emotion",
  },
  {
    text: "25/02/26 – 1:25 AM 🛠 Offered structured repayment plan (after salary). Provider instinct activated.",
    emoji: "🧾",
    category: "romantic",
  },

  // ───────── Morning Soft Start ─────────
  {
    text: "25/02/26 – 6:16 AM 🌅 Warm morning message despite late-night money suggestion.",
    emoji: "🌤️",
    category: "emotion",
  },
  {
    text: "25/02/26 – 9:21 AM 📩 Multiple follow-ups. Slight pursuit energy visible.",
    emoji: "📱",
    category: "mistakes",
  },

  // ───────── Low Engagement Phase ─────────
  {
    text: "25/02/26 – 10:14 AM 😐 Her responses minimal (‘Very nice’, ‘Yeppp’). Emotional flatness.",
    emoji: "😶",
    category: "emotion",
  },
  {
    text: "25/02/26 – 11:36 AM 📄 You shifted to practical help (certificate upload reminder).",
    emoji: "📑",
    category: "emotion",
  },

  // ───────── Midday Silence ─────────
  {
    text: "25/02/26 – 1:22 PM ⏳ Repeated ‘Hello’ messages. Anxiety of silence starting.",
    emoji: "⏰",
    category: "mistakes",
  },
  {
    text: "25/02/26 – 3:52 PM 🥺 ‘Em aipoyav?’ Concern mixed with need for response.",
    emoji: "🥺",
    category: "emotion",
  },

  // ───────── Clear Boundary from Her ─────────
  {
    text: "25/02/26 – 3:58 PM 🌧 She said not feeling well and doesn’t want to talk to anyone.",
    emoji: "🛑",
    category: "emotion",
  },
  {
    text: "25/02/26 – 4:00 PM ✔ You accepted calmly. No pressure.",
    emoji: "🤝",
    category: "emotion",
  },
  {
    text: "25/02/26 – 4:00 PM 🫠 ‘If you want any healing I'm there.’ Soft supportive tone.",
    emoji: "🫶",
    category: "romantic",
  },

  // ───────── Night Check-In ─────────
  {
    text: "25/02/26 – 11:32 PM 🌙 Gentle good night attempt. Attachment still steady.",
    emoji: "🌌",
    category: "emotion",
  },

];

const extendedMoments_26_02_26: Moment[] = [

  // ───────── Emotional Residue from Past ─────────
  {
    text: "26/02/26 – 9:56 AM 🧠 Avoided park to prevent emotional trigger linked to past love.",
    emoji: "🕯️",
    category: "emotion",
  },
  {
    text: "26/02/26 – 10:16 AM 🥀 Revealed anniversary of someone deeply loved. Emotional memory still active.",
    emoji: "💔",
    category: "emotion",
  },
  {
    text: "26/02/26 – 10:26 AM 🎭 Labeled it 'Romantic tragedy.' Indicates unresolved narrative.",
    emoji: "🎬",
    category: "emotion",
  },

  // ───────── Reduced Engagement Signals ─────────
  {
    text: "26/02/26 – 11:11 AM 🚫 Declined Ludo. Stated 'no interest.' Low dopamine state.",
    emoji: "📉",
    category: "emotion",
  },
  {
    text: "26/02/26 – 11:12 AM 🧊 Replied minimally. Energy mismatch visible.",
    emoji: "❄️",
    category: "emotion",
  },

  // ───────── Escalation Fault Line ─────────
  {
    text: "26/02/26 – 11:40 AM 🗑️ Deleted message created ambiguity gap.",
    emoji: "❓",
    category: "mistakes",
  },
  {
    text: "26/02/26 – 11:43 AM 💥 Strong backlash: perceived disrespect + timing mismatch.",
    emoji: "🔥",
    category: "mistakes",
  },
  {
    text: "26/02/26 – 11:44 AM 🚨 Requested no messaging. Emotional overload spike.",
    emoji: "⚠️",
    category: "emotion",
  },

  // ───────── Repair Phase ─────────
  {
    text: "26/02/26 – 12:15 PM 🤝 Clear apology + space acknowledgment.",
    emoji: "🕊️",
    category: "emotion",
  },
  {
    text: "26/02/26 – 12:46 PM 🥺 Second apology showed anxiety but reinforced accountability.",
    emoji: "📉",
    category: "mistakes",
  },
  {
    text: "26/02/26 – 12:51 PM 🧘 She responded 'Odley.' De-escalation complete.",
    emoji: "✔️",
    category: "emotion",
  },

  // ───────── Evening Emotional State ─────────
  {
    text: "26/02/26 – 8:21 PM 🌧️ Responded with ‘Kastam.’ Emotional heaviness persisted.",
    emoji: "🌫️",
    category: "emotion",
  },
  {
    text: "26/02/26 – 8:48 PM 😤 Admitted irritation openly. Transparency without shutdown.",
    emoji: "⚡",
    category: "emotion",
  },

  // ───────── Stability Marker ─────────
  {
    text: "26/02/26 – 9:51 PM 🌙 Neutral good night. No further conflict. Emotional reset attempt.",
    emoji: "🌌",
    category: "emotion",
  },

];const moments_27_02_26: Moment[] = [

  // ───────── Post-Conflict Repair Initiation ─────────
  {
    text: "27/02/26 – 1:22 AM 🌙 She initiated 'Good night' after previous day conflict.",
    emoji: "🕊️",
    category: "emotion",
  },
  {
    text: "27/02/26 – 1:22 AM 🔄 Silent reconciliation signal. No ego carryover.",
    emoji: "🤍",
    category: "emotion",
  },

  // ───────── Morning Continuity ─────────
  {
    text: "27/02/26 – 6:16 AM 🌅 You responded warmly. Routine continuity restored.",
    emoji: "🌤️",
    category: "emotion",
  },

];
/* ── Main Page ── */
const AnniversaryPage = () => {
  const [activeFilter, setActiveFilter] = useState<Category | "all">("all");
  const filtered = activeFilter === "all" ? moments : moments.filter(m => m.category === activeFilter);

  return (
    <main className="pt-20 pb-12 min-h-screen">
      <CakeCutHero />

      {/* Our Chatting Moments */}
      <section className="px-4 py-12 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="font-dancing text-xl" style={{ color: "hsl(var(--primary))" }}>
            Messages that made us 'us'
          </p>
          <h2
            className="text-3xl md:text-4xl font-playfair font-bold mt-2"
            style={{
              backgroundImage: "var(--gradient-primary)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Our Chatting Moments 💬
          </h2>
        </motion.div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveFilter("all")}
            className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
            style={
              activeFilter === "all"
                ? { backgroundImage: "var(--gradient-primary)", color: "white", boxShadow: "var(--shadow-soft)" }
                : { background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }
            }
          >
            All ✨
          </button>
          {(Object.keys(categoryMeta) as Category[]).map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
              style={
                activeFilter === cat
                  ? { background: categoryMeta[cat].color, color: "white", boxShadow: "var(--shadow-soft)" }
                  : { background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }
              }
            >
              {categoryMeta[cat].label}
            </button>
          ))}
        </div>

        {/* Moment cards grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((moment, i) => (
            <MomentCard key={moment.text} moment={moment} index={i} />
          ))}
        </motion.div>

        {/* Placeholder note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground font-dancing text-lg mt-10"
        >
          More moments coming soon... this is just the beginning of our story 💫
        </motion.p>
      </section>
    </main>
  );
};

export default AnniversaryPage;
