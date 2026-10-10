import { LEVEL_CONFIG } from "./data/questions.js";

export const LEVELS_META = [
  { id: 1, title: "Warm-up Thala", color: "#ffd400", subtitle: "Find your wrong-side instinct" },
  { id: 2, title: "Meme Machi", color: "#ff4d6d", subtitle: "Meme memory: ON" },
  { id: 3, title: "Arasiyal Alaparai", color: "#38e8ff", subtitle: "Just the fun facts" },
  { id: 4, title: "Mass Mode", color: "#b987ff", subtitle: "No time to second-guess" },
  { id: 5, title: "Wrong Answer God", color: "#ff914d", subtitle: "The final boss" },
].map((level) => ({ ...level, ...LEVEL_CONFIG[level.id] }));

export const SCREEN = {
  SPLASH: "SPLASH",
  NAME_ENTRY: "NAME_ENTRY",
  LEVEL_MAP: "LEVEL_MAP",
  COUNTDOWN: "COUNTDOWN",
  PLAYING: "PLAYING",
  LEVEL_RESULT: "LEVEL_RESULT",
  LEADERBOARD: "LEADERBOARD",
};

export const STORAGE_KEYS = {
  profile: "wao.profile.v1",
  seen: "wao.seen.v1",
  stats: "wao.stats.v1",
  leaderboard: "wao.leaderboard.v1",
};
