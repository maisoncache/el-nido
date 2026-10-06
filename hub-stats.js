/* ==========================================================================
   Dot Arcade — stats layer
   --------------------------------------------------------------------------
   Plays and reactions. Right now everything lives in THIS BROWSER ONLY, so
   the site needs no server and collects nothing about anybody.

   When hosting is ready, set API below to the worker URL and every function
   here starts talking to it instead. Nothing else on the site changes.

   Deliberate design rules:
     * No accounts, no names, no text boxes, no IP logging. Counters only.
     * Reactions are a fixed, positive set. There is no way to leave a bad
       word or a low score, so there is nothing to moderate and nothing
       that can hurt.
     * Everything is anonymous, which keeps the site clear of the rules
       that bite hard on sites used by children.

   The server contract, when it exists:
     POST  {API}/play    {"game":"<id>"}                  -> {ok:true}
     POST  {API}/react   {"game":"<id>","kind":"love","on":true} -> {ok:true}
     GET   {API}/stats   -> {"<id>":{"plays":12,"love":3,"tricky":1,"again":2}}
   ========================================================================== */
(function (global) {
  "use strict";

  const API = null;                      // <-- set to "https://…" when hosting is live
  const KEY = "dot-arcade-stats-v1";

  const KINDS = [
    { id: "love",   e: "❤️", label: "Loved it" },
    { id: "tricky", e: "🤯", label: "Tricky!" },
    { id: "again",  e: "🔁", label: "Played it again" },
  ];

  /* ---------- local store ---------- */
  function read() {
    try {
      const s = JSON.parse(localStorage.getItem(KEY) || "null");
      if (!s || typeof s !== "object") throw 0;
      return {
        plays: s.plays && typeof s.plays === "object" ? s.plays : {},
        react: s.react && typeof s.react === "object" ? s.react : {},
        mine:  s.mine  && typeof s.mine  === "object" ? s.mine  : {},
        first: typeof s.first === "number" ? s.first : Date.now(),
      };
    } catch (e) {
      return { plays: {}, react: {}, mine: {}, first: Date.now() };
    }
  }
  function write(s) {
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* private mode */ }
  }
  const num = (v) => (typeof v === "number" && isFinite(v) && v > 0 ? Math.floor(v) : 0);
  const safeId = (id) => String(id || "").replace(/[^a-z0-9-]/gi, "").slice(0, 40);

  /* ---------- remote (only ever used once API is set) ---------- */
  async function post(path, body) {
    if (!API) return null;
    try {
      const r = await fetch(API + path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      return r.ok ? await r.json() : null;
    } catch (e) { return null; }      // offline or server down: the site carries on
  }

  let remoteCache = null;

  const DotStats = {
    KINDS,
    isRemote: () => !!API,

    /** Someone opened a game. */
    recordPlay(id) {
      id = safeId(id);
      if (!id) return;
      const s = read();
      s.plays[id] = num(s.plays[id]) + 1;
      write(s);
      post("/play", { game: id });
    },

    /** Toggle one of the fixed reactions. Returns the new on/off state. */
    react(id, kind) {
      id = safeId(id);
      if (!id || !KINDS.some((k) => k.id === kind)) return false;
      const s = read();
      s.mine[id] = s.mine[id] || {};
      s.react[id] = s.react[id] || {};
      const on = !s.mine[id][kind];
      s.mine[id][kind] = on;
      s.react[id][kind] = Math.max(0, num(s.react[id][kind]) + (on ? 1 : -1));
      write(s);
      post("/react", { game: id, kind, on });
      return on;
    },

    /** What did this person already tap for this game? */
    mine(id) {
      const s = read();
      return s.mine[safeId(id)] || {};
    },

    /** Everything, merged with the server's totals when there is a server. */
    all() {
      const s = read();
      const out = {};
      const ids = new Set([...Object.keys(s.plays), ...Object.keys(s.react),
                           ...Object.keys(remoteCache || {})]);
      ids.forEach((id) => {
        const r = s.react[id] || {};
        const rem = (remoteCache && remoteCache[id]) || {};
        out[id] = {
          plays: num(s.plays[id]) + num(rem.plays),
          love:  num(r.love)   + num(rem.love),
          tricky:num(r.tricky) + num(rem.tricky),
          again: num(r.again)  + num(rem.again),
        };
      });
      return out;
    },

    /** Pull the shared totals, if there is a server. Safe to call always. */
    async refresh() {
      if (!API) return false;
      try {
        const r = await fetch(API + "/stats");
        if (!r.ok) return false;
        const j = await r.json();
        if (j && typeof j === "object") { remoteCache = j; return true; }
      } catch (e) { /* ignore */ }
      return false;
    },

    /** Wipe everything this browser remembers. */
    clear() { try { localStorage.removeItem(KEY); } catch (e) {} },
  };

  global.DotStats = DotStats;
})(window);
