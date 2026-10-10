import { SCREEN } from "../config.js";
import { CORRECT_ANSWER_POINTS } from "../utils/scoring.js";

export const initialState = {
  screen: SCREEN.SPLASH, profile: null, stats: { cleared: {}, attempts: {}, failedAttempts: {} }, seen: {},
  level: 1, questions: [], questionIndex: 0, score: 0, streak: 0, reactions: [],
  startedAt: 0, result: null, leaderboard: [], muted: false, hydrated: false,
};

export function gameReducer(state, action) {
  switch (action.type) {
    case "HYDRATE":
      return { ...state, ...action.data, screen: state.screen, hydrated: true };
    case "SET_SCREEN": return { ...state, screen: action.screen };
    case "SET_PROFILE": return { ...state, profile: action.profile, screen: SCREEN.LEVEL_MAP };
    case "PREPARE_LEVEL":
      return { ...state, level: action.level, questions: action.questions, questionIndex: 0, score: 0, streak: 0, reactions: [], result: null, screen: SCREEN.COUNTDOWN };
    case "COUNTDOWN_DONE":
      return { ...state, startedAt: performance.now(), screen: SCREEN.PLAYING };
    case "ANSWER": {
      if (state.screen !== SCREEN.PLAYING || !state.questions[state.questionIndex]) return state;
      const nextReactions = action.passed ? [...state.reactions, { reactionMs: action.reactionMs, timeLimit: action.timeLimit }] : state.reactions;
      const nextScore = action.passed ? state.score + CORRECT_ANSWER_POINTS : state.score;
      if (!action.passed) return {
        ...state, result: { won: false, pickedId: action.pickedId, wrongId: action.wrongId, question: state.questions[state.questionIndex], reactions: state.reactions, runTimeMs: performance.now() - state.startedAt, attemptNumber: action.attemptNumber }, screen: SCREEN.LEVEL_RESULT,
      };
      const nextIndex = state.questionIndex + 1;
      if (nextIndex >= state.questions.length) return {
        ...state, score: nextScore, streak: state.streak + 1, reactions: nextReactions,
        result: { won: true, reactions: nextReactions, runTimeMs: performance.now() - state.startedAt, attemptNumber: action.attemptNumber }, screen: SCREEN.LEVEL_RESULT,
      };
      return { ...state, score: nextScore, streak: state.streak + 1, reactions: nextReactions, questionIndex: nextIndex };
    }
    case "SET_STATS": return { ...state, stats: action.stats };
    case "SET_SEEN": return { ...state, seen: action.seen };
    case "SET_LEADERBOARD": return { ...state, leaderboard: action.rows };
    case "TOGGLE_MUTE": return { ...state, muted: !state.muted };
    case "RETRY_LEVEL": return { ...state, result: null, screen: SCREEN.LEVEL_MAP };
    default: return state;
  }
}
