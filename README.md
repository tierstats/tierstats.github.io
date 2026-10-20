# 1v1 Leaderboard

The definitive Tank Trouble 1v1 rankings — Dynamic Glicko-2 ratings, full match
archive, head-to-head dossiers, provisional roster and analytics.

**Live site:** https://tierstats.github.io/

- Owned & run by **Alternator** & **interstellar**
- Every rating is computed from the recorded match history — no manual rankings
- Visible rating = Glicko − 0.5 × RD (uncertain ratings are held back)

## Pages

- **Rankings** — the full qualified leaderboard
- **Player cards** — collectible cards with per-player stat sheets
- **Compare** — head-to-head dossiers and win probability
- **Matches** — the complete duel archive
- **Provisional** — players climbing toward qualification
- **Analytics** — win rates, schedules, upsets, activity and rivalries
- **Find a 1v1** — availability posts and the shared match board
- **Method** — how the Dynamic Glicko-2 ratings work
- **FAQ** — answers about the board, records and qualification
- **Admin** — owners-only match log (password protected)

## How published matches work

`log.js` is the shared match log. The admin console commits to it via the
GitHub API ("Publish to everyone"); every visitor's browser loads it fresh and
recalculates all Glicko-2 ratings from it at page load.
