/* Published site data — committed by the admin console ("Publish to everyone").
   matches = shared match log (newest first). aliases = name fixes / merges.
   inactive = manually inactive players. seeds = start rating overrides.
   settings = model overrides. matchEdits/matchRemoved = archive fixes.
   faq = admin-managed Q&A entries.
   The Glicko engine recalculates every rating from these at page load. */
window.LB_PUB = {
  "matches": [
    {
      "a": "</script><img src=x onerror=alert(1)>",
      "b": "b\"; window.hacked=1;//",
      "sa": 1,
      "sb": 0,
      "date": ""
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
