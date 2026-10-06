/* ==========================================================================
   Dot Arcade — hub wiring
   Adds a reaction row to every game card and counts plays, without any of
   the cards having to be written out by hand. New games get it automatically.
   ========================================================================== */
(function () {
  "use strict";

  const gameIdOf = (a) => (a.getAttribute("href") || "").replace(/\.html.*$/, "").replace(/^.*\//, "");

  function reactionRow(id) {
    const wrap = document.createElement("div");
    wrap.className = "reacts";
    wrap.setAttribute("aria-label", "Reactions");
    const mine = DotStats.mine(id);
    const all = DotStats.all()[id] || {};

    DotStats.KINDS.forEach((k) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "react" + (mine[k.id] ? " on" : "");
      b.dataset.kind = k.id;
      b.title = k.label;
      b.setAttribute("aria-label", k.label);
      b.innerHTML = '<span class="e">' + k.e + '</span><span class="n">' + (all[k.id] || 0) + "</span>";
      b.addEventListener("click", (ev) => {
        ev.preventDefault();
        const on = DotStats.react(id, k.id);
        b.classList.toggle("on", on);
        const n = b.querySelector(".n");
        n.textContent = Math.max(0, (parseInt(n.textContent, 10) || 0) + (on ? 1 : -1));
        b.animate(
          [{ transform: "scale(1)" }, { transform: "scale(1.25)" }, { transform: "scale(1)" }],
          { duration: 260 }
        );
      });
      wrap.appendChild(b);
    });

    const plays = document.createElement("span");
    plays.className = "playcount";
    plays.textContent = (all.plays || 0) === 0 ? "not played yet" : all.plays + (all.plays === 1 ? " play" : " plays");
    wrap.appendChild(plays);
    return wrap;
  }

  function wire() {
    document.querySelectorAll(".game-card").forEach((card) => {
      const link = card.querySelector('a.btn[href$=".html"]');
      if (!link) return;
      const id = gameIdOf(link);
      if (!id) return;
      link.addEventListener("click", () => DotStats.recordPlay(id));
      if (!card.querySelector(".reacts")) card.appendChild(reactionRow(id));
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();

  async function start() {
    await DotStats.refresh();     // no-op until there is a server
    wire();
  }
})();
