import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useQuestionTimer } from "../hooks/useQuestionTimer.js";
import TimerBar from "./TimerBar.jsx";

export default function QuestionCard({ question, level, index, total, score, streak, muted, onToggleMute, onAnswer, playTick }) {
  const [locked, setLocked] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const tickedRef = useRef(false);
  const onTimeout = useCallback((elapsed) => {
    if (locked) return;
    setLocked(true);
    onAnswer(null, elapsed);
  }, [locked, onAnswer]);
  const { remaining, elapsedMs } = useQuestionTimer(level.secPerQ, !locked, onTimeout);
  const choose = useCallback((id) => {
    if (locked) return;
    setLocked(true);
    const reactionMs = elapsedMs();
    const passed = id === question.wrong;
    setSelectedId(id);
    setFeedback(passed ? "pass" : "fail");
    if (passed) setEarnedPoints(Math.max(10, Math.round((level.secPerQ - reactionMs / 1000) * 100)));
    window.setTimeout(() => onAnswer(id, reactionMs), 125);
  }, [locked, onAnswer, elapsedMs, question.wrong, level.secPerQ]);
  useEffect(() => { tickedRef.current = false; }, [question.id]);
  useEffect(() => {
    if (remaining > 0 && remaining <= 0.5 && !tickedRef.current && !muted) {
      tickedRef.current = true;
      playTick();
    }
  }, [remaining, muted, playTick]);
  useEffect(() => {
    const onKeyDown = (event) => {
      if (!/^[1-4]$/.test(event.key) || event.repeat || locked) return;
      const option = question.options[Number(event.key) - 1];
      if (option) {
        event.preventDefault();
        choose(option.id);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [locked, question.options, choose]);
  return <motion.div className={`question-area ${feedback ? `feedback-${feedback}` : ""}`} key={question.id} initial={{ opacity: 0, y: 22, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}>
    <div className="question-topline"><span>⚡ QUICK! QUICK!</span><span>{level.title}</span></div>
    <div className="question-timer"><TimerBar remaining={remaining} duration={level.secPerQ} /><span>{remaining.toFixed(1)}s</span></div>
    <div className="question-card"><span className="question-mark">?</span><span className="question-label">ROUND {String(index + 1).padStart(2, "0")}</span><h2>{question.q}</h2><p>Tap the <b>ODD / WRONG</b> one!</p></div>
    <div className={`options-list options-${question.options.length}`}>
      {question.options.map((option, optionIndex) => <motion.button key={option.id} className={`option-button ${selectedId === option.id && feedback ? `picked-${feedback}` : ""}`} disabled={locked} onClick={() => choose(option.id)} whileTap={!locked ? { scale: 0.975 } : undefined} initial={{ x: optionIndex % 2 ? 16 : -16, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: optionIndex * 0.045 }}><span className="option-key">{optionIndex + 1}</span><span>{option.t}</span><span className="option-arrow">↗</span></motion.button>)}
    </div>
    <div className="game-bottom-hint"><span>⚡ TRUST YOUR FIRST INSTINCT</span><span>1–{question.options.length} TO PICK</span></div>
    <div className="visually-hidden" aria-live="polite">{score} points. {streak} streak.</div>
    {feedback === "pass" && <motion.div className="floating-points" initial={{ opacity: 0, y: 15, scale: 0.65 }} animate={{ opacity: [0, 1, 0], y: -42, scale: [0.65, 1.15, 1] }} transition={{ duration: 0.75 }}>+{earnedPoints}</motion.div>}
    <AnimatePresence>{locked && <motion.div className="answer-lock" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />}</AnimatePresence>
  </motion.div>;
}
