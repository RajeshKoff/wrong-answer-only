export function calculateRunScore(level, reactions, failuresBeforeWin = 0) {
  const baseScore = level * 1000;
  const speedBonus = reactions.reduce((sum, reaction) => (
    sum + Math.max(0, (reaction.timeLimit - reaction.reactionMs / 1000) * 100)
  ), 0);
  const attemptPenalty = failuresBeforeWin * 150;
  return Math.max(0, Math.round(baseScore + speedBonus - attemptPenalty));
}

export function averageReactionRatio(reactions) {
  if (!reactions.length) return 1;
  return reactions.reduce((sum, item) => sum + item.reactionMs / (item.timeLimit * 1000), 0) / reactions.length;
}
