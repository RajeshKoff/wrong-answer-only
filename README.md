# WRONG ANSWER ONLY (WAO!)

A mobile-first Tamil pop-culture quiz built with React, Vite, Tailwind CSS, and Framer Motion. Every round asks a normal question: tap the one odd/wrong option before the timer hits zero.

## Run locally

1. Install Node.js 20.19 or newer (required by Vite 8).
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local` and fill in the Firebase web app values.
4. In Firebase Console, enable **Authentication → Sign-in method → Anonymous**.
5. Create a Firestore database and publish the rules from `firestore.rules`.
6. Start the game: `npm run dev`
7. Open the local URL printed by Vite.

Production build: `npm run build`; preview it with `npm run preview`.

## Play

- Tap **TAP TO START**, enter a friendly 3–12 character gamer tag, and choose an unlocked level.
- Tap the wrong/odd option. Any true choice or timeout ends the run.
- Keyboard shortcuts **1–4** select the displayed options.
- Cleared levels unlock the next stage. Replay to improve your time or score.
- Use the speaker control to mute beeps. Profiles, seen questions, level progress, and completed run histories persist in Firestore.

New gamer tags are trimmed, normalized to lowercase, and claimed transactionally in Firestore under `usernames/{username}` so duplicate names are rejected. Profiles, seen questions, level stats, and completed run answer histories are stored privately under `players/{uid}` and `players/{uid}/runs`; score summaries are published under `leaderboard/{uid}` for everyone to read. Firebase anonymous authentication identifies a browser installation; without adding a sign-in/recovery method, progress cannot be restored on another device or after clearing browser data. Never commit `.env.local`.

The browser writes leaderboard summaries directly to Firestore, so they are not tamper-proof against modified clients. For a competitive production leaderboard, move score validation and summary writes to a trusted Cloud Function and enable Firebase App Check.

The supplied question bank in `src/questions.js` is preserved unchanged and re-exported from `src/data/questions.js`. It is validated at app startup. Storage APIs are asynchronous and isolated so they can be replaced by Firebase or Supabase later.

## Project layout

- `src/config.js` — screen and level metadata
- `src/data/questions.js` — adapter for the supplied quiz bank
- `src/state/gameReducer.js` — screen/game state machine
- `src/services/` — local storage and leaderboard ranking
- `src/utils/` — question shuffling and score calculations
- `src/hooks/useQuestionTimer.js` — per-question high-resolution timer
- `src/components/` — game screens and gameplay UI
- `src/App.jsx` — app flow and persistence orchestration
