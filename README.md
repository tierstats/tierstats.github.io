# 1v1 Leaderboard

The definitive Tank Trouble 1v1 rankings — Dynamic Glicko-2 ratings, full match
archive, head-to-head dossiers, provisional roster and analytics.

**Live site:** https://tierstats.github.io/

- Owned & run by **Alternator** & **interstellar**
- Every rating is computed from the recorded match history — no manual rankings
- Visible rating = Glicko − 0.35 × RD (uncertain ratings are held back)

## Pages

- **Rankings** — front line top 10, full leaderboard, latest battles
- **Matches** — the complete duel archive
- **Roster** — provisional players climbing toward qualification
- **Analytics** — win rates, activity, biggest upsets, rivalries
- **Method** — how the rating system works
- **Admin** — owners-only match log (password protected)

## How published matches work

`log.js` is the shared match log. The admin console commits to it via the
GitHub API ("Publish to everyone"); every visitor's browser loads it fresh and
recalculates all Glicko-2 ratings from it at page load.
