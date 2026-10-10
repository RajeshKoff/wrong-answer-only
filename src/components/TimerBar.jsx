export default function TimerBar({ remaining, duration }) {
  const ratio = Math.max(0, Math.min(1, remaining / duration));
  return <div className="timer-track" aria-label={`${remaining.toFixed(1)} seconds remaining`}><div className={`timer-fill ${ratio < 0.32 ? "danger" : ratio < 0.62 ? "warning" : ""}`} style={{ transform: `scaleX(${ratio})` }} /></div>;
}
