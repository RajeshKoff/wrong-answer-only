export const CORRECT_ANSWER_POINTS = 100;

export function calculateRunScore(correctAnswers) {
  return Math.max(0, Math.trunc(correctAnswers)) * CORRECT_ANSWER_POINTS;
}

export function averageReactionRatio(reactions) {
  if (!reactions.length) return 1;
  return reactions.reduce((sum, item) => sum + item.reactionMs / (item.timeLimit * 1000), 0) / reactions.length;
}

export function starsForAttempt(attemptNumber = 1) {
  return Math.max(1, 5 - Math.floor(Math.max(1, attemptNumber) / 3));
}
