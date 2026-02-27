import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

/* ── Cake-cut hero ── */
const cakeCandles = ["💖", "🎂", "✨", "🎉", "💕", "🎊", "🌟"];

/* ── Date & Category types ── */
type Category = "funny" | "romantic" | "mistakes" | "surprise" | "emotion" | "game";
type DateKey = "feb19" | "feb20" | "feb21" | "feb22" | "feb23" | "feb24" | "feb25" | "feb26";

interface Moment {
  text: string;
  emoji: string;
  category: Category;
  time?: string;
}

interface DayData {
  label: string;
  subtitle: string;
  emoji: string;
  moments: Moment[];
}

const categoryMeta: Record<Category, { label: string; emoji: string; color: string }> = {
  funny:    { label: "Funny 😂",    emoji: "😂", color: "hsl(40, 85%, 70%)" },
  romantic: { label: "Romantic 💕",  emoji: "💕", color: "hsl(340, 75%, 65%)" },
  mistakes: { label: "Mistakes 🙈", emoji: "🙈", color: "hsl(20, 70%, 65%)" },
  surprise: { label: "Surprise 🎉", emoji: "🎉", color: "hsl(270, 50%, 70%)" },
  emotion:  { label: "Emotion 🥹",  emoji: "🥹", color: "hsl(200, 60%, 65%)" },
  game:     { label: "Games 🎮",    emoji: "🎮", color: "hsl(150, 50%, 60%)" },
};

