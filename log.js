/* Published site data — committed by the admin console ("Publish to everyone").
   matches = shared match log (newest first). aliases = name fixes / merges.
   inactive = manually inactive players. seeds = start rating overrides.
   settings = model overrides. matchEdits/matchRemoved = archive fixes.
   faq = admin-managed Q&A entries.
   The Glicko engine recalculates every rating from these at page load. */
window.LB_PUB = {
  "matches": [
    {
      "a": "Test123",
      "b": "Test1234",
      "sa": 120312,
      "sb": 12381281,
      "date": "3129-02-10"
    }
  ],
  "aliases": {
    "Alternator5": "Alternator"
  },
  "aliasNotes": {},
  "aliasRemoved": [
    "Alternator"
  ],
  "inactive": [],
  "seeds": {},
  "seedGlicko": {},
  "seedRd": {},
  "seedRemoved": [],
  "settings": {},
  "matchEdits": {},
  "matchRemoved": [],
  "faq": []
};
window.LB_LOG = window.LB_PUB.matches;
