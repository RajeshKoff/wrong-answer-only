import { motion } from "framer-motion";
import { ArrowLeft, RotateCcw, Trophy } from "lucide-react";
import Confetti from "./Confetti.jsx";
import { LEVELS_META } from "../config.js";

const taunts = ["Aiyo! Too quick with the tap, machi!", "Close call! Your finger got overconfident.", "Plot twist: the obvious one was right!", "Mass try. One tiny tap betrayal.", "The quiz said ‘wrong only’ and you went right!"];
export default function ResultScreen({ result, levelId, profile, best, runScore, onRetry, onMap, onLeaderboard }) {
  const level = LEVELS_META.find((item) => item.id === levelId);
  const taunt = result.pickedId == null ? "Timer said bye before the tap!" : taunts[(Date.now() + levelId) % taunts.length];
  const stars = result.won ? (result.reactions.reduce((sum, item) => sum + item.reactionMs / (item.timeLimit * 1000), 0) / Math.max(1, result.reactions.length) < 0.5 ? 3 : 2) : 0;
  const failQuestion = result.question;
  return <motion.div className={`screen result-screen ${result.won ? "win" : "lose"}`} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}>
    {result.won && <Confetti />}
    <div className="result-topline"><button className="text-button" onClick={onMap}><ArrowLeft size={16} /> LEVEL MAP</button><span>STAGE {String(levelId).padStart(2, "0")}</span></div>
    {result.won ? <>
      <span className="result-kicker">{level.title.toUpperCase()} • CLEARED</span><motion.div className="result-emblem" initial={{ scale: 0.4, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 180 }}><Trophy size={50} /></motion.div>
      <h2 className="result-title">MASS<br /><em>ANSWER!</em></h2><div className="star-row">{[1, 2, 3].map((star) => <span key={star} className={star <= stars ? "earned" : ""}>★</span>)}</div>
      <p className="result-caption">Every round wrong. Every tap right.</p><div className="result-stats"><div><small>RUN SCORE</small><b>{runScore.toLocaleString()}</b></div><div><small>CLEAR TIME</small><b>{(result.runTimeMs / 1000).toFixed(1)}<i>s</i></b></div><div><small>BEST</small><b>{best ? `${(best.timeMs / 1000).toFixed(1)}s` : "NEW!"}</b></div></div>
      <button className="arcade-button full-button" onClick={onRetry}>PLAY AGAIN <RotateCcw size={18} /></button><button className="secondary-button full-button" onClick={onMap}>BACK TO LEVEL MAP</button>
    </> : <>
      <span className="result-kicker">RUN OVER • {level.title.toUpperCase()}</span><div className="fail-stamp">{result.pickedId == null ? "TIME UP!" : "OOPS!"}</div><h2 className="result-title fail-title">{taunt}</h2>
      <div className="fail-review"><p>{failQuestion?.q}</p><div className="review-options">{failQuestion?.options.map((option) => <div key={option.id} className={`${option.id === result.wrongId ? "is-wrong-answer" : ""} ${option.id === result.pickedId ? "is-picked" : ""}`}><span>{option.t}</span>{option.id === result.wrongId && <b>THIS WAS THE ODD ONE ✓</b>}{option.id === result.pickedId && <b>YOUR PICK</b>}</div>)}</div><strong>{result.pickedId == null ? "No tap before the buzzer. Wrong answers only!" : "Oops! You picked the RIGHT one. Wrong answers only!"}</strong></div>
      <div className="attempt-note">ATTEMPT #{(result.attemptNumber || 1)} • {profile?.name}</div><button className="arcade-button full-button" onClick={onRetry}>RETRY LEVEL <RotateCcw size={18} /></button><button className="secondary-button full-button" onClick={onLeaderboard}>CHECK THE LEADERBOARD</button>
    </>}
  </motion.div>;
}