const dateMeta: Record<DateKey, DayData> = {
  feb19: {
    label: "Feb 19 — Day 1",
    subtitle: "The First Hi 💌",
    emoji: "💌",
    moments: [
      { text: "\"Actually you're so cute in the photo\" — Kesava's very first compliment, honest & straight from the heart 💖", emoji: "😍", category: "romantic", time: "3:40 PM" },
      { text: "\"Full of hair and curls, Beautiful nose, Pretty eyes, And etc etc..\" — couldn't stop describing her beauty 🥰", emoji: "💖", category: "romantic", time: "3:41 PM" },
      { text: "\"Actually sathwika ane peru naku baga nachidi telsa..\" — \"Enduku?\" — \"Aa peru nuv pettukunav kabatti\" 🥰", emoji: "✨", category: "romantic", time: "4:14 PM" },
      { text: "\"Endhi ah Dakota photo lo cute\" — her shocked reaction to being called cute from an application photo 🤣", emoji: "🤣", category: "funny", time: "3:40 PM" },
      { text: "\"Kompathesi police ki ivvavau kada\" — him sending passport-size photo and her reaction 😂", emoji: "📸", category: "funny", time: "4:11 PM" },
      { text: "\"do you want to become a psychiatrist?\" — \"Nah, Psychologist\" — the classic confusion moment 🧠", emoji: "🧠", category: "mistakes", time: "4:18 PM" },
      { text: "\"Then I should call you as Dr.Psycho\" — \"You can actually 🥴\" — the iconic nickname was born! 🎊", emoji: "🎊", category: "surprise", time: "4:20 PM" },
      { text: "\"Avasaram ite goa kuda vasta ra Bai\" — the very first Goa trip plan dropped casually ✈️", emoji: "✈️", category: "surprise", time: "3:59 PM" },
      { text: "\"Pichi vallu andaga vuntaru ante ento anukunna nijame\" — crazy people are beautiful 😜", emoji: "😜", category: "funny", time: "4:36 PM" },
      { text: "\"Hard to say bye to you\" — said bye THREE times and kept coming back 🤧", emoji: "🤧", category: "emotion", time: "8:40 PM" },
      { text: "Sathwika poem: \"Your name feels soft on my tongue, Like morning light where quiet dreams are sung\" 🥹", emoji: "📜", category: "romantic", time: "9:02 PM" },
      { text: "\"Once again, you look so unbelievably cute and absolutely gorgeous\" 💖 — couldn't stop complimenting", emoji: "💖", category: "romantic", time: "5:14 PM" },
    ],
  },
  feb20: {
    label: "Feb 20 — Day 2",
    subtitle: "Getting Closer 🌸",
    emoji: "🌸",
    moments: [
      { text: "\"Coding tho patu flirting bonus ga nerchkunava\" — she caught his smooth moves 😂", emoji: "💻", category: "funny", time: "6:58 AM" },
      { text: "\"Adi puttuktho vachhindi amma… By birth de Bramha Devudu tho kaduplo vunnapude coaching teeskunna\" — flirting is by birth 🤣", emoji: "🤣", category: "funny", time: "6:59 AM" },
      { text: "\"Cuckoo holiday lo undi anukunta… psychologist madam voice substitute cheyyara?\" — asking for her voice note instead of bird sounds 🐦", emoji: "🐦", category: "funny", time: "7:07 AM" },
      { text: "\"Nee charming look neeku alavatu aipoyindi… kani naku adhi prati sari oka kotha feeling\" 🥰", emoji: "🥰", category: "romantic", time: "6:58 AM" },
      { text: "\"Future Dr. Sathwika ki preparation phase anukundam\" — \"so soothing to hear abboooooo\" 🥹", emoji: "🎓", category: "romantic", time: "6:36 AM" },
      { text: "\"Needhe front page, Special thanks ani\" — she'll put his name on her biography's front page 📖", emoji: "📖", category: "romantic", time: "6:42 AM" },
      { text: "\"Honestly… you have a very charming presence. More than my imagination\" 💫", emoji: "💫", category: "romantic", time: "10:19 PM" },
      { text: "\"extra dimples that makes heart melt\" 💖 — after seeing her shy smile photo", emoji: "💖", category: "romantic", time: "10:34 PM" },
      { text: "Created Instagram JUST for her — \"nee okkadani kosame create chesa just now\" 📱", emoji: "📱", category: "surprise", time: "10:07 PM" },
      { text: "Accidentally called at night and woke her up — \"Thikka na nek?\" — she was NOT happy 😅", emoji: "😅", category: "mistakes", time: "11:30 PM" },
      { text: "\"sensodyne paste lo sensitivity ekkuva vuntadi ani colgate shift aipoyam\" — sensitivity joke 🤣", emoji: "🦷", category: "funny", time: "10:09 PM" },
      { text: "Deep talk about panic attacks, anxiety and health — both shared vulnerabilities for the first time 🥺", emoji: "🫶", category: "emotion", time: "9:50 PM" },
      { text: "\"neetho Matladakapothe konchem empty anipinchindi\" — feeling empty without talking to her 💗", emoji: "💗", category: "emotion", time: "9:41 PM" },
      { text: "Phoenix tattoo meaning — \"Bounce back after trauma\" — and butterfly tattoo for transformation 🦋", emoji: "🦋", category: "emotion", time: "12:52 PM" },
    ],
  },
  feb21: {
    label: "Feb 21 — Day 3",
    subtitle: "The Website Surprise 🤯",
    emoji: "🤯",
    moments: [
      { text: "Sent her the first website! \"Thissss isss so fucking wholesome, I mean itttttt, Litreally cutestttt!!\" 🤯🥹", emoji: "🌐", category: "surprise", time: "7:52 AM" },
      { text: "Sent the upgraded Lovable version — \"Sumperrrrrr raaaaaaa\" 🌟", emoji: "🌟", category: "surprise", time: "10:00 AM" },
      { text: "\"Bank lo stock antha oke Sari pettesav\" — when she spam-sent 10 stickers at once 😂", emoji: "📦", category: "funny", time: "6:58 AM" },
      { text: "\"Lux soap vastava tintava?\" — \"Thagtha\" — she drinks Lux soap apparently 🤣", emoji: "🧼", category: "funny", time: "6:59 AM" },
      { text: "\"Actually, neetho matladithe mood automatic ga change aipothundi\" — she's his mood booster 💕", emoji: "💕", category: "romantic", time: "10:06 PM" },
      { text: "\"Flirting syllabus lo part kaadu… It's spontaneous\" — \"intha osthada neku\" — \"enno yella practise\" 😏", emoji: "😏", category: "funny", time: "10:37 PM" },
      { text: "\"Understanding ki marks ivvava?\" — asking for grades in understanding 😌", emoji: "📝", category: "funny", time: "10:13 PM" },
      { text: "She shared about her abusive childhood and they connected deeply over shared pain 🥺", emoji: "🥺", category: "emotion", time: "12:36 PM" },
      { text: "\"nuv Old aa? Nuv age avvavu… level upgrade avthav\" — \"Software update laga every year better version release\" 😜", emoji: "📱", category: "romantic", time: "10:27 PM" },
      { text: "Die-hard Mahesh Babu fan discussion — she's been a fan since age 7! 🎬", emoji: "🎬", category: "game", time: "10:22 PM" },
    ],
  },
  feb22: {
    label: "Feb 22 — Day 4",
    subtitle: "Sunday Vibes ☀️",
    emoji: "☀️",
    moments: [
      { text: "\"Couple friendly ki mom tho\" — she planned to watch a romantic movie with her mom 😏🤣", emoji: "🎬", category: "funny", time: "11:01 AM" },
      { text: "\"Em chesthunav road side gadni kada nenu\" — Kesava's morning walk is literally roadside wandering 😂", emoji: "🚶", category: "funny", time: "6:50 AM" },
      { text: "\"DP lo main character nuv… kani blue shirt supporting role strong ga undi\" — jealous of a shirt 😜", emoji: "👕", category: "romantic", time: "2:41 PM" },
      { text: "Both are Prabhas fans! She wore out the Pournami CD from replaying — \"petti petti petti CD arigipoindi\" 🤣", emoji: "🎥", category: "game", time: "3:05 PM" },
      { text: "She had bad cramps and headache all day — he offered to call just to make her feel better 💗", emoji: "💗", category: "emotion", time: "8:56 PM" },
      { text: "\"Nit dreams loki vastadi emo… Manchi outfit and perfume eskoni ready avta\" — getting ready for her dreams 🤪", emoji: "🤪", category: "funny", time: "9:01 PM" },
      { text: "\"Love letters??? Just for name sake\" — her reaction to the website update 🤣", emoji: "💌", category: "surprise", time: "11:57 AM" },
      { text: "\"Goppa kalakaarude unnad neelo\" — she called him a great artist for the website 🎨", emoji: "🎨", category: "emotion", time: "12:00 PM" },
    ],
  },
  feb23: {
    label: "Feb 23 — Day 5",
    subtitle: "Voice Notes & Deep Care 🎵",
    emoji: "🎵",
    moments: [
      { text: "\"Maa babu chepte vinanu kani mahesh babu chepte vinali\" — will only listen to Mahesh Babu, not his own dad 😂", emoji: "🎭", category: "funny", time: "3:14 PM" },
      { text: "\"papani chusi singing nerchukolsindi poyi smoking nerchukunav\" — Lana Del Rey inspired smoking 🤣", emoji: "🎤", category: "funny", time: "2:33 PM" },
      { text: "\"I need therapy — Call therapy, Voice therapy, Image therapy, Video therapy\" — \"Eedokadu na prananiki\" 🤣", emoji: "🏥", category: "funny", time: "4:03 PM" },
      { text: "\"Ee flirting kuda lekapothe na Jeevitham cable leni black and TV la aipotundi\" — life without flirting 📺", emoji: "📺", category: "funny", time: "4:30 PM" },
      { text: "\"Ur such a cute angel ra\" 😍 — pure admiration", emoji: "😇", category: "romantic", time: "3:15 PM" },
      { text: "\"Ne face lo smile is the most beautiful scene I have in this world\" 💖 — when she was crying", emoji: "💖", category: "romantic", time: "9:38 PM" },
      { text: "\"Oh baby don't cry ra nenu vunna ga\" — comforting her when she broke down crying 🥺", emoji: "🥺", category: "emotion", time: "9:36 PM" },
      { text: "Her BP dropped to 90/60 at gym, head spinning while driving bike home — he was genuinely scared 😱", emoji: "😱", category: "emotion", time: "8:30 PM" },
      { text: "\"Really I'm with you 💯... Either How and what are you are\" — unconditional support 💗", emoji: "💯", category: "emotion", time: "9:43 PM" },
      { text: "\"Means a lot andi!!!!\" — \"Lot is enough no, andi's nahi\" — cutting formalities ✂️😜", emoji: "✂️", category: "funny", time: "9:47 PM" },
    ],
  },
  feb24: {
    label: "Feb 24 — Day 6",
    subtitle: "Ludo & Bonding 🎲",
    emoji: "🎲",
    moments: [
      { text: "First ever Ludo game together! She beat him — \"6 paddaappudue ardam aipoinda ye 1 padadu ani\" 😭😂", emoji: "🎲", category: "game", time: "11:22 AM" },
      { text: "\"Ludo adudama\" round 2 — \"Idem ludo pichi\" — he's obsessed with playing Ludo with her 🤣", emoji: "🎮", category: "game", time: "2:06 PM" },
      { text: "\"Your voice is very soft and sweet that I can use as a stress buster\" 💆‍♂️ — after morning call", emoji: "🎵", category: "romantic", time: "7:14 AM" },
      { text: "\"Nuv lipstick petina baguntav… kani natural look inka cute ga untundi\" — \"The best art I have seen by God\" 😍", emoji: "🎨", category: "romantic", time: "9:47 AM" },
      { text: "\"nee andam oka varam adi podakapovadam oka shapam\" — her beauty is a blessing, not seeing it is a curse 💕", emoji: "💕", category: "romantic", time: "12:10 PM" },
      { text: "\"Oka pakka deep sleep inko pakka na babu thitlu… Aho em relaxing ga vuntadi le\" — sleep + scolding combo 😂", emoji: "😴", category: "funny", time: "11:26 AM" },
      { text: "\"Nek nenem chesna cute ey\" — \"yep em chesina\" — everything she does is cute to him 🥰", emoji: "🥰", category: "romantic", time: "8:46 AM" },
      { text: "She opened up about financial stress — 10k situation, application fees, he offered to help 💗", emoji: "💗", category: "emotion", time: "8:52 PM" },
      { text: "\"nee lanti angles kosam oka mini yuddam cheyochu\" — ready to fight a war for her 😌", emoji: "⚔️", category: "romantic", time: "12:15 PM" },
    ],
  },
  feb25: {
    label: "Feb 25 — Day 7",
    subtitle: "A Quiet Day 🌧️",
    emoji: "🌧️",
    moments: [
      { text: "She wasn't feeling well — \"Nak ontlo baledh and evartho matladali anpitle\" — he respected her space 🫂", emoji: "🫂", category: "emotion", time: "3:58 PM" },
      { text: "\"If you want any healing I'm there\" 💕 — always there when she needs", emoji: "💕", category: "romantic", time: "4:00 PM" },
      { text: "He offered Amazon Pay Later to help with her remaining 2500 — genuine care beyond words 🥹", emoji: "🥹", category: "emotion", time: "1:24 AM" },
      { text: "\"Wishing you a speedy recovery\" — sent a sweet video even though she wasn't replying 💖", emoji: "💖", category: "romantic", time: "4:06 PM" },
    ],
  },
  feb26: {
    label: "Feb 26 — Day 8",
    subtitle: "One Week Together 🎂",
    emoji: "🎂",
    moments: [
      { text: "\"I hope this day will be a great day to you\" 💞 — morning wish before she woke up", emoji: "🌅", category: "romantic", time: "6:28 AM" },
      { text: "She shared that Feb 26 is someone special's birthday — park memories from 3 years ago 🥹", emoji: "🥹", category: "emotion", time: "10:14 AM" },
      { text: "\"Ninnu miss cheskundante papam vadu bad luck ki Brand ambassador ayi vundali\" — iconic line 😂💖", emoji: "🏆", category: "funny", time: "10:19 AM" },
      { text: "\"Mandi vairagyam batukuku kada madhyalo ee love ento\" — teasing about love in a single life 😂", emoji: "😂", category: "funny", time: "10:17 AM" },
      { text: "\"Ludo adudama\" — \"Nah interest leee\" — Ludo rejection round 😂", emoji: "🎲", category: "game", time: "11:11 AM" },
      { text: "One whole week of Hi's, Bye's, poems, websites, voice notes, ludo, care & love — just the beginning 💫", emoji: "💫", category: "emotion", time: "" },
    ],
  },
};

