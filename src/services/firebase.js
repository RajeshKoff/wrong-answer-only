import { getApp, getApps, initializeApp } from "firebase/app";
import { browserLocalPersistence, getAuth, setPersistence, signInAnonymously } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  runTransaction,
  serverTimestamp,
  setDoc,
  writeBatch,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const configured = Object.values(firebaseConfig).every(Boolean);
let database;
let auth;
let authInitialization;
let signInPromise = null;

function getFirebaseApp() {
  if (!configured) {
    throw new Error("Firebase is not configured. Add the Firebase VITE_* values to .env.local.");
  }
  return getApps().length ? getApp() : initializeApp(firebaseConfig);
}

export async function getFirebaseContext() {
  const app = getFirebaseApp();
  database ||= getFirestore(app);
  auth ||= getAuth(app);
  authInitialization ||= (async () => {
    await auth.authStateReady();
    await setPersistence(auth, browserLocalPersistence);
  })().catch((error) => {
    authInitialization = null;
    throw error;
  });
  await authInitialization;
  if (!auth.currentUser) {
    signInPromise ||= signInAnonymously(auth).finally(() => { signInPromise = null; });
    await signInPromise;
  }
  return { db: database, uid: auth.currentUser.uid };
}

export class UsernameAlreadyExistsError extends Error {
  constructor() {
    super("User already exists, try a new one.");
    this.name = "UsernameAlreadyExistsError";
    this.code = "username-already-exists";
  }
}

const emptyStats = () => ({ cleared: {}, attempts: {}, failedAttempts: {} });

export async function claimUsername(name, initialData = {}) {
  const username = name.trim().replace(/\s+/g, " ").toLowerCase();
  const { db, uid } = await getFirebaseContext();
  const usernameRef = doc(db, "usernames", username);
  const playerRef = doc(db, "players", uid);

  await runTransaction(db, async (transaction) => {
    const existing = await transaction.get(usernameRef);
    if (existing.exists()) {
      const existingUid = existing.data().uid;
      if (existingUid && existingUid !== uid) throw new UsernameAlreadyExistsError();
      if (!existingUid) transaction.update(usernameRef, { uid });
    } else {
      transaction.set(usernameRef, { username, uid, createdAt: serverTimestamp() });
    }
    transaction.set(playerRef, {
      uid,
      name: username,
      seen: initialData.seen || {},
      stats: initialData.stats || emptyStats(),
      updatedAt: serverTimestamp(),
    }, { merge: true });
  });

  return { name: username, uid };
}

export async function loadPlayerData(legacyData = {}) {
  const { db, uid } = await getFirebaseContext();
  const playerRef = doc(db, "players", uid);
  const playerSnapshot = await getDoc(playerRef);
  if (playerSnapshot.exists()) {
    const player = playerSnapshot.data();
    return {
      profile: { name: player.name, uid },
      seen: player.seen || {},
      stats: player.stats || emptyStats(),
    };
  }

  if (legacyData.profile?.name) {
    try {
      const profile = await claimUsername(legacyData.profile.name, legacyData);
      return { profile, seen: legacyData.seen || {}, stats: legacyData.stats || emptyStats() };
    } catch (error) {
      if (error?.code === "username-already-exists") return { profile: null, seen: {}, stats: emptyStats() };
      throw error;
    }
  }

  return { profile: null, seen: {}, stats: emptyStats() };
}

export async function savePlayerSeen(seen) {
  const { db, uid } = await getFirebaseContext();
  await setDoc(doc(db, "players", uid), { seen, updatedAt: serverTimestamp() }, { merge: true });
}

export async function savePlayerStats(stats) {
  const { db, uid } = await getFirebaseContext();
  const playerRef = doc(db, "players", uid);
  const playerSnapshot = await getDoc(playerRef);
  if (!playerSnapshot.exists()) throw new Error("Player profile is missing from Firestore.");

  const player = playerSnapshot.data();
  const bests = Object.values(stats.cleared || {});
  const levelTimes = Object.fromEntries(bests.map((best) => [String(best.level), best.timeMs / 1000]));
  const levelStars = Object.fromEntries(bests.map((best) => [String(best.level), best.stars || 0]));
  const levelAttempts = Object.fromEntries(bests.map((best) => [String(best.level), best.attemptsTaken ?? 1]));
  const summary = {
    uid,
    name: player.name,
    level: bests.reduce((max, best) => Math.max(max, best.level), 0),
    score: bests.reduce((sum, best) => sum + (best.score || 0), 0),
    time: bests.reduce((sum, best) => sum + best.timeMs / 1000, 0),
    stars: bests.reduce((sum, best) => sum + (best.stars || 0), 0),
    attempts: bests.reduce((sum, best) => sum + (best.attemptsTaken ?? 1), 0),
    levelTimes,
    levelStars,
    levelAttempts,
    updatedAt: serverTimestamp(),
  };
  const batch = writeBatch(db);
  batch.set(playerRef, { stats, updatedAt: serverTimestamp() }, { merge: true });
  batch.set(doc(db, "leaderboard", uid), summary);
  await batch.commit();
}

export async function savePlayerRun(level, result, score) {
  const { db, uid } = await getFirebaseContext();
  await addDoc(collection(db, "players", uid, "runs"), {
    level,
    won: Boolean(result.won),
    score: result.won ? score : 0,
    runTimeMs: Math.round(result.runTimeMs || 0),
    attemptNumber: result.attemptNumber || 1,
    pickedId: result.pickedId ?? null,
    wrongId: result.wrongId ?? null,
    questionId: result.question?.id ?? null,
    answers: result.answerHistory || [],
    reactions: result.reactions || [],
    completedAt: serverTimestamp(),
  });
}

export async function fetchLeaderboard() {
  const { db } = await getFirebaseContext();
  const snapshot = await getDocs(collection(db, "leaderboard"));
  return snapshot.docs.map((entry) => ({ id: entry.id, ...entry.data() })).filter((player) => player.level > 0);
}
