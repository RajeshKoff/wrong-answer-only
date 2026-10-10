import { motion } from "framer-motion";
import { ArrowLeft, RotateCcw, Star } from "lucide-react";
import Confetti from "./Confetti.jsx";
import { LEVELS_META } from "../config.js";
import { starsForAttempt } from "../utils/scoring.js";

const taunts = ["Aiyo! Too quick with the tap, machi!", "Close call! Your finger got overconfident.", "Plot twist: the obvious one was right!", "Mass try. One tiny tap betrayal.", "The quiz said ‘wrong only’ and you went right!"];
export default function ResultScreen({ result, levelId, profile, best, runScore, onRetry, onMap, onLeaderboard }) {
  const level = LEVELS_META.find((item) => item.id === levelId);
  const taunt = result.pickedId == null ? "Timer said bye before the tap!" : taunts[(Date.now() + levelId) % taunts.length];
  const stars = result.won ? starsForAttempt(result.attemptNumber) : 0;
  const failQuestion = result.question;
  return <motion.div className={`screen result-screen ${result.won ? "win" : "lose"}`} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}>
    {result.won && <Confetti />}
    <header className="result-topline"><button className="result-map-button" onClick={onMap}><ArrowLeft size={18} /><span>LEVEL MAP</span></button>{!result.won && <div className="result-attempt-badge"><small>ATTEMPT</small><b>#{result.attemptNumber || 1}</b></div>}<div className="result-stage-badge"><small>STAGE</small><b>{String(levelId).padStart(2, "0")}</b></div></header>
    {result.won ? <>
      <span className="result-kicker">{level.title.toUpperCase()} CLEARED</span>
      <h2 className="result-title">MASS<br /><em>ANSWERS!</em></h2><div className="star-row" aria-label={`${stars} out of 5 stars`}>{[1, 2, 3, 4, 5].map((star) => <Star key={star} size={25} strokeWidth={2.4} fill={star <= stars ? "currentColor" : "none"} className={star <= stars ? "earned" : ""} />)}</div>
      <div className="result-stats"><div className="result-stat-item"><small>RUN SCORE</small><b>{runScore.toLocaleString()}</b><span>POINTS</span></div><div className="result-stat-item"><small>CLEAR TIME</small><b>{(result.runTimeMs / 1000).toFixed(1)}<i>s</i></b><span>THIS RUN</span></div><div className="result-stat-item"><small>BEST</small><b>{best ? `${(best.timeMs / 1000).toFixed(1)}s` : "NEW!"}</b><span>RECORD</span></div></div>
      <button className="arcade-button full-button" onClick={onRetry}>PLAY AGAIN <RotateCcw size={18} /></button>
    </> : <>
      <span className="result-kicker">RUN OVER • {level.title.toUpperCase()}</span><div className="fail-stamp">{result.pickedId == null ? "TIME UP!" : "OOPS!"}</div><h2 className="result-title fail-title">{taunt}</h2>
      <div className="fail-review"><p>{failQuestion?.q}</p><div className="review-options">{failQuestion?.options.map((option) => <div key={option.id} className={`${option.id === result.wrongId ? "is-wrong-answer" : ""} ${option.id === result.pickedId ? "is-picked" : ""}`}><span>{option.t}</span>{option.id === result.wrongId && <b>THIS WAS THE ODD ONE ✓</b>}{option.id === result.pickedId && <b>YOUR PICK</b>}</div>)}</div>{result.pickedId != null && <strong>Oops! You picked the RIGHT one. Wrong answers only!</strong>}</div>
      <button className="arcade-button full-button" onClick={onRetry}>RETRY LEVEL <RotateCcw size={18} /></button><button className="secondary-button full-button" onClick={onLeaderboard}>CHECK THE LEADERBOARD</button>
    </>}
  </motion.div>;
}
