import { storage } from "./storage.js";

export function rankPlayers(players) {
  return [...players].sort((a, b) => b.level - a.level || b.score - a.score || a.time - b.time || a.attempts - b.attempts);
}

export async function updatePlayerLeaderboard(profile, stats) {
  const saved = await storage.getLeaderboard();
  const players = Array.isArray(saved) ? saved.filter((entry) => !entry.seeded && entry.id === "you") : [];
  const bests = Object.values(stats.cleared || {});
  if (bests.length === 0) {
    await storage.saveLeaderboard([]);
    return [];
  }
  const level = bests.reduce((max, item) => Math.max(max, item.level), 0);
  const player = {
    id: "you", name: profile.name, level,
    score: bests.reduce((sum, item) => sum + item.score, 0),
    time: bests.reduce((sum, item) => sum + item.timeMs / 1000, 0),
    stars: bests.reduce((sum, item) => sum + (item.stars || 0), 0),
    attempts: bests.reduce((sum, item) => sum + (item.attemptsTaken ?? 1), 0),
    levelTimes: Object.fromEntries(bests.map((item) => [item.level, item.timeMs / 1000])),
    levelStars: Object.fromEntries(bests.map((item) => [item.level, item.stars || 0])),
    levelAttempts: Object.fromEntries(bests.map((item) => [item.level, item.attemptsTaken ?? 1])),
  };
  const rows = rankPlayers([...players.filter((entry) => entry.id !== "you"), player]);
  await storage.saveLeaderboard(rows);
  return rows;
}

export async function getLeaderboard() {
  const saved = await storage.getLeaderboard();
  // Discard entries from the previous demo-seeded leaderboard; show actual results only.
  const actualPlayers = Array.isArray(saved) ? saved.filter((entry) => !entry.seeded && entry.id === "you" && entry.level > 0) : [];
  if (actualPlayers.length !== (saved?.length || 0)) await storage.saveLeaderboard(actualPlayers);
  return rankPlayers(actualPlayers);
}
