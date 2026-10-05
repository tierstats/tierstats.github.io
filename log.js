/* Published site data — committed by the admin console ("Publish to everyone").
   matches = shared match log (newest first). aliases = name fixes / merges.
   inactive = manually inactive players. seeds = start rating overrides.
   settings = model overrides. matchEdits/matchRemoved = archive fixes.
   The Glicko engine recalculates every rating from these at page load. */
window.LB_PUB = {
  "matches": [
    {
      "a": "Kobi",
      "b": "Slayer",
      "sa": 15,
      "sb": 10,
      "date": "2026-10-04"
    }
  ],
  "aliases": {},
  "aliasNotes": {},
  "inactive": [],
  "seeds": {},
  "seedGlicko": {},
  "seedRd": {},
  "settings": {},
  "matchEdits": {},
  "matchRemoved": []
};
window.LB_LOG = window.LB_PUB.matches;
