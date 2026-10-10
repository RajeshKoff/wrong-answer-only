import { STORAGE_KEYS } from "../config.js";

const read = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};
const write = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn("WAO could not save local data", error);
  }
};

// Async boundary keeps storage swappable for Firebase/Supabase later.
export const storage = {
  async load() {
    return {
      profile: read(STORAGE_KEYS.profile, null),
      seen: read(STORAGE_KEYS.seen, {}),
      stats: read(STORAGE_KEYS.stats, { cleared: {}, attempts: {} }),
    };
  },
  async saveProfile(profile) { write(STORAGE_KEYS.profile, profile); },
  async saveSeen(seen) { write(STORAGE_KEYS.seen, seen); },
  async saveStats(stats) { write(STORAGE_KEYS.stats, stats); },
  async getLeaderboard() { return read(STORAGE_KEYS.leaderboard, null); },
  async saveLeaderboard(rows) { write(STORAGE_KEYS.leaderboard, rows); },
};
