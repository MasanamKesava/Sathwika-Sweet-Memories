import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface TimelineItem {
  icon: string;
  label: string;
  value: string;
  color: string;
}

const timelineItems: TimelineItem[] = [
  { icon: "📅", label: "The Day", value: "February 19, 2026", color: "hsl(var(--primary))" },
  { icon: "⏰", label: "The Moment", value: "3:12 PM", color: "hsl(var(--lavender))" },
  { icon: "💬", label: "How We Met", value: "You were on an application platform — Kesava spotted you and couldn't help but say Hi 😊", color: "hsl(var(--primary))" },
  { icon: "✨", label: "First Impression", value: "\"Actually you're so cute in the photo\" — his very first compliment 💕", color: "hsl(var(--lavender))" },
  { icon: "🎓", label: "Your World", value: "Fresh BSE graduate from SRM University, ready to conquer the world 💪", color: "hsl(var(--primary))" },
  { icon: "🌸", label: "Where We Are", value: "Just the beginning of something beautiful...", color: "hsl(var(--lavender))" },
];

const TimelineCard = ({ item, index }: { item: TimelineItem; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
      className={`flex items-start gap-6 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
    >
      {/* Node */}
      <div className="relative flex-shrink-0">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-glow"
          style={{ backgroundImage: "var(--gradient-primary)" }}
        >
          {item.icon}
        </div>
      </div>

      {/* Card */}
      <div className="glass-card rounded-2xl p-5 flex-1 max-w-md">
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-1"
          style={{ color: item.color }}
        >
          {item.label}
        </p>
        <p className="font-playfair text-lg font-semibold text-foreground leading-relaxed">
          {item.value}
        </p>
      </div>
    </motion.div>
  );
};

export const OurStorySection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 px-4 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="font-dancing text-xl" style={{ color: "hsl(var(--primary))" }}>Chapter One</p>
        <h2
          className="text-4xl md:text-5xl font-playfair font-bold mt-2"
          style={{
            backgroundImage: "var(--gradient-primary)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Our Story 📖
        </h2>
        <p className="mt-3 text-muted-foreground font-dancing text-lg">
          Every great love story has a beginning...
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="max-w-2xl mx-auto relative">
        {/* Vertical line */}
        <div
          className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 timeline-line opacity-30 -translate-x-1/2"
        />

        <div className="space-y-10">
          {timelineItems.map((item, i) => (
            <TimelineCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
