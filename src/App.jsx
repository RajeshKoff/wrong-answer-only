import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { LEVELS, validateBank } from "./data/questions.js";
import { LEVELS_META, SCREEN } from "./config.js";
import { drawQuestions } from "./utils/shuffle.js";
import { calculateRunScore, starsForAttempt } from "./utils/scoring.js";
import { storage } from "./services/storage.js";
import { getLeaderboard } from "./services/leaderboard.js";
import { gameReducer, initialState } from "./state/gameReducer.js";
import Splash from "./components/Splash.jsx";
import NameEntry from "./components/NameEntry.jsx";
import LevelMap from "./components/LevelMap.jsx";
import Countdown from "./components/Countdown.jsx";
import Hud from "./components/Hud.jsx";
import QuestionCard from "./components/QuestionCard.jsx";
import ResultScreen from "./components/ResultScreen.jsx";
import Leaderboard from "./components/Leaderboard.jsx";

export default function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const [leaderboardReturn, setLeaderboardReturn] = useState(SCREEN.SPLASH);
  const [shaking, setShaking] = useState(false);
  const committedResult = useRef(null);
  const tickRef = useRef({ context: null, last: 0 });

  useEffect(() => {
    if (!validateBank()) console.error("WAO question bank validation failed.");
    storage.load().then(async (data) => {
      const cleared = Object.fromEntries(Object.entries(data.stats?.cleared || {}).map(([levelId, record]) => {
        const level = LEVELS_META.find((item) => item.id === Number(levelId));
        return [levelId, level ? { ...record, score: calculateRunScore(level.questions) } : record];
      }));
      const stats = { ...data.stats, cleared };
      const savedScoresChanged = Object.entries(cleared).some(([levelId, record]) => record.score !== data.stats?.cleared?.[levelId]?.score);
      const hydratedData = { ...data, stats };
      dispatch({ type: "HYDRATE", data: hydratedData });
      if (data.profile || savedScoresChanged) {
        storage.saveStats(stats).catch((error) => console.error("Could not sync saved scores to Firebase.", error));
      }
      getLeaderboard()
        .then((rows) => dispatch({ type: "SET_LEADERBOARD", rows }))
        .catch((error) => console.error("Could not load the shared leaderboard.", error));
    }).catch((error) => {
      console.error("Could not load WAO data from Firebase.", error);
      dispatch({ type: "HYDRATE", data: { profile: null, seen: {}, stats: { cleared: {}, attempts: {}, failedAttempts: {} } } });
    });
  }, []);

  const playBeep = useCallback((frequency = 660, duration = 0.06) => {
    if (state.muted) return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      const context = tickRef.current.context || new AudioContextClass();
      tickRef.current.context = context;
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "square";
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.045, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + duration);
      oscillator.connect(gain); gain.connect(context.destination);
      oscillator.start(); oscillator.stop(context.currentTime + duration);
    } catch { /* Audio is an optional enhancement. */ }
  }, [state.muted]);

  const toggleMute = useCallback(() => dispatch({ type: "TOGGLE_MUTE" }), []);
  const openLeaderboard = useCallback(() => {
    setLeaderboardReturn(state.screen);
    dispatch({ type: "SET_SCREEN", screen: SCREEN.LEADERBOARD });
    getLeaderboard().then((rows) => dispatch({ type: "SET_LEADERBOARD", rows })).catch((error) => console.error("Could not refresh the shared leaderboard.", error));
  }, [state.screen]);

  const startLevel = useCallback(async (levelId) => {
    const cfg = LEVELS_META.find((item) => item.id === levelId);
    const drawn = drawQuestions(LEVELS[levelId], cfg.questions, state.seen[levelId] || []);
    const seen = { ...state.seen, [levelId]: drawn.seenIds };
    try {
      await storage.saveSeen(seen);
    } catch (error) {
      console.error("Could not save game progress to Firebase.", error);
      return;
    }
    dispatch({ type: "SET_SEEN", seen });
    dispatch({ type: "PREPARE_LEVEL", level: levelId, questions: drawn.questions });
    playBeep(440, 0.08);
  }, [state.seen, playBeep]);

  const countdownDone = useCallback(() => {
    dispatch({ type: "COUNTDOWN_DONE" });
    playBeep(880, 0.12);
  }, [playBeep]);

  const answer = useCallback((pickedId, reactionMs) => {
    const question = state.questions[state.questionIndex];
    if (!question) return;
    const passed = pickedId != null && pickedId === question.wrong;
    if (passed) {
      playBeep(880 + Math.min(state.streak, 8) * 36, 0.055);
      if (navigator.vibrate) navigator.vibrate(18);
    } else {
      playBeep(150, 0.18);
      if (navigator.vibrate) navigator.vibrate([60, 30, 90]);
      setShaking(true);
      window.setTimeout(() => setShaking(false), 430);
    }
    dispatch({ type: "ANSWER", pickedId, wrongId: question.wrong, passed, reactionMs, attemptNumber: (state.stats.attempts?.[state.level] || 0) + 1, timeLimit: LEVELS_META.find((item) => item.id === state.level).secPerQ });
  }, [state.questions, state.questionIndex, state.level, state.streak, playBeep]);

  const runScore = useMemo(() => state.result?.won ? calculateRunScore(state.result.reactions.length) : 0, [state.result]);
  useEffect(() => {
    if (state.screen !== SCREEN.LEVEL_RESULT || !state.result || committedResult.current === state.result) return;
    committedResult.current = state.result;
    (async () => {
      const attempts = { ...(state.stats.attempts || {}) };
      const failedAttempts = { ...(state.stats.failedAttempts || {}) };
      let cleared = { ...(state.stats.cleared || {}) };
      const previous = cleared[state.level];
      if (!previous) attempts[state.level] = Math.max(attempts[state.level] || 0, state.result.attemptNumber || (attempts[state.level] || 0) + 1);
      if (!state.result.won && !previous) failedAttempts[state.level] = (failedAttempts[state.level] || 0) + 1;
      else {
        if (state.result.won) {
          const next = {
            level: state.level,
            score: runScore,
            timeMs: state.result.runTimeMs,
            stars: starsForAttempt(state.result.attemptNumber),
            attemptsTaken: previous?.attemptsTaken ?? attempts[state.level],
            reactions: state.result.reactions,
          };
          cleared[state.level] = previous ? {
            ...next,
            score: Math.max(previous.score, next.score),
            timeMs: Math.min(previous.timeMs, next.timeMs),
            stars: Math.max(previous.stars, next.stars),
            attemptsTaken: previous.attemptsTaken ?? next.attemptsTaken,
            reactions: previous.score > next.score ? previous.reactions : next.reactions,
          } : next;
        }
      }
      const stats = { cleared, attempts, failedAttempts };
      await storage.saveStats(stats);
      await storage.saveRun(state.level, state.result, runScore);
      dispatch({ type: "SET_STATS", stats });
      if (state.profile) {
        const rows = await getLeaderboard();
        dispatch({ type: "SET_LEADERBOARD", rows });
      }
    })().catch((error) => console.error("Could not save this game to Firebase.", error));
  }, [state.screen, state.result, state.stats, state.level, state.profile, runScore]);

  const resultWithAttempts = state.result;
  const level = LEVELS_META.find((item) => item.id === state.level);
  const highScore = Object.values(state.stats.cleared || {}).reduce((sum, best) => sum + (best.score || 0), 0);
  const currentQuestion = state.questions[state.questionIndex];

  return <MotionConfig reducedMotion="user"><main className={`arcade-shell ${shaking ? "screen-shake" : ""}`}>
    <div className="arcade-frame">
      <div className="ambient-orb orb-a" /><div className="ambient-orb orb-b" />
      <AnimatePresence mode="wait" initial={false}>
        {state.screen === SCREEN.SPLASH && <motion.div key="splash" className="screen-holder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.16, ease: "easeOut" }}><Splash highScore={highScore} ready={state.hydrated} onLeaderboard={openLeaderboard} onStart={() => state.profile ? dispatch({ type: "SET_SCREEN", screen: SCREEN.LEVEL_MAP }) : dispatch({ type: "SET_SCREEN", screen: SCREEN.NAME_ENTRY })} /></motion.div>}
        {state.screen === SCREEN.NAME_ENTRY && <motion.div key="name" className="screen-holder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.16, ease: "easeOut" }}><NameEntry onBack={() => dispatch({ type: "SET_SCREEN", screen: SCREEN.SPLASH })} onSubmit={async (name) => { const profile = await storage.saveProfile({ name }); dispatch({ type: "SET_PROFILE", profile }); }} /></motion.div>}
        {state.screen === SCREEN.LEVEL_MAP && <motion.div key="map" className="screen-holder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.16, ease: "easeOut" }}><LevelMap profile={state.profile} stats={state.stats} onPlay={startLevel} onLeaderboard={openLeaderboard} onBack={() => dispatch({ type: "SET_SCREEN", screen: SCREEN.SPLASH })} /></motion.div>}
        {state.screen === SCREEN.COUNTDOWN && <motion.div key="countdown" className="screen-holder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.16, ease: "easeOut" }}><div className="play-screen countdown-screen"><Countdown onDone={countdownDone} /></div></motion.div>}
        {state.screen === SCREEN.PLAYING && currentQuestion && <motion.div key="playing" className="screen-holder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.16, ease: "easeOut" }}><div className="play-screen"><Hud level={level} score={state.score} /><QuestionCard key={currentQuestion.id} question={currentQuestion} level={level} index={state.questionIndex} total={state.questions.length} score={state.score} streak={state.streak} muted={state.muted} onToggleMute={toggleMute} onAnswer={answer} playTick={() => { const now = performance.now(); if (now - tickRef.current.last > 280) { tickRef.current.last = now; playBeep(430, 0.035); } }} /></div></motion.div>}
        {state.screen === SCREEN.LEVEL_RESULT && resultWithAttempts && <motion.div key="result" className="screen-holder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.16, ease: "easeOut" }}><ResultScreen result={resultWithAttempts} levelId={state.level} profile={state.profile} best={state.stats.cleared?.[state.level]} runScore={runScore} onRetry={() => startLevel(state.level)} onMap={() => dispatch({ type: "RETRY_LEVEL" })} onLeaderboard={openLeaderboard} /></motion.div>}
        {state.screen === SCREEN.LEADERBOARD && <motion.div key="leaderboard" className="screen-holder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.16, ease: "easeOut" }}><Leaderboard players={state.leaderboard} profile={state.profile} onBack={() => dispatch({ type: "SET_SCREEN", screen: leaderboardReturn })} /></motion.div>}
      </AnimatePresence>
      <div className="frame-grain" aria-hidden="true" />
    </div>
    <div className="desktop-brand">WAO! <span>WRONG ANSWER ONLY</span></div>
  </main></MotionConfig>;
}
