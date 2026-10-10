import { motion } from "framer-motion";
import { Crown } from "lucide-react";
export default function Podium({ players }) {
  const winners = [players[1], players[0], players[2]].filter(Boolean);
  return <div className="podium">{winners.map((player, index) => {
    const rank = index === 1 ? 1 : index === 0 ? 2 : 3;
    return <motion.div key={player.id} className={`podium-place place-${rank}`} initial={{ y: 35, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: rank * 0.13 }}><div className="podium-person">{rank === 1 && <Crown className="crown" fill="currentColor" />}<span className="podium-avatar">{player.name.slice(0, 1).toUpperCase()}</span><b>{player.name}</b><small>{player.score.toLocaleString()} PTS</small></div><div className="podium-block"><strong>{rank}</strong></div></motion.div>;
  })}</div>;
}
