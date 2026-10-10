export default function Hud({ level, score }) {
  return <header className="game-hud">
    <div className="hud-stage">
      <span className="hud-stage-number">{String(level.id).padStart(2, "0")}</span>
      <span className="hud-stage-copy"><small>NOW PLAYING</small><b>{level.title}</b></span>
    </div>
    <div className="hud-score"><small>SCORE</small><b>{score.toLocaleString()}</b></div>
  </header>;
}
