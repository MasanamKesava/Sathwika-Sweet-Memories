import { useEffect, useState } from "react";

const START_DATE = new Date("2026-02-19T15:12:00");

export const LoveCounter = () => {
  const calculateTime = () => {
    const now = new Date();
    const difference = now.getTime() - START_DATE.getTime();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference / (1000 * 60 * 60)) % 24
    );
    const minutes = Math.floor(
      (difference / (1000 * 60)) % 60
    );
    const seconds = Math.floor(
      (difference / 1000) % 60
    );

    return { days, hours, minutes, seconds };
  };

  const [time, setTime] = useState(calculateTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(calculateTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-6 justify-center text-center font-playfair">
      <TimeBlock value={time.days} label="Days" />
      <TimeBlock value={time.hours} label="Hours" />
      <TimeBlock value={time.minutes} label="Minutes" />
      <TimeBlock value={time.seconds} label="Seconds" />
    </div>
  );
};

/* ---------- Small Reusable Component ---------- */

const TimeBlock = ({
  value,
  label,
}: {
  value: number;
  label: string;
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
        {value.toString().padStart(2, "0")}
      </div>
      <span className="text-sm text-muted-foreground">
        {label}
      </span>
    </div>
  );
};
