import { STORAGE_KEYS } from "../config.js";

const readLegacy = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};
export const storage = {
  async load() {
    const { loadPlayerData } = await import("./firebase.js");
    return loadPlayerData({
      profile: readLegacy(STORAGE_KEYS.profile, null),
      seen: readLegacy(STORAGE_KEYS.seen, {}),
      stats: readLegacy(STORAGE_KEYS.stats, { cleared: {}, attempts: {}, failedAttempts: {} }),
    });
  },
  async saveProfile(profile) {
    const { claimUsername } = await import("./firebase.js");
    return claimUsername(profile.name);
  },
  async saveSeen(seen) {
    const { savePlayerSeen } = await import("./firebase.js");
    return savePlayerSeen(seen);
  },
  async saveStats(stats) {
    const { savePlayerStats } = await import("./firebase.js");
    return savePlayerStats(stats);
  },
  async saveRun(level, result, score) {
    const { savePlayerRun } = await import("./firebase.js");
    return savePlayerRun(level, result, score);
  },
  async getLeaderboard() {
    const { fetchLeaderboard } = await import("./firebase.js");
    return fetchLeaderboard();
  },
};
