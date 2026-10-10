import { useMemo, useState } from "react";
import { ArrowLeft, Crown, Trophy, Medal, Sparkles, Star } from "lucide-react";
import Podium from "./Podium.jsx";

export default function Leaderboard({ players, profile, onBack }) {
  const [tab, setTab] = useState("overall");
  const [level, setLevel] = useState(1);
  const rows = useMemo(() => {
    if (tab === "overall") return players;
    return players.filter((player) => player.levelTimes?.[level] != null).sort((a, b) => a.levelTimes[level] - b.levelTimes[level] || b.score - a.score);
  }, [players, tab, level]);
  const yourIndex = rows.findIndex((player) => player.id === "you");
  const top = rows.slice(0, 20);
  return <div className="screen leaderboard-screen">
    <header className="leaderboard-header">
      <button className="icon-button" onClick={onBack} aria-label="Back"><ArrowLeft /></button>
      <div className="leaderboard-title"><span className="eyebrow">WAO! SCOREBOARD</span><h2>PLAYER <em>RANKS</em></h2></div>
      <div className="leaderboard-total"><Trophy /><b>{players.length}</b><small>PLAYERS</small></div>
    </header>
    <div className="leader-tabs" aria-label="Leaderboard category">
      <button className={tab === "overall" ? "active" : ""} onClick={() => setTab("overall")}>OVERALL</button>
      <button className={tab === "level" ? "active" : ""} onClick={() => setTab("level")}>LEVEL BEST TIME</button>
    </div>
    {tab === "level" && <div className="level-picker" aria-label="Choose a level">{[1, 2, 3, 4, 5].map((number) => <button key={number} className={level === number ? "active" : ""} onClick={() => setLevel(number)}>L{number}</button>)}</div>}
    {tab === "overall" && rows.length >= 3 && <section className="podium-panel"><div className="leaderboard-section-title"><span>TOP PLAYERS</span><small>THE CURRENT LEADERS</small></div><Podium players={rows.slice(0, 3)} /></section>}
    {rows.length === 0 ? <div className="leader-empty"><div className="empty-medal"><Medal size={32} /></div><span className="eyebrow"> SCOREBOARD OPEN</span><h3>NO SCORES<br />ON THE BOARD</h3><p>Clear a level and claim the first spot.<br />Your name goes here, machi.</p></div> : <div className="leaderboard-list-wrap"><div className="leaderboard-list">{top.map((player, index) => {
      const playerStars = tab === "overall" ? player.stars || 0 : player.levelStars?.[level] || 0;
      const playerAttempts = tab === "overall" ? player.attempts || 0 : player.levelAttempts?.[level] || 1;
      return <div key={player.id} className={`leader-row ${player.id === "you" ? "is-you" : ""}`}>
        <span className="rank-number">{index === 0 ? <Crown size={15} fill="currentColor" /> : String(index + 1).padStart(2, "0")}</span>
          <span className="leader-person"><span className="leader-name">{player.name}{player.id === "you" && <small>YOU</small>}</span></span>
          <span className="leader-summary"><span className="leader-metrics"><span className="leader-stars" aria-label={`${playerStars} stars`}>{Array.from({ length: Math.min(playerStars, 5) }, (_, starIndex) => <Star key={starIndex} size={11} fill="currentColor" />)}</span><span className="leader-attempts" aria-label={`${playerAttempts} attempts`}><small>ATTEMPTS</small><b>{playerAttempts}</b></span></span><span className={`leader-result ${tab === "level" ? "is-time" : ""}`}>{tab === "overall" ? <><b>{player.score.toLocaleString()}</b><small>POINTS</small></> : <><b>{player.levelTimes[level].toFixed(2)}</b><small>SECONDS</small></>}</span></span>
      </div>;
    })}</div></div>}
    <footer className="your-rank-bar">
      <div className="your-rank-place"><span><Trophy size={14} /> YOUR RANK</span><b>{yourIndex >= 0 ? `#${yourIndex + 1}` : "—"}<i> / {rows.length}</i></b></div>
      <div className="your-rank-player"><span>PLAYER</span><strong>{profile?.name || "PLAYER"}</strong><small>{yourIndex < 0 ? "CLEAR A LEVEL TO RANK" : "KEEP CLIMBING!"}</small></div>
    </footer>
  </div>;
}
