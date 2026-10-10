import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Countdown({ onDone }) {
  const [count, setCount] = useState(3);
  const onDoneRef = useRef(onDone);
  useEffect(() => { onDoneRef.current = onDone; }, [onDone]);
  useEffect(() => {
    const timers = [
      setTimeout(() => setCount(2), 800),
      setTimeout(() => setCount(1), 1600),
      setTimeout(() => setCount(0), 2400),
      setTimeout(() => onDoneRef.current(), 3100),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);
  return <div className="countdown-overlay"><AnimatePresence mode="wait"><motion.div key={count} className={`countdown-number ${count === 0 ? "go" : ""}`} initial={{ scale: 1.35, opacity: 0, y: -10 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 8 }} transition={{ duration: 0.22, ease: "easeOut" }}>{count === 0 ? "GO!" : count}</motion.div></AnimatePresence><span>GET READY, {count === 0 ? "MACHI!" : "MACHI"}</span></div>;
}
