import { useMemo, useState } from "react";
import { ArrowLeft, Crown, Trophy, Medal, Sparkles } from "lucide-react";
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
    <header className="leaderboard-header"><button className="icon-button" onClick={onBack} aria-label="Back"><ArrowLeft /></button><div><span className="eyebrow">THE HALL OF MASS</span><h2>HIGH <em>SCORES</em></h2></div><Trophy className="leaderboard-trophy" /></header>
    <div className="leader-tabs"><button className={tab === "overall" ? "active" : ""} onClick={() => setTab("overall")}>OVERALL</button><button className={tab === "level" ? "active" : ""} onClick={() => setTab("level")}>LEVEL BEST TIME</button></div>
    {tab === "level" && <div className="level-picker">{[1, 2, 3, 4, 5].map((number) => <button key={number} className={level === number ? "active" : ""} onClick={() => setLevel(number)}>L{number}</button>)}</div>}
    {tab === "overall" && rows.length >= 3 && <Podium players={rows.slice(0, 3)} />}
    {rows.length === 0 ? <div className="leader-empty"><div className="empty-medal"><Medal size={32} /></div><span className="eyebrow"><Sparkles size={13} /> SCOREBOARD OPEN</span><h3>NO SCORES<br />ON THE BOARD</h3><p>Clear a level and claim the first spot.<br />Your name goes here, machi.</p></div> : <div className="leaderboard-list-wrap"><div className="leader-list-heading"><span>RANK / PLAYER</span><span>{tab === "overall" ? "LEVEL / SCORE" : "BEST TIME"}</span></div><div className="leaderboard-list">{top.map((player, index) => <div key={player.id} className={`leader-row ${player.id === "you" ? "is-you" : ""}`}><span className="rank-number">{index === 0 ? <Crown size={15} fill="currentColor" /> : String(index + 1).padStart(2, "0")}</span><span className="leader-name">{player.name}{player.id === "you" && <small>YOU</small>}</span><span className="leader-result">{tab === "overall" ? <><b>L{player.level}</b> · {player.score.toLocaleString()}</> : `${player.levelTimes[level].toFixed(2)}s`}</span></div>)}</div></div>}
    <div className="your-rank-bar"><div><span>YOUR RANK</span><b>{yourIndex >= 0 ? `#${yourIndex + 1}` : "—"} <i>OF {rows.length}</i></b></div><strong>{profile?.name || "PLAYER"}</strong><span>{yourIndex < 0 ? "CLEAR A LEVEL TO RANK" : "KEEP CLIMBING!"}</span></div>
  </div>;
}
