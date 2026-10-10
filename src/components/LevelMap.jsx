import { ArrowLeft, Clock3, LockKeyhole, Star, Trophy } from "lucide-react";
import { LEVELS_META } from "../config.js";

export default function LevelMap({ profile, stats, onPlay, onLeaderboard, onBack }) {
  const highest = Object.keys(stats.cleared || {}).reduce((max, value) => Math.max(max, Number(value)), 0);
  return <div className="screen map-screen">
    <header className="map-header"><button className="icon-button" onClick={onBack} aria-label="Back"><ArrowLeft /></button><div className="player-chip"><span className="avatar">{profile?.name?.[0]?.toUpperCase() || "W"}</span><span><b>{profile?.name || "PLAYER"}</b><small>LVL {highest} CLEAR</small></span></div></header>
    <div className="map-title-row"><div><span className="eyebrow">CHOOSE YOUR CHALLENGE</span><h2>LEVEL <em>MAP</em></h2></div><button className="icon-button trophy-button" onClick={onLeaderboard} aria-label="Leaderboard"><Trophy /></button></div>
    <div className="map-scroll">
      {LEVELS_META.map((level, index) => {
        const cleared = stats.cleared?.[level.id];
        const unlocked = level.id <= highest + 1;
        const shift = index % 2 === 0 ? "-12px" : "12px";
        return <button key={level.id} className={`level-node ${!unlocked ? "locked" : ""} ${cleared ? "cleared" : ""}`} style={{ "--level-color": level.color, "--node-shift": shift }} onClick={() => unlocked && onPlay(level.id)} disabled={!unlocked}>
          <span className="node-core">{!unlocked ? <LockKeyhole /> : <b>{String(level.id).padStart(2, "0")}</b>}</span>
          <span className="node-label"><b>{level.title}</b>{cleared ? <span className="cleared-meta"><span className="level-stars" aria-label={`${cleared.stars} out of 5 stars`}>{[1, 2, 3, 4, 5].map((star) => <Star key={star} size={12} fill={star <= cleared.stars ? "currentColor" : "none"} />)}</span><span className="best-time"><Clock3 size={11} /> {(cleared.timeMs / 1000).toFixed(1)}s <i>BEST</i></span></span> : <small>{unlocked ? `${level.questions} QUESTIONS • ${level.secPerQ}s EACH` : "LOCKED • CLEAR PREVIOUS"}</small>}</span>
          {cleared && <span className="node-stamp">CLEARED</span>}
        </button>;
      })}
    </div>
  </div>;
}