/* ── Cake-Cut Hero ── */
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

      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={inView ? { scale: 1, rotate: 0 } : {}}
        transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
        className="relative inline-block mb-6"
      >
        <div className="text-8xl md:text-9xl">🎂</div>
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
      transition={{ duration: 0.5, delay: index * 0.06 }}
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
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
              style={{ background: `${meta.color}22`, color: meta.color }}
            >
              {meta.label}
            </span>
            {moment.time && (
              <span className="text-[10px] text-muted-foreground">⏰ {moment.time}</span>
            )}
          </div>
          <p className="text-sm text-foreground/80 mt-2 leading-relaxed">{moment.text}</p>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Day Section ── */
const DaySection = ({ dateKey, day, activeFilter }: { dateKey: string; day: DayData; activeFilter: Category | "all" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const filtered = activeFilter === "all" ? day.moments : day.moments.filter(m => m.category === activeFilter);

  if (filtered.length === 0) return null;

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="text-4xl">{day.emoji}</span>
        <div>
          <h3
            className="text-2xl md:text-3xl font-playfair font-bold"
            style={{
              backgroundImage: "var(--gradient-primary)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {day.label}
          </h3>
          <p className="font-dancing text-lg text-muted-foreground">{day.subtitle}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((moment, i) => (
          <MomentCard key={`${dateKey}-${i}`} moment={moment} index={i} />
        ))}
      </div>
    </motion.section>
  );
};

/* ── Main Page ── */
const AnniversaryPage = () => {
  const [activeFilter, setActiveFilter] = useState<Category | "all">("all");

  const totalMoments = Object.values(dateMeta).reduce((sum, d) => sum + d.moments.length, 0);

  return (
    <main className="pt-20 pb-12 min-h-screen">
      <CakeCutHero />

      <section className="px-4 py-12 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="font-dancing text-xl" style={{ color: "hsl(var(--primary))" }}>
            {totalMoments} real moments from our chats
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
          <p className="text-muted-foreground font-dancing text-lg mt-2">
            Day by day, message by message — this is how our story unfolded
          </p>
        </motion.div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 sticky top-16 z-10 py-3 backdrop-blur-md rounded-2xl">
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

        {/* Day-wise sections */}
        {(Object.keys(dateMeta) as DateKey[]).map(key => (
          <DaySection key={key} dateKey={key} day={dateMeta[key]} activeFilter={activeFilter} />
        ))}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground font-dancing text-lg mt-10"
        >
          From "Hi" to "Good night ra" — every message brought us closer 💫
        </motion.p>
      </section>
    </main>
  );
};

export default AnniversaryPage;
