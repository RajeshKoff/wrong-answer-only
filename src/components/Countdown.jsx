import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Countdown({ onDone }) {
  const [count, setCount] = useState(3);
  useEffect(() => {
    const timers = [700, 1400, 2100, 2750].map((delay, index) => setTimeout(() => {
      if (index < 3) setCount(2 - index);
      else onDone();
    }, delay));
    return () => timers.forEach(clearTimeout);
  }, [onDone]);
  return <div className="countdown-overlay"><AnimatePresence mode="wait"><motion.div key={count} className={`countdown-number ${count === 0 ? "go" : ""}`} initial={{ scale: 2.8, opacity: 0, rotate: -12 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} exit={{ scale: 0.35, opacity: 0 }} transition={{ type: "spring", stiffness: 260, damping: 16 }}>{count === 0 ? "GO!" : count}</motion.div></AnimatePresence><span>GET READY, {count === 0 ? "MACHI!" : "MACHI"}</span></div>;
}
