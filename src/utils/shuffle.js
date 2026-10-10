export function shuffle(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function drawQuestions(pool, count, seenIds = []) {
  const seen = new Set(seenIds);
  let unseen = shuffle(pool.filter((question) => !seen.has(question.id)));
  const resetCycle = unseen.length < count;
  if (resetCycle) unseen = shuffle(pool);
  const questions = unseen.slice(0, count).map((question) => ({
    ...question,
    options: shuffle(question.options),
  }));
  const nextSeen = resetCycle ? [] : [...seenIds];
  return { questions, seenIds: [...nextSeen, ...questions.map((question) => question.id)] };
}
