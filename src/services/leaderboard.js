import { storage } from "./storage.js";

export function rankPlayers(players) {
  return [...players].sort((a, b) => b.level - a.level || b.score - a.score || a.time - b.time || a.attempts - b.attempts);
}

export async function getLeaderboard() {
  const players = await storage.getLeaderboard();
  return rankPlayers(players);
}
