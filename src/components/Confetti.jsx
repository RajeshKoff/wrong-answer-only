import { motion, useReducedMotion } from "framer-motion";
const colors = ["#ffd400", "#ff4d6d", "#38e8ff", "#b987ff", "#fff4b0"];
export default function Confetti() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return <div className="confetti-layer" aria-hidden="true">{Array.from({ length: 42 }, (_, index) => <motion.i key={index} style={{ left: `${(index * 37) % 100}%`, backgroundColor: colors[index % colors.length], rotate: index * 29 }} initial={{ y: "-10vh", opacity: 1 }} animate={{ y: "110vh", rotate: index * 29 + 640, opacity: [1, 1, 0] }} transition={{ duration: 2.1 + (index % 5) * 0.24, delay: (index % 9) * 0.07, ease: "easeIn" }} />)}</div>;
}
